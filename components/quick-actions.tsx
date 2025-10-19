"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Target, PieChart } from "lucide-react"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { CreateGoalDialog } from "@/components/create-goal-dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showCreateGoal, setShowCreateGoal] = useState(false)
  const router = useRouter()

  const handleImportTransactions = () => {
    // Create a hidden file input and trigger it
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv,.xlsx,.xls"
    input.onchange = (e: any) => {
      const file = e.target.files?.[0]
      if (file) {
        console.log("[v0] File selected for import:", file.name)
        // In a real app, you would process the file here
      }
    }
    input.click()
  }

  return (
    <>
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your finances quickly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start gap-3" onClick={() => setShowAddExpense(true)}>
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 bg-transparent"
            onClick={handleImportTransactions}
          >
            <Upload className="h-4 w-4" />
            Import Transactions
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 bg-transparent"
            onClick={() => setShowCreateGoal(true)}
          >
            <Target className="h-4 w-4" />
            Set New Goal
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 bg-transparent"
            onClick={() => router.push("/reports")}
          >
            <PieChart className="h-4 w-4" />
            View Reports
          </Button>
        </CardContent>
      </Card>

      <AddExpenseDialog open={showAddExpense} onOpenChange={setShowAddExpense} />
      <CreateGoalDialog open={showCreateGoal} onOpenChange={setShowCreateGoal} />
    </>
  )
}
