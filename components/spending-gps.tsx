"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

export function SpendingGps() {
  // TODO: Replace with actual AI analysis of spending direction
  const direction = {
    current: "Moderate Spending",
    trend: "increasing",
    projection: "If current patterns continue, you'll exceed your monthly budget by $340 in 12 days",
    recommendations: [
      "Reduce dining out expenses by 20% to stay on track",
      "Your entertainment spending is 45% above average",
      "Consider postponing non-essential purchases this week",
    ],
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-primary" />
          <CardTitle>Spending GPS™</CardTitle>
        </div>
        <CardDescription>See your financial direction before you arrive there</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div>
            <p className="text-sm text-muted-foreground">Current Direction</p>
            <p className="text-2xl font-bold">{direction.current}</p>
          </div>
          {direction.trend === "increasing" ? (
            <TrendingUp className="h-8 w-8 text-destructive" />
          ) : (
            <TrendingDown className="h-8 w-8 text-success" />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <p className="font-medium">Projection</p>
              <p className="text-sm text-muted-foreground">{direction.projection}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium">Recommended Actions</p>
          {direction.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">{index + 1}</span>
              </div>
              <p className="text-sm">{rec}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
