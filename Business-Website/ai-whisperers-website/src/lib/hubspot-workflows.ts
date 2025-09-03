import { hubspotService } from './hubspot';

interface LeadScoringCriteria {
  experience: string;
  interest: string;
  company?: string;
  role?: string;
}

interface WorkflowAction {
  type: 'email' | 'task' | 'update_property' | 'enroll_sequence';
  data: Record<string, any>;
}

class HubSpotWorkflowService {
  private readonly workflows = {
    'new_lead_qualification': 'workflow_id_here',
    'consultation_booking': 'workflow_id_here',
    'nurture_sequence': 'workflow_id_here',
    'high_intent_followup': 'workflow_id_here',
  };

  calculateLeadScore(criteria: LeadScoringCriteria): number {
    let score = 0;

    switch (criteria.experience) {
      case 'complete-beginner': score += 5; break;
      case 'some-exposure': score += 10; break;
      case 'basic-technical': score += 15; break;
      case 'intermediate': score += 20; break;
      case 'advanced': score += 25; break;
      case 'business-leader': score += 30; break;
    }

    switch (criteria.interest) {
      case 'individual': score += 10; break;
      case 'bundle': score += 15; break;
      case 'corporate': score += 35; break;
      case 'consultation': score += 20; break;
      case 'partnership': score += 40; break;
      case 'media': score += 5; break;
      case 'other': score += 5; break;
    }

    if (criteria.company) score += 10;
    if (criteria.role?.toLowerCase().includes('director') || 
        criteria.role?.toLowerCase().includes('manager') ||
        criteria.role?.toLowerCase().includes('ceo') ||
        criteria.role?.toLowerCase().includes('cto')) {
      score += 15;
    }

    return Math.min(score, 100);
  }

  determineLeadActions(score: number, criteria: LeadScoringCriteria): WorkflowAction[] {
    const actions: WorkflowAction[] = [];

    if (score >= 50) {
      actions.push({
        type: 'update_property',
        data: { hs_lead_status: 'QUALIFIED', lead_score: score }
      });
      
      actions.push({
        type: 'task',
        data: { 
          subject: 'High-value lead requires immediate follow-up',
          notes: `Lead score: ${score}. Interest: ${criteria.interest}. Experience: ${criteria.experience}.`,
          priority: 'HIGH'
        }
      });

      if (criteria.interest === 'corporate' || criteria.interest === 'partnership') {
        actions.push({
          type: 'enroll_sequence',
          data: { sequence: 'enterprise_nurture' }
        });
      } else if (criteria.interest === 'consultation') {
        actions.push({
          type: 'enroll_sequence',
          data: { sequence: 'consultation_booking' }
        });
      }
    } else if (score >= 25) {
      actions.push({
        type: 'update_property',
        data: { hs_lead_status: 'MARKETING_QUALIFIED', lead_score: score }
      });
      
      actions.push({
        type: 'enroll_sequence',
        data: { sequence: 'nurture_sequence' }
      });
    } else {
      actions.push({
        type: 'update_property',
        data: { hs_lead_status: 'NEW', lead_score: score }
      });
      
      actions.push({
        type: 'enroll_sequence',
        data: { sequence: 'welcome_series' }
      });
    }

    return actions;
  }

  async processNewLead(contactData: Record<string, any>) {
    try {
      const criteria: LeadScoringCriteria = {
        experience: contactData.experience,
        interest: contactData.interest,
        company: contactData.company,
        role: contactData.role,
      };

      const leadScore = this.calculateLeadScore(criteria);
      const actions = this.determineLeadActions(leadScore, criteria);

      const hubspotData = hubspotService.mapFormDataToHubSpot({
        ...contactData,
        lead_score: leadScore.toString(),
      });

      const contact = await hubspotService.createOrUpdateContact(hubspotData);

      console.log('Lead processed:', {
        contactId: contact.id,
        score: leadScore,
        actions: actions.length,
        qualification: leadScore >= 50 ? 'HIGH' : leadScore >= 25 ? 'MEDIUM' : 'LOW'
      });

      return {
        success: true,
        contactId: contact.id,
        leadScore,
        actions
      };

    } catch (error) {
      console.error('Lead processing error:', error);
      throw error;
    }
  }

  generateConsultationCalendlyLink(contactData: Record<string, string>): string {
    const params = new URLSearchParams({
      name: contactData.name,
      email: contactData.email,
      a1: contactData.experience,
      a2: contactData.interest
    });

    return `https://calendly.com/ai-whisperers/consultation?${params.toString()}`;
  }
}

export const hubspotWorkflowService = new HubSpotWorkflowService();