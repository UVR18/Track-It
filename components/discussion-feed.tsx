"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp, Clock, TrendingUp } from "lucide-react"
import { CreatePostDialog } from "@/components/create-post-dialog"
import { useState } from "react"

const discussions: Array<{
  id: number
  title: string
  author: string
  avatar: string
  category: string
  content: string
  likes: number
  replies: number
  timeAgo: string
  trending: boolean
}> = [
  {
    id: 1,
    title: "Paid off JMD $500,000 in debt in 18 months!",
    author: "Sarah M.",
    avatar: "",
    category: "Success Stories",
    content:
      "I can't believe it! Using the 50/30/20 rule and cutting unnecessary subscriptions, I finally became debt-free. The journey was tough but so worth it!",
    likes: 156,
    replies: 34,
    timeAgo: "2 hours ago",
    trending: true,
  },
  {
    id: 2,
    title: "How do I start investing with only JMD $10,000?",
    author: "Mike R.",
    avatar: "",
    category: "Questions",
    content:
      "I'm 25 and want to start investing but only have JMD $10,000 saved. What's the best way to begin? Should I wait until I have more?",
    likes: 89,
    replies: 67,
    timeAgo: "5 hours ago",
    trending: true,
  },
  {
    id: 3,
    title: "Meal prep saved me JMD $15,000 this month",
    author: "Jessica L.",
    avatar: "",
    category: "Tips",
    content:
      "Started meal prepping on Sundays and my food budget dropped dramatically. Here's my weekly routine and favorite budget recipes...",
    likes: 234,
    replies: 45,
    timeAgo: "1 day ago",
    trending: true,
  },
  {
    id: 4,
    title: "Best budgeting apps for beginners?",
    author: "David K.",
    avatar: "",
    category: "Questions",
    content:
      "I'm new to budgeting and feeling overwhelmed. What apps or tools do you recommend for someone just starting out?",
    likes: 67,
    replies: 52,
    timeAgo: "1 day ago",
    trending: false,
  },
  {
    id: 5,
    title: "Negotiate your bills - I saved JMD $8,000/month",
    author: "Amanda P.",
    avatar: "",
    category: "Advice",
    content:
      "Called my internet, phone, and insurance providers. Just by asking for better rates, I'm now saving JMD $8,000 every month. Here's my script...",
    likes: 198,
    replies: 41,
    timeAgo: "2 days ago",
    trending: false,
  },
  {
    id: 6,
    title: "Finally hit my emergency fund goal!",
    author: "Chris T.",
    avatar: "",
    category: "Success Stories",
    content:
      "After 14 months of consistent saving, I now have 6 months of expenses saved. The peace of mind is incredible!",
    likes: 145,
    replies: 28,
    timeAgo: "2 days ago",
    trending: false,
  },
  {
    id: 7,
    title: "Side hustle ideas that actually work?",
    author: "Rachel W.",
    avatar: "",
    category: "Income",
    content:
      "Looking to increase my income. What side hustles have worked for you? Preferably something I can do evenings/weekends.",
    likes: 112,
    replies: 89,
    timeAgo: "3 days ago",
    trending: false,
  },
  {
    id: 8,
    title: "The envelope method changed my spending habits",
    author: "Marcus J.",
    avatar: "",
    category: "Tips",
    content:
      "Switched to cash envelopes for discretionary spending. It's old school but seeing physical money disappear makes me think twice about purchases.",
    likes: 87,
    replies: 23,
    timeAgo: "3 days ago",
    trending: false,
  },
  {
    id: 9,
    title: "How to talk to partner about money?",
    author: "Emily S.",
    avatar: "",
    category: "Advice",
    content:
      "My partner and I have different spending habits and it's causing tension. How do you handle financial discussions in relationships?",
    likes: 156,
    replies: 78,
    timeAgo: "4 days ago",
    trending: false,
  },
  {
    id: 10,
    title: "Bought my first investment property at 28!",
    author: "Jordan B.",
    avatar: "",
    category: "Success Stories",
    content:
      "Years of saving and learning about real estate finally paid off. Closed on my first rental property yesterday. Happy to answer questions!",
    likes: 267,
    replies: 94,
    timeAgo: "4 days ago",
    trending: true,
  },
  {
    id: 11,
    title: "Freelancing tips for extra income",
    author: "Nina H.",
    avatar: "",
    category: "Income",
    content:
      "Been freelancing for 2 years alongside my day job. Here are my top tips for finding clients and managing your time effectively...",
    likes: 143,
    replies: 56,
    timeAgo: "5 days ago",
    trending: false,
  },
  {
    id: 12,
    title: "Zero-based budgeting: Is it worth the effort?",
    author: "Tom L.",
    avatar: "",
    category: "Questions",
    content:
      "Heard about zero-based budgeting where every dollar has a job. Sounds time-consuming but effective. Anyone tried it?",
    likes: 92,
    replies: 61,
    timeAgo: "5 days ago",
    trending: false,
  },
]

const categories = ["All", "Success Stories", "Questions", "Tips", "Advice", "Income"]

export function DiscussionFeed() {
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredDiscussions =
    activeCategory === "All" ? discussions : discussions.filter((d) => d.category === activeCategory)

  return (
    <>
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Community Discussions</CardTitle>
              <CardDescription>Join the conversation and share your financial journey</CardDescription>
            </div>
            <Button onClick={() => setShowCreatePost(true)}>New Post</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="popular">Most Popular</TabsTrigger>
            </TabsList>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <TabsContent value="recent" className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <div key={discussion.id} className="p-4 rounded-lg border bg-card/30 space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                      <AvatarFallback>
                        {discussion.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{discussion.title}</h3>
                        {discussion.trending && (
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span>{discussion.author}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {discussion.category}
                        </Badge>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{discussion.content}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {discussion.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {discussion.replies}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="trending" className="space-y-4">
              {filteredDiscussions.filter((d) => d.trending).length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔥</div>
                  <h3 className="text-lg font-semibold mb-2">No trending discussions</h3>
                  <p className="text-sm text-muted-foreground">Check back later for trending topics</p>
                </div>
              ) : (
                filteredDiscussions
                  .filter((d) => d.trending)
                  .map((discussion) => (
                    <div key={discussion.id} className="p-4 rounded-lg border bg-card/30 space-y-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                          <AvatarFallback>
                            {discussion.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm">{discussion.title}</h3>
                            {discussion.trending && (
                              <Badge variant="secondary" className="text-xs">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <span>{discussion.author}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {discussion.category}
                            </Badge>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{discussion.timeAgo}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{discussion.content}</p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {discussion.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {discussion.replies}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </TabsContent>

            <TabsContent value="popular" className="space-y-4">
              {filteredDiscussions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-lg font-semibold mb-2">No popular discussions</h3>
                  <p className="text-sm text-muted-foreground">Popular discussions will appear here</p>
                </div>
              ) : (
                filteredDiscussions
                  .sort((a, b) => b.likes - a.likes)
                  .map((discussion) => (
                    <div key={discussion.id} className="p-4 rounded-lg border bg-card/30 space-y-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                          <AvatarFallback>
                            {discussion.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm">{discussion.title}</h3>
                            {discussion.trending && (
                              <Badge variant="secondary" className="text-xs">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <span>{discussion.author}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {discussion.category}
                            </Badge>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{discussion.timeAgo}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{discussion.content}</p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {discussion.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {discussion.replies}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <CreatePostDialog open={showCreatePost} onOpenChange={setShowCreatePost} />
    </>
  )
}
