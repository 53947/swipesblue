import { Link, useLocation } from "wouter";
import { Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface SubNavTab {
  label: string;
  href: string;
  locked?: boolean;
  requiredTier?: string;
}

interface SubNavTabsProps {
  tabs: SubNavTab[];
}

export default function SubNavTabs({ tabs }: SubNavTabsProps) {
  const [location] = useLocation();

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex gap-6 overflow-x-auto" aria-label="Sub-navigation">
        {tabs.map((tab) => {
          const isActive = location === tab.href;

          if (tab.locked) {
            return (
              <Tooltip key={tab.href}>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1.5 pb-3 text-sm font-semibold text-gray-300 cursor-not-allowed whitespace-nowrap border-b-2 border-transparent select-none">
                    <Lock className="h-3 w-3" />
                    {tab.label}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Requires {tab.requiredTier} plan</p>
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <Link key={tab.href} href={tab.href}>
              <span
                className={`inline-block pb-3 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                  isActive
                    ? "text-[#1844A6] border-[#1844A6]"
                    : "text-gray-500 hover:text-gray-700 border-transparent"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
