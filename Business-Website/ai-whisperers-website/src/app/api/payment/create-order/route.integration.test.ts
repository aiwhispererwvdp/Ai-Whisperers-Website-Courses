/**
 * Integration tests for PayPal create-order API endpoint
 * Tests the critical revenue-generating payment functionality
 */

import { NextRequest } from 'next/server'
import { POST } from './route'
import { 
  mockPayPalOrderResponse, 
  mockSuccessResponse, 
  mockErrorResponse,
  runIntegrationTest
} from '@/test-utils/setup-tests'

// Mock PayPal API calls
global.fetch = jest.fn()

// Mock environment variables
const originalEnv = process.env
beforeAll(() => {
  process.env = {
    ...originalEnv,
    PAYPAL_CLIENT_ID: 'test_client_id',
    PAYPAL_CLIENT_SECRET: 'test_client_secret',
    PAYPAL_MODE: 'sandbox',
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3000',
  }
})

afterAll(() => {
  process.env = originalEnv
})

describe('/api/payment/create-order - PayPal Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock PayPal OAuth token response
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse({
        access_token: 'mock-access-token',
        token_type: 'Bearer',
        expires_in: 32400,
      }))
    )
  })

  runIntegrationTest('should successfully create PayPal order for valid course', async () => {
    // Mock PayPal order creation response
    const mockOrderId = 'TEST_ORDER_12345'
    const mockOrderResponse = mockPayPalOrderResponse(mockOrderId)
    
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(mockOrderResponse))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'ai-foundations',
        price: 299,
        title: 'AI Foundations Course'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    // Verify response structure
    expect(response.status).toBe(200)
    expect(responseData.id).toBe(mockOrderId)
    expect(responseData.status).toBe('CREATED')
    expect(responseData.intent).toBe('CAPTURE')
    expect(responseData.purchase_units).toHaveLength(1)
    expect(responseData.purchase_units[0].amount.value).toBe('299.00')
    expect(responseData.links).toHaveLength(2)

    // Verify PayPal API was called correctly
    expect(global.fetch).toHaveBeenCalledTimes(2) // OAuth + Order creation
    
    // Verify OAuth call
    const oauthCall = (global.fetch as jest.Mock).mock.calls[0]
    expect(oauthCall[0]).toBe('https://api-m.sandbox.paypal.com/v1/oauth2/token')
    expect(oauthCall[1].method).toBe('POST')
    expect(oauthCall[1].body).toBe('grant_type=client_credentials')
    
    // Verify order creation call
    const orderCall = (global.fetch as jest.Mock).mock.calls[1]
    expect(orderCall[0]).toBe('https://api-m.sandbox.paypal.com/v2/checkout/orders')
    expect(orderCall[1].method).toBe('POST')
    expect(orderCall[1].headers['Authorization']).toBe('Bearer mock-access-token')
  })

  runIntegrationTest('should successfully create PayPal order for valid bundle', async () => {
    const mockOrderId = 'TEST_BUNDLE_ORDER_12345'
    const mockOrderResponse = mockPayPalOrderResponse(mockOrderId)
    
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(mockOrderResponse))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        bundleId: 'complete-journey',
        price: 999,
        title: 'Complete AI Learning Journey Bundle'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData.id).toBe(mockOrderId)
    expect(responseData.purchase_units[0].amount.value).toBe('999.00')
  })

  runIntegrationTest('should return 400 for missing required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'ai-foundations',
        // Missing price and title
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toContain('Missing required fields')
  })

  runIntegrationTest('should return 400 for invalid course ID', async () => {
    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'invalid-course',
        price: 299,
        title: 'Invalid Course'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toContain('Invalid course ID')
  })

  runIntegrationTest('should return 400 for invalid bundle ID', async () => {
    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        bundleId: 'invalid-bundle',
        price: 999,
        title: 'Invalid Bundle'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toContain('Invalid bundle ID')
  })

  runIntegrationTest('should return 400 when neither courseId nor bundleId provided', async () => {
    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        price: 299,
        title: 'Test Course'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toContain('Either courseId or bundleId must be provided')
  })

  runIntegrationTest('should handle PayPal OAuth failure', async () => {
    // Mock OAuth failure
    ;(global.fetch as jest.Mock).mockReset()
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockErrorResponse(401, 'Unauthorized'))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'ai-foundations',
        price: 299,
        title: 'AI Foundations Course'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    
    expect(response.status).toBe(500)
    const responseData = await response.json()
    expect(responseData.error).toContain('Internal server error')
  })

  runIntegrationTest('should handle PayPal order creation failure', async () => {
    // Mock successful OAuth
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse({
        access_token: 'mock-access-token'
      }))
    )
    
    // Mock order creation failure
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockErrorResponse(400, 'Invalid request'))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'ai-foundations',
        price: 299,
        title: 'AI Foundations Course'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    
    expect(response.status).toBe(400)
    const responseData = await response.json()
    expect(responseData.error).toBe('Failed to create PayPal order')
  })

  runIntegrationTest('should handle network errors gracefully', async () => {
    // Mock network error
    ;(global.fetch as jest.Mock).mockReset()
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'ai-foundations',
        price: 299,
        title: 'AI Foundations Course'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    
    expect(response.status).toBe(500)
    const responseData = await response.json()
    expect(responseData.error).toContain('Internal server error')
  })

  runIntegrationTest('should correctly calculate total amount for multiple items', async () => {
    const mockOrderResponse = mockPayPalOrderResponse('TEST_MULTI_ITEM')
    
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(mockOrderResponse))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'enterprise-ai',
        price: 799,
        title: 'Enterprise AI Course'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(200)
    
    // Verify the order creation request body
    const orderCall = (global.fetch as jest.Mock).mock.calls[1]
    const requestBody = JSON.parse(orderCall[1].body)
    
    expect(requestBody.purchase_units[0].amount.value).toMatch(/^\d+\.\d{2}$/) // Price format validation
    expect(requestBody.purchase_units[0].amount.breakdown.item_total.value).toMatch(/^\d+\.\d{2}$/)
    expect(requestBody.purchase_units[0].items).toHaveLength(1)
  })

  runIntegrationTest('should include correct application context in PayPal order', async () => {
    const mockOrderResponse = mockPayPalOrderResponse('TEST_CONTEXT')
    
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(mockOrderResponse))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'ai-foundations',
        price: 299,
        title: 'AI Foundations Course'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    await POST(request)
    
    const orderCall = (global.fetch as jest.Mock).mock.calls[1]
    const requestBody = JSON.parse(orderCall[1].body)
    
    expect(requestBody.application_context.brand_name).toBe('AI-Whisperers')
    expect(requestBody.application_context.locale).toBe('en-US')
    expect(requestBody.application_context.landing_page).toBe('BILLING')
    expect(requestBody.application_context.shipping_preference).toBe('NO_SHIPPING')
    expect(requestBody.application_context.user_action).toBe('PAY_NOW')
    expect(requestBody.application_context.return_url).toBe('http://localhost:3000/payment/success')
    expect(requestBody.application_context.cancel_url).toBe('http://localhost:3000/courses')
  })

  runIntegrationTest('should generate unique reference ID for each order', async () => {
    const mockOrderResponse1 = mockPayPalOrderResponse('ORDER_1')
    const mockOrderResponse2 = mockPayPalOrderResponse('ORDER_2')
    
    // First order
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse({ access_token: 'token1' }))
    )
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(mockOrderResponse1))
    )

    const request1 = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'ai-foundations',
        price: 299,
        title: 'AI Foundations Course'
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    await POST(request1)
    
    const firstOrderCall = (global.fetch as jest.Mock).mock.calls[1]
    const firstRequestBody = JSON.parse(firstOrderCall[1].body)
    const firstReferenceId = firstRequestBody.purchase_units[0].reference_id
    
    // Clear mocks for second order
    jest.clearAllMocks()
    
    // Second order
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse({ access_token: 'token2' }))
    )
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(mockOrderResponse2))
    )

    const request2 = new NextRequest('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'applied-ai',
        price: 399,
        title: 'Applied AI Course'
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    await POST(request2)
    
    const secondOrderCall = (global.fetch as jest.Mock).mock.calls[1]
    const secondRequestBody = JSON.parse(secondOrderCall[1].body)
    const secondReferenceId = secondRequestBody.purchase_units[0].reference_id
    
    // Verify reference IDs are different and follow expected format
    expect(firstReferenceId).not.toBe(secondReferenceId)
    expect(firstReferenceId).toMatch(/^AI-WHISPERERS-\d+$/)
    expect(secondReferenceId).toMatch(/^AI-WHISPERERS-\d+$/)
  })
})