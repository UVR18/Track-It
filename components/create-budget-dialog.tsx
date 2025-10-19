"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

const categories = [
  { value: "food-dining", label: "Food & Dining", icon: "🍽️" },
  { value: "transportation", label: "Transportation", icon: "🚗" },
  { value: "housing", label: "Housing", icon: "🏠" },
  { value: "utilities", label: "Utilities", icon: "⚡" },
  { value: "healthcare", label: "Healthcare", icon: "🏥" },
  { value: "entertainment", label: "Entertainment", icon: "🎬" },
  { value: "shopping", label: "Shopping", icon: "🛍️" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "travel", label: "Travel", icon: "✈️" },
  { value: "other", label: "Other", icon: "📦" },
]

export function CreateBudgetDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription>Set a spending limit for a category to track your expenses.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Monthly Budget Amount</Label>
              <Input id="amount" type="number" step="0.01" placeholder="0.00" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
              <Select defaultValue="80">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50% - Early warning</SelectItem>
                  <SelectItem value="75">75% - Standard</SelectItem>
                  <SelectItem value="80">80% - Recommended</SelectItem>
                  <SelectItem value="90">90% - Late warning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
