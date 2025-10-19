import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

const leaderboard = [
  { name: "Sarah M.", points: 2847, badge: "🏆" },
  { name: "Mike R.", points: 2156, badge: "🥈" },
  { name: "Jessica L.", points: 1923, badge: "🥉" },
  { name: "David K.", points: 1678, badge: "⭐" },
  { name: "You", points: 456, badge: "📈" },
]

export function CommunityStats() {
  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          Community Leaders
        </CardTitle>
        <CardDescription>Top contributors this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboard.map((member, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <span className="text-lg">{member.badge}</span>
              <div>
                <div className="font-medium text-sm">{member.name}</div>
                <div className="text-xs text-muted-foreground">#{index + 1}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-sm">{member.points}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
