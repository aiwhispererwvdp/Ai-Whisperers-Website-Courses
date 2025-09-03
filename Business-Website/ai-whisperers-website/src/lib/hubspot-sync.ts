import { hubspotService } from './hubspot';

interface SyncContact {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  jobtitle?: string;
  hs_lead_status?: string;
  lifecyclestage?: string;
  lastmodifieddate?: string;
}

interface SyncResult {
  processed: number;
  errors: number;
  created: number;
  updated: number;
  details: Array<{
    email: string;
    action: 'created' | 'updated' | 'error';
    error?: string;
  }>;
}

class HubSpotSyncService {
  async syncContactsFromHubSpot(): Promise<SyncContact[]> {
    try {
      const response = await hubspotService['makeRequest']('/crm/v3/objects/contacts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        },
      });

      return response.results || [];
    } catch (error) {
      console.error('Error syncing contacts from HubSpot:', error);
      throw error;
    }
  }

  async syncContactsToHubSpot(localContacts: Record<string, any>[]): Promise<SyncResult> {
    const result: SyncResult = {
      processed: 0,
      errors: 0,
      created: 0,
      updated: 0,
      details: []
    };

    for (const contact of localContacts) {
      try {
        result.processed++;
        
        const existingContact = await hubspotService.findContactByEmail(contact.email);
        
        if (existingContact) {
          await hubspotService.updateContact(contact.email, contact);
          result.updated++;
          result.details.push({
            email: contact.email,
            action: 'updated'
          });
        } else {
          await hubspotService.createContact(contact);
          result.created++;
          result.details.push({
            email: contact.email,
            action: 'created'
          });
        }
      } catch (error) {
        result.errors++;
        result.details.push({
          email: contact.email,
          action: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return result;
  }

  async performBidirectionalSync(): Promise<{
    toHubSpot: SyncResult;
    fromHubSpot: SyncContact[];
    summary: string;
  }> {
    try {
      const hubspotContacts = await this.syncContactsFromHubSpot();
      
      const localContactsData = this.getLocalContactsForSync();
      const syncToHubSpotResult = await this.syncContactsToHubSpot(localContactsData);

      const summary = `Sync completed: ${syncToHubSpotResult.created} created, ${syncToHubSpotResult.updated} updated, ${syncToHubSpotResult.errors} errors. Retrieved ${hubspotContacts.length} contacts from HubSpot.`;

      return {
        toHubSpot: syncToHubSpotResult,
        fromHubSpot: hubspotContacts,
        summary
      };
    } catch (error) {
      console.error('Bidirectional sync error:', error);
      throw error;
    }
  }

  private getLocalContactsForSync(): Record<string, any>[] {
    return [];
  }

  async enrollInWorkflow(contactEmail: string, workflowId: string): Promise<void> {
    try {
      const contact = await hubspotService.findContactByEmail(contactEmail);
      if (!contact) {
        throw new Error('Contact not found in HubSpot');
      }

      const enrollmentData = {
        contactEmail: contactEmail,
        workflowId: workflowId
      };

      console.log('Enrolling contact in workflow:', enrollmentData);
      
    } catch (error) {
      console.error('Workflow enrollment error:', error);
      throw error;
    }
  }

  async createAutomationTrigger(triggerType: string, contactData: Record<string, string>): Promise<void> {
    switch (triggerType) {
      case 'consultation_request':
        await this.enrollInWorkflow(contactData.email, this.workflows['consultation_booking']);
        break;
      case 'corporate_inquiry':
        await this.enrollInWorkflow(contactData.email, this.workflows['high_intent_followup']);
        break;
      case 'general_inquiry':
        await this.enrollInWorkflow(contactData.email, this.workflows['nurture_sequence']);
        break;
      default:
        await this.enrollInWorkflow(contactData.email, this.workflows['new_lead_qualification']);
    }
  }

  private workflows = {
    'new_lead_qualification': 'workflow_new_lead_qualification',
    'consultation_booking': 'workflow_consultation_booking', 
    'nurture_sequence': 'workflow_nurture_sequence',
    'high_intent_followup': 'workflow_high_intent_followup',
  };
}

export const hubspotSyncService = new HubSpotSyncService();