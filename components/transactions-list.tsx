"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { dummyExpenses, CURRENCY } from "@/lib/dummy-data"

const categoryIcons: Record<string, string> = {
  "Food & Dining": "🛒",
  Transportation: "⛽",
  Entertainment: "🎬",
  Utilities: "⚡",
  "Health & Fitness": "💪",
  Shopping: "🛍️",
  Healthcare: "💊",
}

const categoryColors: Record<string, string> = {
  "Food & Dining": "#FF6B6B",
  Transportation: "#4ECDC4",
  Entertainment: "#FFE66D",
  Utilities: "#95E1D3",
  "Health & Fitness": "#A8E6CF",
  Shopping: "#FFB6C1",
  Healthcare: "#DDA0DD",
}

const dummyTransactions = dummyExpenses.map((expense) => ({
  id: expense.id,
  description: expense.description,
  category: expense.category,
  categoryIcon: categoryIcons[expense.category] || "💰",
  categoryColor: categoryColors[expense.category] || "#999",
  amount: expense.amount,
  date: format(new Date(expense.date), "MMM d, yyyy"),
}))

export function TransactionsList() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = dummyTransactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>Search and filter your expense history</CardDescription>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>

      <CardContent>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found</p>
            <p className="text-sm text-muted-foreground mt-1">Start adding expenses to see them here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: transaction.categoryColor }}
                  >
                    <span className="text-lg">{transaction.categoryIcon}</span>
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">
                    {transaction.amount.toLocaleString()} {CURRENCY}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
