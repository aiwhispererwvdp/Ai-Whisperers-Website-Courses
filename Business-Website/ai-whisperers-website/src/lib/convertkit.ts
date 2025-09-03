// ConvertKit API integration for email marketing automation

interface ConvertKitSubscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fields?: Record<string, any>;
  tags?: string[];
}

interface ConvertKitSubscribeOptions {
  email: string;
  firstName?: string;
  lastName?: string;
  formId?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

class ConvertKitService {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl = 'https://api.convertkit.com/v3';

  constructor() {
    this.apiKey = process.env.CONVERTKIT_API_KEY || '';
    this.apiSecret = process.env.CONVERTKIT_API_SECRET || '';
    
    if (!this.apiKey || !this.apiSecret) {
      console.warn('ConvertKit API credentials not configured');
    }
  }

  // Subscribe user to main email list
  async subscribeToNewsletter(options: ConvertKitSubscribeOptions): Promise<ConvertKitSubscriber | null> {
    try {
      if (!this.apiKey) {
        console.warn('ConvertKit API key not configured - skipping subscription');
        return null;
      }

      const formId = options.formId || process.env.CONVERTKIT_FORM_ID;
      if (!formId) {
        throw new Error('ConvertKit form ID not configured');
      }

      const response = await fetch(`${this.baseUrl}/forms/${formId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          email: options.email,
          first_name: options.firstName,
          last_name: options.lastName,
          fields: options.customFields || {},
          tags: options.tags || [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('ConvertKit subscription error:', errorData);
        return null;
      }

      const data = await response.json();
      return data.subscription;

    } catch (error) {
      console.error('ConvertKit subscription error:', error);
      return null;
    }
  }

  // Add tags to existing subscriber
  async tagSubscriber(email: string, tags: string[]): Promise<boolean> {
    try {
      if (!this.apiSecret || tags.length === 0) {
        return false;
      }

      // First find the subscriber
      const subscriber = await this.findSubscriber(email);
      if (!subscriber) {
        console.warn(`Subscriber not found: ${email}`);
        return false;
      }

      // Add each tag
      for (const tag of tags) {
        const response = await fetch(`${this.baseUrl}/tags/${tag}/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_secret: this.apiSecret,
            email: email,
          }),
        });

        if (!response.ok) {
          console.error(`Failed to add tag ${tag} to ${email}`);
        }
      }

      return true;
    } catch (error) {
      console.error('ConvertKit tagging error:', error);
      return false;
    }
  }

  // Find subscriber by email
  async findSubscriber(email: string): Promise<ConvertKitSubscriber | null> {
    try {
      if (!this.apiSecret) {
        return null;
      }

      const response = await fetch(`${this.baseUrl}/subscribers?api_secret=${this.apiSecret}&email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.subscribers?.[0] || null;

    } catch (error) {
      console.error('ConvertKit subscriber search error:', error);
      return null;
    }
  }

  // Course-specific automation sequences
  async enrollInCourseSequence(email: string, courseId: string, courseName: string): Promise<boolean> {
    try {
      const tags = [`course-${courseId}`, 'student', 'enrolled'];
      const customFields = {
        last_enrolled_course: courseName,
        enrollment_date: new Date().toISOString(),
      };

      // Subscribe with course-specific tags and fields
      await this.subscribeToNewsletter({
        email,
        tags,
        customFields,
      });

      return true;
    } catch (error) {
      console.error('Course enrollment sequence error:', error);
      return false;
    }
  }

  // Welcome sequence for new users
  async triggerWelcomeSequence(email: string, firstName?: string, source = 'website'): Promise<boolean> {
    try {
      const tags = ['new-user', 'welcome-sequence', `source-${source}`];
      
      await this.subscribeToNewsletter({
        email,
        firstName,
        tags,
        customFields: {
          signup_date: new Date().toISOString(),
          source: source,
        },
      });

      return true;
    } catch (error) {
      console.error('Welcome sequence error:', error);
      return false;
    }
  }

  // Course completion automation
  async triggerCourseCompletion(email: string, courseId: string, courseName: string): Promise<boolean> {
    try {
      const tags = [`completed-${courseId}`, 'course-graduate', 'upsell-ready'];
      
      await this.tagSubscriber(email, tags);
      
      return true;
    } catch (error) {
      console.error('Course completion automation error:', error);
      return false;
    }
  }
}

// Export singleton instance
export const convertKitService = new ConvertKitService();

// Helper functions for common use cases
export async function subscribeNewUser(email: string, firstName?: string, source = 'website') {
  return convertKitService.triggerWelcomeSequence(email, firstName, source);
}

export async function enrollUserInCourse(email: string, courseId: string, courseName: string) {
  return convertKitService.enrollInCourseSequence(email, courseId, courseName);
}

export async function markCourseComplete(email: string, courseId: string, courseName: string) {
  return convertKitService.triggerCourseCompletion(email, courseId, courseName);
}