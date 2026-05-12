import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET a single RSVP by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const rsvp = await prisma.rsvp.findUnique({
            where: { id },
        });

        if (!rsvp) {
            return NextResponse.json({ error: 'RSVP not found' }, { status: 404 });
        }

        return NextResponse.json(rsvp);
    } catch (error) {
        console.error('Failed to fetch RSVP:', error);
        return NextResponse.json({ error: 'Failed to fetch RSVP.' }, { status: 500 });
    }
}


// PATCH (update) a single RSVP by ID
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const body = await request.json();
        const { name, email, attending, meal, message } = body;

        const updatedRsvp = await prisma.rsvp.update({
            where: { id },
            data: {
                name,
                email,
                attending,
                meal,
                message,
            },
        });

        return NextResponse.json(updatedRsvp);
    } catch (error) {
        console.error('Failed to update RSVP:', error);
        // P2025 is Prisma's code for "record to update not found"
        if (error.code === 'P2025') {
             return NextResponse.json({ error: 'RSVP not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to update RSVP.' }, { status: 500 });
    }
}

// DELETE a single RSVP by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        await prisma.rsvp.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 }); // No Content
    } catch (error) {
        console.error('Failed to delete RSVP:', error);
         if (error.code === 'P2025') {
             return NextResponse.json({ error: 'RSVP not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to delete RSVP.' }, { status: 500 });
    }
}
