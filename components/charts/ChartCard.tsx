"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
  action?: ReactNode;
}

export function ChartCard({
  title,
  children,
  isLoading = false,
  className = "",
  action,
}: ChartCardProps) {
  if (isLoading) {
    return (
      <Card
        className={`bg-white/60 backdrop-blur-sm border-gray-200 dark:bg-gray-800/60 dark:border-gray-700 ${className}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            {action && <Skeleton className="h-8 w-20" />}
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card
        className={`bg-white/60 backdrop-blur-sm border-gray-200 dark:bg-gray-800/60 dark:border-gray-700 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 ${className}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </CardTitle>
            {action}
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
