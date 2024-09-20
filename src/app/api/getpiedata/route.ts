
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Fetch distinct categories and sum of amounts
        const pieData = await prisma.transactions.groupBy({
            by: ['category'],
            _sum: {
                amount: true,
            },
        });

        // Transform the data to match the expected format for the pie chart
        const formattedData = pieData.map((item) => ({
            category: item.category,
            amount: item._sum.amount,
            fill: getColorByCategory(item.category), // You can create a function to map categories to colors
        }));

        // Return the formatted data in the response
        return NextResponse.json({ data: formattedData }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error fetching pie data' }, { status: 500 });
    }
}

// Function to get a color based on the category
const getColorByCategory = (category: string) => {
    switch (category) {
        case 'grocery':
            return 'var(--color-grocery)';
        case 'shopping':
            return 'var(--color-shopping)';
        case 'bills':
            return 'var(--color-bills)';
        case 'income':
            return 'var(--color-income)';
        case 'self transfer':
            return 'var(--color-self-transfer)';
        default:
            return 'var(--color-default)';
    }
};
