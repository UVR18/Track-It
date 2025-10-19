"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

const trends: Array<{
  category: string
  currentMonth: number
  lastMonth: number
  trend: "up" | "down" | "stable"
  change: number
  insight: string
}> = []

export function TrendAnalysis() {
  const [trendsData, setTrendsData] = useState(trends)

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await axios.get("/api/reports/trends")
        setTrendsData(response.data)
      } catch (error) {
        console.error("Error fetching trend data:", error)
      }
    }

    fetchTrends()
  }, [])

  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Trend Analysis</CardTitle>
        <CardDescription>Month-over-month spending changes</CardDescription>
      </CardHeader>
      <CardContent>
        {trendsData.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-3">📈</div>
            <p className="text-sm text-muted-foreground">No trend data available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trendsData.map((trend, index) => {
              const TrendIcon = trend.trend === "up" ? TrendingUp : trend.trend === "down" ? TrendingDown : Minus

              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        trend.trend === "up"
                          ? "bg-destructive/10"
                          : trend.trend === "down"
                            ? "bg-success/10"
                            : "bg-muted/50"
                      }`}
                    >
                      <TrendIcon
                        className={`h-4 w-4 ${
                          trend.trend === "up"
                            ? "text-destructive"
                            : trend.trend === "down"
                              ? "text-success"
                              : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{trend.category}</div>
                      <div className="text-xs text-muted-foreground">{trend.insight}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-sm">${trend.currentMonth.toFixed(2)}</div>
                    <div className="flex items-center gap-1">
                      <Badge
                        variant={
                          trend.trend === "up" ? "destructive" : trend.trend === "down" ? "secondary" : "outline"
                        }
                        className="text-xs"
                      >
                        {trend.change > 0 ? "+" : ""}
                        {trend.change.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
