import { DashboardHeader } from "@/components/dashboard-header"
import { GoalsOverview } from "@/components/goals-overview"
import { GoalsList } from "@/components/goals-list"
import { GoalInsights } from "@/components/goal-insights"
import { CreateGoalDialog } from "@/components/create-goal-dialog"
import { AiSummary } from "@/components/ai-summary"

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Financial Goals</h1>
            <p className="text-muted-foreground">Set and track your financial objectives to achieve your dreams</p>
          </div>
          <CreateGoalDialog />
        </div>

        <AiSummary tab="goals" />

        {/* Goals Overview */}
        <GoalsOverview />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Goals List */}
          <div className="lg:col-span-2">
            <GoalsList />
          </div>

          {/* Right Column - Insights */}
          <div>
            <GoalInsights />
          </div>
        </div>
      </main>
    </div>
  )
}
