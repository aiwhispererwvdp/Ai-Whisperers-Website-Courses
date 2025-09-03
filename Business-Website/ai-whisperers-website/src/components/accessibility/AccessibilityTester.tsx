'use client';

import { useState, useEffect } from 'react';
import { validateAccessibility, getContrastRatio } from '@/lib/accessibility';

interface A11yTestResult {
  score: number;
  passed: number;
  failed: number;
  warnings: number;
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    message: string;
    element?: string;
    fix?: string;
  }>;
}

export default function AccessibilityTester() {
  const [testResult, setTestResult] = useState<A11yTestResult | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsVisible(!isVisible);
        runAccessibilityTest();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  const runAccessibilityTest = () => {
    const issues: A11yTestResult['issues'] = [];
    let passed = 0;
    let failed = 0;
    let warnings = 0;

    // Check for skip links
    const skipLink = document.querySelector('a[href="#main-content"], .skip-link');
    if (!skipLink) {
      issues.push({
        type: 'error',
        message: 'Missing skip link for keyboard navigation',
        fix: 'Add a skip link that allows keyboard users to bypass navigation'
      });
      failed++;
    } else {
      passed++;
    }

    // Check main content landmark
    const main = document.querySelector('main, [role="main"]');
    if (!main) {
      issues.push({
        type: 'error',
        message: 'Missing main content landmark',
        fix: 'Add <main> element or role="main" to primary content area'
      });
      failed++;
    } else {
      passed++;
    }

    // Check heading structure
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    if (headings.length === 0) {
      issues.push({
        type: 'error',
        message: 'No heading structure found',
        fix: 'Add proper heading hierarchy (h1, h2, h3, etc.)'
      });
      failed++;
    } else {
      const h1Count = document.querySelectorAll('h1').length;
      if (h1Count !== 1) {
        issues.push({
          type: h1Count === 0 ? 'error' : 'warning',
          message: `Found ${h1Count} h1 elements (should be exactly 1)`,
          fix: 'Use exactly one h1 per page for proper heading hierarchy'
        });
        if (h1Count === 0) failed++; else warnings++;
      } else {
        passed++;
      }
    }

    // Check images for alt text
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt && !img.hasAttribute('aria-hidden')) {
        issues.push({
          type: 'error',
          message: `Image ${index + 1} missing alt text`,
          element: img.src,
          fix: 'Add descriptive alt text or aria-hidden="true" for decorative images'
        });
        failed++;
      } else {
        passed++;
      }
    });

    // Check buttons and links for accessible text
    const buttons = document.querySelectorAll('button, [role="button"]');
    buttons.forEach((button, index) => {
      if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
        issues.push({
          type: 'error',
          message: `Button ${index + 1} missing accessible text`,
          fix: 'Add visible text or aria-label attribute'
        });
        failed++;
      } else {
        passed++;
      }
    });

    // Check form labels
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input, index) => {
      const id = input.id;
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;
      const ariaLabel = input.getAttribute('aria-label');
      
      if (!label && !ariaLabel) {
        issues.push({
          type: 'error',
          message: `Form input ${index + 1} missing label`,
          fix: 'Add <label> element or aria-label attribute'
        });
        failed++;
      } else {
        passed++;
      }
    });

    // Check color contrast (simplified check)
    const textElements = document.querySelectorAll('p, span, div, a, button');
    let contrastIssues = 0;
    
    textElements.forEach((element) => {
      const styles = getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        const ratio = getContrastRatio(color, backgroundColor);
        if (ratio < 4.5) {
          contrastIssues++;
        }
      }
    });

    if (contrastIssues > 0) {
      issues.push({
        type: 'warning',
        message: `${contrastIssues} elements may have insufficient color contrast`,
        fix: 'Ensure text has at least 4.5:1 contrast ratio with background'
      });
      warnings++;
    } else {
      passed++;
    }

    // Check for keyboard accessibility
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) {
      issues.push({
        type: 'warning',
        message: 'No focusable elements found',
        fix: 'Ensure interactive elements can receive keyboard focus'
      });
      warnings++;
    } else {
      passed++;
    }

    const total = passed + failed + warnings;
    const score = total > 0 ? Math.round((passed / total) * 100) : 0;

    setTestResult({
      score,
      passed,
      failed,
      warnings,
      issues
    });
  };

  if (!isVisible || !testResult) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => {
            setIsVisible(true);
            runAccessibilityTest();
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg shadow-lg hover:bg-primary-700 transition-colors"
          aria-label="Run accessibility test (Ctrl+Shift+A)"
        >
          🔍 A11y Test
        </button>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 70) return 'text-warning-600';
    return 'text-error-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-white border border-gray-200 rounded-xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Accessibility Test
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close accessibility test results"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Accessibility Score</span>
          <span className={`text-xl font-bold ${getScoreColor(testResult.score)}`}>
            {testResult.score}/100 ({getScoreLabel(testResult.score)})
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-success-600">{testResult.passed}</div>
            <div className="text-xs text-gray-500">Passed</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-warning-600">{testResult.warnings}</div>
            <div className="text-xs text-gray-500">Warnings</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-error-600">{testResult.failed}</div>
            <div className="text-xs text-gray-500">Failed</div>
          </div>
        </div>

        {testResult.issues.length > 0 && (
          <div className="max-h-48 overflow-y-auto space-y-2">
            <div className="text-sm font-medium text-gray-700 mb-2">Issues Found:</div>
            {testResult.issues.map((issue, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-50 border-l-4 border-gray-300">
                <div className={`text-sm font-medium ${
                  issue.type === 'error' ? 'text-error-600' : 
                  issue.type === 'warning' ? 'text-warning-600' : 'text-primary-600'
                }`}>
                  {issue.message}
                </div>
                {issue.fix && (
                  <div className="text-xs text-gray-600 mt-1">
                    Fix: {issue.fix}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={runAccessibilityTest}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Re-run Test
        </button>
      </div>
    </div>
  );
}