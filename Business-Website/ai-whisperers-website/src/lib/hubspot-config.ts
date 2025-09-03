export const HUBSPOT_CONFIG = {
  API_BASE_URL: 'https://api.hubapi.com',
  FORMS_API_BASE_URL: 'https://api.hsforms.com',
  
  CUSTOM_PROPERTIES: {
    AI_EXPERIENCE_LEVEL: 'ai_experience_level',
    INTEREST_TYPE: 'interest_type', 
    LEAD_SOURCE: 'lead_source',
    LEAD_SCORE: 'lead_score',
  },
  
  LEAD_STATUSES: {
    NEW: 'NEW',
    MARKETING_QUALIFIED: 'MARKETING_QUALIFIED',
    SALES_QUALIFIED: 'SALES_QUALIFIED',
    OPPORTUNITY: 'OPPORTUNITY',
    CUSTOMER: 'CUSTOMER',
    UNQUALIFIED: 'UNQUALIFIED',
  },
  
  LIFECYCLE_STAGES: {
    SUBSCRIBER: 'subscriber',
    LEAD: 'lead',
    MARKETING_QUALIFIED_LEAD: 'marketingqualifiedlead',
    SALES_QUALIFIED_LEAD: 'salesqualifiedlead',
    OPPORTUNITY: 'opportunity',
    CUSTOMER: 'customer',
    EVANGELIST: 'evangelist',
    OTHER: 'other',
  },
  
  WORKFLOWS: {
    NEW_LEAD_QUALIFICATION: 'new_lead_qualification',
    CONSULTATION_BOOKING: 'consultation_booking',
    NURTURE_SEQUENCE: 'nurture_sequence',
    HIGH_INTENT_FOLLOWUP: 'high_intent_followup',
    CORPORATE_INQUIRY: 'corporate_inquiry',
    WELCOME_SERIES: 'welcome_series',
  },
  
  RATE_LIMITS: {
    CONTACTS_API: 100,
    FORMS_API: 50,
    WINDOW_MS: 10000,
  },
};

export const HUBSPOT_SETUP_INSTRUCTIONS = `
# HubSpot Integration Setup Instructions

## 1. Create HubSpot Developer Account
- Go to developers.hubspot.com
- Create a developer account
- Access your developer portal

## 2. Create Private App
- Navigate to Settings > Integrations > Private Apps
- Click "Create private app"
- Set name: "AI-Whisperers Website Integration" 
- Add scopes:
  - crm.objects.contacts.read
  - crm.objects.contacts.write
  - forms
  - automation

## 3. Environment Configuration
Add to your .env.local file:
\`\`\`
HUBSPOT_ACCESS_TOKEN=your_private_app_token_here
HUBSPOT_PORTAL_ID=your_portal_id_here
HUBSPOT_FORM_ID=your_form_id_here (optional)
\`\`\`

## 4. Custom Properties Setup
Create these custom contact properties in HubSpot:
- ai_experience_level (dropdown)
- interest_type (dropdown) 
- lead_source (single-line text)
- lead_score (number)

## 5. Webhook Configuration
- Go to Settings > Integrations > Webhooks
- Create webhook endpoint: https://yoursite.com/api/webhooks/hubspot
- Subscribe to: contact.creation, contact.propertyChange, deal.creation

## 6. Testing
- Test contact creation via the contact form
- Verify data appears in HubSpot CRM
- Check webhook delivery logs
`;

export interface HubSpotError {
  status: string;
  message: string;
  correlationId?: string;
  category?: string;
}

export function isHubSpotError(error: unknown): error is HubSpotError {
  return error && typeof error.status === 'string' && typeof error.message === 'string';
}