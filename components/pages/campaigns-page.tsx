"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Megaphone, Play, Pause, Square, Edit, Trash2, Search } from "lucide-react"
import { CreateCampaignModal } from "@/components/modals/create-campaign-modal"

interface Campaign {
  id: string
  name: string
  type: "email" | "social" | "display" | "search"
  status: "active" | "paused" | "completed" | "draft"
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  startDate: string
  endDate: string
}

const initialCampaignsData: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2024",
    type: "email",
    status: "active",
    budget: 5000,
    spent: 3200,
    impressions: 125000,
    clicks: 2500,
    conversions: 180,
    startDate: "2024-01-01",
    endDate: "2024-02-01",
  },
  {
    id: "2",
    name: "Back to School Campaign",
    type: "social",
    status: "paused",
    budget: 8000,
    spent: 4500,
    impressions: 200000,
    clicks: 4200,
    conversions: 320,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
  },
]

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaignsData)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      paused: "secondary",
      completed: "outline",
      draft: "destructive",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTypeColor = (type: string) => {
    const colors = {
      email: "bg-blue-100 text-blue-800",
      social: "bg-green-100 text-green-800",
      display: "bg-purple-100 text-purple-800",
      search: "bg-orange-100 text-orange-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleCreateCampaign = (newCampaign: Campaign) => {
    setCampaigns((prev) => [...prev, newCampaign])
  }

  const handlePlay = (campaignId: string) => {
    setCampaigns(
      campaigns.map((campaign) => (campaign.id === campaignId ? { ...campaign, status: "active" as const } : campaign)),
    )
  }

  const handlePause = (campaignId: string) => {
    setCampaigns(
      campaigns.map((campaign) => (campaign.id === campaignId ? { ...campaign, status: "paused" as const } : campaign)),
    )
  }

  const handleStop = (campaignId: string) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === campaignId ? { ...campaign, status: "completed" as const } : campaign,
      ),
    )
  }

  const handleEdit = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId)
    const newName = prompt("Edit campaign name:", campaign?.name)
    if (newName && newName !== campaign?.name) {
      setCampaigns((prev) => prev.map((c) => (c.id === campaignId ? { ...c, name: newName } : c)))
    }
  }

  const handleDelete = (campaignId: string) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns(campaigns.filter((campaign) => campaign.id !== campaignId))
    }
  }

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0)
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0)
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0)
  const activeCampaigns = campaigns.filter((campaign) => campaign.status === "active").length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in">
            Campaigns
          </h1>
          <p className="text-muted-foreground text-lg">Manage your marketing campaigns</p>
        </div>
        <CreateCampaignModal onCreateCampaign={handleCreateCampaign} />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-0 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Megaphone className="h-5 w-5 text-blue-500 animate-bounce" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">of {campaigns.length} total</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-0 animate-fade-in delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-0 animate-fade-in delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}% of budget</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-0 animate-fade-in delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalConversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>
      </div>

      {/* Campaigns Table */}
      <Card className="transition-all duration-300 hover:shadow-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>CTR</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow
                    key={campaign.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-pink-50 dark:hover:from-zinc-800 dark:hover:to-zinc-900 transition-colors group"
                  >
                    <TableCell className="font-semibold group-hover:text-blue-600 transition-colors">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(campaign.type) + " shadow-sm"}>
                        {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(campaign.status)}
                    </TableCell>
                    <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                    <TableCell>${campaign.spent.toLocaleString()}</TableCell>
                    <TableCell>{campaign.conversions}</TableCell>
                    <TableCell>
                      {campaign.clicks > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) : 0}%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {campaign.status === "paused" || campaign.status === "draft" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePlay(campaign.id)}
                            className="hover:bg-green-100 hover:text-green-700 transition-all"
                            title="Activate"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePause(campaign.id)}
                            className="hover:bg-yellow-100 hover:text-yellow-700 transition-all"
                            title="Pause"
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStop(campaign.id)}
                          className="hover:bg-red-100 hover:text-red-700 transition-all"
                          title="Complete"
                        >
                          <Square className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(campaign.id)}
                          className="hover:bg-blue-100 hover:text-blue-700 transition-all"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(campaign.id)}
                          className="hover:bg-pink-100 hover:text-pink-700 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CampaignsPage
