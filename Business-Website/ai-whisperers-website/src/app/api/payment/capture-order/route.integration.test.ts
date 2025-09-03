/**
 * Integration tests for PayPal capture-order API endpoint
 * Tests payment completion and order processing
 */

import { NextRequest } from 'next/server'
import { POST } from './route'
import { 
  mockPayPalCaptureResponse, 
  mockSuccessResponse, 
  mockErrorResponse,
  runIntegrationTest,
  testDb,
  generateTestUser,
  generateTestCourse
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
  }
})

afterAll(() => {
  process.env = originalEnv
})

describe('/api/payment/capture-order - PayPal Capture Integration Tests', () => {
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

  runIntegrationTest('should successfully capture PayPal payment', async () => {
    const orderId = 'TEST_CAPTURE_ORDER_12345'
    const mockCaptureResponse = mockPayPalCaptureResponse(orderId)
    
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(mockCaptureResponse))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({
        orderId: orderId
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    // Verify response structure
    expect(response.status).toBe(200)
    expect(responseData.id).toBe(orderId)
    expect(responseData.status).toBe('COMPLETED')
    expect(responseData.purchase_units).toHaveLength(1)
    expect(responseData.purchase_units[0].payments.captures).toHaveLength(1)
    expect(responseData.purchase_units[0].payments.captures[0].status).toBe('COMPLETED')

    // Verify PayPal API was called correctly
    expect(global.fetch).toHaveBeenCalledTimes(2) // OAuth + Capture
    
    const captureCall = (global.fetch as jest.Mock).mock.calls[1]
    expect(captureCall[0]).toBe(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`)
    expect(captureCall[1].method).toBe('POST')
    expect(captureCall[1].headers['Authorization']).toBe('Bearer mock-access-token')
  })

  runIntegrationTest('should return 400 for missing order ID', async () => {
    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toContain('Missing required field: orderId')
  })

  runIntegrationTest('should handle PayPal capture failure', async () => {
    // Mock successful OAuth
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse({
        access_token: 'mock-access-token'
      }))
    )
    
    // Mock capture failure
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockErrorResponse(422, 'INSTRUMENT_DECLINED'))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({
        orderId: 'INVALID_ORDER_ID'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()
    
    expect(response.status).toBe(422)
    expect(responseData.error).toBe('Failed to capture PayPal payment')
    expect(responseData.details).toBeDefined()
  })

  runIntegrationTest('should handle network errors during capture', async () => {
    // Mock successful OAuth
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse({
        access_token: 'mock-access-token'
      }))
    )
    
    // Mock network error for capture
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Network timeout'))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({
        orderId: 'TEST_NETWORK_ERROR'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()
    
    expect(response.status).toBe(500)
    expect(responseData.error).toContain('Internal server error')
  })

  runIntegrationTest('should handle OAuth failure during capture', async () => {
    // Mock OAuth failure
    ;(global.fetch as jest.Mock).mockReset()
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockErrorResponse(401, 'Authentication failed'))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({
        orderId: 'TEST_AUTH_FAILURE'
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

  runIntegrationTest('should validate capture response structure', async () => {
    const orderId = 'TEST_RESPONSE_VALIDATION'
    const mockCaptureResponse = mockPayPalCaptureResponse(orderId)
    
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(mockCaptureResponse))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const responseData = await response.json()

    // Validate complete response structure
    expect(responseData).toHaveProperty('id')
    expect(responseData).toHaveProperty('status')
    expect(responseData).toHaveProperty('payment_source')
    expect(responseData).toHaveProperty('purchase_units')
    
    expect(responseData.payment_source).toHaveProperty('paypal')
    expect(responseData.payment_source.paypal).toHaveProperty('email_address')
    expect(responseData.payment_source.paypal).toHaveProperty('account_id')
    expect(responseData.payment_source.paypal).toHaveProperty('name')
    
    expect(responseData.purchase_units[0]).toHaveProperty('payments')
    expect(responseData.purchase_units[0].payments).toHaveProperty('captures')
    
    const capture = responseData.purchase_units[0].payments.captures[0]
    expect(capture).toHaveProperty('id')
    expect(capture).toHaveProperty('status')
    expect(capture).toHaveProperty('amount')
    expect(capture.amount).toHaveProperty('currency_code')
    expect(capture.amount).toHaveProperty('value')
  })

  runIntegrationTest('should handle partial capture scenarios', async () => {
    const orderId = 'TEST_PARTIAL_CAPTURE'
    const partialCaptureResponse = {
      ...mockPayPalCaptureResponse(orderId),
      purchase_units: [{
        reference_id: 'AI-WHISPERERS-123456789',
        payments: {
          captures: [{
            id: 'test-partial-capture-id',
            status: 'PARTIALLY_REFUNDED',
            amount: {
              currency_code: 'USD',
              value: '150.00', // Partial amount
            },
          }],
        },
      }],
    }
    
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(partialCaptureResponse))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData.purchase_units[0].payments.captures[0].status).toBe('PARTIALLY_REFUNDED')
    expect(responseData.purchase_units[0].payments.captures[0].amount.value).toBe('150.00')
  })

  runIntegrationTest('should handle multiple captures in response', async () => {
    const orderId = 'TEST_MULTIPLE_CAPTURES'
    const multipleCapturesResponse = {
      ...mockPayPalCaptureResponse(orderId),
      purchase_units: [{
        reference_id: 'AI-WHISPERERS-123456789',
        payments: {
          captures: [
            {
              id: 'capture-1',
              status: 'COMPLETED',
              amount: {
                currency_code: 'USD',
                value: '200.00',
              },
            },
            {
              id: 'capture-2',
              status: 'COMPLETED',
              amount: {
                currency_code: 'USD',
                value: '99.00',
              },
            },
          ],
        },
      }],
    }
    
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(multipleCapturesResponse))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData.purchase_units[0].payments.captures).toHaveLength(2)
    expect(responseData.purchase_units[0].payments.captures[0].id).toBe('capture-1')
    expect(responseData.purchase_units[0].payments.captures[1].id).toBe('capture-2')
  })

  runIntegrationTest('should handle malformed JSON in request', async () => {
    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: 'invalid json{',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData.error).toContain('Internal server error')
  })

  runIntegrationTest('should use correct PayPal endpoint for live mode', async () => {
    // Temporarily set live mode
    process.env.PAYPAL_MODE = 'live'
    
    const orderId = 'LIVE_MODE_TEST'
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(mockPayPalCaptureResponse(orderId)))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
      headers: { 'Content-Type': 'application/json' },
    })

    await POST(request)

    // Check that the live endpoint was used
    const oauthCall = (global.fetch as jest.Mock).mock.calls[0]
    expect(oauthCall[0]).toBe('https://api-m.paypal.com/v1/oauth2/token')
    
    const captureCall = (global.fetch as jest.Mock).mock.calls[1]
    expect(captureCall[0]).toBe(`https://api-m.paypal.com/v2/checkout/orders/${orderId}/capture`)

    // Reset to sandbox mode
    process.env.PAYPAL_MODE = 'sandbox'
  })

  runIntegrationTest('should log capture completion for analytics', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    const orderId = 'TEST_ANALYTICS_LOG'
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSuccessResponse(mockPayPalCaptureResponse(orderId)))
    )

    const request = new NextRequest('http://localhost:3000/api/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
      headers: { 'Content-Type': 'application/json' },
    })

    await POST(request)

    // Verify analytics logging
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('PayPal payment captured:'),
      expect.objectContaining({
        orderId: orderId,
        status: 'COMPLETED'
      })
    )

    consoleSpy.mockRestore()
  })
})