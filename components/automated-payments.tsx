"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Mail, CheckCircle, Clock, AlertCircle, Plus, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import { SetupAutomaticPaymentDialog } from "@/components/setup-automatic-payment-dialog"
import { dummyAutomatedPayments, CURRENCY } from "@/lib/dummy-data"

export function AutomatedPayments() {
  const [automatedBills, setAutomatedBills] = useState(dummyAutomatedPayments)
  const [showSetupDialog, setShowSetupDialog] = useState(false)
  const [selectedBill, setSelectedBill] = useState<(typeof automatedBills)[0] | null>(null)

  const upcomingTotal = automatedBills
    .filter((b) => b.status === "upcoming" || b.status === "scheduled")
    .reduce((sum, bill) => sum + bill.amount, 0)

  const paidTotal = automatedBills.filter((b) => b.status === "paid").reduce((sum, bill) => sum + bill.amount, 0)

  const handleAddPayment = (newPayment: (typeof automatedBills)[0]) => {
    setAutomatedBills([newPayment, ...automatedBills])
  }

  const handleRemovePayment = (id: string) => {
    setAutomatedBills(automatedBills.filter((bill) => bill.id !== id))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "upcoming":
        return <AlertCircle className="h-4 w-4 text-warning" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-accent" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            Paid
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            Due Soon
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            Scheduled
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Upcoming</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {CURRENCY} ${upcomingTotal.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {automatedBills.filter((b) => b.status === "upcoming" || b.status === "scheduled").length} bills pending
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {CURRENCY} ${paidTotal.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {automatedBills.filter((b) => b.status === "paid").length} bills paid
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Email Detection</CardTitle>
            <Mail className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automatedBills.length}</div>
            <p className="text-xs text-muted-foreground mt-2">Bills detected from emails</p>
          </CardContent>
        </Card>
      </div>

      {/* Setup New Automatic Payment Button */}
      <Card className="border-0 shadow-lg bg-accent/5">
        <CardContent className="pt-6">
          <Button onClick={() => setShowSetupDialog(true)} className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Set Up New Automatic Payment
          </Button>
        </CardContent>
      </Card>

      {/* Bills List */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Your Automatic Payments</CardTitle>
          <CardDescription>Bills automatically detected from your email and ready for payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {automatedBills.map((bill) => (
            <div key={bill.id} className="p-4 rounded-lg border bg-card/30 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">{getStatusIcon(bill.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{bill.name}</h3>
                      {getStatusBadge(bill.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{bill.provider}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>{bill.emailSubject}</span>
                      </div>
                      <span>•</span>
                      <span>Frequency: {bill.frequency}</span>
                      <span>•</span>
                      <span>Next: {bill.nextPaymentDate}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">
                    {CURRENCY} ${bill.amount.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>{bill.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t">
                <Badge variant="outline" className="text-xs">
                  {bill.category}
                </Badge>
                <div className="ml-auto flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => {
                      setSelectedBill(bill)
                      setShowSetupDialog(true)
                    }}
                  >
                    <Edit2 className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent text-destructive hover:text-destructive"
                    onClick={() => handleRemovePayment(bill.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </Button>
                  {bill.status !== "paid" && (
                    <Button size="sm" className="ml-2">
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-0 shadow-lg bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-accent" />
            How Email Detection Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium text-sm">Email Scanning</h4>
              <p className="text-sm text-muted-foreground">
                We scan your connected email for bill notifications and payment reminders
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium text-sm">Automatic Extraction</h4>
              <p className="text-sm text-muted-foreground">
                Bill amounts, due dates, and provider information are automatically extracted
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium text-sm">Smart Categorization</h4>
              <p className="text-sm text-muted-foreground">
                Bills are automatically categorized and added to your expense tracking
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Dialog */}
      <SetupAutomaticPaymentDialog
        open={showSetupDialog}
        onOpenChange={setShowSetupDialog}
        editingBill={selectedBill}
        onPaymentAdded={handleAddPayment}
      />
    </div>
  )
}
