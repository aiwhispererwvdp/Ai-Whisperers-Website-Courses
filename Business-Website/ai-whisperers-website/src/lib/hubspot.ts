interface HubSpotContact {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  jobtitle?: string;
  ai_experience_level?: string;
  interest_type?: string;
  message?: string;
  lead_source?: string;
  hs_lead_status?: string;
  lifecyclestage?: string;
}

interface HubSpotFormData {
  fields: Array<{
    objectTypeId: string;
    name: string;
    value: string;
  }>;
  context?: {
    pageUri: string;
    pageName?: string;
  };
}

class HubSpotService {
  private readonly apiKey: string;
  private readonly portalId: string;
  private readonly baseUrl = 'https://api.hubapi.com';

  constructor() {
    this.apiKey = process.env.HUBSPOT_ACCESS_TOKEN || '';
    this.portalId = process.env.HUBSPOT_PORTAL_ID || '';
    
    if (!this.apiKey || !this.portalId) {
      console.warn('HubSpot configuration missing. Check HUBSPOT_ACCESS_TOKEN and HUBSPOT_PORTAL_ID environment variables.');
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HubSpot API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async createContact(contactData: HubSpotContact) {
    const properties = Object.entries(contactData).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    return this.makeRequest('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties }),
    });
  }

  async updateContact(email: string, contactData: Partial<HubSpotContact>) {
    const properties = Object.entries(contactData).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    return this.makeRequest(`/crm/v3/objects/contacts/${email}?idProperty=email`, {
      method: 'PATCH',
      body: JSON.stringify({ properties }),
    });
  }

  async findContactByEmail(email: string) {
    try {
      return await this.makeRequest(`/crm/v3/objects/contacts/${email}?idProperty=email`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async submitForm(formId: string, formData: HubSpotFormData) {
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${this.portalId}/${formId}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HubSpot Form submission error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async createOrUpdateContact(contactData: HubSpotContact) {
    try {
      const existingContact = await this.findContactByEmail(contactData.email);
      
      if (existingContact) {
        return await this.updateContact(contactData.email, contactData);
      } else {
        return await this.createContact(contactData);
      }
    } catch (error) {
      console.error('Error creating/updating HubSpot contact:', error);
      throw error;
    }
  }

  mapFormDataToHubSpot(formData: Record<string, any>) {
    const [firstname, ...lastnameParts] = formData.name.split(' ');
    const lastname = lastnameParts.join(' ') || '';

    return {
      email: formData.email,
      firstname,
      lastname,
      company: formData.company,
      jobtitle: formData.role,
      ai_experience_level: formData.experience,
      interest_type: formData.interest,
      message: formData.message,
      lead_source: 'Website Contact Form',
      hs_lead_status: 'NEW',
      lifecyclestage: 'lead',
    };
  }
}

export const hubspotService = new HubSpotService();