/**
 * Unit tests for Hero component
 * Tests landing page hero section functionality and user interactions
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, runUnitTest } from '@/test-utils'
import Hero from './Hero'

// Mock next/link component
jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

describe('Hero Component - Unit Tests', () => {
  runUnitTest('renders hero section with main heading', () => {
    render(<Hero />)

    // Check for main heading - adjust text based on actual implementation
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading).toHaveTextContent(/ai/i) // Should mention AI
  })

  runUnitTest('displays value proposition text', () => {
    render(<Hero />)

    // Check for value proposition content
    expect(screen.getByText(/learn/i)).toBeInTheDocument()
    expect(screen.getByText(/ai/i)).toBeInTheDocument()
  })

  runUnitTest('has call-to-action buttons', () => {
    render(<Hero />)

    // Look for CTA buttons - common patterns
    const buttons = screen.getAllByRole('button')
    const links = screen.getAllByRole('link')
    
    // Should have interactive elements for engagement
    expect(buttons.length + links.length).toBeGreaterThan(0)
  })

  runUnitTest('includes primary CTA button', () => {
    render(<Hero />)

    // Look for primary action - could be "Get Started", "View Courses", etc.
    const primaryCTA = screen.getByRole('link', { name: /get started|view courses|start learning|explore courses/i })
    expect(primaryCTA).toBeInTheDocument()
  })

  runUnitTest('displays social proof or statistics', () => {
    render(<Hero />)

    // Look for social proof elements like student counts, ratings, etc.
    // These might be displayed as numbers or text
    const heroText = screen.getByRole('banner') || document.body
    const textContent = heroText.textContent || ''
    
    // Should have some form of credibility indicators
    const hasNumbers = /\d+/.test(textContent)
    const hasCredibility = /student|rating|hour|course|learn/i.test(textContent)
    
    expect(hasNumbers || hasCredibility).toBe(true)
  })

  runUnitTest('is accessible with proper heading hierarchy', () => {
    render(<Hero />)

    // Check heading hierarchy
    const h1 = screen.queryByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    
    // Should not have multiple h1s
    const allH1s = screen.queryAllByRole('heading', { level: 1 })
    expect(allH1s.length).toBeLessThanOrEqual(1)
  })

  runUnitTest('has proper semantic structure', () => {
    render(<Hero />)

    // Check for semantic elements
    const banner = screen.queryByRole('banner')
    const main = screen.queryByRole('main')
    
    // Should have proper semantic structure
    expect(banner || main).toBeInTheDocument()
  })

  runUnitTest('CTA buttons have proper accessibility attributes', () => {
    render(<Hero />)

    const ctaLinks = screen.getAllByRole('link')
    const ctaButtons = screen.getAllByRole('button')
    
    // All interactive elements should have accessible names
    const allElements = [...ctaLinks, ...ctaButtons]
    allElements.forEach((element) => {
      expect(element).toHaveAccessibleName()
    })
  })

  runUnitTest('renders without crashing with different screen sizes', () => {
    // Test mobile viewport
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 667 })
    
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    
    // Test desktop viewport
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1080 })
    
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  runUnitTest('hero text is readable and not empty', () => {
    render(<Hero />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toBeTruthy()
    expect(heading.textContent!.length).toBeGreaterThan(10) // Should have meaningful content
  })

  runUnitTest('interactive elements are keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<Hero />)

    const interactiveElements = [
      ...screen.getAllByRole('link'),
      ...screen.getAllByRole('button')
    ]

    // Each interactive element should be focusable
    for (const element of interactiveElements) {
      await user.tab()
      expect(document.activeElement).toBe(element)
    }
  })

  runUnitTest('does not have any accessibility violations', () => {
    render(<Hero />)

    // Check for basic accessibility requirements
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()

    // Links should have href attributes
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('href')
    })

    // Images should have alt text (if any)
    const images = screen.queryAllByRole('img')
    images.forEach(img => {
      expect(img).toHaveAttribute('alt')
    })
  })

  runUnitTest('handles click events on CTA elements', async () => {
    const user = userEvent.setup()
    render(<Hero />)

    // Find and test primary CTA
    const primaryCTA = screen.getAllByRole('link')[0] // First link is likely primary CTA
    if (primaryCTA) {
      expect(primaryCTA).toBeInTheDocument()
      
      // Should be clickable without throwing errors
      await user.click(primaryCTA)
      expect(primaryCTA).toHaveAttribute('href')
    }
  })

  runUnitTest('displays consistent branding elements', () => {
    render(<Hero />)

    // Should mention brand name or key terms
    const heroContent = document.body.textContent || ''
    const hasBrandingTerms = /ai[\s-]?whisperer|artificial intelligence|machine learning/i.test(heroContent)
    
    expect(hasBrandingTerms).toBe(true)
  })

  runUnitTest('hero section has proper visual hierarchy', () => {
    render(<Hero />)

    // Main heading should be the most prominent
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()

    // Should not have competing h1 elements
    const allHeadings = screen.getAllByRole('heading')
    const h1Count = allHeadings.filter(h => h.tagName === 'H1').length
    expect(h1Count).toBe(1)
  })

  runUnitTest('responsive design elements are present', () => {
    render(<Hero />)

    const heroSection = screen.getByRole('heading', { level: 1 }).closest('section') || 
                       screen.getByRole('heading', { level: 1 }).closest('div')

    // Should have classes that suggest responsive design
    if (heroSection) {
      const classList = heroSection.className
      const hasResponsiveClasses = /md:|lg:|xl:|sm:|responsive|container|grid|flex/i.test(classList)
      expect(hasResponsiveClasses).toBe(true)
    }
  })
})