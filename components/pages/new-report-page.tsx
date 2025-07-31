"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, FileText, Save, Send } from "lucide-react"
import { format } from "date-fns"

function NewReportPage() {
  const [reportData, setReportData] = useState({
    name: "",
    description: "",
    type: "",
    frequency: "",
    recipients: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    metrics: [] as string[],
    format: "pdf",
  })

  const availableMetrics = [
    "Revenue",
    "Users",
    "Conversions",
    "Click-through Rate",
    "Cost per Acquisition",
    "Return on Ad Spend",
    "Impressions",
    "Engagement Rate",
  ]

  const handleMetricChange = (metric: string, checked: boolean) => {
    if (checked) {
      setReportData((prev) => ({
        ...prev,
        metrics: [...prev.metrics, metric],
      }))
    } else {
      setReportData((prev) => ({
        ...prev,
        metrics: prev.metrics.filter((m) => m !== metric),
      }))
    }
  }

  const handleSaveDraft = () => {
    alert("Report saved as draft!")
  }

  const handleCreateReport = () => {
    if (!reportData.name || !reportData.type) {
      alert("Please fill in required fields")
      return
    }
    alert("Report created successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Report</h1>
        <p className="text-muted-foreground">Set up a new marketing performance report</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Report Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter report name"
                  value={reportData.name}
                  onChange={(e) => setReportData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this report covers"
                  value={reportData.description}
                  onChange={(e) => setReportData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Report Type *</Label>
                  <Select
                    value={reportData.type}
                    onValueChange={(value) => setReportData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance Report</SelectItem>
                      <SelectItem value="roi">ROI Analysis</SelectItem>
                      <SelectItem value="audience">Audience Report</SelectItem>
                      <SelectItem value="campaign">Campaign Report</SelectItem>
                      <SelectItem value="custom">Custom Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select
                    value={reportData.frequency}
                    onValueChange={(value) => setReportData((prev) => ({ ...prev, frequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="one-time">One-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Range */}
          <Card>
            <CardHeader>
              <CardTitle>Date Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reportData.startDate ? format(reportData.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={reportData.startDate}
                        onSelect={(date) => setReportData((prev) => ({ ...prev, startDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reportData.endDate ? format(reportData.endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={reportData.endDate}
                        onSelect={(date) => setReportData((prev) => ({ ...prev, endDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {availableMetrics.map((metric) => (
                  <div key={metric} className="flex items-center space-x-2">
                    <Checkbox
                      id={metric}
                      checked={reportData.metrics.includes(metric)}
                      onCheckedChange={(checked) => handleMetricChange(metric, checked as boolean)}
                    />
                    <Label htmlFor={metric}>{metric}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Delivery Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Textarea
                  id="recipients"
                  placeholder="Enter email addresses separated by commas"
                  value={reportData.recipients}
                  onChange={(e) => setReportData((prev) => ({ ...prev, recipients: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Format</Label>
                <Select
                  value={reportData.format}
                  onValueChange={(value) => setReportData((prev) => ({ ...prev, format: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={handleCreateReport}>
                <Send className="h-4 w-4 mr-2" />
                Create Report
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Name:</strong> {reportData.name || "Untitled Report"}
                </div>
                <div>
                  <strong>Type:</strong> {reportData.type || "Not selected"}
                </div>
                <div>
                  <strong>Metrics:</strong> {reportData.metrics.length} selected
                </div>
                <div>
                  <strong>Format:</strong> {reportData.format.toUpperCase()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default NewReportPage
