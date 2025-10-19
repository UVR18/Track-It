"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SmartGuardrails() {
  // TODO: Replace with actual AI-powered interventions
  const interventions = [
    {
      type: "warning",
      title: "Unusual Spending Detected",
      description: "You've spent $180 on dining this week, 3x your usual amount",
      action: "Consider cooking at home for the next few days",
    },
    {
      type: "success",
      title: "Great Decision!",
      description: "You skipped an impulse purchase yesterday, saving $89",
      action: "Keep up the mindful spending",
    },
  ]

  return (
    <Card className="border-warning/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-warning" />
          <CardTitle>Smart Guardrails</CardTitle>
        </div>
        <CardDescription>AI that steps in before the mistake</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {interventions.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">All clear! No interventions needed.</p>
          </div>
        ) : (
          interventions.map((intervention, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                intervention.type === "warning" ? "bg-warning/5 border-warning/20" : "bg-success/5 border-success/20"
              }`}
            >
              <div className="flex items-start gap-3">
                {intervention.type === "warning" ? (
                  <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{intervention.title}</h4>
                    <Badge variant={intervention.type === "warning" ? "destructive" : "default"} className="text-xs">
                      {intervention.type === "warning" ? "Action Needed" : "Good Job"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{intervention.description}</p>
                  <p className="text-sm font-medium">{intervention.action}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
