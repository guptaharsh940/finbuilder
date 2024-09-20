'use client'
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Define the type for a transaction
interface Transaction {
    id: number;
    description: string;
    type: 'debit' | 'credit';
    category: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
}

interface TransactionResponse {
    transactions: Transaction[];
}

const TransactionTable: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/getdata'); // Adjust the API endpoint if needed
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }
                const data: TransactionResponse = await response.json();
                setTransactions(data.transactions);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.type}</TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell className="text-right">{transaction.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TransactionTable;
