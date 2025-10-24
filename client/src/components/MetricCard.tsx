import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export default function MetricCard({ title, value, change, changeType = "neutral", icon: Icon }: MetricCardProps) {
  const changeColor = changeType === "positive" ? "#00FF40" : changeType === "negative" ? "#FF0040" : "#666666";
  
  return (
    <Card className="hover-elevate">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-5 w-5" style={{ color: "#0000FF" }} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold" style={{ color: "#0000FF" }}>{value}</div>
        {change && (
          <p className="text-xs mt-1" style={{ color: changeColor }}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
