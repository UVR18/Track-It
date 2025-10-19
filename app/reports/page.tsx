"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { SpendingGps } from "@/components/spending-gps"
import { SmartGuardrails } from "@/components/smart-guardrails"
import { GoalAccelerator } from "@/components/goal-accelerator"
import { FutureShockDetection } from "@/components/future-shock-detection"
import { WealthUpliftCoach } from "@/components/wealth-uplift-coach"
import { AiSummary } from "@/components/ai-summary"
import { FinancialOverviewCharts } from "@/components/financial-overview-charts"
import { AiFinancialChat } from "@/components/ai-financial-chat"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Sparkles } from "lucide-react"
import { useState } from "react"

export default function ReportsPage() {
  const [reportGenerated, setReportGenerated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const handleGenerateReport = async () => {
    setIsLoading(true)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setReportGenerated(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI Financial Insights</h1>
            <p className="text-muted-foreground">Intelligent analysis and predictions for your financial future</p>
          </div>
          {reportGenerated && !isLoading && (
            <Button onClick={() => setChatOpen(true)} className="gap-2" variant="outline">
              <Sparkles className="h-4 w-4" />
              Open AI Assistant
            </Button>
          )}
        </div>

        {!reportGenerated ? (
          <Card className="border-0 shadow-lg bg-accent/5">
            <CardHeader>
              <CardTitle>Generate Your Financial Report</CardTitle>
              <CardDescription>
                Run a comprehensive analysis of your spending patterns, financial health, and personalized
                recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGenerateReport} disabled={isLoading} size="lg" className="gap-2">
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLoading ? "Generating Report..." : "Generate Report"}
              </Button>
            </CardContent>
          </Card>
        ) : null}

        {isLoading && (
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <div className="text-center">
                <p className="font-semibold">Analyzing Your Financial Data</p>
                <p className="text-sm text-muted-foreground">This may take a moment...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {reportGenerated && !isLoading && (
          <div className="space-y-6">
            {/* Visual Charts */}
            <FinancialOverviewCharts />

            <AiSummary tab="reports" />

            <div className="space-y-6">
              <SpendingGps />

              <div className="grid lg:grid-cols-2 gap-6">
                <SmartGuardrails />
                <GoalAccelerator />
              </div>

              <FutureShockDetection />

              <WealthUpliftCoach />
            </div>
          </div>
        )}

        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogContent className="max-w-2xl h-[600px] p-0 flex flex-col">
            <DialogHeader className="px-6 pt-6 pb-4 border-b">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <div>
                  <DialogTitle>TrackIt AI Assistant</DialogTitle>
                  <DialogDescription>Financial guidance powered by AI</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-hidden">
              <AiFinancialChat onClose={() => setChatOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
