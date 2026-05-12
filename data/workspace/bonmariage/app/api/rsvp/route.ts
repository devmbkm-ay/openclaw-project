import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, attending, meal, message } = body;

    if (!name || !email || typeof attending === 'undefined') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newRsvp = await prisma.rsvp.create({
      data: {
        name,
        email,
        attending: attending === 'yes' || attending === true, // Handle form value vs boolean
        meal: meal || null,
        message: message || null,
      },
    });

    return NextResponse.json(newRsvp, { status: 201 });
  } catch (error) {
    console.error('RSVP submission error:', error);
    // Handle potential unique constraint errors, e.g., duplicate email
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return NextResponse.json({ error: 'This email has already been used to RSVP.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'An error occurred while submitting your RSVP.' }, { status: 500 });
  }
}

export async function GET() {
    try {
        const rsvps = await prisma.rsvp.findMany({
            orderBy: {
                createdAt: 'desc',
            }
        });
        return NextResponse.json(rsvps);
    } catch (error) {
        console.error('Failed to fetch RSVPs:', error);
        return NextResponse.json({ error: 'Failed to fetch RSVPs.' }, { status: 500 });
    }
}
