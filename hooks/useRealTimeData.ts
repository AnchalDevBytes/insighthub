"use client";

import { useState, useEffect, useCallback } from "react";
// import { generateRandomMetricUpdate } from "@/data/mockData";
import { MetricData } from "@/types/dashboard";

export function useRealTimeData(
  initialData: MetricData[],
  interval: number = 10000
) {
  const [data, setData] = useState<MetricData[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  // const updateData = useCallback(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setData((prevData) =>
  //       prevData.map((metric) => generateRandomMetricUpdate(metric))
  //     );
  //     setIsLoading(false);
  //   }, 500);
  // }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(updateData, interval);
  //   return () => clearInterval(intervalId);
  // }, [updateData, interval]);

  return { data, isLoading };
}
