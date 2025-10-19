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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditBudgetDialogProps {
  budget: {
    id: number
    category: string
    budget: number
    spent: number
    lastMonth: number
    color: string
    icon: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditBudgetDialog({ budget, open, onOpenChange }: EditBudgetDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
          <DialogDescription>Update your spending limit for {budget.category}.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                <span className="text-lg">{budget.icon}</span>
                <span className="font-medium">{budget.category}</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Monthly Budget Amount</Label>
              <Input id="amount" type="number" step="0.01" defaultValue={budget.budget} required />
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

            <div className="p-3 bg-muted/50 rounded-md">
              <div className="text-sm text-muted-foreground mb-2">Current Status</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Spent this month:</span>
                  <span className="font-medium">${budget.spent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining:</span>
                  <span className="font-medium">${(budget.budget - budget.spent).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
