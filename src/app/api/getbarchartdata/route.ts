// pages/api/getbarchartdata.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Fetch transactions with createdAt, amount, and type
        const transactions = await prisma.transactions.findMany({
            select: {
                createdAt: true,
                amount: true,
                type: true, // Assuming 'type' is either 'debit' or 'credit'
            },
        });

        // Aggregate data by date
        const chartData: Record<string, { debit: number; credit: number }> = {};

        transactions.forEach(({ createdAt, amount, type }) => {
            const date = new Date(createdAt).toISOString().split('T')[0]; // Get YYYY-MM-DD

            if (!chartData[date]) {
                chartData[date] = { debit: 0, credit: 0 };
            }

            if (type === 'debit') {
                chartData[date].debit += amount;
            } else if (type === 'credit') {
                chartData[date].credit += amount;
            }
        });

        // Convert chartData to array format
        const result = Object.entries(chartData).map(([date, { debit, credit }]) => ({
            date,
            debit,
            credit,
        }));

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error fetching bar chart data' }, { status: 500 });
    }
}
