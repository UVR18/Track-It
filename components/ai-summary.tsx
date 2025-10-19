"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface AiSummaryProps {
  tab: "dashboard" | "budgets" | "goals" | "reports"
}

interface AISummaryProps {
  summary: string
  insights: string[]
}

export function AiSummary({ tab }: AiSummaryProps) {
  // TODO: Replace with actual AI-generated summary based on tab data
  const summaries = {
    dashboard:
      "Your spending is 15% higher than last month. Consider reviewing your dining expenses which increased by $234.",
    budgets:
      "You're on track with 4 out of 6 budgets. Your groceries budget needs attention - you've used 87% with 10 days remaining.",
    goals:
      "Great progress! You're ahead of schedule on your Emergency Fund goal. Consider increasing your monthly contribution to reach it 2 months earlier.",
    reports:
      "Your financial health score is improving. Smart spending patterns detected in transportation and utilities categories.",
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1 flex items-center gap-2">AI Insight</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{summaries[tab]}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AISummary({ summary, insights }: AISummaryProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1 flex items-center gap-2">AI Insight</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{summary}</p>
            {insights.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Key Insights:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
