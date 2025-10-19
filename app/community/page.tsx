import { DashboardHeader } from "@/components/dashboard-header"
import { CommunityOverview } from "@/components/community-overview"
import { DiscussionFeed } from "@/components/discussion-feed"
import { TipsAndAdvice } from "@/components/tips-and-advice"
import { CommunityStats } from "@/components/community-stats"
import { AISummary } from "@/components/ai-summary"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">Connect with others and share financial wisdom</p>
        </div>

        {/* AI Summary */}
        <AISummary
          summary="The community is buzzing with success stories this week! 12 new discussions about debt payoff strategies and 5 members shared their investment wins."
          insights={[
            "Most popular topic: Side hustle ideas for extra income",
            "Sarah M. shared a tip that got 234 likes about meal prepping",
            "3 new success stories about reaching emergency fund goals",
          ]}
        />

        {/* Community Overview */}
        <CommunityOverview />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Discussion Feed */}
          <div className="lg:col-span-2">
            <DiscussionFeed />
          </div>

          {/* Right Column - Tips and Stats */}
          <div className="space-y-6">
            <TipsAndAdvice />
            <CommunityStats />
          </div>
        </div>
      </main>
    </div>
  )
}
