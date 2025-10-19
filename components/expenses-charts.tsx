"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { dummyMonthlyData, dummyCategoryData } from "@/lib/dummy-data"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ExpensesChartsProps {
  chartType: "monthly" | "category"
}

export function ExpensesCharts({ chartType }: ExpensesChartsProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const COLORS = [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // emerald
    "#f59e0b", // amber
    "#8b5cf6", // violet
    "#ec4899", // pink
  ]

  const textColor = theme === "dark" ? "#e5e7eb" : "#1f2937"
  const gridColor = theme === "dark" ? "#374151" : "#e5e7eb"

  if (!mounted) return null

  if (chartType === "monthly") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses Trend</CardTitle>
          <CardDescription>Your spending over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dummyMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                  border: `1px solid ${gridColor}`,
                  color: textColor,
                }}
              />
              <Legend wrapperStyle={{ color: textColor }} />
              <Bar dataKey="expenses" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
        <CardDescription>Breakdown of your current month spending</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
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
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                border: `1px solid ${gridColor}`,
                color: textColor,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
