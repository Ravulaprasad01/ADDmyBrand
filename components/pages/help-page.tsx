"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageCircle, Book, Video, Send, Search } from "lucide-react"

const faqData = [
  {
    question: "How do I create a new campaign?",
    answer:
      "To create a new campaign, navigate to the Campaigns page and click the 'Create Campaign' button. Fill in the required information including campaign name, type, budget, and target audience.",
  },
  {
    question: "How can I export my data?",
    answer:
      "You can export data from any table by clicking the 'Export' button. Choose between CSV and PDF formats. The export will include all filtered data currently displayed.",
  },
  {
    question: "What metrics are available in reports?",
    answer:
      "Our reports include Revenue, Users, Conversions, Click-through Rate, Cost per Acquisition, Return on Ad Spend, Impressions, and Engagement Rate. You can select which metrics to include when creating custom reports.",
  },
  {
    question: "How do I set up automated reports?",
    answer:
      "Go to the Reports page, click 'Create Report', and select your desired frequency (daily, weekly, monthly, or quarterly). Add recipient email addresses and the reports will be automatically generated and sent.",
  },
  {
    question: "Can I customize my dashboard?",
    answer:
      "Yes! You can customize which metrics cards are displayed, rearrange chart positions, and set up custom date ranges for your data views.",
  },
]

function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [supportForm, setSupportForm] = useState({
    subject: "",
    message: "",
    priority: "medium",
  })

  const filteredFAQ = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmitTicket = () => {
    if (!supportForm.subject || !supportForm.message) {
      alert("Please fill in all required fields")
      return
    }
    alert("Support ticket submitted successfully! We'll get back to you within 24 hours.")
    setSupportForm({ subject: "", message: "", priority: "medium" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions or get in touch with our support team</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Book className="h-8 w-8 mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-muted-foreground">Browse our comprehensive guides</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Video className="h-8 w-8 mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">Watch step-by-step tutorials</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <MessageCircle className="h-8 w-8 mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Chat with our support team</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Support Form Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={supportForm.subject}
                  onChange={(e) => setSupportForm((prev) => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail"
                  rows={6}
                  value={supportForm.message}
                  onChange={(e) => setSupportForm((prev) => ({ ...prev, message: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <div className="flex gap-2">
                  <Badge
                    variant={supportForm.priority === "low" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSupportForm((prev) => ({ ...prev, priority: "low" }))}
                  >
                    Low
                  </Badge>
                  <Badge
                    variant={supportForm.priority === "medium" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSupportForm((prev) => ({ ...prev, priority: "medium" }))}
                  >
                    Medium
                  </Badge>
                  <Badge
                    variant={supportForm.priority === "high" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSupportForm((prev) => ({ ...prev, priority: "high" }))}
                  >
                    High
                  </Badge>
                </div>
              </div>

              <Button className="w-full" onClick={handleSubmitTicket}>
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Other Ways to Reach Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="font-medium">Email Support</Label>
                <p className="text-sm text-muted-foreground">support@marketinginsights.com</p>
              </div>
              <div>
                <Label className="font-medium">Phone Support</Label>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <Label className="font-medium">Business Hours</Label>
                <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HelpPage
