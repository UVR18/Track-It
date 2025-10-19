import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { ShoppingCart } from "lucide-react"

const transactions: Array<{
  id: number
  merchant: string
  category: string
  amount: number
  date: string
  icon: typeof ShoppingCart
  color: string
}> = []
// TODO: Fetch recent transactions from API endpoint (e.g., /api/transactions/recent)

export function RecentTransactions() {
  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest spending activity</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
            <p className="text-sm text-muted-foreground">Your recent transactions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={`${transaction.color} text-white`}>
                      <transaction.icon className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{transaction.merchant}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount < 0 ? "text-destructive" : "text-success"}`}>
                    {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
