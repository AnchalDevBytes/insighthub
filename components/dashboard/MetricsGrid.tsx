"use client";

import { MetricCard } from "./MetricCard";
import { MetricData } from "@/types/dashboard";

interface MetricsGridProps {
  metrics: MetricData[];
  isLoading?: boolean;
}

export function MetricsGrid({ metrics, isLoading = false }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.id}
          metric={metric}
          isLoading={isLoading}
          index={index}
        />
      ))}
    </div>
  );
}
