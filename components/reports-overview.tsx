"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"
import { useState } from "react"

const stats = {
  totalSpent: 0,
  avgDaily: 0,
  highestDay: 0,
  lowestDay: 0,
  previousPeriod: {
    totalSpent: 0,
    avgDaily: 0,
  },
}
// TODO: Fetch reports overview from API endpoint (e.g., /api/reports/overview?range=this-month)

export function ReportsOverview() {
  const [timeRange, setTimeRange] = useState("this-month")

  const spentChange =
    stats.previousPeriod.totalSpent > 0
      ? ((stats.totalSpent - stats.previousPeriod.totalSpent) / stats.previousPeriod.totalSpent) * 100
      : 0
  const avgChange =
    stats.previousPeriod.avgDaily > 0
      ? ((stats.avgDaily - stats.previousPeriod.avgDaily) / stats.previousPeriod.avgDaily) * 100
      : 0

  return (
    <div className="space-y-4">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Spending Summary</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            <SelectItem value="last-6-months">Last 6 Months</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            <div className="p-2 bg-accent/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <div className={`flex items-center gap-1 ${spentChange < 0 ? "text-success" : "text-destructive"}`}>
                {spentChange < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                <span>{Math.abs(spentChange).toFixed(1)}%</span>
              </div>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Average</CardTitle>
            <div className="p-2 bg-warning/10 rounded-lg">
              <Calendar className="h-4 w-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgDaily.toFixed(2)}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <div className={`flex items-center gap-1 ${avgChange < 0 ? "text-success" : "text-destructive"}`}>
                {avgChange < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                <span>{Math.abs(avgChange).toFixed(1)}%</span>
              </div>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Highest Day</CardTitle>
            <div className="p-2 bg-destructive/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.highestDay.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-2">-</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lowest Day</CardTitle>
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingDown className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.lowestDay.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-2">-</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
