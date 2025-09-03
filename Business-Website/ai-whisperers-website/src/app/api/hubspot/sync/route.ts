import { NextRequest, NextResponse } from 'next/server';
import { hubspotSyncService } from '@/lib/hubspot-sync';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - API key required' },
        { status: 401 }
      );
    }

    const { action } = await request.json();

    switch (action) {
      case 'sync_all':
        const syncResult = await hubspotSyncService.performBidirectionalSync();
        return NextResponse.json({
          success: true,
          data: syncResult
        });

      case 'sync_from_hubspot':
        const hubspotContacts = await hubspotSyncService.syncContactsFromHubSpot();
        return NextResponse.json({
          success: true,
          data: { contacts: hubspotContacts, count: hubspotContacts.length }
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: sync_all, sync_from_hubspot' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('HubSpot sync error:', error);
    return NextResponse.json(
      { 
        error: 'Sync operation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - API key required' },
        { status: 401 }
      );
    }

    const hubspotContacts = await hubspotSyncService.syncContactsFromHubSpot();
    
    return NextResponse.json({
      success: true,
      data: {
        contacts: hubspotContacts,
        count: hubspotContacts.length,
        lastSync: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('HubSpot contacts retrieval error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve contacts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}