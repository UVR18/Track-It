"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GoalAccelerator() {
  // TODO: Replace with actual AI optimization suggestions
  const optimizations = [
    {
      goal: "Emergency Fund",
      current: "12 months away",
      optimized: "9 months away",
      suggestion: "Redirect $150/month from entertainment budget",
    },
    {
      goal: "Vacation Fund",
      current: "8 months away",
      optimized: "6 months away",
      suggestion: "Apply your average monthly surplus of $85",
    },
  ]

  return (
    <Card className="border-success/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-success" />
          <CardTitle>Goal Accelerator</CardTitle>
        </div>
        <CardDescription>Faster goals. Same lifestyle.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {optimizations.map((opt, index) => (
          <div key={index} className="p-4 rounded-lg border bg-success/5 border-success/10 space-y-3">
            <h4 className="font-semibold">{opt.goal}</h4>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex-1">
                <p className="text-muted-foreground">Current Timeline</p>
                <p className="font-medium">{opt.current}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-muted-foreground">Optimized Timeline</p>
                <p className="font-medium text-success">{opt.optimized}</p>
              </div>
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground mb-2">Suggested Optimization:</p>
              <p className="text-sm font-medium">{opt.suggestion}</p>
            </div>

            <Button size="sm" className="w-full">
              Apply Optimization
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
