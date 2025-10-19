"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const monthlyData: Array<{ month: string; amount: number; budget: number }> = []
const weeklyData: Array<{ week: string; amount: number }> = []
const categoryData: Array<{ category: string; amount: number; percentage: number }> = []
// TODO: Fetch analytics data from API endpoints:
// - /api/reports/monthly
// - /api/reports/weekly
// - /api/reports/categories

export function SpendingAnalytics() {
  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Spending Analytics</CardTitle>
        <CardDescription>Detailed analysis of your spending patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Breakdown</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <div className="h-80">
              {monthlyData.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-3">📊</div>
                    <p className="text-sm text-muted-foreground">No monthly data available</p>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value, name) => [`$${value}`, name === "amount" ? "Spent" : "Budget"]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="budget"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={1}
                      fill="url(#colorBudget)"
                      name="Budget"
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorAmount)"
                      name="Spent"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <div className="h-80">
              {weeklyData.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-3">📊</div>
                    <p className="text-sm text-muted-foreground">No weekly data available</p>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis
                      dataKey="week"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`$${value}`, "Amount"]}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>

          <TabsContent value="category" className="space-y-4">
            {categoryData.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-3xl mb-3">📊</div>
                <p className="text-sm text-muted-foreground">No category data available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-accent" style={{ opacity: 1 - index * 0.15 }} />
                      <div>
                        <div className="font-medium">{category.category}</div>
                        <div className="text-sm text-muted-foreground">{category.percentage}% of total</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${category.amount.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
