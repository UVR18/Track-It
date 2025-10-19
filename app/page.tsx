import { AuthForm } from "@/components/auth-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Shield, Target, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Finance without
                <span className="text-accent"> the middleman</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Take control of your financial future. Track expenses, set budgets, achieve goals, and build wealth with
                our intelligent expense tracking platform.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium">Smart Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium">Goal Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium">Community Support</span>
              </div>
            </div>
          </div>

          {/* Right Column - Auth Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">Get Started</CardTitle>
                <CardDescription>Create your account to start tracking your expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <AuthForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Everything you need to manage your finances</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From expense tracking to goal setting, our platform provides all the tools you need for financial success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-lg w-fit">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Expense Tracking</CardTitle>
              <CardDescription>
                Automatically categorize and track your expenses with bank integration or manual entry.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-lg w-fit">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Budget Management</CardTitle>
              <CardDescription>
                Set monthly budgets and receive alerts when you're approaching your limits.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-lg w-fit">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Goal Setting</CardTitle>
              <CardDescription>
                Define financial goals and track your progress with intelligent insights and reminders.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
