import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface HubSpotWebhookEvent {
  eventId: number;
  subscriptionId: number;
  portalId: number;
  appId: number;
  eventKey: string;
  subscriptionType: string;
  attemptNumber: number;
  objectId: number;
  changeSource: string;
  changeFlag: string;
  propertyName?: string;
  propertyValue?: string;
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const signature = headersList.get('x-hubspot-signature-v3');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing HubSpot signature' },
        { status: 401 }
      );
    }

    const body = await request.text();
    const events: HubSpotWebhookEvent[] = JSON.parse(body);

    for (const event of events) {
      await processHubSpotEvent(event);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('HubSpot webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function processHubSpotEvent(event: HubSpotWebhookEvent) {
  console.log('Processing HubSpot event:', {
    eventKey: event.eventKey,
    subscriptionType: event.subscriptionType,
    objectId: event.objectId,
    changeSource: event.changeSource
  });

  switch (event.subscriptionType) {
    case 'contact.creation':
      await handleNewContact(event);
      break;
    case 'contact.propertyChange':
      await handleContactUpdate(event);
      break;
    case 'deal.creation':
      await handleNewDeal(event);
      break;
    default:
      console.log(`Unhandled event type: ${event.subscriptionType}`);
  }
}

async function handleNewContact(event: HubSpotWebhookEvent) {
  console.log('New contact created:', event.objectId);
}

async function handleContactUpdate(event: HubSpotWebhookEvent) {
  console.log('Contact updated:', {
    contactId: event.objectId,
    property: event.propertyName,
    newValue: event.propertyValue
  });
}

async function handleNewDeal(event: HubSpotWebhookEvent) {
  console.log('New deal created:', event.objectId);
}