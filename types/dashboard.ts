import { LucideIcon } from "lucide-react";

export interface MetricData {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  color?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface RevenueData extends ChartDataPoint {
  revenue: number;
  date: string;
}

export interface UserAcquisitionData extends ChartDataPoint {
  channel: string;
  users: number;
  color: string;
}

export interface ConversionData extends ChartDataPoint {
  stage: string;
  value: number;
  percentage: number;
  color: string;
}

export interface TableData {
  id: string;
  date: string;
  campaign: string;
  channel: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  cpa: number;
}

export interface FilterOptions {
  dateRange: {
    from: Date;
    to: Date;
  };
  channel: string[];
  campaign: string[];
}
