import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp } from "lucide-react"

const overallStats = {
  totalBudget: 150000,
  totalSpent: 87500,
  budgetsOnTrack: 4,
  budgetsOverLimit: 2,
}

export function BudgetOverview() {
  const spentPercentage = overallStats.totalBudget > 0 ? (overallStats.totalSpent / overallStats.totalBudget) * 100 : 0
  const remaining = overallStats.totalBudget - overallStats.totalSpent

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Current Budget</CardTitle>
          <div className="p-2 bg-accent/10 rounded-lg">
            <TrendingUp className="h-4 w-4 text-accent" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overallStats.totalBudget.toLocaleString()} JMD</div>
          <div className="space-y-2 mt-3">
            <Progress value={spentPercentage} className="h-2" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {overallStats.totalSpent.toLocaleString()} JMD spent ({spentPercentage.toFixed(1)}%)
              </span>
              <span className="font-medium text-success">{remaining.toLocaleString()} JMD left</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Budget Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">On Track</span>
              <span className="text-lg font-bold text-success">{overallStats.budgetsOnTrack}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Over Budget</span>
              <span className="text-lg font-bold text-destructive">{overallStats.budgetsOverLimit}</span>
            </div>
            <div className="pt-2 border-t">
              {overallStats.budgetsOverLimit > 0 ? (
                <p className="text-sm font-medium text-destructive">⚠️ You have budgets that need attention</p>
              ) : (
                <p className="text-sm font-medium text-success">✓ All budgets are on track</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
