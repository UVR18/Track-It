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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface EditGoalDialogProps {
  goal: {
    id: number
    title: string
    description: string
    targetAmount: number
    currentAmount: number
    targetDate: Date
    category: string
    priority: string
    monthlyContribution: number
    icon: string
    color: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditGoalDialog({ goal, open, onOpenChange }: EditGoalDialogProps) {
  const [targetDate, setTargetDate] = useState<Date>(goal.targetDate)
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Financial Goal</DialogTitle>
          <DialogDescription>Update your financial objective details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input id="title" defaultValue={goal.title} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" defaultValue={goal.description} rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="target-amount">Target Amount</Label>
                <Input id="target-amount" type="number" step="0.01" defaultValue={goal.targetAmount} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="current-amount">Current Amount</Label>
                <Input id="current-amount" type="number" step="0.01" defaultValue={goal.currentAmount} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Target Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !targetDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {targetDate ? format(targetDate, "PPP") : "Pick a target date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={targetDate} onSelect={setTargetDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
                <Input id="monthly-contribution" type="number" step="0.01" defaultValue={goal.monthlyContribution} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue={goal.priority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-md">
              <div className="text-sm text-muted-foreground mb-2">Current Progress</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span className="font-medium">{((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining:</span>
                  <span className="font-medium">${(goal.targetAmount - goal.currentAmount).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Goal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
