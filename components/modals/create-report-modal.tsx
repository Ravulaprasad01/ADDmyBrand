"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"

interface CreateReportModalProps {
  onCreateReport: (report: any) => void
}

export function CreateReportModal({ onCreateReport }: CreateReportModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    frequency: "",
    metrics: [] as string[],
  })

  const availableMetrics = [
    "Revenue",
    "Users",
    "Conversions",
    "Click-through Rate",
    "Cost per Acquisition",
    "Return on Ad Spend",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.type) {
      alert("Please fill in required fields")
      return
    }

    const newReport = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      type: formData.type,
      status: "completed" as const,
      createdAt: new Date().toISOString().split("T")[0],
      lastRun: new Date().toISOString().split("T")[0],
      metrics: { views: 0, downloads: 0 },
    }

    onCreateReport(newReport)
    setFormData({ name: "", description: "", type: "", frequency: "", metrics: [] })
    setOpen(false)
  }

  const handleMetricChange = (metric: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({ ...prev, metrics: [...prev.metrics, metric] }))
    } else {
      setFormData((prev) => ({ ...prev, metrics: prev.metrics.filter((m) => m !== metric) }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Report Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter report name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Report Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Performance">Performance Report</SelectItem>
                  <SelectItem value="ROI">ROI Analysis</SelectItem>
                  <SelectItem value="Audience">Audience Report</SelectItem>
                  <SelectItem value="Campaign">Campaign Report</SelectItem>
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
              placeholder="Describe what this report covers"
            />
          </div>

          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, frequency: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Metrics to Include</Label>
            <div className="grid gap-2 md:grid-cols-2">
              {availableMetrics.map((metric) => (
                <div key={metric} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric}
                    checked={formData.metrics.includes(metric)}
                    onCheckedChange={(checked) => handleMetricChange(metric, checked as boolean)}
                  />
                  <Label htmlFor={metric}>{metric}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Report</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
