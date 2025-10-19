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
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface SetupAutomaticPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingBill?: {
    id: number
    name: string
    provider: string
    amount: number
    dueDate: string
    frequency: string
    nextPaymentDate: string
  } | null
  onPaymentAdded?: (payment: any) => void
}

const frequencies = ["Weekly", "Bi-weekly", "Monthly", "Quarterly", "Annually"]

export function SetupAutomaticPaymentDialog({
  open,
  onOpenChange,
  editingBill,
  onPaymentAdded,
}: SetupAutomaticPaymentDialogProps) {
  const [date, setDate] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: editingBill?.name || "",
    provider: editingBill?.provider || "",
    amount: editingBill?.amount.toString() || "",
    frequency: editingBill?.frequency || "Monthly",
    dueDate: editingBill?.dueDate || "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!editingBill && onPaymentAdded) {
      const newPayment = {
        id: Math.max(1, Math.floor(Math.random() * 1000)),
        name: formData.name,
        provider: formData.provider,
        amount: Number.parseFloat(formData.amount),
        dueDate: formData.dueDate,
        status: "scheduled" as const,
        category: "Personal & Entertainment",
        lastDetected: "Just now",
        emailSubject: `${formData.name} - Payment Notification`,
        frequency: formData.frequency,
        nextPaymentDate: formData.dueDate,
      }
      onPaymentAdded(newPayment)
    }

    setIsLoading(false)
    onOpenChange(false)
    setFormData({
      name: "",
      provider: "",
      amount: "",
      frequency: "Monthly",
      dueDate: "",
      notes: "",
    })
    setDate(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editingBill ? "Edit Automatic Payment" : "Set Up Automatic Payment"}</DialogTitle>
          <DialogDescription>
            {editingBill
              ? "Update the details of your automatic payment"
              : "Create a new automatic payment for your bills and subscriptions"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Payment Name</Label>
              <Input
                id="name"
                placeholder="e.g., Electricity Bill"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="provider">Provider/Company</Label>
              <Input
                id="provider"
                placeholder="e.g., Jamaica Public Service"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map((freq) => (
                      <SelectItem key={freq} value={freq}>
                        {freq}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this payment..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="bg-accent/10 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Next Payment:</strong> {formData.frequency} starting from the due date you select
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Setting up..." : editingBill ? "Update Payment" : "Set Up Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
