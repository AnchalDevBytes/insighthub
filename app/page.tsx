"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { ChartCard } from "@/components/charts/ChartCard";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { UserAcquisitionChart } from "@/components/charts/UserAcquisitionChart";
import { ConversionChart } from "@/components/charts/ConversionChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { LoadingSkeleton } from "@/components/dashboard/LoadingSkeleton";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import {
  mockMetrics,
  mockRevenueData,
  mockUserAcquisitionData,
  mockConversionData,
  mockTableData,
} from "@/data/mockData";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: realTimeMetrics, isLoading: metricsLoading } = useRealTimeData(
    mockMetrics,
    15000
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="flex h-screen">
          <Sidebar isCollapsed={true} onToggle={() => {}} isMobile={false} />
          <div className="flex-1 flex flex-col">
            <Header onSidebarToggle={() => {}} isMobile={false} />
            <main className="flex-1 p-6">
              <LoadingSkeleton />
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="flex h-screen">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={handleSidebarToggle}
          isMobile={isMobile}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onSidebarToggle={handleSidebarToggle} isMobile={isMobile} />

          <main className="flex-1 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6 space-y-8"
            >
              {/* Page Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your key metrics and performance insights in real-time.
                </p>
              </motion.div>

              {/* Metrics Grid */}
              <MetricsGrid
                metrics={realTimeMetrics}
                isLoading={metricsLoading}
              />

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Revenue Trends" className="lg:col-span-1">
                  <RevenueChart data={mockRevenueData} />
                </ChartCard>

                <ChartCard title="User Acquisition" className="lg:col-span-1">
                  <UserAcquisitionChart data={mockUserAcquisitionData} />
                </ChartCard>
              </div>

              {/* Conversion Funnel */}
              <ChartCard title="Conversion Funnel">
                <ConversionChart data={mockConversionData} />
              </ChartCard>

              {/* Data Table */}
              <DataTable data={mockTableData} />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
