import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar, AlertCircle } from "lucide-react"

const expenseStats = [
  {
    title: "Total Expenses",
    value: "JMD $25,850.00",
    change: "+5%",
    trend: "up" as const,
    icon: TrendingDown,
    description: "This month",
  },
  {
    title: "Average Daily",
    value: "JMD $861.67",
    change: "-3%",
    trend: "down" as const,
    icon: Calendar,
    description: "This month",
  },
  {
    title: "Highest Category",
    value: "Food & Dining",
    change: "JMD $6,950",
    trend: "up" as const,
    icon: TrendingUp,
    description: "35% of total",
  },
  {
    title: "Budget Status",
    value: "On Track",
    change: "68% used",
    trend: "down" as const,
    icon: AlertCircle,
    description: "JMD $6,550 remaining",
  },
]

export function ExpensesOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {expenseStats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className="p-2 bg-accent/10 rounded-lg">
              <stat.icon className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
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
