"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bell, Settings, LogOut, User, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const notifications = [
  {
    id: 1,
    message: "Your water bill is coming up.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    message: "Sarah M. shared a tip",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    message: "You're on track for your monthly budget. Keep it up!",
    time: "1 day ago",
    read: false,
  },
  {
    id: 4,
    message: "Your Monthly report is ready for viewing",
    time: "2 days ago",
    read: false,
  },
]

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [showProfileDialog, setShowProfileDialog] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    router.push("/")
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/expenses", label: "Expenses" },
    { href: "/budgets", label: "Budgets" },
    { href: "/goals", label: "Goals" },
    { href: "/payments", label: "Payments" },
    { href: "/reports", label: "Reports" },
    { href: "/community", label: "Community" },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length
  const userEmail = "john.doe@example.com"
  const userName = userEmail
    .split("@")[0]
    .replace(".", " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">TI</span>
              </div>
              <span className="font-bold text-xl">TrackIt</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" className={pathname === item.href ? "text-accent font-medium" : ""}>
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full text-xs flex items-center justify-center text-white font-semibold">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <Badge variant="secondary">{unreadCount} new</Badge>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          !notification.read ? "bg-accent/5 border-accent/20" : "bg-muted/30"
                        }`}
                      >
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>Your account information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-3 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-semibold">{userName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-semibold text-accent">{userEmail}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Account Status</p>
                <Badge className="mt-1">Active</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="font-semibold">January 2024</p>
              </div>
            </div>
            <Button className="w-full" onClick={() => setShowProfileDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}
