"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download } from "lucide-react"
import { dummyExpenses, CURRENCY } from "@/lib/dummy-data"
import { format } from "date-fns"

const allExpenses = dummyExpenses.map((expense) => ({
  ...expense,
  date: format(new Date(expense.date), "MMM d, yyyy"),
}))

export function ExpensesTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredExpenses = allExpenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Expenses</CardTitle>
            <CardDescription>Complete history of your expenses</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Category</th>
                <th className="text-right py-3 px-4 font-semibold text-sm">Amount</th>
                <th className="text-center py-3 px-4 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border-b hover:bg-accent/50 transition-colors">
                  <td className="py-3 px-4 text-sm">{expense.date}</td>
                  <td className="py-3 px-4 text-sm font-medium">{expense.description}</td>
                  <td className="py-3 px-4 text-sm">
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                      {expense.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-right">
                    {expense.amount.toLocaleString()} {CURRENCY}
                  </td>
                  <td className="py-3 px-4 text-sm text-center">
                    <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No expenses found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
