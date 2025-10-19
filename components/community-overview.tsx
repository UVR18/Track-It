import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, TrendingUp, Award } from "lucide-react"

const stats = [
  {
    title: "Active Members",
    value: "0",
    change: "+0 this week",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Discussions",
    value: "0",
    change: "+0 today",
    icon: MessageSquare,
    color: "bg-green-500",
  },
  {
    title: "Tips Shared",
    value: "0",
    change: "+0 this week",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
  {
    title: "Success Stories",
    value: "0",
    change: "+0 this month",
    icon: Award,
    color: "bg-yellow-500",
  },
]
// TODO: Fetch community stats from API endpoint (e.g., /api/community/stats)

export function CommunityOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to the Smart Expense Community!</h2>
              <p className="text-muted-foreground mb-4">
                Join thousands of users sharing tips, advice, and success stories on their financial journey.
              </p>
              <div className="flex gap-3">
                <Button>Start a Discussion</Button>
                <Button variant="outline">Share a Tip</Button>
              </div>
            </div>
            <div className="hidden md:block text-6xl">💬</div>
          </div>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 ${stat.color}/10 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color.replace("bg-", "text-")}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
