import { NextRequest, NextResponse } from 'next/server';
import { hubspotService } from '@/lib/hubspot';
import { hubspotWorkflowService } from '@/lib/hubspot-workflows';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    if (!formData.email || !formData.name || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, and message are required' },
        { status: 400 }
      );
    }

    const workflowResult = await hubspotWorkflowService.processNewLead(formData);
    
    let calendlyLink = '';
    if (formData.interest === 'consultation') {
      calendlyLink = hubspotWorkflowService.generateConsultationCalendlyLink(formData);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Contact submitted successfully',
      hubspotId: workflowResult.contactId,
      leadScore: workflowResult.leadScore,
      calendlyLink,
      qualification: workflowResult.leadScore >= 50 ? 'HIGH' : 
                   workflowResult.leadScore >= 25 ? 'MEDIUM' : 'LOW'
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to submit contact form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}