"use client"

import { useState, useMemo, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight, Download, Filter, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { debounce } from "@/lib/performance-utils"

interface CampaignData {
  id: string
  date: string
  campaign: string
  users: number
  conversions: number
  revenue: number
  status: "active" | "paused" | "completed"
}

const campaignData: CampaignData[] = [
  {
    id: "1",
    date: "2024-07-01",
    campaign: "Summer Sale",
    users: 5000,
    conversions: 1200,
    revenue: 10000,
    status: "completed",
  },
  {
    id: "2",
    date: "2024-07-08",
    campaign: "Back to School",
    users: 4500,
    conversions: 1000,
    revenue: 8000,
    status: "active",
  },
  {
    id: "3",
    date: "2024-07-15",
    campaign: "Holiday Promotion",
    users: 3000,
    conversions: 800,
    revenue: 4000,
    status: "paused",
  },
  {
    id: "4",
    date: "2024-07-22",
    campaign: "Clearance Event",
    users: 2500,
    conversions: 600,
    revenue: 2500,
    status: "completed",
  },
  {
    id: "5",
    date: "2024-07-29",
    campaign: "New Arrivals",
    users: 2000,
    conversions: 400,
    revenue: 1500,
    status: "active",
  },
  {
    id: "6",
    date: "2024-08-05",
    campaign: "Flash Sale",
    users: 6000,
    conversions: 1500,
    revenue: 12000,
    status: "active",
  },
  {
    id: "7",
    date: "2024-08-12",
    campaign: "Weekend Special",
    users: 3500,
    conversions: 900,
    revenue: 5500,
    status: "completed",
  },
]

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const itemsPerPage = 5

  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchTerm(value), 300),
    [],
  )

  const filteredData = useMemo(() => {
    return campaignData.filter((item) => {
      const matchesSearch = item.campaign.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const startIndex = (currentPage - 1) * itemsPerPage

  const tableStats = useMemo(
    () => ({
      totalItems: filteredData.length,
      totalPages: Math.ceil(filteredData.length / itemsPerPage),
      currentRange: {
        start: startIndex + 1,
        end: Math.min(startIndex + itemsPerPage, filteredData.length),
      },
    }),
    [filteredData.length, startIndex, itemsPerPage],
  )

  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handleExport = (format: "csv" | "pdf") => {
    // Simulate export functionality
    const data = filteredData.map((item) => ({
      Date: item.date,
      Campaign: item.campaign,
      Users: item.users,
      Conversions: item.conversions,
      Revenue: `$${item.revenue.toLocaleString()}`,
      Status: item.status,
    }))

    if (format === "csv") {
      const csv = [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n")

      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "campaign-data.csv"
      a.click()
    } else {
      // For PDF, you would typically use a library like jsPDF
      alert("PDF export would be implemented with a library like jsPDF")
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      paused: "secondary",
      completed: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Detailed Data</CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Status: {statusFilter === "all" ? "All" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("paused")}>Paused</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="text-muted-foreground">{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{item.campaign}</TableCell>
                  <TableCell>{item.users.toLocaleString()}</TableCell>
                  <TableCell>{item.conversions.toLocaleString()}</TableCell>
                  <TableCell>${item.revenue.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: tableStats.totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, tableStats.totalPages))}
            disabled={currentPage === tableStats.totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
