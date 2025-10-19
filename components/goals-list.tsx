"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Calendar, DollarSign, Target } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { EditGoalDialog } from "@/components/edit-goal-dialog"
import { format, differenceInDays } from "date-fns"

const goals: Array<{
  id: number
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  targetDate: Date
  category: string
  priority: "high" | "medium" | "low"
  monthlyContribution: number
  icon: string
  color: string
}> = []
// TODO: Fetch goals from API endpoint (e.g., /api/goals)

export function GoalsList() {
  const [editingGoal, setEditingGoal] = useState<(typeof goals)[0] | null>(null)

  return (
    <>
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Your Financial Goals</CardTitle>
          <CardDescription>Track progress towards your financial objectives</CardDescription>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">No goals yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Set your first financial goal to start tracking your progress
              </p>
              <Button>Create Goal</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {goals.map((goal) => {
                const percentage = (goal.currentAmount / goal.targetAmount) * 100
                const isCompleted = percentage >= 100
                const daysRemaining = differenceInDays(goal.targetDate, new Date())
                const isOverdue = daysRemaining < 0 && !isCompleted

                return (
                  <div key={goal.id} className="p-4 rounded-lg border bg-card/30 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-2xl">{goal.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{goal.title}</h3>
                            <Badge
                              variant={
                                goal.priority === "high"
                                  ? "destructive"
                                  : goal.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {goal.priority}
                            </Badge>
                            {isCompleted && (
                              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              <span>
                                ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span className={isOverdue ? "text-destructive" : ""}>
                                {isCompleted
                                  ? "Completed"
                                  : isOverdue
                                    ? `${Math.abs(daysRemaining)} days overdue`
                                    : `${daysRemaining} days left`}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              <span>{format(goal.targetDate, "MMM dd, yyyy")}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingGoal(goal)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Goal
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Goal
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{percentage.toFixed(1)}% Complete</span>
                        <span className="text-sm text-muted-foreground">
                          ${(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining
                        </span>
                      </div>
                      <Progress value={Math.min(percentage, 100)} className="h-3" />

                      {goal.monthlyContribution > 0 && !isCompleted && (
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Monthly contribution: ${goal.monthlyContribution}</span>
                          <span>
                            {Math.ceil((goal.targetAmount - goal.currentAmount) / goal.monthlyContribution)} months at
                            current rate
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {editingGoal && (
        <EditGoalDialog
          goal={editingGoal}
          open={!!editingGoal}
          onOpenChange={(open) => !open && setEditingGoal(null)}
        />
      )}
    </>
  )
}
