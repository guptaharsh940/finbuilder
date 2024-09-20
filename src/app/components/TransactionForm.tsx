"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// 1. Define schema using zod
const formSchema = z.object({
    description: z.string().min(5, {
        message: "Description must be at least 5 characters.",
    }),
    type: z.enum(['debit', 'credit'], {
        errorMap: () => ({ message: "Please select either debit or credit." })
    }),
    category: z.enum(['grocery', 'shopping', 'bills', 'income', 'self transfer'], {
        errorMap: () => ({ message: "Please select a valid category." })
    }),
    amount: z.string().transform((v) => Number(v)||0)
})

export default function TransactionForm() {
    // 2. Initialize form with default values and zod validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            type: "debit",
            category: "grocery",
            amount: 0,
        },
    })

    // 3. Define a submit handler
    async function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(JSON.stringify(values));
        try {
            const response = await fetch('/api/adddata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),  // Send form data as JSON
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data added:', data);
            } else {
                console.error('Failed to add data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Description Field */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter description" {...field} />
                            </FormControl>
                            <FormDescription>
                                A short description of the transaction.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Type (Debit/Credit) Field */}
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="debit">Debit</SelectItem>
                                    <SelectItem value="credit">Credit</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Category Field */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="grocery">Grocery</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="bills">Bills</SelectItem>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="self transfer">Self Transfer</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Amount Field */}
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
