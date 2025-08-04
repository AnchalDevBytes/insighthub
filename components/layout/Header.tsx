"use client";

import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HeaderProps {
  onSidebarToggle: () => void;
  isMobile: boolean;
}

export function Header({ onSidebarToggle, isMobile }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800"
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
              className="p-2 lg:hidden cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}

          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              Analytics
            </span>
          </div>
        </div>

        {/* Search */}
        {/* <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search dashboards..."
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>
        </div> */}

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full text-xs"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="flex flex-col items-center justify-center space-y-2 bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 dark:border-gray-800">
                <Bell className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-lg">Notifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Notifications feature is not implemented yet.
                </p>
              </div>
            </PopoverContent>
          </Popover>

          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
