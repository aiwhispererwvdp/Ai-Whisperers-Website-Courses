# HubSpot CRM Integration Setup Guide

## Overview
This guide covers the complete setup for HubSpot CRM integration with your AI-Whisperers website, including lead capture forms, automated workflows, and contact synchronization.

## Prerequisites
- HubSpot account (free tier works)
- Developer access to your HubSpot portal
- Website deployed with environment variable access

## 1. HubSpot Developer Setup

### Create Private App
1. Go to [HubSpot Developer Portal](https://developers.hubspot.com/)
2. Navigate to Settings → Integrations → Private Apps
3. Click "Create private app"
4. App Name: "AI-Whisperers Website Integration"
5. Add required scopes:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write` 
   - `crm.objects.deals.read`
   - `crm.objects.deals.write`
   - `forms`
   - `automation`

### Get Credentials
- Copy the **Access Token** (starts with `pat-`)
- Note your **Portal ID** (found in account settings)

## 2. Environment Configuration

Add to your `.env.local` file:
```env
HUBSPOT_ACCESS_TOKEN=pat-your-private-app-token-here
HUBSPOT_PORTAL_ID=your-portal-id-here
HUBSPOT_FORM_ID=your-form-id-here
```

## 3. Custom Properties Setup

Create these custom contact properties in HubSpot:

### AI Experience Level
- **Internal Name**: `ai_experience_level`
- **Type**: Dropdown select
- **Options**:
  - complete-beginner: Complete Beginner
  - some-exposure: Some Exposure  
  - basic-technical: Basic Technical
  - intermediate: Intermediate
  - advanced: Advanced
  - business-leader: Business Leader

### Interest Type
- **Internal Name**: `interest_type`
- **Type**: Dropdown select
- **Options**:
  - individual: Individual Course
  - bundle: Course Bundle
  - corporate: Corporate Training
  - consultation: Consultation
  - partnership: Partnership
  - media: Media Inquiry
  - other: Other

### Additional Properties
- **Lead Source**: `lead_source` (Single-line text)
- **Lead Score**: `lead_score` (Number, 0-100)

## 4. Workflow Setup

### Create Automated Workflows

#### New Lead Qualification Workflow
1. Trigger: Contact created with lead_source = "Website Contact Form"
2. Actions:
   - Send welcome email
   - Create task for sales team
   - Set lifecycle stage to "Lead"

#### High-Intent Lead Workflow  
1. Trigger: Contact created with lead_score ≥ 50
2. Actions:
   - Send immediate notification to sales
   - Create high-priority task
   - Enroll in consultation booking sequence

#### Consultation Booking Sequence
1. Trigger: interest_type = "consultation"
2. Actions:
   - Send consultation booking email with Calendly link
   - Follow up in 2 days if no booking
   - Create task to manually follow up

## 5. Webhook Configuration

### Setup Webhook Endpoint
1. Go to Settings → Integrations → Webhooks
2. Create new subscription
3. Target URL: `https://yoursite.com/api/webhooks/hubspot`
4. Subscribe to events:
   - contact.creation
   - contact.propertyChange
   - deal.creation

## 6. Testing Integration

### Test Contact Creation
```bash
curl -X POST https://yoursite.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "interest": "consultation",
    "experience": "intermediate",
    "message": "Test message"
  }'
```

### Test Sync Operation
```bash
curl -X POST https://yoursite.com/api/hubspot/sync \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"action": "sync_all"}'
```

## 7. Implementation Details

### Files Created/Modified
- `src/lib/hubspot.ts` - Core HubSpot service
- `src/lib/hubspot-workflows.ts` - Automated workflow logic
- `src/lib/hubspot-sync.ts` - Contact synchronization
- `src/app/api/contact/route.ts` - Form submission endpoint
- `src/app/api/webhooks/hubspot/route.ts` - Webhook handler
- `src/app/api/hubspot/sync/route.ts` - Manual sync endpoint
- `src/components/contact/ContactForm.tsx` - Updated form with HubSpot integration

### Features Implemented
✅ Lead capture form integration  
✅ Automated lead scoring (0-100 scale)
✅ Lead qualification workflows
✅ Contact creation/updates
✅ Webhook event handling
✅ Bidirectional contact sync
✅ Consultation booking automation
✅ Real-time lead notifications

## 8. Lead Scoring Logic

### Scoring Criteria
- **Experience Level**: 5-30 points
  - Complete Beginner: 5 points
  - Some Exposure: 10 points  
  - Basic Technical: 15 points
  - Intermediate: 20 points
  - Advanced: 25 points
  - Business Leader: 30 points

- **Interest Type**: 5-40 points
  - Individual: 10 points
  - Bundle: 15 points
  - Corporate: 35 points
  - Consultation: 20 points
  - Partnership: 40 points
  - Media/Other: 5 points

- **Additional Factors**:
  - Has Company: +10 points
  - Leadership Role: +15 points

### Lead Qualification
- **Score ≥ 50**: High-value lead (immediate follow-up)
- **Score 25-49**: Marketing qualified (nurture sequence)
- **Score < 25**: New lead (welcome series)

## 9. Maintenance

### Regular Tasks
- Monitor webhook delivery logs
- Review lead scoring accuracy
- Update workflow triggers based on conversion data
- Sync contacts weekly (can be automated)

### Troubleshooting
- Check HubSpot API logs in your developer portal
- Monitor rate limits (100 requests per 10 seconds)
- Verify webhook endpoint is accessible
- Test form submissions in development

## 10. Next Steps

### Recommended Enhancements
- Add email automation sequences
- Implement deal pipeline automation  
- Create custom dashboards
- Add A/B testing for forms
- Integrate with marketing automation

### Analytics Integration
- Track conversion rates by lead source
- Monitor form completion rates
- Analyze lead quality by experience level
- Measure consultation booking rates

---

**Setup Complete!** Your HubSpot integration is ready for lead capture, automated workflows, and contact synchronization.