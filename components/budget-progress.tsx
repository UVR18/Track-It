import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const budgets: Array<{
  category: string
  spent: number
  budget: number
  color: string
}> = []
// TODO: Fetch budget progress from API endpoint (e.g., /api/budgets/progress)

export function BudgetProgress() {
  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
        <CardDescription>Track your spending against budgets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-3">📈</div>
            <p className="text-sm text-muted-foreground">No budget data available</p>
          </div>
        ) : (
          budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.budget) * 100
            const isOverBudget = percentage > 100

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${budget.color}`} />
                    <span className="font-medium text-sm">{budget.category}</span>
                  </div>
                  <Badge variant={isOverBudget ? "destructive" : "secondary"} className="text-xs">
                    ${budget.spent.toFixed(2)} / ${budget.budget.toFixed(2)}
                  </Badge>
                </div>
                <Progress value={Math.min(percentage, 100)} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{percentage.toFixed(1)}% used</span>
                  <span className={isOverBudget ? "text-destructive font-medium" : ""}>
                    ${(budget.budget - budget.spent).toFixed(2)} remaining
                  </span>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
