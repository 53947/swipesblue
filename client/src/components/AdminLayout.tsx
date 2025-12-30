import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  Receipt,
  Key,
  Webhook,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Merchants", href: "/admin/merchants", icon: Users },
  { name: "Transactions", href: "/admin/transactions", icon: Receipt },
  { name: "API Keys", href: "/admin/api-keys", icon: Key },
  { name: "Webhooks", href: "/admin/webhooks", icon: Webhook },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" data-testid="admin-layout">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          data-testid="sidebar-backdrop"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        data-testid="sidebar"
      >
        <div className="h-16 flex items-center justify-between gap-2 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white" data-testid="text-logo">SwipesBlue</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            data-testid="button-close-sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-1" data-testid="nav-sidebar">
          {navigation.map((item) => {
            const isActive = location === item.href ||
              (item.href !== "/admin" && location.startsWith(item.href));

            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  onClick={() => setSidebarOpen(false)}
                  data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div>SwipesBlue Admin</div>
            <div>Version 1.0.0</div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            data-testid="button-open-sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="ml-3 font-semibold text-gray-900 dark:text-white">SwipesBlue Admin</span>
        </div>

        <main className="p-6 lg:p-8" data-testid="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
