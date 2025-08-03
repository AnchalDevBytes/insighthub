"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  TooltipProps,
  PieLabelRenderProps,
} from "recharts";
import { ConversionData } from "@/types/dashboard";
import { motion } from "framer-motion";

interface ConversionChartProps {
  data: ConversionData[];
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: {
    payload: ConversionData;
  }[];
}

export function ConversionChart({ data }: ConversionChartProps) {
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {data.name}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Count: {new Intl.NumberFormat("en-US").format(data.value)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.percentage}% of total
          </p>
        </motion.div>
      );
    }
    return null;
  };

  const renderCustomLabel = (props: PieLabelRenderProps) => {
    const cxNum = Number(props.cx ?? 0);
    const cyNum = Number(props.cy ?? 0);
    const midAngleNum = Number(props.midAngle ?? 0);
    const innerRadiusNum = Number(props.innerRadius ?? 0);
    const outerRadiusNum = Number(props.outerRadius ?? 0);
    const percentNum = Number(props.percent ?? 0);

    if (percentNum < 0.05) return null; // hide labels for small slices

    const RADIAN = Math.PI / 180;
    const radius = innerRadiusNum + (outerRadiusNum - innerRadiusNum) * 0.5;
    const x = cxNum + radius * Math.cos(-midAngleNum * RADIAN);
    const y = cyNum + radius * Math.sin(-midAngleNum * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cxNum ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percentNum * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
