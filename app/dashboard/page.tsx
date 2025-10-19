import { DashboardHeader } from "@/components/dashboard-header"
import { ExpenseOverview } from "@/components/expense-overview"
import { TransactionsList } from "@/components/transactions-list"
import { QuickActions } from "@/components/quick-actions"
import { ExpenseCharts } from "@/components/expense-charts"
import { BudgetProgress } from "@/components/budget-progress"
import { AiSummary } from "@/components/ai-summary"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <AiSummary tab="dashboard" />

        {/* Overview Cards */}
        <ExpenseOverview />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <ExpenseCharts />
            <TransactionsList />
          </div>

          {/* Right Column - Quick Actions and Budget */}
          <div className="space-y-6">
            <QuickActions />
            <BudgetProgress />
          </div>
        </div>
      </main>
    </div>
  )
}
