import { useState } from "react";
import { useLocation } from "wouter";
import { Shield, AlertTriangle, CheckCircle, XCircle, DollarSign, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import MetricCard from "@/components/MetricCard";
import SubNavTabs from "@/components/dashboard/SubNavTabs";

const tabs = [
  { label: "Fraud Rules", href: "/dashboard/fraud" },
  { label: "Flagged Transactions", href: "/dashboard/fraud?tab=flagged" },
  { label: "Settings", href: "/dashboard/fraud?tab=settings" },
];

interface FraudRule {
  id: string;
  name: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  enabled: boolean;
}

interface FlaggedTransaction {
  id: string;
  amount: string;
  customer: string;
  riskScore: number;
  flags: string[];
  date: string;
}

const initialRules: FraudRule[] = [
  { id: "rule-1", name: "Velocity Check", description: "Flags accounts exceeding a set number of transactions within a short time window.", severity: "High", enabled: true },
  { id: "rule-2", name: "AVS Mismatch", description: "Detects when the billing address does not match the address on file with the card issuer.", severity: "Medium", enabled: true },
  { id: "rule-3", name: "CVV Mismatch", description: "Triggers when the CVV code provided does not match the card on file.", severity: "High", enabled: true },
  { id: "rule-4", name: "IP Geolocation", description: "Flags transactions where the IP location differs significantly from the billing address.", severity: "Medium", enabled: false },
  { id: "rule-5", name: "BIN Country Mismatch", description: "Detects when the card-issuing country does not match the customer's billing country.", severity: "Medium", enabled: true },
  { id: "rule-6", name: "Amount Threshold", description: "Flags transactions that exceed a predefined dollar amount for manual review.", severity: "Low", enabled: true },
  { id: "rule-7", name: "Duplicate Detection", description: "Identifies repeated transactions with the same card, amount, and merchant within minutes.", severity: "High", enabled: true },
];

const flaggedTransactions: FlaggedTransaction[] = [
  { id: "FLG-4821", amount: "$2,499.00", customer: "Marcus Chen", riskScore: 87, flags: ["Velocity Check", "Amount Threshold"], date: "2025-10-24" },
  { id: "FLG-4819", amount: "$189.50", customer: "Sarah Johnson", riskScore: 42, flags: ["AVS Mismatch"], date: "2025-10-24" },
  { id: "FLG-4815", amount: "$1,200.00", customer: "Viktor Petrov", riskScore: 91, flags: ["IP Geolocation", "BIN Country Mismatch", "Velocity Check"], date: "2025-10-23" },
  { id: "FLG-4812", amount: "$75.00", customer: "Emily Watson", riskScore: 28, flags: ["Duplicate Detection"], date: "2025-10-23" },
  { id: "FLG-4808", amount: "$649.99", customer: "James Okafor", riskScore: 63, flags: ["CVV Mismatch", "Amount Threshold"], date: "2025-10-22" },
  { id: "FLG-4803", amount: "$3,100.00", customer: "Li Wei", riskScore: 78, flags: ["BIN Country Mismatch", "Amount Threshold", "Velocity Check"], date: "2025-10-22" },
];

function getRiskScoreColor(score: number): string {
  if (score <= 30) return "text-green-600";
  if (score <= 60) return "text-yellow-600";
  return "text-red-600";
}

const severityColors: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-600",
};

export default function FraudPrevention() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "rules";

  const [rules, setRules] = useState<FraudRule[]>(initialRules);
  const [blockThreshold, setBlockThreshold] = useState<number[]>([75]);
  const [reviewThreshold, setReviewThreshold] = useState<number[]>([40]);
  const [highRiskAlerts, setHighRiskAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const toggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fraud Prevention</h1>
          <p className="text-gray-500 mt-1">Real-time fraud detection, rules, and flagged transaction review</p>
        </div>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Risk Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Fraud Rate"
          value="0.12%"
          change="-0.03% from last month"
          changeType="positive"
          icon={Shield}
        />
        <MetricCard
          title="Transactions Blocked"
          value="23"
          change="+5 from last week"
          changeType="negative"
          icon={XCircle}
        />
        <MetricCard
          title="False Positive Rate"
          value="3.2%"
          change="-0.8% from last month"
          changeType="positive"
          icon={TrendingDown}
        />
        <MetricCard
          title="Total Saved"
          value="$8,450"
          change="+$1,200 from last month"
          changeType="positive"
          icon={DollarSign}
        />
      </div>

      {/* Tab: Fraud Rules */}
      {activeTab === "rules" && (
        <div className="space-y-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="bg-white rounded-[7px] border border-gray-200 p-6 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm font-semibold text-gray-900">{rule.name}</h3>
                  <Badge className={`text-xs rounded-full ${severityColors[rule.severity]}`}>
                    {rule.severity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{rule.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm text-gray-500">
                  {rule.enabled ? "Enabled" : "Disabled"}
                </span>
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={() => toggleRule(rule.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Flagged Transactions */}
      {activeTab === "flagged" && (
        <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F6F9FC] border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Transaction ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Risk Score</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Flags</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flaggedTransactions.map((txn) => (
                <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-gray-900">{txn.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{txn.amount}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{txn.customer}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${getRiskScoreColor(txn.riskScore)}`}>
                      {txn.riskScore}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {txn.flags.map((flag) => (
                        <Badge key={flag} variant="outline" className="text-xs rounded-full">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{txn.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white rounded-[7px] text-xs"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-[7px] text-xs"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Block
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          {/* Threshold Sliders */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-8">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Risk Thresholds</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-900">Block Threshold</Label>
                <span className="text-sm font-bold text-red-600">{blockThreshold[0]}</span>
              </div>
              <Slider
                value={blockThreshold}
                onValueChange={setBlockThreshold}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Transactions with a risk score at or above {blockThreshold[0]} will be automatically blocked.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-900">Review Threshold</Label>
                <span className="text-sm font-bold text-yellow-600">{reviewThreshold[0]}</span>
              </div>
              <Slider
                value={reviewThreshold}
                onValueChange={setReviewThreshold}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Transactions with a risk score at or above {reviewThreshold[0]} will be flagged for manual review.
              </p>
            </div>
          </div>

          {/* Email Notification Toggles */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Email Notifications</h3>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-900">High Risk Alerts</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Get notified immediately when a high-risk transaction is detected.
                </p>
              </div>
              <Switch checked={highRiskAlerts} onCheckedChange={setHighRiskAlerts} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-900">Daily Summary</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Receive a daily digest of all flagged and blocked transactions.
                </p>
              </div>
              <Switch checked={dailySummary} onCheckedChange={setDailySummary} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-900">Weekly Report</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Get a comprehensive weekly fraud analytics report every Monday.
                </p>
              </div>
              <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
