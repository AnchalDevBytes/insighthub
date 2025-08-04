"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  CalendarIcon,
} from "lucide-react";
import { TableData } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DataTableProps {
  data: TableData[];
}

type SortField = keyof TableData;
type SortDirection = "asc" | "desc" | null;

export function DataTable({ data }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // filter states
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Get all unique channels for filter options
  const allChannels = useMemo(() => {
    const channels = new Set<string>();
    data.forEach((item) => channels.add(item.channel));
    return Array.from(channels);
  }, [data]);

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // date range filter
    if (dateRange?.from || dateRange?.to) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        if (dateRange.from && itemDate < dateRange.from) return false;
        if (dateRange.to && itemDate > dateRange.to) return false;
        return true;
      });
    }

    // channel filter
    if (selectedChannels.length > 0) {
      filtered = filtered.filter((item) =>
        selectedChannels.includes(item.channel)
      );
    }

    // Sorting
    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        const aString = aValue.toString().toLowerCase();
        const bString = bValue.toString().toLowerCase();

        if (sortDirection === "asc") {
          return aString.localeCompare(bString);
        } else {
          return bString.localeCompare(aString);
        }
      });
    }

    return filtered;
  }, [data, searchTerm, sortField, sortDirection, dateRange, selectedChannels]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="w-4 h-4 text-blue-600" />;
    }
    if (sortDirection === "desc") {
      return <ArrowDown className="w-4 h-4 text-blue-600" />;
    }
    return <ArrowUpDown className="w-4 h-4 opacity-50" />;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getChannelBadgeVariant = (channel: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      "Google Ads": "default",
      "Facebook Ads": "secondary",
      "LinkedIn Ads": "outline",
      Email: "destructive",
    };
    return variants[channel] || "outline";
  };

  const handleChannelToggle = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const resetFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setSelectedChannels([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-white/60 backdrop-blur-sm border-gray-200 dark:bg-gray-800/60 dark:border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Campaign Performance
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-gray-50 dark:bg-gray-800"
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                    {(dateRange?.from ||
                      dateRange?.to ||
                      selectedChannels.length > 0) && (
                      <span className="ml-2 w-2 h-2 rounded-full bg-blue-500"></span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Filters</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="text-xs h-6 px-2"
                      >
                        Reset
                      </Button>
                    </div>

                    {/* Date Range Filter */}
                    <div>
                      <Label className="block mb-2 text-sm font-medium">
                        Date Range
                      </Label>
                      <Popover
                        open={isDatePickerOpen}
                        onOpenChange={setIsDatePickerOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {dateRange?.from ? (
                              dateRange.to ? (
                                <>
                                  {format(dateRange.from, "MMM dd")} -{" "}
                                  {format(dateRange.to, "MMM dd, yyyy")}
                                </>
                              ) : (
                                format(dateRange.from, "MMM dd, yyyy")
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={1}
                            onDayClick={() => setIsDatePickerOpen(false)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Channel Filter */}
                    <div>
                      <Label className="block mb-2 text-sm font-medium">
                        Channels
                      </Label>
                      <div className="space-y-2">
                        {allChannels.map((channel) => (
                          <div
                            key={channel}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`channel-${channel}`}
                              checked={selectedChannels.includes(channel)}
                              onCheckedChange={() =>
                                handleChannelToggle(channel)
                              }
                            />
                            <Label
                              htmlFor={`channel-${channel}`}
                              className="text-sm"
                            >
                              {channel}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      {getSortIcon("date")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort("campaign")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Campaign</span>
                      {getSortIcon("campaign")}
                    </div>
                  </TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-right"
                    onClick={() => handleSort("impressions")}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>Impressions</span>
                      {getSortIcon("impressions")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-right"
                    onClick={() => handleSort("clicks")}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>Clicks</span>
                      {getSortIcon("clicks")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-right"
                    onClick={() => handleSort("ctr")}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>CTR</span>
                      {getSortIcon("ctr")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-right"
                    onClick={() => handleSort("conversions")}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>Conversions</span>
                      {getSortIcon("conversions")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-right"
                    onClick={() => handleSort("revenue")}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>Revenue</span>
                      {getSortIcon("revenue")}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {new Date(row.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="max-w-48 truncate">
                      {row.campaign}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getChannelBadgeVariant(row.channel)}
                        className="text-xs"
                      >
                        {row.channel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("en-US").format(row.impressions)}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("en-US").format(row.clicks)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPercentage(row.ctr)}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.conversions}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(row.revenue)}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredAndSortedData.length
                )}{" "}
                of {filteredAndSortedData.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                  )
                  .map((page, index, array) => (
                    <div key={page} className="flex items-center">
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          "w-8 h-8 p-0",
                          currentPage === page &&
                            "bg-blue-600 hover:bg-blue-700"
                        )}
                      >
                        {page}
                      </Button>
                    </div>
                  ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
