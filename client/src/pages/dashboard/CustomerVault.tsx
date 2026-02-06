import { useState } from "react";
import { Users, CreditCard, Search, Plus, ChevronDown, ChevronUp, DollarSign, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import MetricCard from "@/components/MetricCard";

interface StoredCard {
  last4: string;
  brand: string;
  expiry: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: string;
  status: "success" | "failed" | "pending";
  card: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  cards: StoredCard[];
  totalSpent: string;
  lastTransaction: string;
  transactions: Transaction[];
}

const mockCustomers: Customer[] = [
  {
    id: "CUS-001",
    name: "John Doe",
    email: "john.doe@example.com",
    cards: [
      { last4: "1234", brand: "Visa", expiry: "12/26" },
      { last4: "5678", brand: "MC", expiry: "03/27" },
    ],
    totalSpent: "$4,325.00",
    lastTransaction: "2025-10-24",
    transactions: [
      { id: "TXN-101", date: "2025-10-24", amount: "$125.00", status: "success", card: "Visa ****1234" },
      { id: "TXN-098", date: "2025-10-20", amount: "$89.50", status: "success", card: "MC ****5678" },
      { id: "TXN-085", date: "2025-10-15", amount: "$250.00", status: "success", card: "Visa ****1234" },
    ],
  },
  {
    id: "CUS-002",
    name: "Jane Smith",
    email: "jane.smith@acmecorp.com",
    cards: [
      { last4: "9012", brand: "Amex", expiry: "08/27" },
    ],
    totalSpent: "$2,180.50",
    lastTransaction: "2025-10-23",
    transactions: [
      { id: "TXN-099", date: "2025-10-23", amount: "$350.00", status: "success", card: "Amex ****9012" },
      { id: "TXN-090", date: "2025-10-18", amount: "$75.50", status: "success", card: "Amex ****9012" },
      { id: "TXN-078", date: "2025-10-10", amount: "$420.00", status: "failed", card: "Amex ****9012" },
    ],
  },
  {
    id: "CUS-003",
    name: "Bob Johnson",
    email: "bob.j@globexind.com",
    cards: [
      { last4: "3456", brand: "Visa", expiry: "11/26" },
      { last4: "7890", brand: "Visa", expiry: "05/28" },
      { last4: "2468", brand: "Discover", expiry: "01/27" },
    ],
    totalSpent: "$8,942.00",
    lastTransaction: "2025-10-24",
    transactions: [
      { id: "TXN-102", date: "2025-10-24", amount: "$1,200.00", status: "success", card: "Visa ****3456" },
      { id: "TXN-095", date: "2025-10-21", amount: "$89.00", status: "success", card: "Discover ****2468" },
      { id: "TXN-082", date: "2025-10-13", amount: "$560.00", status: "pending", card: "Visa ****7890" },
    ],
  },
  {
    id: "CUS-004",
    name: "Alice Williams",
    email: "alice.w@wayneent.com",
    cards: [
      { last4: "1357", brand: "MC", expiry: "09/26" },
    ],
    totalSpent: "$675.99",
    lastTransaction: "2025-10-22",
    transactions: [
      { id: "TXN-094", date: "2025-10-22", amount: "$45.99", status: "success", card: "MC ****1357" },
      { id: "TXN-080", date: "2025-10-12", amount: "$230.00", status: "success", card: "MC ****1357" },
      { id: "TXN-072", date: "2025-10-05", amount: "$400.00", status: "failed", card: "MC ****1357" },
    ],
  },
  {
    id: "CUS-005",
    name: "Charlie Brown",
    email: "charlie@piedpiper.io",
    cards: [
      { last4: "8642", brand: "Visa", expiry: "06/27" },
      { last4: "9753", brand: "Amex", expiry: "02/28" },
    ],
    totalSpent: "$3,450.00",
    lastTransaction: "2025-10-23",
    transactions: [
      { id: "TXN-097", date: "2025-10-23", amount: "$199.99", status: "success", card: "Visa ****8642" },
      { id: "TXN-088", date: "2025-10-17", amount: "$750.00", status: "success", card: "Amex ****9753" },
      { id: "TXN-076", date: "2025-10-08", amount: "$325.00", status: "success", card: "Visa ****8642" },
    ],
  },
  {
    id: "CUS-006",
    name: "David Lee",
    email: "david.lee@starktec.com",
    cards: [
      { last4: "4321", brand: "Visa", expiry: "10/27" },
    ],
    totalSpent: "$1,890.00",
    lastTransaction: "2025-10-21",
    transactions: [
      { id: "TXN-091", date: "2025-10-21", amount: "$350.00", status: "success", card: "Visa ****4321" },
      { id: "TXN-083", date: "2025-10-14", amount: "$220.00", status: "pending", card: "Visa ****4321" },
      { id: "TXN-074", date: "2025-10-06", amount: "$180.00", status: "success", card: "Visa ****4321" },
    ],
  },
  {
    id: "CUS-007",
    name: "Emma Wilson",
    email: "emma.wilson@umbrella.co",
    cards: [
      { last4: "6789", brand: "MC", expiry: "04/27" },
      { last4: "1122", brand: "Visa", expiry: "12/27" },
    ],
    totalSpent: "$5,120.75",
    lastTransaction: "2025-10-24",
    transactions: [
      { id: "TXN-103", date: "2025-10-24", amount: "$475.00", status: "success", card: "MC ****6789" },
      { id: "TXN-096", date: "2025-10-22", amount: "$125.75", status: "success", card: "Visa ****1122" },
      { id: "TXN-084", date: "2025-10-14", amount: "$890.00", status: "success", card: "MC ****6789" },
    ],
  },
  {
    id: "CUS-008",
    name: "Frank Miller",
    email: "frank.m@initech.com",
    cards: [
      { last4: "3344", brand: "Amex", expiry: "07/26" },
    ],
    totalSpent: "$920.00",
    lastTransaction: "2025-10-20",
    transactions: [
      { id: "TXN-089", date: "2025-10-20", amount: "$120.00", status: "success", card: "Amex ****3344" },
      { id: "TXN-079", date: "2025-10-11", amount: "$300.00", status: "failed", card: "Amex ****3344" },
      { id: "TXN-070", date: "2025-10-03", amount: "$500.00", status: "success", card: "Amex ****3344" },
    ],
  },
  {
    id: "CUS-009",
    name: "Grace Chen",
    email: "grace.chen@hooli.io",
    cards: [
      { last4: "5566", brand: "Visa", expiry: "01/28" },
      { last4: "7788", brand: "MC", expiry: "09/27" },
      { last4: "9900", brand: "Visa", expiry: "03/28" },
    ],
    totalSpent: "$12,340.00",
    lastTransaction: "2025-10-24",
    transactions: [
      { id: "TXN-104", date: "2025-10-24", amount: "$2,500.00", status: "success", card: "Visa ****5566" },
      { id: "TXN-093", date: "2025-10-19", amount: "$680.00", status: "success", card: "MC ****7788" },
      { id: "TXN-081", date: "2025-10-12", amount: "$1,150.00", status: "success", card: "Visa ****9900" },
    ],
  },
  {
    id: "CUS-010",
    name: "Henry Park",
    email: "henry.park@soylent.co",
    cards: [
      { last4: "2233", brand: "Discover", expiry: "11/27" },
      { last4: "4455", brand: "Visa", expiry: "08/26" },
    ],
    totalSpent: "$2,605.00",
    lastTransaction: "2025-10-22",
    transactions: [
      { id: "TXN-092", date: "2025-10-22", amount: "$425.00", status: "success", card: "Discover ****2233" },
      { id: "TXN-086", date: "2025-10-16", amount: "$180.00", status: "pending", card: "Visa ****4455" },
      { id: "TXN-075", date: "2025-10-07", amount: "$600.00", status: "success", card: "Discover ****2233" },
    ],
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  success: { label: "Success", className: "bg-swipes-trusted-green text-white hover:bg-swipes-trusted-green" },
  failed: { label: "Failed", className: "bg-swipes-muted-red text-white hover:bg-swipes-muted-red" },
  pending: { label: "Pending", className: "bg-yellow-500 text-white hover:bg-yellow-500" },
};

export default function CustomerVault() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCustomers = mockCustomers.filter((customer) => {
    const term = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term)
    );
  });

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Customers"
          value="573"
          change="+8.2% from last month"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Cards on File"
          value="847"
          change="+34 new this month"
          changeType="positive"
          icon={CreditCard}
        />
        <MetricCard
          title="Average Customer Value"
          value="$1,245"
          change="+5.7% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="New This Month"
          value="38"
          change="+12.4% from last month"
          changeType="positive"
          icon={UserPlus}
        />
      </div>

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-swipes-black">Customer Vault</h1>
          <p className="text-swipes-pro-gray">Securely store customer payment methods, profiles, and transaction history</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-swipes-pro-gray" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10 rounded-[7px] w-full sm:w-72"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-swipes-blue-deep rounded-[7px] hover:bg-swipes-blue-deep/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Customer ID</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Email</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Stored Cards</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Total Spent</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Last Transaction</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                isExpanded={expandedId === customer.id}
                onToggle={() => toggleExpanded(customer.id)}
              />
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-sm text-swipes-pro-gray">
                  No customers found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomerRow({
  customer,
  isExpanded,
  onToggle,
}: {
  customer: Customer;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        className="hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={onToggle}
      >
        <td className="px-6 py-4 text-sm font-medium text-swipes-black">{customer.id}</td>
        <td className="px-6 py-4 text-sm font-medium text-swipes-black">{customer.name}</td>
        <td className="px-6 py-4 text-sm text-swipes-pro-gray">{customer.email}</td>
        <td className="px-6 py-4">
          <Badge className="bg-swipes-blue-deep text-white hover:bg-swipes-blue-deep">
            {customer.cards.length} {customer.cards.length === 1 ? "card" : "cards"}
          </Badge>
        </td>
        <td className="px-6 py-4 text-sm font-medium text-swipes-black">{customer.totalSpent}</td>
        <td className="px-6 py-4 text-sm text-swipes-pro-gray">{customer.lastTransaction}</td>
        <td className="px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            className="rounded-[7px]"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {isExpanded ? (
              <ChevronUp className="h-3.5 w-3.5 mr-1" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 mr-1" />
            )}
            View
          </Button>
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={7} className="px-6 py-6 bg-gray-50 border-t border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stored Payment Methods */}
              <div className="bg-white rounded-[7px] border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-swipes-black mb-4 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-swipes-blue-deep" />
                  Stored Payment Methods
                </h3>
                <div className="space-y-3">
                  {customer.cards.map((card, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-[7px] border border-gray-200 bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-swipes-pro-gray" />
                        <div>
                          <p className="text-sm font-medium text-swipes-black">
                            {card.brand} ****{card.last4}
                          </p>
                          <p className="text-xs text-swipes-pro-gray">Expires {card.expiry}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="rounded-[7px] text-swipes-pro-gray">
                        {card.brand}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-[7px] border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-swipes-black mb-4 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-swipes-blue-deep" />
                  Recent Transactions
                </h3>
                <div className="space-y-3">
                  {customer.transactions.map((txn) => (
                    <div
                      key={txn.id}
                      className="flex items-center justify-between p-3 rounded-[7px] border border-gray-200 bg-gray-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-swipes-black">{txn.amount}</p>
                        <p className="text-xs text-swipes-pro-gray">
                          {txn.date} &middot; {txn.card}
                        </p>
                      </div>
                      <Badge className={statusConfig[txn.status].className}>
                        {statusConfig[txn.status].label}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
