"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const categories: Array<{
  name: string
  amount: number
  budget: number
  transactions: number
  icon: string
  color: string
}> = []
// TODO: Fetch category breakdown from API endpoint (e.g., /api/reports/categories)

export function CategoryBreakdown() {
  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>Spending by category this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-3">📊</div>
            <p className="text-sm text-muted-foreground">No category data available</p>
          </div>
        ) : (
          categories.map((category, index) => {
            const percentage = (category.amount / category.budget) * 100
            const isOverBudget = percentage > 100

            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{category.name}</div>
                      <div className="text-xs text-muted-foreground">{category.transactions} transactions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">${category.amount.toFixed(2)}</div>
                    <Badge variant={isOverBudget ? "destructive" : "secondary"} className="text-xs">
                      {percentage.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={Math.min(percentage, 100)} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Budget: ${category.budget.toFixed(2)}</span>
                  <span className={isOverBudget ? "text-destructive font-medium" : ""}>
                    {isOverBudget ? "Over" : "Remaining"}: ${Math.abs(category.budget - category.amount).toFixed(2)}
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
