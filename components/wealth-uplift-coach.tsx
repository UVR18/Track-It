"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Lightbulb, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WealthUpliftCoach() {
  // TODO: Replace with actual AI coaching insights
  const insights = {
    lifestyle: [
      {
        title: "Switch to Annual Subscriptions",
        savings: "$156/year",
        description: "Save 15% by paying annually for Netflix, Spotify, and gym membership",
      },
      {
        title: "Optimize Grocery Shopping",
        savings: "$89/month",
        description: "Shop at Costco for bulk items and use cashback credit card",
      },
    ],
    income: [
      {
        title: "Freelance Opportunity",
        potential: "$500-800/month",
        description: "Your skills in graphic design are in demand. Start with 5 hours/week on Upwork",
      },
      {
        title: "Negotiate Salary",
        potential: "$5,000/year",
        description: "You're due for a review. Market rate for your role is 8% higher",
      },
    ],
    investments: [
      {
        title: "High-Yield Savings Account",
        benefit: "4.5% APY vs your current 0.5%",
        description: "Move emergency fund to earn $180 more per year",
      },
      {
        title: "401(k) Match Optimization",
        benefit: "Free $1,200/year",
        description: "Increase contribution by 2% to maximize employer match",
      },
    ],
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Wealth Uplift Coach</CardTitle>
        </div>
        <CardDescription>Not just managing money — leveling up your life</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lifestyle" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
          </TabsList>

          <TabsContent value="lifestyle" className="space-y-4 mt-4">
            {insights.lifestyle.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card/30 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-success font-medium mt-1">{insight.savings}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="income" className="space-y-4 mt-4">
            {insights.income.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card/30 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-success font-medium mt-1">{insight.potential}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Get Started
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="investments" className="space-y-4 mt-4">
            {insights.investments.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card/30 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-success font-medium mt-1">{insight.benefit}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Explore Options
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
