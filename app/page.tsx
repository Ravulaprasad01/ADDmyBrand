"use client"

import React, { useState, useMemo, useCallback, lazy, Suspense } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { OptimizedMetricsCards } from "@/components/optimized-metrics-cards"
import { ChartsSection } from "@/components/charts-section"
import { DataTable } from "@/components/data-table"
import { AuthPage } from "@/components/auth/auth-page"
import { DemoBanner } from "@/components/demo-banner"
import { useAuth } from "@/contexts/auth-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingSpinner } from "@/components/loading-spinner"

// Lazy load less frequently used components
const ReportsPage = lazy(() => import("@/components/pages/reports-page"))
const CampaignsPage = lazy(() => import("@/components/pages/campaigns-page"))
const AudiencesPage = lazy(() => import("@/components/pages/audiences-page"))
const SettingsPage = lazy(() => import("@/components/pages/settings-page"))
const NewReportPage = lazy(() => import("@/components/pages/new-report-page"))
const HelpPage = lazy(() => import("@/components/pages/help-page"))

function DashboardContent() {
  const { user, loading, isDemoMode } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  
  // Use callbacks for event handlers to prevent unnecessary re-renders
  const handleSidebarClose = useCallback(() => setSidebarOpen(false), [])
  const handleMenuClick = useCallback(() => setSidebarOpen(true), [])
  const handleNavigate = useCallback((page: string) => setCurrentPage(page), [])

  // Memoize the dashboard content to prevent unnecessary re-renders
  const dashboardContent = useMemo(() => (
    <div className="space-y-8 animate-fade-in">
      {isDemoMode && <DemoBanner />}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-300">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">Overview of your marketing performance</p>
      </div>
      <div className="transition-transform duration-300 hover:scale-[1.01]">
        <OptimizedMetricsCards />
      </div>
      <div className="rounded-xl shadow-lg bg-white/80 dark:bg-zinc-900/80 p-4 transition-shadow duration-300 hover:shadow-2xl">
        <ChartsSection />
      </div>
      <div className="rounded-xl shadow-lg bg-white/80 dark:bg-zinc-900/80 p-4 transition-shadow duration-300 hover:shadow-2xl">
        <DataTable />
      </div>
    </div>
  ), [isDemoMode])

  // Memoize the content based on currentPage to prevent unnecessary re-renders
  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center animate-pulse">
          <LoadingSpinner size="lg" />
        </div>
      )
    }
  
    if (!user && !isDemoMode) {
      window.location.href = '/login'
      return (
        <div className="min-h-screen flex items-center justify-center animate-pulse">
          <LoadingSpinner size="lg" />
        </div>
      )
    }

    const fallback = (
      <div className="flex items-center justify-center py-10 animate-pulse">
        <LoadingSpinner size="md" />
      </div>
    )

    switch (currentPage) {
      case "dashboard":
        return dashboardContent
      case "reports":
        return (
          <div className="space-y-6 animate-fade-in">
            {isDemoMode && <DemoBanner />}
            <Suspense fallback={fallback}>
              <ReportsPage />
            </Suspense>
          </div>
        )
      case "campaigns":
        return (
          <div className="space-y-6 animate-fade-in">
            {isDemoMode && <DemoBanner />}
            <Suspense fallback={fallback}>
              <CampaignsPage />
            </Suspense>
          </div>
        )
      case "audiences":
        return (
          <div className="space-y-6 animate-fade-in">
            {isDemoMode && <DemoBanner />}
            <Suspense fallback={fallback}>
              <AudiencesPage />
            </Suspense>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-6 animate-fade-in">
            {isDemoMode && <DemoBanner />}
            <Suspense fallback={fallback}>
              <SettingsPage />
            </Suspense>
          </div>
        )
      case "new-report":
        return (
          <div className="space-y-6 animate-fade-in">
            {isDemoMode && <DemoBanner />}
            <Suspense fallback={fallback}>
              <NewReportPage />
            </Suspense>
          </div>
        )
      case "help":
        return (
          <div className="space-y-6 animate-fade-in">
            {isDemoMode && <DemoBanner />}
            <Suspense fallback={fallback}>
              <HelpPage />
            </Suspense>
          </div>
        )
      default:
        return dashboardContent
    }
  }, [currentPage, dashboardContent, isDemoMode, loading, user])

  // Memoize the main layout to prevent unnecessary re-renders
  const MainLayout = useMemo(() => {
    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-pink-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500">
        <Sidebar
          open={sidebarOpen}
          onClose={handleSidebarClose}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={handleMenuClick} />

          <main className="flex-1 overflow-y-auto">
            <div className="p-6">{content}</div>
          </main>
        </div>
      </div>
    )
  }, [sidebarOpen, currentPage, handleSidebarClose, handleNavigate, handleMenuClick, content])
  
  return MainLayout
}

// Memoize the Page component to prevent unnecessary re-renders
const Page = () => {
  return (
    <ErrorBoundary>
      <DashboardContent />
    </ErrorBoundary>
  )
}

// Use memo to optimize the default export
export default React.memo(Page)
