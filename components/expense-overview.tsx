import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react"
import { dummyStats, CURRENCY } from "@/lib/dummy-data"

const stats = [
  {
    title: "Total Balance",
    value: `${dummyStats.totalBalance.toLocaleString()} ${CURRENCY}`,
    change: "+12%",
    trend: "up" as const,
    icon: DollarSign,
    description: "From last month",
  },
  {
    title: "Monthly Expenses",
    value: `${dummyStats.monthlyExpenses.toLocaleString()} ${CURRENCY}`,
    change: "+8%",
    trend: "down" as const,
    icon: CreditCard,
    description: "From last month",
  },
  {
    title: "Budget Remaining",
    value: `${dummyStats.budgetRemaining.toLocaleString()} ${CURRENCY}`,
    change: "+15%",
    trend: "up" as const,
    icon: TrendingUp,
    description: "This month",
  },
  {
    title: "Savings Goal",
    value: `${dummyStats.savingsGoal.toLocaleString()} ${CURRENCY}`,
    change: "68%",
    trend: "up" as const,
    icon: TrendingUp,
    description: "Progress",
  },
]

export function ExpenseOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className="p-2 bg-accent/10 rounded-lg">
              <stat.icon className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`flex items-center gap-1 ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{stat.change}</span>
              </div>
              <span>{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
