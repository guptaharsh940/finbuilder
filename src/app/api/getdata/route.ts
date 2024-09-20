import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Fetch all transactions from the database
        const transactions = await prisma.transactions.findMany();

        // Return the transactions in the response
        return NextResponse.json({ transactions }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error fetching transactions' }, { status: 500 });
    }
}
