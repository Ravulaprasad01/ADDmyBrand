"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"

interface CreateAudienceModalProps {
  onCreateAudience: (audience: any) => void
}

export function CreateAudienceModal({ onCreateAudience }: CreateAudienceModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    criteria: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.type) {
      alert("Please fill in required fields")
      return
    }

    const newAudience = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      size: Math.floor(Math.random() * 50000) + 1000, // Random size for demo
      type: formData.type as "custom" | "lookalike" | "behavioral" | "demographic",
      status: "active" as const,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      campaigns: 0,
    }

    onCreateAudience(newAudience)
    setFormData({ name: "", description: "", type: "", criteria: "" })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Create Audience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Audience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Audience Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter audience name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Audience Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="lookalike">Lookalike</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="demographic">Demographic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your target audience"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="criteria">Targeting Criteria</Label>
            <Textarea
              id="criteria"
              value={formData.criteria}
              onChange={(e) => setFormData((prev) => ({ ...prev, criteria: e.target.value }))}
              placeholder="Define the criteria for this audience (e.g., age 25-35, interests in technology)"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Audience</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
