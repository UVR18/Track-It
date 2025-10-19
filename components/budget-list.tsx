"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { EditBudgetDialog } from "@/components/edit-budget-dialog"

const budgets: Array<{
  id: number
  category: string
  budget: number
  spent: number
  lastMonth: number
  color: string
  icon: string
}> = [
  { id: 1, category: "🏠 Rent or Mortgage", budget: 45000, spent: 45000, lastMonth: 45000, color: "blue", icon: "🏠" },
  { id: 2, category: "🍽️ Food & Groceries", budget: 25000, spent: 18750, lastMonth: 22000, color: "green", icon: "🍽️" },
  { id: 3, category: "🚍 Transportation", budget: 15000, spent: 12500, lastMonth: 14000, color: "yellow", icon: "🚍" },
  {
    id: 4,
    category: "📱 Utilities & Bills",
    budget: 12000,
    spent: 11200,
    lastMonth: 11500,
    color: "purple",
    icon: "📱",
  },
  { id: 5, category: "🏋️ Health & Fitness", budget: 8000, spent: 7500, lastMonth: 6500, color: "red", icon: "🏋️" },
  {
    id: 6,
    category: "💳 Savings & Investments",
    budget: 20000,
    spent: 20000,
    lastMonth: 20000,
    color: "teal",
    icon: "💳",
  },
  {
    id: 7,
    category: "🛍️ Personal & Entertainment",
    budget: 10000,
    spent: 8550,
    lastMonth: 9200,
    color: "pink",
    icon: "🛍️",
  },
]

export function BudgetList() {
  const [editingBudget, setEditingBudget] = useState<(typeof budgets)[0] | null>(null)

  const renderBudgetCard = (budget: (typeof budgets)[0]) => {
    const percentage = (budget.spent / budget.budget) * 100
    const isOverBudget = percentage > 100
    const trend = budget.spent > budget.lastMonth ? "up" : "down"
    const trendPercentage =
      budget.lastMonth > 0 ? Math.abs(((budget.spent - budget.lastMonth) / budget.lastMonth) * 100) : 0

    return (
      <div key={budget.id} className="p-4 rounded-lg border bg-card/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{budget.icon}</div>
            <div>
              <h3 className="font-semibold">{budget.category}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  JMD ${budget.spent.toLocaleString()} of JMD ${budget.budget.toLocaleString()}
                </span>
                <div className={`flex items-center gap-1 ${trend === "up" ? "text-destructive" : "text-success"}`}>
                  {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>{trendPercentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={isOverBudget ? "destructive" : percentage > 80 ? "secondary" : "outline"}>
              {percentage.toFixed(0)}%
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditingBudget(budget)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Budget
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Budget
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={Math.min(percentage, 100)} className="h-3" />
          <div className="flex justify-between text-xs">
            {isOverBudget ? (
              <span className="font-medium text-destructive">
                Over budget by JMD ${Math.abs(budget.budget - budget.spent).toLocaleString()}
              </span>
            ) : (
              <span className="font-medium text-success">
                On track - JMD ${Math.abs(budget.budget - budget.spent).toLocaleString()} remaining
              </span>
            )}
            <span className="text-muted-foreground">Last month: JMD ${budget.lastMonth.toLocaleString()}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Your Budgets</CardTitle>
          <CardDescription>Manage your spending limits for each category</CardDescription>
        </CardHeader>
        <CardContent>
          {budgets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">No budgets yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first budget to start tracking your spending
              </p>
              <Button>Create Budget</Button>
            </div>
          ) : (
            <div className="space-y-4">{budgets.map(renderBudgetCard)}</div>
          )}
        </CardContent>
      </Card>

      {editingBudget && (
        <EditBudgetDialog
          budget={editingBudget}
          open={!!editingBudget}
          onOpenChange={(open) => !open && setEditingBudget(null)}
        />
      )}
    </>
  )
}
