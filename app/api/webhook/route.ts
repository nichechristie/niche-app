import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log webhook events for debugging
    console.log('Farcaster webhook received:', JSON.stringify(body, null, 2));

    // Handle different webhook event types
    const { type, data } = body;

    switch (type) {
      case 'miniapp.install':
        console.log('Miniapp installed by user:', data);
        break;
      case 'miniapp.uninstall':
        console.log('Miniapp uninstalled by user:', data);
        break;
      default:
        console.log('Unknown webhook type:', type);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    // Still return 200 to prevent retries
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 200 });
  }
}

// Handle GET requests (for health checks)
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'farcaster-webhook' });
}
