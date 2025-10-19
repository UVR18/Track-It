"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { dummyCategoryData } from "@/lib/dummy-data"

export function ExpenseCharts() {
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Analysis</CardTitle>
        <CardDescription>View your spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="h-[300px] mt-6">
            {dummyCategoryData.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No expense data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dummyCategoryData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </TabsContent>

          <TabsContent value="pie" className="h-[300px] mt-6">
            {dummyCategoryData.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No expense data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dummyCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {dummyCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
