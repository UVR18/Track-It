import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, Calendar, DollarSign } from "lucide-react"

const stats = {
  totalGoals: 0,
  activeGoals: 0,
  completedGoals: 0,
  totalTargetAmount: 0,
  totalSavedAmount: 0,
  averageProgress: 0,
}
// TODO: Fetch goals overview stats from API endpoint (e.g., /api/goals/overview)

export function GoalsOverview() {
  const progressPercentage = stats.totalTargetAmount > 0 ? (stats.totalSavedAmount / stats.totalTargetAmount) * 100 : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Goals</CardTitle>
          <div className="p-2 bg-accent/10 rounded-lg">
            <Target className="h-4 w-4 text-accent" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalGoals}</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <span>{stats.activeGoals} active</span>
            <span>•</span>
            <span>{stats.completedGoals} completed</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Progress</CardTitle>
          <div className="p-2 bg-success/10 rounded-lg">
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{progressPercentage.toFixed(1)}%</div>
          <div className="space-y-2 mt-2">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              ${stats.totalSavedAmount.toLocaleString()} of ${stats.totalTargetAmount.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Average Progress</CardTitle>
          <div className="p-2 bg-warning/10 rounded-lg">
            <Calendar className="h-4 w-4 text-warning" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageProgress}%</div>
          <p className="text-xs text-muted-foreground mt-2">Across all active goals</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Savings</CardTitle>
          <div className="p-2 bg-accent/10 rounded-lg">
            <DollarSign className="h-4 w-4 text-accent" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$0</div>
          <p className="text-xs text-muted-foreground mt-2">Allocated to goals</p>
        </CardContent>
      </Card>
    </div>
  )
}
