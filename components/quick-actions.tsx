"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Target, PieChart } from "lucide-react"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { useState } from "react"

export function QuickActions() {
  const [showAddExpense, setShowAddExpense] = useState(false)

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

          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
            <Upload className="h-4 w-4" />
            Import Transactions
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
            <Target className="h-4 w-4" />
            Set New Goal
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
            <PieChart className="h-4 w-4" />
            View Reports
          </Button>
        </CardContent>
      </Card>

      <AddExpenseDialog open={showAddExpense} onOpenChange={setShowAddExpense} />
    </>
  )
}
