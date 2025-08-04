"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MetricData } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { FollowerPointerCard } from "../ui/following-pointer";

interface MetricCardProps {
  metric: MetricData;
  isLoading?: boolean;
  index?: number;
}

export function MetricCard({
  metric,
  isLoading = false,
  index = 0,
}: MetricCardProps) {
  const formatValue = (value: number) => {
    if (metric.prefix === "$") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    if (metric.suffix === "%") {
      return `${value}%`;
    }
    return new Intl.NumberFormat("en-US").format(value);
  };

  const getTrendIcon = () => {
    switch (metric.trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />;
      case "down":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    switch (metric.trend) {
      case "up":
        return "text-green-600 dark:text-green-400";
      case "down":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-gray-200 dark:bg-gray-800/60 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      {/* Grid Background - Added this div */}
      <div
        className={cn(
          "absolute inset-0 -z-10 rounded-lg overflow-hidden",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#d1d1d6_1px,transparent_1px),linear-gradient(to_bottom,#d1d1d6_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_10%),linear-gradient(to_bottom,#262626_1px,transparent_10%)]",
          "bg-white dark:bg-black"
        )}
      />

      {/* Radial gradient overlay - Added this div */}
      <div className="absolute inset-0 -z-10 rounded-lg overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] bg-transparent" />

      <FollowerPointerCard title={metric.title}>
        <Card className="bg-white/90 border-gray-200 dark:bg-gray-900/90 dark:border-gray-700 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {metric.title}
                  </h3>
                </div>

                <motion.div
                  key={metric.value}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                >
                  {formatValue(metric.value)}
                </motion.div>

                <div
                  className={cn("flex items-center space-x-1", getTrendColor())}
                >
                  {getTrendIcon()}
                  <span className="text-sm font-medium">
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    vs last month
                  </span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
              >
                <div style={{ color: metric.color }} className={`w-6 h-6`}>
                  <metric.icon />
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </FollowerPointerCard>
    </motion.div>
  );
}
