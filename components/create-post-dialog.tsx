"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreatePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const postCategories = [
  { value: "question", label: "Question", icon: "❓" },
  { value: "tip", label: "Tip", icon: "💡" },
  { value: "success-story", label: "Success Story", icon: "🎉" },
  { value: "advice", label: "Advice", icon: "💭" },
  { value: "income", label: "Income Ideas", icon: "💰" },
  { value: "general", label: "General Discussion", icon: "💬" },
]

export function CreatePostDialog({ open, onOpenChange }: CreatePostDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>Share your thoughts, questions, or tips with the community.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Post Title</Label>
              <Input id="title" placeholder="What would you like to discuss?" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {postCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, experiences, or questions in detail..."
                rows={6}
                required
              />
            </div>

            <div className="p-3 bg-muted/50 rounded-md">
              <h4 className="font-medium text-sm mb-2">Community Guidelines</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Be respectful and supportive to all members</li>
                <li>• Share genuine experiences and advice</li>
                <li>• No spam or promotional content</li>
                <li>• Keep discussions relevant to personal finance</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Create Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
