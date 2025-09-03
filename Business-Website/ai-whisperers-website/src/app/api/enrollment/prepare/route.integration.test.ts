/**
 * Integration tests for enrollment preparation API endpoint
 * Tests student registration and enrollment flow preparation
 */

import { NextRequest } from 'next/server'
import { POST } from './route'
import { 
  runIntegrationTest,
  generateTestEmail,
} from '@/test-utils/setup-tests'

describe('/api/enrollment/prepare - Enrollment Preparation Integration Tests', () => {
  runIntegrationTest('should successfully prepare enrollment with valid student info', async () => {
    const studentInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: generateTestEmail('john.doe'),
      company: 'Tech Corp',
      experience: 'some-exposure',
      goals: 'Learn AI for career advancement',
      marketingConsent: true,
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo,
        courseId: 'ai-foundations',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData.success).toBe(true)
    expect(responseData.sessionId).toMatch(/^enroll_ai-foundations_\d+$/)
    expect(responseData.message).toBe('Enrollment preparation successful')
    expect(responseData.nextStep).toBe('payment')
  })

  runIntegrationTest('should successfully prepare enrollment without optional fields', async () => {
    const studentInfo = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: generateTestEmail('jane.smith'),
      company: '',
      experience: 'complete-beginner',
      goals: '',
      marketingConsent: false,
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo,
        courseId: 'applied-ai',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData.success).toBe(true)
    expect(responseData.sessionId).toMatch(/^enroll_applied-ai_\d+$/)
  })

  runIntegrationTest('should return 400 for missing firstName', async () => {
    const studentInfo = {
      // firstName missing
      lastName: 'Doe',
      email: generateTestEmail(),
      experience: 'complete-beginner',
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo,
        courseId: 'ai-foundations',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toBe('Missing required fields')
  })

  runIntegrationTest('should return 400 for missing lastName', async () => {
    const studentInfo = {
      firstName: 'John',
      // lastName missing
      email: generateTestEmail(),
      experience: 'complete-beginner',
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo,
        courseId: 'ai-foundations',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toBe('Missing required fields')
  })

  runIntegrationTest('should return 400 for missing email', async () => {
    const studentInfo = {
      firstName: 'John',
      lastName: 'Doe',
      // email missing
      experience: 'complete-beginner',
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo,
        courseId: 'ai-foundations',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toBe('Missing required fields')
  })

  runIntegrationTest('should return 400 for missing experience', async () => {
    const studentInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: generateTestEmail(),
      // experience missing
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo,
        courseId: 'ai-foundations',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toBe('Missing required fields')
  })

  runIntegrationTest('should return 400 for invalid email format', async () => {
    const studentInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email-format',
      experience: 'complete-beginner',
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo,
        courseId: 'ai-foundations',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toBe('Invalid email format')
  })

  runIntegrationTest('should return 400 for invalid course ID', async () => {
    const studentInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: generateTestEmail(),
      experience: 'complete-beginner',
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo,
        courseId: 'invalid-course-id',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toBe('Invalid course ID')
  })

  runIntegrationTest('should accept all valid course IDs', async () => {
    const validCourseIds = ['ai-foundations', 'applied-ai', 'web-development-ai', 'enterprise-ai']
    const studentInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: generateTestEmail(),
      experience: 'complete-beginner',
    }

    for (const courseId of validCourseIds) {
      const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
        method: 'POST',
        body: JSON.stringify({
          studentInfo: {
            ...studentInfo,
            email: generateTestEmail(`${courseId}.test`),
          },
          courseId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData.success).toBe(true)
      expect(responseData.sessionId).toMatch(new RegExp(`^enroll_${courseId}_\\d+$`))
    }
  })

  runIntegrationTest('should handle various email formats correctly', async () => {
    const validEmails = [
      'test@example.com',
      'user+tag@domain.co.uk',
      'firstname.lastname@company-name.org',
      'user123@test-domain.info',
    ]

    for (const email of validEmails) {
      const studentInfo = {
        firstName: 'Test',
        lastName: 'User',
        email,
        experience: 'complete-beginner',
      }

      const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
        method: 'POST',
        body: JSON.stringify({
          studentInfo,
          courseId: 'ai-foundations',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      
      expect(response.status).toBe(200)
    }
  })

  runIntegrationTest('should reject invalid email formats', async () => {
    const invalidEmails = [
      'invalid-email',
      '@example.com',
      'test@',
      'test..test@example.com',
      'test@.com',
      'test@example',
    ]

    for (const email of invalidEmails) {
      const studentInfo = {
        firstName: 'Test',
        lastName: 'User',
        email,
        experience: 'complete-beginner',
      }

      const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
        method: 'POST',
        body: JSON.stringify({
          studentInfo,
          courseId: 'ai-foundations',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      
      expect(response.status).toBe(400)
    }
  })

  runIntegrationTest('should handle malformed JSON in request body', async () => {
    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
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

  runIntegrationTest('should log enrollment preparation for analytics', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    const studentInfo = {
      firstName: 'Analytics',
      lastName: 'Test',
      email: generateTestEmail('analytics'),
      company: 'Test Company',
      experience: 'intermediate',
      goals: 'Learn for analytics test',
      marketingConsent: true,
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo,
        courseId: 'web-development-ai',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    await POST(request)

    // Verify analytics logging
    expect(consoleSpy).toHaveBeenCalledWith(
      'Preparing enrollment:',
      expect.objectContaining({
        student: expect.objectContaining({
          name: 'Analytics Test',
          email: studentInfo.email,
          company: 'Test Company',
          experience: 'intermediate',
        }),
        course: 'web-development-ai',
        timestamp: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
      })
    )

    consoleSpy.mockRestore()
  })

  runIntegrationTest('should generate unique session IDs for concurrent requests', async () => {
    const studentInfo = {
      firstName: 'Concurrent',
      lastName: 'Test',
      email: generateTestEmail('concurrent'),
      experience: 'complete-beginner',
    }

    // Make multiple concurrent requests
    const requests = Array.from({ length: 5 }, (_, i) => 
      new NextRequest('http://localhost:3000/api/enrollment/prepare', {
        method: 'POST',
        body: JSON.stringify({
          studentInfo: {
            ...studentInfo,
            email: generateTestEmail(`concurrent${i}`),
          },
          courseId: 'ai-foundations',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    )

    const responses = await Promise.all(requests.map(request => POST(request)))
    const responseData = await Promise.all(responses.map(response => response.json()))

    // All should succeed
    responses.forEach(response => {
      expect(response.status).toBe(200)
    })

    // All session IDs should be unique
    const sessionIds = responseData.map(data => data.sessionId)
    const uniqueSessionIds = new Set(sessionIds)
    expect(uniqueSessionIds.size).toBe(sessionIds.length)
  })

  runIntegrationTest('should handle marketing consent correctly', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    const studentInfoWithConsent = {
      firstName: 'Marketing',
      lastName: 'Consent',
      email: generateTestEmail('marketing-consent'),
      experience: 'complete-beginner',
      marketingConsent: true,
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo: studentInfoWithConsent,
        courseId: 'ai-foundations',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    await POST(request)

    // Verify marketing consent was logged
    expect(consoleSpy).toHaveBeenCalledWith(
      'Adding to marketing list:',
      studentInfoWithConsent.email
    )

    consoleSpy.mockRestore()
  })

  runIntegrationTest('should not log marketing when consent is false', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    const studentInfoNoConsent = {
      firstName: 'No',
      lastName: 'Marketing',
      email: generateTestEmail('no-marketing'),
      experience: 'complete-beginner',
      marketingConsent: false,
    }

    const request = new NextRequest('http://localhost:3000/api/enrollment/prepare', {
      method: 'POST',
      body: JSON.stringify({
        studentInfo: studentInfoNoConsent,
        courseId: 'ai-foundations',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    await POST(request)

    // Verify marketing consent was NOT logged
    expect(consoleSpy).not.toHaveBeenCalledWith(
      'Adding to marketing list:',
      expect.anything()
    )

    consoleSpy.mockRestore()
  })
})