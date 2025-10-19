import { DashboardHeader } from "@/components/dashboard-header"
import { AutomatedPayments } from "@/components/automated-payments"
import { AiSummary } from "@/components/ai-summary"

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Automated Payments</h1>
          <p className="text-muted-foreground">Manage your bills and automated payments</p>
        </div>

        {/* AI Summary */}
        <AiSummary tab="dashboard" />

        {/* Automated Payments Component */}
        <AutomatedPayments />
      </main>
    </div>
  )
}
