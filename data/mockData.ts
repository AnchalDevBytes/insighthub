import {
  MetricData,
  RevenueData,
  UserAcquisitionData,
  ConversionData,
  TableData,
} from "@/types/dashboard";

export const mockMetrics: MetricData[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: 142850,
    change: 12.5,
    trend: "up",
    icon: "DollarSign",
    prefix: "$",
  },
  {
    id: "users",
    title: "Active Users",
    value: 8492,
    change: -2.3,
    trend: "down",
    icon: "Users",
  },
  {
    id: "conversions",
    title: "Conversions",
    value: 347,
    change: 8.1,
    trend: "up",
    icon: "Target",
  },
  {
    id: "growth",
    title: "Growth Rate",
    value: 15.8,
    change: 4.2,
    trend: "up",
    icon: "TrendingUp",
    suffix: "%",
  },
];

export const mockRevenueData: RevenueData[] = [
  { name: "Jan", revenue: 120000, value: 120000, date: "2024-01-01" },
  { name: "Feb", revenue: 135000, value: 135000, date: "2024-02-01" },
  { name: "Mar", revenue: 128000, value: 128000, date: "2024-03-01" },
  { name: "Apr", revenue: 142000, value: 142000, date: "2024-04-01" },
  { name: "May", revenue: 156000, value: 156000, date: "2024-05-01" },
  { name: "Jun", revenue: 148000, value: 148000, date: "2024-06-01" },
  { name: "Jul", revenue: 162000, value: 162000, date: "2024-07-01" },
  { name: "Aug", revenue: 175000, value: 175000, date: "2024-08-01" },
  { name: "Sep", revenue: 168000, value: 168000, date: "2024-09-01" },
  { name: "Oct", revenue: 182000, value: 182000, date: "2024-10-01" },
  { name: "Nov", revenue: 195000, value: 195000, date: "2024-11-01" },
  { name: "Dec", revenue: 210000, value: 210000, date: "2024-12-01" },
];

export const mockUserAcquisitionData: UserAcquisitionData[] = [
  {
    name: "Organic Search",
    channel: "organic",
    users: 3420,
    value: 3420,
    color: "#8884d8",
  },
  {
    name: "Paid Search",
    channel: "paid",
    users: 2340,
    value: 2340,
    color: "#82ca9d",
  },
  {
    name: "Social Media",
    channel: "social",
    users: 1890,
    value: 1890,
    color: "#ffc658",
  },
  {
    name: "Email",
    channel: "email",
    users: 1250,
    value: 1250,
    color: "#ff7300",
  },
  {
    name: "Direct",
    channel: "direct",
    users: 980,
    value: 980,
    color: "#00ff00",
  },
  {
    name: "Referral",
    channel: "referral",
    users: 640,
    value: 640,
    color: "#0088fe",
  },
];

export const mockConversionData: ConversionData[] = [
  {
    name: "Visitors",
    stage: "visitors",
    value: 10000,
    percentage: 100,
    color: "#8884d8",
  },
  {
    name: "Leads",
    stage: "leads",
    value: 2500,
    percentage: 25,
    color: "#82ca9d",
  },
  {
    name: "Prospects",
    stage: "prospects",
    value: 750,
    percentage: 7.5,
    color: "#ffc658",
  },
  {
    name: "Customers",
    stage: "customers",
    value: 150,
    percentage: 1.5,
    color: "#ff7300",
  },
];

export const mockTableData: TableData[] = [
  {
    id: "1",
    date: "2024-12-01",
    campaign: "Holiday Sale 2024",
    channel: "Google Ads",
    impressions: 45230,
    clicks: 1820,
    conversions: 73,
    revenue: 14650,
    ctr: 4.02,
    cpa: 200.68,
  },
  {
    id: "2",
    date: "2024-12-01",
    campaign: "Brand Awareness",
    channel: "Facebook Ads",
    impressions: 32150,
    clicks: 960,
    conversions: 24,
    revenue: 4800,
    ctr: 2.99,
    cpa: 200.0,
  },
  {
    id: "3",
    date: "2024-12-01",
    campaign: "Product Launch",
    channel: "LinkedIn Ads",
    impressions: 12400,
    clicks: 620,
    conversions: 31,
    revenue: 9300,
    ctr: 5.0,
    cpa: 300.0,
  },
  {
    id: "4",
    date: "2024-11-30",
    campaign: "Retargeting",
    channel: "Google Ads",
    impressions: 28900,
    clicks: 1445,
    conversions: 87,
    revenue: 17400,
    ctr: 5.0,
    cpa: 200.0,
  },
  {
    id: "5",
    date: "2024-11-30",
    campaign: "Email Newsletter",
    channel: "Email",
    impressions: 15600,
    clicks: 780,
    conversions: 39,
    revenue: 7800,
    ctr: 5.0,
    cpa: 200.0,
  },
];

export const generateRandomMetricUpdate = (metric: MetricData): MetricData => {
  const variance = 0.05; // 5% variance
  const randomChange = (Math.random() - 0.5) * variance * 2;
  const newValue = Math.round(metric.value * (1 + randomChange));
  const newChange = parseFloat((randomChange * 100).toFixed(1));

  return {
    ...metric,
    value: newValue,
    change: newChange,
    trend: newChange > 0 ? "up" : newChange < 0 ? "down" : "neutral",
  };
};
