import { useState, useRef } from "react";
import { useLocation } from "wouter";
import {
  RefreshCw,
  Plus,
  DollarSign,
  Users,
  TrendingDown,
  CreditCard,
  Eye,
  Edit,
  Pause,
  Play,
  Copy,
  Trash2,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  HelpCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MetricCard from "@/components/MetricCard";
import SubNavTabs from "@/components/dashboard/SubNavTabs";
import { useToast } from "@/hooks/use-toast";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";
import FeatureMarketingPage from "@/components/dashboard/FeatureMarketingPage";

const tabs = [
  { label: "Active Subscriptions", href: "/dashboard/subscriptions" },
  { label: "Paused", href: "/dashboard/subscriptions?tab=paused" },
  { label: "Past Due", href: "/dashboard/subscriptions?tab=pastdue" },
  { label: "Cancelled", href: "/dashboard/subscriptions?tab=cancelled" },
  { label: "Templates", href: "/dashboard/subscriptions?tab=templates" },
  { label: "Migration", href: "/dashboard/subscriptions?tab=migration" },
  { label: "Simulator", href: "/dashboard/subscriptions?tab=simulator" },
  { label: "All", href: "/dashboard/subscriptions?tab=all" },
];

type SubscriptionStatus = "Active" | "Paused" | "Cancelled" | "Past Due";
type BillingFrequency = "Monthly" | "Weekly" | "Annual";

interface Subscription {
  id: string;
  planName: string;
  customer: string;
  email: string;
  amount: number;
  frequency: BillingFrequency;
  nextBilling: string;
  startDate: string;
  status: SubscriptionStatus;
}

const initialSubscriptions: Subscription[] = [
  { id: "SUB-001", planName: "Business Pro", customer: "Greenfield Industries", email: "billing@greenfield.com", amount: 249.00, frequency: "Monthly", nextBilling: "2026-03-01", startDate: "2025-06-01", status: "Active" },
  { id: "SUB-002", planName: "Growth Plan", customer: "Maria Gonzalez", email: "maria@example.com", amount: 29.99, frequency: "Monthly", nextBilling: "2026-02-15", startDate: "2025-08-15", status: "Active" },
  { id: "SUB-003", planName: "Enterprise Suite", customer: "Pinnacle Health Group", email: "accounts@pinnaclehealth.com", amount: 1499.00, frequency: "Annual", nextBilling: "2026-11-20", startDate: "2025-11-20", status: "Active" },
  { id: "SUB-004", planName: "Growth Plan", customer: "Hartley & Associates", email: "admin@hartley.com", amount: 99.00, frequency: "Monthly", nextBilling: "2026-02-28", startDate: "2025-04-28", status: "Paused" },
  { id: "SUB-005", planName: "Basic Weekly", customer: "QuickServe Logistics", email: "pay@quickserve.com", amount: 19.99, frequency: "Weekly", nextBilling: "2026-02-12", startDate: "2025-12-01", status: "Active" },
  { id: "SUB-006", planName: "Premium Plan", customer: "Lakewood Dental", email: "office@lakewooddental.com", amount: 199.00, frequency: "Monthly", nextBilling: "2026-03-05", startDate: "2025-03-05", status: "Past Due" },
  { id: "SUB-007", planName: "Growth Plan", customer: "Tom Richardson", email: "tom@richardson.net", amount: 29.99, frequency: "Monthly", nextBilling: "—", startDate: "2025-01-15", status: "Cancelled" },
  { id: "SUB-008", planName: "Annual Pro", customer: "Eastside Fitness", email: "manager@eastsidefitness.com", amount: 899.00, frequency: "Annual", nextBilling: "2026-08-14", startDate: "2025-08-14", status: "Active" },
  { id: "SUB-009", planName: "Growth Plan", customer: "Bright Minds Academy", email: "billing@brightminds.edu", amount: 99.00, frequency: "Monthly", nextBilling: "2026-02-22", startDate: "2025-07-22", status: "Paused" },
  { id: "SUB-010", planName: "Weekly Essentials", customer: "NovaTech Solutions", email: "finance@novatech.io", amount: 49.99, frequency: "Weekly", nextBilling: "2026-02-10", startDate: "2025-10-10", status: "Active" },
];

const statusColors: Record<SubscriptionStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Paused: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-gray-100 text-gray-600",
  "Past Due": "bg-red-100 text-red-600",
};

/* ─── Templates ─── */

interface SubscriptionTemplate {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  frequency: BillingFrequency;
  trialDays: number;
  autoRenewal: boolean;
  status: "Active" | "Draft";
}

const initialTemplates: SubscriptionTemplate[] = [
  { id: "TPL-001", name: "Monthly Essential", description: "Basic monthly subscription for small businesses", amount: 29.99, currency: "USD", frequency: "Monthly", trialDays: 14, autoRenewal: true, status: "Active" },
  { id: "TPL-002", name: "Annual Pro", description: "Annual plan with 20% savings over monthly", amount: 287.88, currency: "USD", frequency: "Annual", trialDays: 30, autoRenewal: true, status: "Active" },
  { id: "TPL-003", name: "Weekly Service", description: "Weekly billing for recurring service providers", amount: 19.99, currency: "USD", frequency: "Weekly", trialDays: 7, autoRenewal: true, status: "Active" },
  { id: "TPL-004", name: "Premium Monthly", description: "Full-featured monthly plan with priority support", amount: 149.00, currency: "USD", frequency: "Monthly", trialDays: 14, autoRenewal: true, status: "Active" },
  { id: "TPL-005", name: "Enterprise Annual", description: "Annual enterprise plan with dedicated account management", amount: 1499.00, currency: "USD", frequency: "Annual", trialDays: 30, autoRenewal: false, status: "Active" },
  { id: "TPL-006", name: "Starter Weekly", description: "Low-cost weekly plan for new customers", amount: 9.99, currency: "USD", frequency: "Weekly", trialDays: 7, autoRenewal: true, status: "Draft" },
  { id: "TPL-007", name: "Seasonal Monthly", description: "Seasonal offering with promotional pricing", amount: 49.99, currency: "USD", frequency: "Monthly", trialDays: 0, autoRenewal: false, status: "Draft" },
];

/* ─── Migration ─── */

interface MigrationRow {
  row: number;
  customerName: string;
  email: string;
  planName: string;
  amount: string;
  frequency: string;
  valid: boolean;
  error?: string;
}

const mockValidationResults: MigrationRow[] = [
  { row: 1, customerName: "Greenfield Industries", email: "billing@greenfield.com", planName: "Business Pro", amount: "$249.00", frequency: "Monthly", valid: true },
  { row: 2, customerName: "Maria Gonzalez", email: "maria@example.com", planName: "Growth Plan", amount: "$29.99", frequency: "Monthly", valid: true },
  { row: 3, customerName: "Pinnacle Health", email: "accounts@pinnacle.com", planName: "Enterprise Suite", amount: "$1,499.00", frequency: "Annual", valid: true },
  { row: 4, customerName: "Hartley & Associates", email: "admin@hartley.com", planName: "Growth Plan", amount: "$99.00", frequency: "Monthly", valid: true },
  { row: 5, customerName: "QuickServe Logistics", email: "pay@quickserve.com", planName: "Basic Weekly", amount: "$19.99", frequency: "Weekly", valid: true },
  { row: 6, customerName: "Lakewood Dental", email: "", planName: "Premium Plan", amount: "$199.00", frequency: "Monthly", valid: false, error: "Missing email address" },
  { row: 7, customerName: "Tom Richardson", email: "tom@richardson.net", planName: "Growth Plan", amount: "$29.99", frequency: "Monthly", valid: true },
  { row: 8, customerName: "Eastside Fitness", email: "manager@eastside.com", planName: "Annual Pro", amount: "$899.00", frequency: "Annual", valid: true },
  { row: 9, customerName: "Bright Minds Academy", email: "billing@brightminds.edu", planName: "Growth Plan", amount: "invalid", frequency: "Monthly", valid: false, error: "Invalid amount format" },
  { row: 10, customerName: "NovaTech Solutions", email: "finance@novatech.io", planName: "Weekly Essentials", amount: "$49.99", frequency: "Weekly", valid: true },
];

const supportedPlatforms = [
  "Stripe", "Square", "PayPal", "Recurly", "Chargebee", "Braintree", "Authorize.net", "GoCardless",
];

/* ─── Simulator ─── */

interface SimEvent {
  date: string;
  type: "invoice_created" | "payment_attempted" | "payment_succeeded" | "payment_failed" | "subscription_renewed" | "trial_ended" | "subscription_cancelled";
  description: string;
}

interface SimSubscription {
  customerName: string;
  planName: string;
  amount: number;
  frequency: BillingFrequency;
}

interface Simulation {
  id: string;
  name: string;
  startDate: string;
  currentDate: string;
  customers: number;
  subscriptions: SimSubscription[];
  events: SimEvent[];
  status: "Running" | "Paused" | "Completed";
}

const initialSimulations: Simulation[] = [
  {
    id: "SIM-001",
    name: "Q1 Launch Scenario",
    startDate: "2026-01-01",
    currentDate: "2026-03-15",
    customers: 4,
    subscriptions: [
      { customerName: "Test Co", planName: "Monthly Essential", amount: 29.99, frequency: "Monthly" },
      { customerName: "Demo LLC", planName: "Annual Pro", amount: 287.88, frequency: "Annual" },
      { customerName: "Sample Inc", planName: "Premium Monthly", amount: 149.00, frequency: "Monthly" },
      { customerName: "Trial Corp", planName: "Weekly Service", amount: 19.99, frequency: "Weekly" },
    ],
    events: [
      { date: "2026-01-01", type: "subscription_renewed", description: "Test Co — Monthly Essential renewed ($29.99)" },
      { date: "2026-01-01", type: "payment_succeeded", description: "Payment succeeded for Test Co ($29.99)" },
      { date: "2026-01-08", type: "invoice_created", description: "Invoice INV-SIM-002 created for Trial Corp ($19.99)" },
      { date: "2026-01-08", type: "payment_succeeded", description: "Payment succeeded for Trial Corp ($19.99)" },
      { date: "2026-01-15", type: "trial_ended", description: "Trial ended for Demo LLC — first billing begins" },
      { date: "2026-02-01", type: "subscription_renewed", description: "Test Co — Monthly Essential renewed ($29.99)" },
      { date: "2026-02-01", type: "payment_succeeded", description: "Payment succeeded for Test Co ($29.99)" },
      { date: "2026-02-01", type: "payment_failed", description: "Payment failed for Sample Inc ($149.00) — card declined" },
      { date: "2026-02-03", type: "payment_attempted", description: "Retry #1: Payment attempted for Sample Inc ($149.00)" },
      { date: "2026-02-03", type: "payment_succeeded", description: "Payment succeeded for Sample Inc ($149.00)" },
      { date: "2026-03-01", type: "subscription_renewed", description: "Test Co — Monthly Essential renewed ($29.99)" },
      { date: "2026-03-01", type: "payment_succeeded", description: "Payment succeeded for Test Co ($29.99)" },
    ],
    status: "Running",
  },
  {
    id: "SIM-002",
    name: "Churn Analysis",
    startDate: "2025-10-01",
    currentDate: "2026-01-15",
    customers: 2,
    subscriptions: [
      { customerName: "Churn Test A", planName: "Growth Plan", amount: 99.00, frequency: "Monthly" },
      { customerName: "Churn Test B", planName: "Basic Weekly", amount: 19.99, frequency: "Weekly" },
    ],
    events: [
      { date: "2025-10-01", type: "subscription_renewed", description: "Churn Test A — Growth Plan renewed ($99.00)" },
      { date: "2025-10-01", type: "payment_succeeded", description: "Payment succeeded for Churn Test A ($99.00)" },
      { date: "2025-11-01", type: "payment_failed", description: "Payment failed for Churn Test A ($99.00) — insufficient funds" },
      { date: "2025-11-03", type: "payment_failed", description: "Retry #1 failed for Churn Test A ($99.00)" },
      { date: "2025-11-07", type: "payment_failed", description: "Retry #2 failed for Churn Test A ($99.00)" },
      { date: "2025-11-14", type: "subscription_cancelled", description: "Churn Test A — subscription cancelled after 3 failed payments" },
      { date: "2025-12-01", type: "payment_succeeded", description: "Payment succeeded for Churn Test B ($19.99)" },
    ],
    status: "Completed",
  },
  {
    id: "SIM-003",
    name: "Trial Conversion Test",
    startDate: "2026-02-01",
    currentDate: "2026-02-10",
    customers: 3,
    subscriptions: [
      { customerName: "Trial User 1", planName: "Monthly Essential", amount: 29.99, frequency: "Monthly" },
      { customerName: "Trial User 2", planName: "Premium Monthly", amount: 149.00, frequency: "Monthly" },
      { customerName: "Trial User 3", planName: "Weekly Service", amount: 19.99, frequency: "Weekly" },
    ],
    events: [
      { date: "2026-02-01", type: "invoice_created", description: "Trial started for Trial User 1 — Monthly Essential (14-day trial)" },
      { date: "2026-02-01", type: "invoice_created", description: "Trial started for Trial User 2 — Premium Monthly (14-day trial)" },
      { date: "2026-02-01", type: "invoice_created", description: "Trial started for Trial User 3 — Weekly Service (7-day trial)" },
      { date: "2026-02-08", type: "trial_ended", description: "Trial ended for Trial User 3 — first billing begins" },
      { date: "2026-02-08", type: "payment_succeeded", description: "Payment succeeded for Trial User 3 ($19.99)" },
    ],
    status: "Running",
  },
];

const eventTypeLabels: Record<SimEvent["type"], { label: string; color: string }> = {
  invoice_created: { label: "Invoice", color: "text-blue-600 bg-blue-50" },
  payment_attempted: { label: "Attempt", color: "text-yellow-600 bg-yellow-50" },
  payment_succeeded: { label: "Paid", color: "text-green-600 bg-green-50" },
  payment_failed: { label: "Failed", color: "text-red-600 bg-red-50" },
  subscription_renewed: { label: "Renewed", color: "text-[#1844A6] bg-[#1844A6]/10" },
  trial_ended: { label: "Trial End", color: "text-orange-600 bg-orange-50" },
  subscription_cancelled: { label: "Cancelled", color: "text-gray-600 bg-gray-100" },
};

/* ─── Helpers ─── */

function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function formatDate(dateStr: string) {
  if (dateStr === "—") return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function advanceDate(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

/* ─── Component ─── */

export default function Subscriptions() {
  const { tier, canAccess } = useMerchantAuth();
  const [location] = useLocation();
  const { toast } = useToast();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "active";

  /* Subscription state */
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [viewSub, setViewSub] = useState<Subscription | null>(null);
  const [editSub, setEditSub] = useState<Subscription | null>(null);
  const [editPlanName, setEditPlanName] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editFrequency, setEditFrequency] = useState<BillingFrequency>("Monthly");

  /* Create subscription state */
  const [showCreateSub, setShowCreateSub] = useState(false);
  const [createPlanName, setCreatePlanName] = useState("");
  const [createCustomer, setCreateCustomer] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createAmount, setCreateAmount] = useState("");
  const [createFrequency, setCreateFrequency] = useState<BillingFrequency>("Monthly");

  /* Template state */
  const [templates, setTemplates] = useState<SubscriptionTemplate[]>(initialTemplates);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [editTemplateData, setEditTemplateData] = useState<SubscriptionTemplate | null>(null);
  const [tplName, setTplName] = useState("");
  const [tplDescription, setTplDescription] = useState("");
  const [tplAmount, setTplAmount] = useState("");
  const [tplCurrency, setTplCurrency] = useState("USD");
  const [tplFrequency, setTplFrequency] = useState<BillingFrequency>("Monthly");
  const [tplTrialDays, setTplTrialDays] = useState("14");
  const [tplAutoRenewal, setTplAutoRenewal] = useState(true);

  /* Migration state */
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Simulator state */
  const [simulations, setSimulations] = useState<Simulation[]>(initialSimulations);
  const [expandedSim, setExpandedSim] = useState<string | null>(null);
  const [newSimName, setNewSimName] = useState("");
  const [newSimDate, setNewSimDate] = useState("2026-03-01");

  // Tier gate: requires Growth
  if (!canAccess("Growth")) {
    return (
      <FeatureMarketingPage
        featureName="Subscriptions"
        headline="Revenue you can count on. Every month."
        description="Automate recurring billing so you can focus on growing your business, not chasing payments. Set up subscriptions in minutes, and let swipesblue handle the rest — billing, retries, reminders, and reporting."
        benefits={[
          "Automated recurring billing on any schedule",
          "Flexible frequencies: weekly, monthly, annual",
          "Pause, resume, and cancel with one click",
          "Real-time subscription analytics and MRR tracking",
          "Past-due management with automatic retry logic",
          "Migration tools to import from other platforms",
          "Subscription templates for quick setup",
        ]}
        requiredTier="Growth"
        currentTier={tier}
        price="$29/month"
        ctaText="Upgrade to Growth — $29/month"
        ctaLink="/dashboard/settings?tab=billing"
      />
    );
  }

  /* ─── Subscription handlers ─── */

  const openEditModal = (sub: Subscription) => {
    setEditSub(sub);
    setEditPlanName(sub.planName);
    setEditAmount(sub.amount.toString());
    setEditFrequency(sub.frequency);
  };

  const handleSaveEdit = () => {
    if (!editSub) return;
    setSubscriptions((prev) =>
      prev.map((s) =>
        s.id === editSub.id
          ? { ...s, planName: editPlanName, amount: parseFloat(editAmount) || s.amount, frequency: editFrequency }
          : s
      )
    );
    toast({ title: "Subscription updated", description: `${editSub.id} has been updated successfully.` });
    setEditSub(null);
  };

  const handlePause = (sub: Subscription) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, status: "Paused" as SubscriptionStatus } : s))
    );
    toast({ title: "Subscription paused", description: `${sub.planName} for ${sub.customer} has been paused.` });
  };

  const handleResume = (sub: Subscription) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, status: "Active" as SubscriptionStatus } : s))
    );
    toast({ title: "Subscription resumed", description: `${sub.planName} for ${sub.customer} is now active.` });
  };

  const handleCreateSub = () => {
    setCreatePlanName("");
    setCreateCustomer("");
    setCreateEmail("");
    setCreateAmount("");
    setCreateFrequency("Monthly");
    setShowCreateSub(true);
  };

  const handleSaveCreateSub = () => {
    const amount = parseFloat(createAmount);
    if (!createPlanName || !createCustomer || !createEmail || isNaN(amount)) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    const newSub: Subscription = {
      id: `SUB-${String(subscriptions.length + 1).padStart(3, "0")}`,
      planName: createPlanName,
      customer: createCustomer,
      email: createEmail,
      amount,
      frequency: createFrequency,
      nextBilling: advanceDate(new Date().toISOString().split("T")[0], createFrequency === "Weekly" ? 7 : createFrequency === "Monthly" ? 30 : 365),
      startDate: new Date().toISOString().split("T")[0],
      status: "Active",
    };
    setSubscriptions((prev) => [newSub, ...prev]);
    setShowCreateSub(false);
    toast({ title: "Subscription created", description: `${newSub.planName} for ${newSub.customer} is now active.` });
  };

  /* ─── Template handlers ─── */

  const resetTemplateForm = () => {
    setTplName("");
    setTplDescription("");
    setTplAmount("");
    setTplCurrency("USD");
    setTplFrequency("Monthly");
    setTplTrialDays("14");
    setTplAutoRenewal(true);
  };

  const openCreateTemplate = () => {
    resetTemplateForm();
    setEditTemplateData(null);
    setShowCreateTemplate(true);
  };

  const openEditTemplate = (tpl: SubscriptionTemplate) => {
    setEditTemplateData(tpl);
    setTplName(tpl.name);
    setTplDescription(tpl.description);
    setTplAmount(tpl.amount.toString());
    setTplCurrency(tpl.currency);
    setTplFrequency(tpl.frequency);
    setTplTrialDays(tpl.trialDays.toString());
    setTplAutoRenewal(tpl.autoRenewal);
    setShowCreateTemplate(true);
  };

  const handleSaveTemplate = () => {
    const amount = parseFloat(tplAmount);
    if (!tplName || isNaN(amount)) {
      toast({ title: "Missing fields", description: "Please provide a template name and valid amount.", variant: "destructive" });
      return;
    }
    if (editTemplateData) {
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === editTemplateData.id
            ? { ...t, name: tplName, description: tplDescription, amount, currency: tplCurrency, frequency: tplFrequency, trialDays: parseInt(tplTrialDays) || 0, autoRenewal: tplAutoRenewal }
            : t
        )
      );
      toast({ title: "Template updated", description: `"${tplName}" has been updated.` });
    } else {
      const newTpl: SubscriptionTemplate = {
        id: `TPL-${String(templates.length + 1).padStart(3, "0")}`,
        name: tplName,
        description: tplDescription,
        amount,
        currency: tplCurrency,
        frequency: tplFrequency,
        trialDays: parseInt(tplTrialDays) || 0,
        autoRenewal: tplAutoRenewal,
        status: "Active",
      };
      setTemplates((prev) => [...prev, newTpl]);
      toast({ title: "Template created", description: `"${tplName}" is ready to use.` });
    }
    setShowCreateTemplate(false);
  };

  const handleDuplicateTemplate = (tpl: SubscriptionTemplate) => {
    const dup: SubscriptionTemplate = {
      ...tpl,
      id: `TPL-${String(templates.length + 1).padStart(3, "0")}`,
      name: `${tpl.name} (Copy)`,
      status: "Draft",
    };
    setTemplates((prev) => [...prev, dup]);
    toast({ title: "Template duplicated", description: `"${dup.name}" created as draft.` });
  };

  const handleDeleteTemplate = (tplId: string) => {
    const tpl = templates.find((t) => t.id === tplId);
    setTemplates((prev) => prev.filter((t) => t.id !== tplId));
    toast({ title: "Template deleted", description: `"${tpl?.name}" has been removed.` });
  };

  const handleUseTemplate = (tpl: SubscriptionTemplate) => {
    setCreatePlanName(tpl.name);
    setCreateAmount(tpl.amount.toString());
    setCreateFrequency(tpl.frequency);
    setCreateCustomer("");
    setCreateEmail("");
    setShowCreateSub(true);
  };

  /* ─── Migration handlers ─── */

  const handleFileUpload = (fileName: string) => {
    setUploadedFile(fileName);
    setShowValidation(true);
    toast({ title: "File uploaded", description: `"${fileName}" has been validated.` });
  };

  const handleDownloadCSV = () => {
    const csv = "customer_name,email,plan_name,amount,frequency\nJohn Doe,john@example.com,Monthly Pro,49.99,Monthly\nJane Smith,jane@example.com,Annual Basic,199.99,Annual\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "swipesblue-subscription-import-template.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Template downloaded", description: "CSV template saved to your downloads." });
  };

  const handleImport = () => {
    const validCount = mockValidationResults.filter((r) => r.valid).length;
    toast({ title: "Import started", description: `Importing ${validCount} valid subscriptions. You'll be notified when complete.` });
    setShowValidation(false);
    setUploadedFile(null);
  };

  /* ─── Simulator handlers ─── */

  const handleCreateSimulation = () => {
    if (!newSimName) {
      toast({ title: "Missing name", description: "Please enter a simulation name.", variant: "destructive" });
      return;
    }
    const sim: Simulation = {
      id: `SIM-${String(simulations.length + 1).padStart(3, "0")}`,
      name: newSimName,
      startDate: newSimDate,
      currentDate: newSimDate,
      customers: 0,
      subscriptions: [],
      events: [
        { date: newSimDate, type: "invoice_created", description: `Simulation "${newSimName}" initialized` },
      ],
      status: "Running",
    };
    setSimulations((prev) => [sim, ...prev]);
    setExpandedSim(sim.id);
    setNewSimName("");
    toast({ title: "Simulation created", description: `"${sim.name}" is ready. Add customers and subscriptions to begin.` });
  };

  const handleAdvanceTime = (simId: string, days: number) => {
    setSimulations((prev) =>
      prev.map((sim) => {
        if (sim.id !== simId) return sim;
        const newDate = advanceDate(sim.currentDate, days);
        const newEvents: SimEvent[] = [];

        for (const sub of sim.subscriptions) {
          const daysInPeriod = sub.frequency === "Weekly" ? 7 : sub.frequency === "Monthly" ? 30 : 365;
          const currentMs = new Date(sim.currentDate).getTime();
          const newMs = new Date(newDate).getTime();
          const daysDiff = Math.floor((newMs - currentMs) / (1000 * 60 * 60 * 24));

          if (daysDiff >= daysInPeriod) {
            newEvents.push({
              date: newDate,
              type: "subscription_renewed",
              description: `${sub.customerName} — ${sub.planName} renewed (${formatCurrency(sub.amount)})`,
            });
            if (Math.random() > 0.1) {
              newEvents.push({
                date: newDate,
                type: "payment_succeeded",
                description: `Payment succeeded for ${sub.customerName} (${formatCurrency(sub.amount)})`,
              });
            } else {
              newEvents.push({
                date: newDate,
                type: "payment_failed",
                description: `Payment failed for ${sub.customerName} (${formatCurrency(sub.amount)}) — card declined`,
              });
            }
          }
        }

        if (newEvents.length === 0) {
          newEvents.push({
            date: newDate,
            type: "invoice_created",
            description: `Time advanced to ${formatDate(newDate)} — no billing events triggered`,
          });
        }

        return { ...sim, currentDate: newDate, events: [...sim.events, ...newEvents] };
      })
    );
    const label = days === 1 ? "1 day" : days === 7 ? "1 week" : days === 30 ? "1 month" : days === 90 ? "3 months" : days === 365 ? "1 year" : `${days} days`;
    toast({ title: "Time advanced", description: `Simulation advanced by ${label}.` });
  };

  const handleAddSimSubscription = (simId: string) => {
    setSimulations((prev) =>
      prev.map((sim) => {
        if (sim.id !== simId) return sim;
        const idx = sim.subscriptions.length + 1;
        const newSub: SimSubscription = {
          customerName: `Customer ${idx}`,
          planName: "Monthly Essential",
          amount: 29.99,
          frequency: "Monthly",
        };
        return {
          ...sim,
          customers: sim.customers + 1,
          subscriptions: [...sim.subscriptions, newSub],
          events: [...sim.events, {
            date: sim.currentDate,
            type: "invoice_created" as const,
            description: `${newSub.customerName} subscribed to ${newSub.planName} (${formatCurrency(newSub.amount)}/${newSub.frequency.toLowerCase()})`,
          }],
        };
      })
    );
    toast({ title: "Subscription added", description: "New customer subscription added to simulation." });
  };

  /* ─── Derived ─── */

  const isListTab = ["active", "paused", "pastdue", "cancelled", "all"].includes(activeTab);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    switch (activeTab) {
      case "active": return sub.status === "Active";
      case "paused": return sub.status === "Paused";
      case "pastdue": return sub.status === "Past Due";
      case "cancelled": return sub.status === "Cancelled";
      case "all": return true;
      default: return sub.status === "Active";
    }
  });

  const validMigrationCount = mockValidationResults.filter((r) => r.valid).length;
  const invalidMigrationCount = mockValidationResults.filter((r) => !r.valid).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-500 mt-1">Manage subscriptions, templates, and recurring charges</p>
        </div>
        {isListTab && (
          <Button
            className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]"
            onClick={handleCreateSub}
          >
            <Plus className="h-4 w-4 mr-2" />
            + Create Subscription
          </Button>
        )}
        {activeTab === "templates" && (
          <Button
            className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]"
            onClick={openCreateTemplate}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        )}
      </div>

      <SubNavTabs tabs={tabs} />

      {/* ═══ List Tabs: Metrics + Table ═══ */}
      {isListTab && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard title="Monthly Recurring Revenue" value="$18,450" change="+12.3% from last month" changeType="positive" icon={DollarSign} />
            <MetricCard title="Active Subscriptions" value="142" change="+8 this month" changeType="positive" icon={Users} />
            <MetricCard title="Churn Rate" value="2.1%" change="-0.4% from last month" changeType="positive" icon={TrendingDown} />
            <MetricCard title="Average Plan Value" value="$129.93" change="+$3.20 from last month" changeType="positive" icon={CreditCard} />
          </div>

          {filteredSubscriptions.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
              <RefreshCw className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No subscriptions found</h3>
              <p className="text-gray-500 text-sm">No subscriptions match this filter.</p>
            </div>
          ) : (
            <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F6F9FC] border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Plan</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Frequency</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Next Billing</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <span className="text-sm font-medium text-gray-900 block">{sub.planName}</span>
                          <span className="text-xs text-gray-400 font-mono">{sub.id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{sub.customer}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(sub.amount)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{sub.frequency}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(sub.nextBilling)}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs rounded-full ${statusColors[sub.status]}`}>
                          {sub.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View" onClick={() => setViewSub(sub)}>
                            <Eye className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit" onClick={() => openEditModal(sub)}>
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                          {(sub.status === "Active" || sub.status === "Past Due") && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Pause" onClick={() => handlePause(sub)}>
                              <Pause className="h-4 w-4 text-yellow-600" />
                            </Button>
                          )}
                          {sub.status === "Paused" && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Resume" onClick={() => handleResume(sub)}>
                              <Play className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400">{filteredSubscriptions.length} subscriptions</span>
          </div>
        </>
      )}

      {/* ═══ Templates Tab ═══ */}
      {activeTab === "templates" && (
        <div className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Template Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Frequency</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Trial Period</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((tpl) => (
                  <tr key={tpl.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-sm font-medium text-gray-900 block">{tpl.name}</span>
                        <span className="text-xs text-gray-400">{tpl.description}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(tpl.amount)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{tpl.frequency}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{tpl.trialDays > 0 ? `${tpl.trialDays} days` : "None"}</td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs rounded-full ${tpl.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {tpl.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Use Template" onClick={() => handleUseTemplate(tpl)}>
                          <Zap className="h-4 w-4 text-[#1844A6]" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit" onClick={() => openEditTemplate(tpl)}>
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Duplicate" onClick={() => handleDuplicateTemplate(tpl)}>
                          <Copy className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Delete" onClick={() => handleDeleteTemplate(tpl.id)}>
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400">{templates.length} templates</span>
          </div>
        </div>
      )}

      {/* ═══ Migration Tab ═══ */}
      {activeTab === "migration" && (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Switch to swipesblue in minutes. Not months.</h2>
            <p className="text-gray-500">Import your existing subscriptions from any platform. We handle the migration so your customers never miss a beat.</p>
          </div>

          {/* How It Works */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: "1", title: "Export", description: "Export your subscriptions from your current platform as a CSV file.", icon: Download },
                { step: "2", title: "Upload", description: "Upload the CSV to swipesblue. We validate every row and flag any issues.", icon: Upload },
                { step: "3", title: "Go Live", description: "Review validated data, click import, and your subscriptions are live.", icon: CheckCircle },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <Card key={s.step} className="rounded-[7px] border-gray-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-10 h-10 bg-[#1844A6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-5 w-5 text-[#1844A6]" />
                      </div>
                      <div className="text-xs font-bold text-[#1844A6] uppercase mb-1">Step {s.step}</div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{s.title}</h4>
                      <p className="text-xs text-gray-500">{s.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Supported Platforms */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Supported Platforms</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {supportedPlatforms.map((platform) => (
                <Card key={platform} className="rounded-[7px] border-gray-200">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{platform}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-[#1844A6] h-auto p-0 hover:underline"
                      onClick={() => toast({ title: "Migration guide", description: `${platform} migration guide will open in the developer docs.` })}
                    >
                      View Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CSV Upload */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Upload CSV</h3>
              <Button variant="outline" className="rounded-[7px] border-gray-300 text-sm" onClick={handleDownloadCSV}>
                <Download className="h-4 w-4 mr-2" />
                Download Template CSV
              </Button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".csv"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file.name);
              }}
            />

            <div
              className={`border-2 border-dashed rounded-[7px] p-12 text-center cursor-pointer transition-colors ${
                isDragOver ? "border-[#1844A6] bg-[#1844A6]/5" : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileUpload(file.name);
              }}
            >
              <Upload className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-900 mb-1">
                {uploadedFile ? uploadedFile : "Drop your CSV here, or click to browse"}
              </p>
              <p className="text-xs text-gray-400">Supports .csv files up to 10MB</p>
            </div>
          </div>

          {/* Validation Results */}
          {showValidation && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Validation Results</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="text-green-600 font-medium">{validMigrationCount} valid</span>
                    {invalidMigrationCount > 0 && <span className="text-red-600 font-medium ml-3">{invalidMigrationCount} errors</span>}
                  </p>
                </div>
                <Button
                  className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]"
                  onClick={handleImport}
                  disabled={validMigrationCount === 0}
                >
                  Import {validMigrationCount} Subscriptions
                </Button>
              </div>

              <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F6F9FC] border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase w-10">Row</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Plan</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Frequency</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockValidationResults.map((row) => (
                      <tr key={row.row} className={`border-b border-gray-100 ${!row.valid ? "bg-red-50/50" : ""}`}>
                        <td className="px-4 py-3 text-xs text-gray-400 font-mono">{row.row}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{row.customerName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.email || "—"}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.planName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.amount}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.frequency}</td>
                        <td className="px-4 py-3 text-center">
                          {row.valid ? (
                            <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                          ) : (
                            <div className="flex items-center justify-center gap-1">
                              <XCircle className="h-4 w-4 text-red-500" />
                              <span className="text-xs text-red-600">{row.error}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FAQ */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                {
                  q: "Will my customers be charged twice during migration?",
                  a: "No. swipesblue imports subscription records without triggering an immediate charge. The next billing event occurs on the scheduled date you set during import.",
                },
                {
                  q: "What if some rows in my CSV have errors?",
                  a: "Invalid rows are flagged but don't block the import. You can import all valid rows immediately and fix the errors later. Each row is validated independently.",
                },
                {
                  q: "Can I migrate from a platform not listed above?",
                  a: "Yes. Any platform that exports subscription data as CSV is supported. Use our template CSV to map your columns, then upload. If you need help, contact support.",
                },
              ].map((faq, i) => (
                <Card key={i} className="rounded-[7px] border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-4 w-4 text-[#1844A6] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">{faq.q}</p>
                        <p className="text-sm text-gray-500">{faq.a}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ Simulator Tab ═══ */}
      {activeTab === "simulator" && (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-2">See the future. Before your customers do.</h2>
            <p className="text-gray-500">Test subscription lifecycles, billing scenarios, and edge cases in a safe sandbox. No real charges, no real risk.</p>
          </div>

          {/* Create Simulation */}
          <Card className="rounded-[7px] border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Create Simulation</h3>
              <div className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label className="text-sm font-medium text-gray-900">Simulation Name</Label>
                  <Input
                    placeholder="e.g. Q2 Launch Scenario"
                    value={newSimName}
                    onChange={(e) => setNewSimName(e.target.value)}
                    className="rounded-[7px]"
                  />
                </div>
                <div className="w-48 space-y-2">
                  <Label className="text-sm font-medium text-gray-900">Starting Date</Label>
                  <Input
                    type="date"
                    value={newSimDate}
                    onChange={(e) => setNewSimDate(e.target.value)}
                    className="rounded-[7px]"
                  />
                </div>
                <Button
                  className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]"
                  onClick={handleCreateSimulation}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Simulations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Simulations</h3>
            <div className="space-y-4">
              {simulations.map((sim) => {
                const isExpanded = expandedSim === sim.id;
                return (
                  <Card key={sim.id} className="rounded-[7px] border-gray-200">
                    <CardContent className="p-0">
                      {/* Simulation Header */}
                      <div
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                        onClick={() => setExpandedSim(isExpanded ? null : sim.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-sm font-semibold text-gray-900">{sim.name}</span>
                            <span className="text-xs text-gray-400 font-mono ml-2">{sim.id}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right text-xs text-gray-500">
                            <div>{sim.customers} customers · {sim.subscriptions.length} subscriptions</div>
                            <div>Current: {formatDate(sim.currentDate)}</div>
                          </div>
                          <Badge className={`text-xs rounded-full ${sim.status === "Running" ? "bg-green-100 text-green-700" : sim.status === "Completed" ? "bg-gray-100 text-gray-600" : "bg-yellow-100 text-yellow-700"}`}>
                            {sim.status}
                          </Badge>
                          {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="border-t border-gray-200 p-4 space-y-4">
                          {/* Controls */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Advance Time:</span>
                            {[
                              { label: "+1 Day", days: 1 },
                              { label: "+1 Week", days: 7 },
                              { label: "+1 Month", days: 30 },
                              { label: "+3 Months", days: 90 },
                              { label: "+1 Year", days: 365 },
                            ].map((btn) => (
                              <Button
                                key={btn.label}
                                variant="outline"
                                size="sm"
                                className="rounded-[7px] border-gray-300 text-xs"
                                onClick={(e) => { e.stopPropagation(); handleAdvanceTime(sim.id, btn.days); }}
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                {btn.label}
                              </Button>
                            ))}
                            <div className="border-l border-gray-200 mx-2 h-6" />
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-[7px] border-gray-300 text-xs"
                              onClick={(e) => { e.stopPropagation(); handleAddSimSubscription(sim.id); }}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add Subscription
                            </Button>
                          </div>

                          {/* Subscriptions */}
                          {sim.subscriptions.length > 0 && (
                            <div>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Subscriptions</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {sim.subscriptions.map((sub, i) => (
                                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-[7px] px-3 py-2">
                                    <span className="text-sm text-gray-900">{sub.customerName}</span>
                                    <span className="text-xs text-gray-500">{sub.planName} · {formatCurrency(sub.amount)}/{sub.frequency.toLowerCase()}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Event Log */}
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Event Log ({sim.events.length} events)</h4>
                            <div className="bg-gray-50 rounded-[7px] border border-gray-200 max-h-64 overflow-y-auto">
                              {[...sim.events].reverse().map((evt, i) => {
                                const typeInfo = eventTypeLabels[evt.type];
                                return (
                                  <div key={i} className="flex items-start gap-3 px-3 py-2 border-b border-gray-100 last:border-b-0">
                                    <span className="text-xs text-gray-400 font-mono whitespace-nowrap mt-0.5">{formatDate(evt.date)}</span>
                                    <Badge className={`text-[10px] rounded-full shrink-0 ${typeInfo.color}`}>{typeInfo.label}</Badge>
                                    <span className="text-xs text-gray-700">{evt.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Why Simulator */}
          <Card className="rounded-[7px] border-[#1844A6]/20 bg-[#1844A6]/5">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Why Use the Simulator?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Test Edge Cases", description: "Failed payments, expired cards, mid-cycle upgrades — see how your billing handles every scenario before it hits production." },
                  { title: "Train Your Team", description: "Walk new team members through the subscription lifecycle without touching real customer data." },
                  { title: "Plan Pricing Changes", description: "Model the revenue impact of new pricing tiers, discounts, or trial periods before rolling them out." },
                ].map((item, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ═══ Modals ═══ */}

      {/* View Subscription Detail */}
      <Dialog open={!!viewSub} onOpenChange={(open) => !open && setViewSub(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Subscription Details</DialogTitle>
          </DialogHeader>
          {viewSub && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Subscription ID</p>
                  <p className="text-sm font-mono font-medium text-gray-900">{viewSub.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <Badge className={`text-xs rounded-full ${statusColors[viewSub.status]}`}>{viewSub.status}</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Plan</p>
                  <p className="text-sm font-medium text-gray-900">{viewSub.planName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(viewSub.amount)} / {viewSub.frequency.toLowerCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="text-sm font-medium text-gray-900">{viewSub.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{viewSub.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="text-sm text-gray-900">{formatDate(viewSub.startDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Next Billing</p>
                  <p className="text-sm text-gray-900">{formatDate(viewSub.nextBilling)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Subscription */}
      <Dialog open={!!editSub} onOpenChange={(open) => !open && setEditSub(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
          </DialogHeader>
          {editSub && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Plan Name</Label>
                <Input value={editPlanName} onChange={(e) => setEditPlanName(e.target.value)} className="rounded-[7px]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Amount</Label>
                <Input type="number" step="0.01" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} className="rounded-[7px]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Frequency</Label>
                <Select value={editFrequency} onValueChange={(v) => setEditFrequency(v as BillingFrequency)}>
                  <SelectTrigger className="rounded-[7px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" className="rounded-[7px]" onClick={() => setEditSub(null)}>Cancel</Button>
                <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Subscription */}
      <Dialog open={showCreateSub} onOpenChange={setShowCreateSub}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Subscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Plan Name</Label>
              <Input value={createPlanName} onChange={(e) => setCreatePlanName(e.target.value)} placeholder="e.g. Monthly Pro" className="rounded-[7px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Customer Name</Label>
              <Input value={createCustomer} onChange={(e) => setCreateCustomer(e.target.value)} placeholder="e.g. Acme Corp" className="rounded-[7px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Customer Email</Label>
              <Input value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} placeholder="billing@acme.com" className="rounded-[7px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Amount</Label>
                <Input type="number" step="0.01" value={createAmount} onChange={(e) => setCreateAmount(e.target.value)} placeholder="0.00" className="rounded-[7px]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Frequency</Label>
                <Select value={createFrequency} onValueChange={(v) => setCreateFrequency(v as BillingFrequency)}>
                  <SelectTrigger className="rounded-[7px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="rounded-[7px]" onClick={() => setShowCreateSub(false)}>Cancel</Button>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={handleSaveCreateSub}>Create Subscription</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Template */}
      <Dialog open={showCreateTemplate} onOpenChange={setShowCreateTemplate}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editTemplateData ? "Edit Template" : "Create Template"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Template Name</Label>
              <Input value={tplName} onChange={(e) => setTplName(e.target.value)} placeholder="e.g. Monthly Essential" className="rounded-[7px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Description</Label>
              <Textarea value={tplDescription} onChange={(e) => setTplDescription(e.target.value)} placeholder="Brief description of this template" className="rounded-[7px] resize-none" rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Amount</Label>
                <Input type="number" step="0.01" value={tplAmount} onChange={(e) => setTplAmount(e.target.value)} placeholder="0.00" className="rounded-[7px]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Currency</Label>
                <Select value={tplCurrency} onValueChange={setTplCurrency}>
                  <SelectTrigger className="rounded-[7px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Frequency</Label>
                <Select value={tplFrequency} onValueChange={(v) => setTplFrequency(v as BillingFrequency)}>
                  <SelectTrigger className="rounded-[7px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Trial Period (days)</Label>
                <Input type="number" value={tplTrialDays} onChange={(e) => setTplTrialDays(e.target.value)} placeholder="0" className="rounded-[7px]" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm font-medium text-gray-900">Auto-Renewal</Label>
              <Switch checked={tplAutoRenewal} onCheckedChange={setTplAutoRenewal} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="rounded-[7px]" onClick={() => setShowCreateTemplate(false)}>Cancel</Button>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={handleSaveTemplate}>
                {editTemplateData ? "Save Changes" : "Create Template"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
