import { DashboardHeader } from "@/components/dashboard-header"
import { BudgetOverview } from "@/components/budget-overview"
import { BudgetList } from "@/components/budget-list"
import { CreateBudgetDialog } from "@/components/create-budget-dialog"
import { AiSummary } from "@/components/ai-summary"

export default function BudgetsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Budget Management</h1>
            <p className="text-muted-foreground">Set and track your spending limits across different categories</p>
          </div>
          <CreateBudgetDialog />
        </div>

        <AiSummary tab="budgets" />

        {/* Budget Overview */}
        <BudgetOverview />

        <BudgetList />
      </main>
    </div>
  )
}
