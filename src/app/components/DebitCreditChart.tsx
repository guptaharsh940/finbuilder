import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

interface ChartDataItem {
    date: string;
    debit: number;
    credit: number;
}

export default function DebitCreditChart() {
    const [chartData, setChartData] = React.useState<ChartDataItem[]>([]);

    React.useEffect(() => {
        const fetchBarChartData = async () => {
            try {
                const response = await fetch('/api/getbarchartdata');
                if (!response.ok) {
                    throw new Error('Failed to fetch bar chart data');
                }
                const data: ChartDataItem[] = await response.json();

                setChartData(data);

                // // Calculate total debit and credit
                // const total = data.reduce(
                //     (acc, { debit, credit }) => {
                //         acc.debit += debit;
                //         acc.credit += credit;
                //         return acc;
                //     },
                //     { debit: 0, credit: 0 } as { debit: number; credit: number }
                // );

                // setTotalDebit(total.debit);
                // setTotalCredit(total.credit);
            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            }
        };

        fetchBarChartData();
    }, []);

    const chartConfig = {
        views: {
            label: "Page Views",
        },
        debit: {
            label: "Debit",
            color: "hsl(var(--chart-1))",
        },
        credit: {
            label: "Credit",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("debit");

    return (
        <Card >
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row ">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Day-wise Debits & Credits</CardTitle>
                    <CardDescription>
                        Showing total debit and credit day wise 
                    </CardDescription>
                </div>
                <div className="flex">
                {["debit", "credit"].map((key) => {
    const chart = key as keyof typeof chartConfig;
    return (
        <button
            key={chart}
            data-active={activeChart === chart}
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            onClick={() => setActiveChart(chart)}
        >
            <span className="text-xs text-muted-foreground">
                {chartConfig[chart].label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
                {chartData.reduce((acc, curr) => acc + (curr[chart as keyof ChartDataItem] as number), 0).toLocaleString()}
            </span>
        </button>
    );
})}

                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
