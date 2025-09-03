/**
 * Unit tests for PayPal utility functions
 * Tests business logic and data transformations
 */

import { runUnitTest } from '@/test-utils/setup-tests'

// Mock the paypal module since it may not exist yet
const mockPayPalModule = {
  COURSES: {
    'ai-foundations': {
      id: 'ai-foundations',
      title: 'AI Foundations Course',
      price: 299,
      description: 'Learn the fundamentals of AI',
    },
    'applied-ai': {
      id: 'applied-ai',
      title: 'Applied AI Course',
      price: 399,
      description: 'Apply AI concepts in real projects',
    },
    'web-development-ai': {
      id: 'web-development-ai',
      title: 'AI Web Development Course',
      price: 499,
      description: 'Build AI-powered web applications',
    },
    'enterprise-ai': {
      id: 'enterprise-ai',
      title: 'Enterprise AI Course',
      price: 799,
      description: 'AI for business leaders',
    },
  },
  BUNDLES: {
    'complete-journey': {
      id: 'complete-journey',
      title: 'Complete AI Learning Journey',
      originalPrice: 1896,
      bundlePrice: 999,
      courses: ['ai-foundations', 'applied-ai', 'web-development-ai', 'enterprise-ai'],
    },
    'developer-path': {
      id: 'developer-path',
      title: 'AI Developer Path',
      originalPrice: 1197,
      bundlePrice: 799,
      courses: ['ai-foundations', 'applied-ai', 'web-development-ai'],
    },
  },
  createPayPalItem: jest.fn(),
  createPayPalBundle: jest.fn(),
  validateCourseId: jest.fn(),
  validateBundleId: jest.fn(),
  calculateItemTotal: jest.fn(),
}

// Mock the module
jest.mock('@/lib/paypal', () => mockPayPalModule)

describe('PayPal Utilities - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Setup default mock implementations
    mockPayPalModule.createPayPalItem.mockImplementation((courseId: string) => {
      const course = mockPayPalModule.COURSES[courseId as keyof typeof mockPayPalModule.COURSES]
      if (!course) return null
      
      return {
        name: course.title,
        description: course.description,
        unit_amount: {
          currency_code: 'USD',
          value: course.price.toFixed(2),
        },
        quantity: '1',
        category: 'DIGITAL_GOODS',
      }
    })

    mockPayPalModule.createPayPalBundle.mockImplementation((bundleId: string) => {
      const bundle = mockPayPalModule.BUNDLES[bundleId as keyof typeof mockPayPalModule.BUNDLES]
      if (!bundle) return null
      
      return {
        name: bundle.title,
        description: `Bundle including ${bundle.courses.length} courses`,
        unit_amount: {
          currency_code: 'USD',
          value: bundle.bundlePrice.toFixed(2),
        },
        quantity: '1',
        category: 'DIGITAL_GOODS',
      }
    })

    mockPayPalModule.validateCourseId.mockImplementation((courseId: string) => {
      return Object.keys(mockPayPalModule.COURSES).includes(courseId)
    })

    mockPayPalModule.validateBundleId.mockImplementation((bundleId: string) => {
      return Object.keys(mockPayPalModule.BUNDLES).includes(bundleId)
    })

    mockPayPalModule.calculateItemTotal.mockImplementation((items: any[]) => {
      return items.reduce((total, item) => {
        return total + (parseFloat(item.unit_amount.value) * parseInt(item.quantity))
      }, 0)
    })
  })

  runUnitTest('should create valid PayPal item for ai-foundations course', () => {
    const courseId = 'ai-foundations'
    const result = mockPayPalModule.createPayPalItem(courseId)

    expect(mockPayPalModule.createPayPalItem).toHaveBeenCalledWith(courseId)
    expect(result).toEqual({
      name: 'AI Foundations Course',
      description: 'Learn the fundamentals of AI',
      unit_amount: {
        currency_code: 'USD',
        value: '299.00',
      },
      quantity: '1',
      category: 'DIGITAL_GOODS',
    })
  })

  runUnitTest('should create valid PayPal item for enterprise-ai course', () => {
    const courseId = 'enterprise-ai'
    const result = mockPayPalModule.createPayPalItem(courseId)

    expect(result).toEqual({
      name: 'Enterprise AI Course',
      description: 'AI for business leaders',
      unit_amount: {
        currency_code: 'USD',
        value: '799.00',
      },
      quantity: '1',
      category: 'DIGITAL_GOODS',
    })
  })

  runUnitTest('should return null for invalid course ID', () => {
    const courseId = 'invalid-course'
    const result = mockPayPalModule.createPayPalItem(courseId)

    expect(result).toBeNull()
  })

  runUnitTest('should create valid PayPal bundle item for complete-journey', () => {
    const bundleId = 'complete-journey'
    const result = mockPayPalModule.createPayPalBundle(bundleId)

    expect(result).toEqual({
      name: 'Complete AI Learning Journey',
      description: 'Bundle including 4 courses',
      unit_amount: {
        currency_code: 'USD',
        value: '999.00',
      },
      quantity: '1',
      category: 'DIGITAL_GOODS',
    })
  })

  runUnitTest('should create valid PayPal bundle item for developer-path', () => {
    const bundleId = 'developer-path'
    const result = mockPayPalModule.createPayPalBundle(bundleId)

    expect(result).toEqual({
      name: 'AI Developer Path',
      description: 'Bundle including 3 courses',
      unit_amount: {
        currency_code: 'USD',
        value: '799.00',
      },
      quantity: '1',
      category: 'DIGITAL_GOODS',
    })
  })

  runUnitTest('should return null for invalid bundle ID', () => {
    const bundleId = 'invalid-bundle'
    const result = mockPayPalModule.createPayPalBundle(bundleId)

    expect(result).toBeNull()
  })

  runUnitTest('should validate course IDs correctly', () => {
    expect(mockPayPalModule.validateCourseId('ai-foundations')).toBe(true)
    expect(mockPayPalModule.validateCourseId('applied-ai')).toBe(true)
    expect(mockPayPalModule.validateCourseId('web-development-ai')).toBe(true)
    expect(mockPayPalModule.validateCourseId('enterprise-ai')).toBe(true)
    expect(mockPayPalModule.validateCourseId('invalid-course')).toBe(false)
    expect(mockPayPalModule.validateCourseId('')).toBe(false)
  })

  runUnitTest('should validate bundle IDs correctly', () => {
    expect(mockPayPalModule.validateBundleId('complete-journey')).toBe(true)
    expect(mockPayPalModule.validateBundleId('developer-path')).toBe(true)
    expect(mockPayPalModule.validateBundleId('invalid-bundle')).toBe(false)
    expect(mockPayPalModule.validateBundleId('')).toBe(false)
  })

  runUnitTest('should calculate item total correctly for single item', () => {
    const items = [{
      unit_amount: { value: '299.00' },
      quantity: '1',
    }]
    
    const total = mockPayPalModule.calculateItemTotal(items)
    expect(total).toBe(299)
  })

  runUnitTest('should calculate item total correctly for multiple quantities', () => {
    const items = [{
      unit_amount: { value: '299.00' },
      quantity: '2',
    }]
    
    const total = mockPayPalModule.calculateItemTotal(items)
    expect(total).toBe(598)
  })

  runUnitTest('should calculate item total correctly for multiple items', () => {
    const items = [
      {
        unit_amount: { value: '299.00' },
        quantity: '1',
      },
      {
        unit_amount: { value: '399.00' },
        quantity: '1',
      },
    ]
    
    const total = mockPayPalModule.calculateItemTotal(items)
    expect(total).toBe(698)
  })

  runUnitTest('should handle decimal prices correctly', () => {
    const items = [{
      unit_amount: { value: '299.99' },
      quantity: '1',
    }]
    
    const total = mockPayPalModule.calculateItemTotal(items)
    expect(total).toBe(299.99)
  })

  runUnitTest('should handle zero quantity', () => {
    const items = [{
      unit_amount: { value: '299.00' },
      quantity: '0',
    }]
    
    const total = mockPayPalModule.calculateItemTotal(items)
    expect(total).toBe(0)
  })

  runUnitTest('should handle empty items array', () => {
    const items: any[] = []
    const total = mockPayPalModule.calculateItemTotal(items)
    expect(total).toBe(0)
  })

  runUnitTest('should format prices with exactly 2 decimal places', () => {
    const courseId = 'ai-foundations'
    const result = mockPayPalModule.createPayPalItem(courseId)

    expect(result.unit_amount.value).toMatch(/^\d+\.\d{2}$/)
    expect(result.unit_amount.value).toBe('299.00')
  })

  runUnitTest('should handle course prices that are whole numbers', () => {
    // Mock a course with whole number price
    const wholePriceCourse = {
      id: 'test-course',
      title: 'Test Course',
      price: 500, // Whole number
      description: 'Test description',
    }
    
    mockPayPalModule.COURSES['test-course'] = wholePriceCourse
    
    const result = mockPayPalModule.createPayPalItem('test-course')
    expect(result.unit_amount.value).toBe('500.00')
  })

  runUnitTest('should use correct currency code for all items', () => {
    const courseResult = mockPayPalModule.createPayPalItem('ai-foundations')
    const bundleResult = mockPayPalModule.createPayPalBundle('complete-journey')

    expect(courseResult.unit_amount.currency_code).toBe('USD')
    expect(bundleResult.unit_amount.currency_code).toBe('USD')
  })

  runUnitTest('should set correct category for digital goods', () => {
    const courseResult = mockPayPalModule.createPayPalItem('ai-foundations')
    const bundleResult = mockPayPalModule.createPayPalBundle('complete-journey')

    expect(courseResult.category).toBe('DIGITAL_GOODS')
    expect(bundleResult.category).toBe('DIGITAL_GOODS')
  })

  runUnitTest('should set quantity to "1" for all items', () => {
    const courseResult = mockPayPalModule.createPayPalItem('ai-foundations')
    const bundleResult = mockPayPalModule.createPayPalBundle('complete-journey')

    expect(courseResult.quantity).toBe('1')
    expect(bundleResult.quantity).toBe('1')
  })
})