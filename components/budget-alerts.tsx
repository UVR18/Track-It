import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import type { AlertTriangle } from "lucide-react"

const alerts: Array<{
  id: number
  type: string
  category: string
  message: string
  severity: "high" | "medium" | "low"
  icon: typeof AlertTriangle
}> = []
// TODO: Fetch budget alerts from API endpoint (e.g., /api/budgets/alerts)

const recommendations: Array<{
  title: string
  description: string
}> = []
// TODO: Fetch AI recommendations from API endpoint (e.g., /api/budgets/recommendations)

export function BudgetAlerts() {
  return (
    <div className="space-y-6">
      {/* Alerts */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Budget Alerts</CardTitle>
          <CardDescription>Important notifications about your spending</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">✅</div>
              <p className="text-sm text-muted-foreground">No alerts at this time</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <Alert
                key={alert.id}
                className={`border-l-4 ${
                  alert.severity === "high"
                    ? "border-l-destructive bg-destructive/5"
                    : alert.severity === "medium"
                      ? "border-l-warning bg-warning/5"
                      : "border-l-success bg-success/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <alert.icon
                    className={`h-4 w-4 mt-0.5 ${
                      alert.severity === "high"
                        ? "text-destructive"
                        : alert.severity === "medium"
                          ? "text-warning"
                          : "text-success"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {alert.category}
                      </Badge>
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <AlertDescription className="text-sm">{alert.message}</AlertDescription>
                  </div>
                </div>
              </Alert>
            ))
          )}
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Smart Recommendations</CardTitle>
          <CardDescription>AI-powered insights to improve your budgeting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">💡</div>
              <p className="text-sm text-muted-foreground">No recommendations available yet</p>
            </div>
          ) : (
            recommendations.map((rec, index) => (
              <div key={index} className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                <p className="text-xs text-muted-foreground">{rec.description}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
