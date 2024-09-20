import React, { useEffect, useState } from "react";
import { Pie, PieChart, Label, Tooltip } from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartConfig,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
    visitors: {
        label: "Amount",
    },
    grocery: {
        label: "Grocery",
        color: "hsl(140, 100%, 40%)", // Green
    },
    shopping: {
        label: "Shopping",
        color: "hsl(210, 100%, 50%)", // Blue
    },
    bills: {
        label: "Bills",
        color: "hsl(0, 100%, 50%)", // Red
    },
    income: {
        label: "Income",
        color: "hsl(60, 100%, 50%)", // Yellow
    },
    selfTransfer: {
        label: "Self Transfer",
        color: "hsl(240, 100%, 50%)", // Purple
    },
};

export default function CategoriesChart() {
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPieData = async () => {
            try {
                const response = await fetch('/api/getpiedata');
                if (!response.ok) {
                    throw new Error('Failed to fetch pie data');
                }
                const data = await response.json();
                console.log(data); // Inspect the response
                setChartData(data.data); // Extracting the data array
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchPieData();
    }, []);

    
    if (error) {
        return <div>Error: {error}</div>;
    }

    const totalExpense = chartData.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <Card className="flex flex-col dark">
            <CardHeader className="items-center pb-0">
                <CardTitle>Category-wise Transactions</CardTitle>
                <CardDescription>Transaction Summary</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius={60}
                            outerRadius={80}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalExpense.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Expense
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                        <Tooltip 
                            formatter={(value, name) => [`${value} - ${name}`, name]} 
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total expense summary
                </div>
            </CardFooter>
        </Card>
    );
}
