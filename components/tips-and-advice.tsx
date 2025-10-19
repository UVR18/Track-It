import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Star, TrendingUp } from "lucide-react"

const tips = [
  {
    title: "The 24-Hour Rule",
    description:
      "Wait 24 hours before making any non-essential purchase over $50. This simple rule can prevent impulse buying.",
    category: "Spending",
    likes: 234,
    author: "Financial Expert",
  },
  {
    title: "Automate Your Savings",
    description: "Set up automatic transfers to your savings account right after payday. Pay yourself first!",
    category: "Saving",
    likes: 189,
    author: "Community Tip",
  },
  {
    title: "Track Every Dollar",
    description: "Use the envelope method digitally. Allocate every dollar to a specific category before spending.",
    category: "Budgeting",
    likes: 156,
    author: "Success Story",
  },
  {
    title: "Emergency Fund Priority",
    description:
      "Build a $1,000 emergency fund before focusing on other financial goals. This prevents debt accumulation.",
    category: "Emergency",
    likes: 298,
    author: "Expert Advice",
  },
]

const weeklyChallenge = {
  title: "No-Spend Weekend Challenge",
  description: "Try to spend nothing except on absolute necessities this weekend. Share your experience!",
  participants: 1247,
  daysLeft: 2,
}

export function TipsAndAdvice() {
  return (
    <div className="space-y-6">
      {/* Weekly Challenge */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            Weekly Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">{weeklyChallenge.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{weeklyChallenge.description}</p>
          <div className="flex items-center justify-between text-xs">
            <span>{weeklyChallenge.participants} participants</span>
            <Badge variant="outline">{weeklyChallenge.daysLeft} days left</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Top Tips */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            Top Tips This Week
          </CardTitle>
          <CardDescription>Most popular advice from the community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="p-3 rounded-lg bg-muted/30 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{tip.title}</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>{tip.likes}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{tip.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {tip.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{tip.author}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
