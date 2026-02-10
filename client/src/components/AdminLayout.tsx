import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  Receipt,
  Key,
  Webhook,
  Menu,
  X,
  ArrowLeft,
  ExternalLink,
  Calculator,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Merchants", href: "/admin/merchants", icon: Users },
  { name: "Transactions", href: "/admin/transactions", icon: Receipt },
  { name: "Rate Management", href: "/admin/rates", icon: Calculator },
  { name: "API Keys", href: "/admin/api-keys", icon: Key },
  { name: "Webhooks", href: "/admin/webhooks", icon: Webhook },
];

const platformLinks = [
  { name: "swipesblue.com", href: "/" },
  { name: "hostsblue.com", href: "https://hostsblue.com", external: true },
  { name: "businessblueprint.io", href: "https://businessblueprint.io", external: true },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAdminAuth();
  const [, setLocationNav] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocationNav("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="admin-layout">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          data-testid="sidebar-backdrop"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 xl:w-72 2xl:w-80 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        data-testid="sidebar"
      >
        {/* Header with Logo */}
        <div className="h-16 flex items-center justify-between gap-2 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#1844A6] to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-gray-900" data-testid="text-logo">Admin</span>
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

        {/* Back to Site Link */}
        <div className="px-4 pt-4">
          <Link href="/">
            <div 
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1844A6] cursor-pointer"
              data-testid="link-back-to-site"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Site</span>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto" data-testid="nav-sidebar">
          {navigation.map((item) => {
            const isActive = location === item.href ||
              (item.href !== "/admin" && location.startsWith(item.href));

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-[7px] text-sm font-medium transition-colors cursor-pointer",
                    isActive
                      ? "bg-[#1844A6] text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  )}
                  onClick={() => setSidebarOpen(false)}
                  data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {item.name}
                </div>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="border-t border-gray-200 my-4" />

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Platforms
            </h4>
            {platformLinks.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-[7px] transition-colors"
                  data-testid={`link-platform-${link.name.toLowerCase().replace(/\./g, '-')}`}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{link.name}</span>
                </a>
              ) : (
                <Link key={link.name} href={link.href}>
                  <div
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-[7px] transition-colors cursor-pointer"
                    data-testid={`link-platform-${link.name.toLowerCase().replace(/\./g, '-')}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>{link.name}</span>
                  </div>
                </Link>
              )
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-gray-500 border-gray-200"
            onClick={handleLogout}
            data-testid="button-admin-logout"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
          <div className="text-xs text-gray-500 space-y-1">
            <div>swipesblue admin</div>
            <div>Version 1.0.0</div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64 xl:pl-72 2xl:pl-80">
        <div className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            data-testid="button-open-sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="ml-3 font-semibold text-gray-900">swipesblue admin</span>
        </div>

        <main className="p-6 lg:p-8" data-testid="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
