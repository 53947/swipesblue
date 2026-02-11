import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export interface SidebarSubItem {
  name: string;
  href: string;
}

export interface SidebarNavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: "green" | "blue" | "gray" | "tier";
  badgeTooltip?: string;
  locked?: boolean;
  subItems?: SidebarSubItem[];
}

const badgeStyles: Record<string, string> = {
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-gray-200 text-gray-600",
  tier: "bg-[#1844A6] text-white",
};

interface SidebarNavLinkProps {
  item: SidebarNavItem;
}

export function SidebarNavLink({ item }: SidebarNavLinkProps) {
  const [location] = useLocation();
  const [expanded, setExpanded] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const isActive =
    location === item.href ||
    (item.href !== "/dashboard" && location.startsWith(item.href + "/")) ||
    (hasSubItems && item.subItems!.some((sub) => location === sub.href));

  const isExactActive = location === item.href;
  const Icon = item.icon;

  // Auto-expand if a sub-item is active
  const subItemActive = hasSubItems && item.subItems!.some((sub) => location === sub.href);
  const isOpen = expanded || subItemActive;

  const handleParentClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      // If clicking the chevron area or already on this page, toggle dropdown
      // Otherwise navigate AND expand
      if (isExactActive) {
        e.preventDefault();
        setExpanded(!isOpen);
      } else {
        setExpanded(true);
      }
    }
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!isOpen);
  };

  return (
    <div>
      <Link href={item.href}>
        <div
          onClick={handleParentClick}
          className={`flex items-center gap-3 px-3 py-2 rounded-[7px] text-sm transition-colors cursor-pointer hover-elevate ${
            isExactActive
              ? "bg-[#1844A6] text-white"
              : isActive
              ? "bg-[#1844A6]/10 text-[#1844A6]"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span className="flex-1 whitespace-nowrap">{item.name}</span>

          {item.badge && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  className={`text-[10px] px-1.5 py-0 no-default-hover-elevate ${item.badgeTooltip ? "cursor-help" : ""} ${
                    badgeStyles[item.badgeVariant || "gray"]
                  }`}
                >
                  {item.badge}
                </Badge>
              </TooltipTrigger>
              {item.badgeTooltip && (
                <TooltipContent side="right" className="text-xs max-w-48">
                  {item.badgeTooltip}
                </TooltipContent>
              )}
            </Tooltip>
          )}

          {item.locked && (
            <Lock className="h-4 w-4 text-gray-400 shrink-0" />
          )}

          {hasSubItems && (
            <button
              onClick={handleChevronClick}
              className="p-0.5 -mr-1 rounded hover:bg-white/20 transition-colors"
              aria-label={isOpen ? "Collapse" : "Expand"}
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                } ${isExactActive ? "text-white/70" : "text-gray-400"}`}
              />
            </button>
          )}
        </div>
      </Link>

      {/* Sub-items dropdown */}
      {hasSubItems && isOpen && (
        <div className="ml-4 mt-0.5 space-y-0.5 border-l border-gray-200 pl-3">
          {item.subItems!.map((sub) => {
            const isSubActive = location === sub.href;
            return (
              <Link key={sub.href} href={sub.href}>
                <div
                  className={`px-3 py-1.5 text-sm rounded-[7px] cursor-pointer transition-colors ${
                    isSubActive
                      ? "text-[#1844A6] font-medium bg-[#1844A6]/5"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {sub.name}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SidebarSectionGroupProps {
  title: string;
  children: React.ReactNode;
}

export function SidebarSectionGroup({ title, children }: SidebarSectionGroupProps) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
        {title}
      </h4>
      <nav className="space-y-0.5">{children}</nav>
    </div>
  );
}
