import { NextRequest, NextResponse } from 'next/server';
import { sendServerSideEvent } from './../../lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_name, event_data, user_id } = body;

    await sendServerSideEvent({
      event_name,
      event_data,
      user_id
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
