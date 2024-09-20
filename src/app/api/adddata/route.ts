import { PrismaClient, TransactionType } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        // Parse the incoming request JSON body
        const body = await req.json();

        // Extract transaction details from the body
        const { description, type, category, amount } = body;

        // Validate that the required fields are present
        if (!description || !type || !category || typeof amount !== 'number') {
            return NextResponse.json({ error: 'Missing or invalid fields in the payload.' }, { status: 400 });
        }

        // Insert a single transaction using Prisma
        const createdTransaction = await prisma.transactions.create({
            data: {
                description: description,
                type: type as TransactionType,
                category: category,
                amount: amount,
            },
        });

        // Return success response
        return NextResponse.json({ message: 'Transaction added successfully', transaction: createdTransaction }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error creating transaction' }, { status: 500 });
    }
}
