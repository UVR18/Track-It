import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { type Target, Lightbulb } from "lucide-react"

const insights: Array<{
  id: number
  type: string
  title: string
  message: string
  severity: "success" | "warning" | "info"
  icon: typeof Target
}> = []
// TODO: Fetch goal insights from API endpoint (e.g., /api/goals/insights)

const tips: Array<{
  title: string
  description: string
  category: string
}> = []
// TODO: Fetch smart tips from API endpoint (e.g., /api/goals/tips)

const milestones: Array<{
  goal: string
  milestone: string
  date: string
  amount: string
}> = []
// TODO: Fetch recent milestones from API endpoint (e.g., /api/goals/milestones)

export function GoalInsights() {
  return (
    <div className="space-y-6">
      {/* Goal Alerts */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Goal Insights</CardTitle>
          <CardDescription>Important updates about your financial goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">📊</div>
              <p className="text-sm text-muted-foreground">No insights available yet</p>
            </div>
          ) : (
            insights.map((insight) => (
              <Alert
                key={insight.id}
                className={`border-l-4 ${
                  insight.severity === "success"
                    ? "border-l-success bg-success/5"
                    : insight.severity === "warning"
                      ? "border-l-warning bg-warning/5"
                      : "border-l-accent bg-accent/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <insight.icon
                    className={`h-4 w-4 mt-0.5 ${
                      insight.severity === "success"
                        ? "text-success"
                        : insight.severity === "warning"
                          ? "text-warning"
                          : "text-accent"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="font-medium text-sm">{insight.title}</div>
                    <AlertDescription className="text-sm">{insight.message}</AlertDescription>
                  </div>
                </div>
              </Alert>
            ))
          )}
        </CardContent>
      </Card>

      {/* Recent Milestones */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Milestones</CardTitle>
          <CardDescription>Your latest goal achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {milestones.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">🏆</div>
              <p className="text-sm text-muted-foreground">No milestones reached yet</p>
            </div>
          ) : (
            milestones.map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <div className="font-medium text-sm">{milestone.goal}</div>
                  <div className="text-xs text-muted-foreground">{milestone.date}</div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {milestone.milestone}
                  </Badge>
                  <div className="text-xs text-muted-foreground">{milestone.amount}</div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Smart Tips */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            Smart Tips
          </CardTitle>
          <CardDescription>Personalized advice to achieve your goals faster</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tips.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">💡</div>
              <p className="text-sm text-muted-foreground">No tips available yet</p>
            </div>
          ) : (
            tips.map((tip, index) => (
              <div key={index} className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {tip.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{tip.description}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
