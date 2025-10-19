"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { dummyMonthlyData, dummyCategoryData, dummyStats } from "@/lib/dummy-data"
import { TrendingUp, Wallet, Target, PiggyBank } from "lucide-react"

export function FinancialOverviewCharts() {
  const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dummyStats.totalBalance.toLocaleString()} JMD</p>
            <p className="text-xs text-muted-foreground mt-1">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <TrendingUp className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dummyStats.monthlyExpenses.toLocaleString()} JMD</p>
            <p className="text-xs text-muted-foreground mt-1">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
              <Target className="h-4 w-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dummyStats.budgetRemaining.toLocaleString()} JMD</p>
            <p className="text-xs text-muted-foreground mt-1">35% of monthly budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
              <PiggyBank className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dummyStats.savingsGoal.toLocaleString()} JMD</p>
            <p className="text-xs text-muted-foreground mt-1">On track for this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Trend</CardTitle>
            <CardDescription>Your expenses over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Distribution of your expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dummyCategoryData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {dummyCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
