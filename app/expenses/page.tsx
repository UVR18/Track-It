import { DashboardHeader } from "@/components/dashboard-header"
import { ExpensesOverview } from "@/components/expenses-overview"
import { ExpensesCharts } from "@/components/expenses-charts"
import { ExpensesTable } from "@/components/expenses-table"

export default function ExpensesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">View and manage all your past expenses</p>
        </div>

        {/* Overview Stats */}
        <ExpensesOverview />

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ExpensesCharts chartType="monthly" />
          <ExpensesCharts chartType="category" />
        </div>

        {/* Expenses Table */}
        <ExpensesTable />
      </main>
    </div>
  )
}
