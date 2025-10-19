"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Calendar, DollarSign, Lightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function FutureShockDetection() {
  const predictions = [
    {
      date: "March 15",
      type: "Cash Crunch",
      severity: "high",
      amount: 45000,
      reason: "Insurance payment + higher utility bills",
      recommendations: [
        "You've only used your Disney+ subscription once this month, consider canceling to save JMD $1,200/month",
        "Your gym membership hasn't been used in 2 weeks, pause it to save JMD $3,500/month",
        "Reduce dining out by 30% to free up JMD $7,500",
      ],
    },
    {
      date: "March 28",
      type: "Low Balance Alert",
      severity: "medium",
      amount: 20000,
      reason: "End of month with subscription renewals",
      recommendations: [
        "Netflix subscription renewing - you've watched only 2 hours this month, consider downgrading plan to save JMD $800",
        "Spotify Premium unused for 3 weeks, switch to free tier to save JMD $600/month",
        "Cancel Amazon Prime - no orders in 45 days, save JMD $2,500/month",
      ],
    },
  ]

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <CardTitle>Future Shock Detection</CardTitle>
        </div>
        <CardDescription>No more surprise money problems</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {predictions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No financial stress detected in the next 30 days</p>
          </div>
        ) : (
          predictions.map((prediction, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border space-y-3 ${
                prediction.severity === "high"
                  ? "bg-destructive/5 border-destructive/20"
                  : "bg-warning/5 border-warning/20"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-semibold">{prediction.date}</span>
                </div>
                <Badge variant={prediction.severity === "high" ? "destructive" : "secondary"}>
                  {prediction.severity === "high" ? "High Risk" : "Medium Risk"}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-1">{prediction.type}</h4>
                <p className="text-sm text-muted-foreground">{prediction.reason}</p>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                <DollarSign className="h-4 w-4 text-destructive" />
                <span className="font-semibold">Potential shortfall: JMD ${prediction.amount.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-accent" />
                  <p className="text-sm font-medium">Smart Recommendations:</p>
                </div>
                {prediction.recommendations.map((rec, idx) => (
                  <div key={idx} className="pl-6 text-sm text-muted-foreground">
                    <span className="text-accent mr-2">•</span>
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
