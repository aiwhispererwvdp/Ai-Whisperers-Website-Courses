import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { join } from 'path'
import fs from 'fs'

// Test database utilities for testing
export class TestDatabase {
  private prisma: PrismaClient
  private static instance: TestDatabase
  
  constructor() {
    // Use SQLite for testing
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: 'file:./test.db'
        }
      }
    })
  }

  static getInstance(): TestDatabase {
    if (!TestDatabase.instance) {
      TestDatabase.instance = new TestDatabase()
    }
    return TestDatabase.instance
  }

  async setup(): Promise<void> {
    try {
      // Generate test Prisma client
      console.log('Setting up test database...')
      
      // Run migrations for test database
      execSync('npx prisma db push --schema=./prisma/schema.test.prisma', {
        stdio: 'inherit',
        cwd: process.cwd()
      })
      
      console.log('Test database setup complete')
    } catch (error) {
      console.error('Failed to setup test database:', error)
      throw error
    }
  }

  async cleanup(): Promise<void> {
    try {
      // Close database connections
      await this.prisma.$disconnect()
      
      // Remove test database file
      const dbPath = join(process.cwd(), 'prisma', 'test.db')
      if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath)
      }
      
      console.log('Test database cleanup complete')
    } catch (error) {
      console.error('Failed to cleanup test database:', error)
    }
  }

  async reset(): Promise<void> {
    try {
      // Clear all data from test tables
      await this.prisma.enrollment.deleteMany()
      await this.prisma.payment.deleteMany()
      await this.prisma.user.deleteMany()
      await this.prisma.course.deleteMany()
      
      console.log('Test database reset complete')
    } catch (error) {
      console.error('Failed to reset test database:', error)
      throw error
    }
  }

  getClient(): PrismaClient {
    return this.prisma
  }

  // Helper methods for creating test data
  async createTestUser(userData: {
    email: string
    firstName?: string
    lastName?: string
    experience?: string
  }) {
    return await this.prisma.user.create({
      data: {
        email: userData.email,
        firstName: userData.firstName || 'Test',
        lastName: userData.lastName || 'User',
        experience: userData.experience || 'complete-beginner',
        marketingConsent: false,
      }
    })
  }

  async createTestCourse(courseData: {
    title: string
    description?: string
    price?: number
    level?: string
    category?: string
  }) {
    return await this.prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description || 'Test course description',
        price: courseData.price || 299,
        level: courseData.level || 'Beginner',
        category: courseData.category || 'foundations',
        popular: false,
        rating: 4.5,
        students: 100,
      }
    })
  }

  async createTestEnrollment(enrollmentData: {
    userId: string
    courseId: string
    paymentStatus?: string
    pricePaid?: number
  }) {
    return await this.prisma.enrollment.create({
      data: {
        userId: enrollmentData.userId,
        courseId: enrollmentData.courseId,
        paymentType: 'individual',
        pricePaid: enrollmentData.pricePaid || 299,
        paymentStatus: enrollmentData.paymentStatus || 'COMPLETED',
        isActive: true,
      }
    })
  }

  async createTestPayment(paymentData: {
    userId: string
    amount: number
    status?: string
    paypalOrderId?: string
  }) {
    return await this.prisma.payment.create({
      data: {
        userId: paymentData.userId,
        amount: paymentData.amount,
        currency: 'USD',
        status: paymentData.status || 'COMPLETED',
        paymentMethod: 'PAYPAL',
        paypalOrderId: paymentData.paypalOrderId || 'test-paypal-order-id',
      }
    })
  }
}

// Global test database instance
export const testDb = TestDatabase.getInstance()

// Jest setup and teardown helpers
export async function setupTestDatabase(): Promise<void> {
  await testDb.setup()
}

export async function cleanupTestDatabase(): Promise<void> {
  await testDb.cleanup()
}

export async function resetTestDatabase(): Promise<void> {
  await testDb.reset()
}

// Mock Prisma client for unit tests that don't need database
export const createMockPrismaClient = () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
  course: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
  enrollment: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
  payment: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $transaction: jest.fn(),
})

// Environment-specific Prisma client
export function getPrismaClient(): PrismaClient {
  if (process.env.NODE_ENV === 'test') {
    return testDb.getClient()
  }
  
  // Return regular Prisma client for non-test environments
  return new PrismaClient()
}