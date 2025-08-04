"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  PanelLeftOpen,
  PanelLeftClose,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

interface NavigationItem {
  icon: LucideIcon;
  label: string;
  href: string;
  active?: boolean;
  disabled?: boolean;
}

const navigationItems: NavigationItem[] = [
  { icon: BarChart3, label: "Analytics Dashboard", href: "/", active: true },
];

export function Sidebar({
  isCollapsed,
  onToggle,
  isMobile = false,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? (isMobile ? 0 : 80) : 280,
          x: isMobile && isCollapsed ? -280 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white/80 backdrop-blur-lg border-r border-gray-200",
          "dark:bg-gray-900/80 dark:border-gray-800",
          "lg:relative lg:z-auto",
          isMobile ? "lg:hidden" : ""
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 font-bold text-blue-600 dark:text-white" />
                </div>
                {/* <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  InsightHub
                </span> */}
              </motion.div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-2 cursor-pointer"
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant={item.active ? "outline" : "ghost"}
                  className={cn(
                    "w-full justify-start h-12 text-left transition-all duration-200 cursor-pointer",
                    isCollapsed ? "px-3" : "px-4",
                    item.active
                      ? "text-slate-800 dark:text-slate-50"
                      : "hover:shadow hover:bg-slate-100"
                  )}
                >
                  <item.icon
                    className={cn("w-5 h-5", isCollapsed ? "" : "mr-3")}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 dark:text-slate-50 text-slate-50 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">D</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    Dummy
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    dummy@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
