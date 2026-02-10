import { useState } from "react";
import { useLocation } from "wouter";
import {
  CreditCard,
  DollarSign,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubNavTabs from "@/components/dashboard/SubNavTabs";

const tabs = [
  { label: "Terminal", href: "/dashboard/terminal" },
  { label: "Recent Transactions", href: "/dashboard/terminal?tab=recent" },
];

interface TransactionResult {
  transactionId: string;
  amount: string;
  status: "approved" | "declined";
  authCode: string;
  cardBrand: string;
  last4: string;
  timestamp: string;
  type: "charge" | "auth_only";
}

interface RecentTransaction {
  id: string;
  date: string;
  customer: string;
  amount: string;
  status: "success" | "pending" | "failed";
  method: string;
}

const MOCK_RECENT_TRANSACTIONS: RecentTransaction[] = [
  { id: "TXN-2081", date: "2025-10-24 14:32", customer: "Sarah Connor", amount: "$142.50", status: "success", method: "Visa ****4242" },
  { id: "TXN-2080", date: "2025-10-24 13:18", customer: "James Kirk", amount: "$89.00", status: "success", method: "MC ****5100" },
  { id: "TXN-2079", date: "2025-10-24 11:45", customer: "Ellen Ripley", amount: "$310.25", status: "failed", method: "Amex ****3782" },
  { id: "TXN-2078", date: "2025-10-24 10:02", customer: "Rick Deckard", amount: "$55.99", status: "success", method: "Discover ****6011" },
  { id: "TXN-2077", date: "2025-10-23 16:55", customer: "Dana Scully", amount: "$200.00", status: "pending", method: "Visa ****1881" },
];

const MOCK_SAVED_CARDS = [
  { id: "card_1", label: "Visa ****4242 - Sarah Connor", brand: "Visa", last4: "4242" },
  { id: "card_2", label: "MC ****5100 - James Kirk", brand: "Mastercard", last4: "5100" },
  { id: "card_3", label: "Amex ****3782 - Ellen Ripley", brand: "Amex", last4: "3782" },
  { id: "card_4", label: "Discover ****6011 - Rick Deckard", brand: "Discover", last4: "6011" },
];

function detectCardBrand(cardNumber: string): string {
  const stripped = cardNumber.replace(/\s/g, "");
  if (!stripped) return "";
  if (/^4/.test(stripped)) return "Visa";
  if (/^5[1-5]/.test(stripped)) return "Mastercard";
  if (/^3[47]/.test(stripped)) return "Amex";
  if (/^6(?:011|5)/.test(stripped)) return "Discover";
  return "";
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  const trimmed = digits.slice(0, 16);
  const groups = trimmed.match(/.{1,4}/g);
  return groups ? groups.join(" ") : "";
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return digits.slice(0, 2) + " / " + digits.slice(2);
  }
  return digits;
}

function generateTransactionId(): string {
  return "txn_" + Math.random().toString(36).substring(2, 14);
}

function generateAuthCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function VirtualTerminal() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "terminal";

  // Form fields
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("US");

  // Optional fields
  const [showOptional, setShowOptional] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [description, setDescription] = useState("");

  // Sidebar state
  const [selectedSavedCard, setSelectedSavedCard] = useState("");
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const cardBrand = detectCardBrand(cardNumber);

  function handleCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCardNumber(formatCardNumber(e.target.value));
  }

  function handleExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setExpiry(formatExpiry(e.target.value));
  }

  function handleCvvChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvv(digits);
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    // Allow only one decimal point and up to 2 decimal places
    const parts = value.split(".");
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    setAmount(value);
  }

  function handleSavedCardSelect(cardId: string) {
    setSelectedSavedCard(cardId);
    const card = MOCK_SAVED_CARDS.find((c) => c.id === cardId);
    if (card) {
      // Populate card fields with mock data from saved card
      if (card.brand === "Visa") setCardNumber("4242 4242 4242 4242");
      else if (card.brand === "Mastercard") setCardNumber("5100 0000 0000 5100");
      else if (card.brand === "Amex") setCardNumber("3782 822463 10005");
      else if (card.brand === "Discover") setCardNumber("6011 0000 0000 6011");
      setExpiry("12 / 27");
      setCvv("123");
      setCardholderName(card.label.split(" - ")[1] || "");
    }
  }

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Enter a valid amount";
    }
    const strippedCard = cardNumber.replace(/\s/g, "");
    if (strippedCard.length < 13 || strippedCard.length > 16) {
      newErrors.cardNumber = "Enter a valid card number";
    }
    if (expiry.replace(/\D/g, "").length < 4) {
      newErrors.expiry = "Enter a valid expiration (MM/YY)";
    }
    if (cvv.length < 3) {
      newErrors.cvv = "Enter a valid CVV";
    }
    if (!cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }
    if (!street.trim()) {
      newErrors.street = "Street address is required";
    }
    if (!city.trim()) {
      newErrors.city = "City is required";
    }
    if (!state.trim()) {
      newErrors.state = "State is required";
    }
    if (!zip.trim()) {
      newErrors.zip = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(type: "charge" | "auth_only") {
    if (!validateForm()) return;

    setIsProcessing(true);
    setTransactionResult(null);

    // Simulate API call delay
    setTimeout(() => {
      const brand = detectCardBrand(cardNumber) || "Card";
      const last4 = cardNumber.replace(/\s/g, "").slice(-4);

      const result: TransactionResult = {
        transactionId: generateTransactionId(),
        amount: `$${parseFloat(amount).toFixed(2)}`,
        status: "approved",
        authCode: generateAuthCode(),
        cardBrand: brand,
        last4,
        timestamp: new Date().toISOString(),
        type,
      };

      setTransactionResult(result);
      setIsProcessing(false);
    }, 1500);
  }

  function getStatusBadge(status: "success" | "pending" | "failed") {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-600 text-white text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500 text-white text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-600 text-white text-xs">
            <XCircle className="h-3 w-3 mr-1" />
            Declined
          </Badge>
        );
    }
  }

  const filteredTransactions = MOCK_RECENT_TRANSACTIONS;

  const recentStatusColors: Record<string, string> = {
    success: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-600",
  };

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Virtual Terminal</h1>
        <p className="text-gray-500 mt-1">
          Process card-not-present transactions directly from your browser.
        </p>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Tab: Terminal */}
      {activeTab === "terminal" && (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
        {/* LEFT: Payment Form (60%) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Details</h2>

            {/* Amount + Currency */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="amount" className="text-gray-900 font-medium mb-1.5 block">
                  Amount
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    id="amount"
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={amount}
                    onChange={handleAmountChange}
                    className={`pl-10 text-2xl font-semibold h-14 rounded-[7px] ${errors.amount ? "border-red-600" : ""}`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
                )}
              </div>
              <div className="w-28">
                <Label className="text-gray-900 font-medium mb-1.5 block">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="h-14 rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Card Number */}
            <div className="mb-4">
              <Label htmlFor="cardNumber" className="text-gray-900 font-medium mb-1.5 block">
                Card Number
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="cardNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  className={`pl-10 pr-20 rounded-[7px] ${errors.cardNumber ? "border-red-600" : ""}`}
                />
                {cardBrand && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#1844A6]">
                    {cardBrand}
                  </span>
                )}
              </div>
              {errors.cardNumber && (
                <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="expiry" className="text-gray-900 font-medium mb-1.5 block">
                  Expiration
                </Label>
                <Input
                  id="expiry"
                  type="text"
                  inputMode="numeric"
                  placeholder="MM / YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                  maxLength={7}
                  className={`rounded-[7px] ${errors.expiry ? "border-red-600" : ""}`}
                />
                {errors.expiry && (
                  <p className="text-red-600 text-sm mt-1">{errors.expiry}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cvv" className="text-gray-900 font-medium mb-1.5 block">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  type="text"
                  inputMode="numeric"
                  placeholder="123"
                  value={cvv}
                  onChange={handleCvvChange}
                  maxLength={4}
                  className={`rounded-[7px] ${errors.cvv ? "border-red-600" : ""}`}
                />
                {errors.cvv && (
                  <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="mb-6">
              <Label htmlFor="cardholderName" className="text-gray-900 font-medium mb-1.5 block">
                Cardholder Name
              </Label>
              <Input
                id="cardholderName"
                type="text"
                placeholder="Name as it appears on card"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className={`rounded-[7px] ${errors.cardholderName ? "border-red-600" : ""}`}
              />
              {errors.cardholderName && (
                <p className="text-red-600 text-sm mt-1">{errors.cardholderName}</p>
              )}
            </div>

            {/* Billing Address */}
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Billing Address
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="street" className="text-gray-900 font-medium mb-1.5 block">
                  Street Address
                </Label>
                <Input
                  id="street"
                  type="text"
                  placeholder="123 Main St"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={`rounded-[7px] ${errors.street ? "border-red-600" : ""}`}
                />
                {errors.street && (
                  <p className="text-red-600 text-sm mt-1">{errors.street}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gray-900 font-medium mb-1.5 block">
                    City
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`rounded-[7px] ${errors.city ? "border-red-600" : ""}`}
                  />
                  {errors.city && (
                    <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state" className="text-gray-900 font-medium mb-1.5 block">
                    State
                  </Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="NY"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    maxLength={2}
                    className={`rounded-[7px] ${errors.state ? "border-red-600" : ""}`}
                  />
                  {errors.state && (
                    <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip" className="text-gray-900 font-medium mb-1.5 block">
                    ZIP Code
                  </Label>
                  <Input
                    id="zip"
                    type="text"
                    inputMode="numeric"
                    placeholder="10001"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    maxLength={10}
                    className={`rounded-[7px] ${errors.zip ? "border-red-600" : ""}`}
                  />
                  {errors.zip && (
                    <p className="text-red-600 text-sm mt-1">{errors.zip}</p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-900 font-medium mb-1.5 block">Country</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="rounded-[7px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Optional Fields Toggle */}
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="flex items-center gap-2 text-sm font-medium text-[#1844A6] hover:underline mb-4"
            >
              {showOptional ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {showOptional ? "Hide Optional Fields" : "Show Optional Fields"}
            </button>

            {showOptional && (
              <div className="space-y-4 mb-6 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-medium mb-1.5 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="customer@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-[7px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-900 font-medium mb-1.5 block">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-[7px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orderId" className="text-gray-900 font-medium mb-1.5 block">
                      Order ID
                    </Label>
                    <Input
                      id="orderId"
                      type="text"
                      placeholder="ORD-00001"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="rounded-[7px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="poNumber" className="text-gray-900 font-medium mb-1.5 block">
                      PO Number
                    </Label>
                    <Input
                      id="poNumber"
                      type="text"
                      placeholder="PO-12345"
                      value={poNumber}
                      onChange={(e) => setPoNumber(e.target.value)}
                      className="rounded-[7px]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-900 font-medium mb-1.5 block">
                    Description
                  </Label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Payment for services rendered"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-[7px]"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <Button
                onClick={() => handleSubmit("charge")}
                disabled={isProcessing}
                className="flex-1 h-12 bg-[#1844A6] hover:bg-[#1844A6]/90 text-white font-semibold rounded-[7px] text-base"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <>
                    <DollarSign className="h-5 w-5 mr-2" />
                    Charge {amount ? `$${parseFloat(amount).toFixed(2)}` : ""}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSubmit("auth_only")}
                disabled={isProcessing}
                className="flex-1 h-12 font-semibold rounded-[7px] text-base border-[#1844A6] text-[#1844A6] hover:bg-[#1844A6]/5"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Auth Only
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT: Quick Actions Sidebar (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Saved Cards */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Cards</h2>
            <Select value={selectedSavedCard} onValueChange={handleSavedCardSelect}>
              <SelectTrigger className="rounded-[7px]">
                <SelectValue placeholder="Select a saved card..." />
              </SelectTrigger>
              <SelectContent>
                {MOCK_SAVED_CARDS.map((card) => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-2">
              Selecting a card will auto-fill payment fields above.
            </p>
          </div>

          {/* Transaction Result */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction Result</h2>
            {!transactionResult && !isProcessing && (
              <div className="text-center py-8">
                <CreditCard className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">
                  Submit a transaction to see the result here.
                </p>
              </div>
            )}
            {isProcessing && (
              <div className="text-center py-8">
                <div className="h-10 w-10 border-4 border-gray-200 border-t-[#1844A6] rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Processing transaction...</p>
              </div>
            )}
            {transactionResult && !isProcessing && (
              <div
                className={`rounded-[7px] p-4 ${
                  transactionResult.status === "approved"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {transactionResult.status === "approved" ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                  <span
                    className={`text-lg font-bold ${
                      transactionResult.status === "approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transactionResult.status === "approved" ? "Approved" : "Declined"}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="font-mono text-gray-900 text-xs">
                      {transactionResult.transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-semibold text-gray-900">
                      {transactionResult.amount} {currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="text-gray-900">
                      {transactionResult.type === "charge" ? "Charge" : "Auth Only"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Auth Code</span>
                    <span className="font-mono text-gray-900">
                      {transactionResult.authCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Card</span>
                    <span className="text-gray-900">
                      {transactionResult.cardBrand} ****{transactionResult.last4}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Timestamp</span>
                    <span className="text-gray-900 text-xs">
                      {new Date(transactionResult.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {MOCK_RECENT_TRANSACTIONS.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {txn.customer}
                      </span>
                      {getStatusBadge(txn.status)}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{txn.id}</span>
                      <span className="text-xs text-gray-300">|</span>
                      <span className="text-xs text-gray-500">{txn.method}</span>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <p className="text-sm font-semibold text-gray-900">{txn.amount}</p>
                    <p className="text-xs text-gray-500">{txn.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Tab: Recent Transactions */}
      {activeTab === "recent" && (
        <div className="mt-8">
          {filteredTransactions.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
              <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent transactions</h3>
              <p className="text-gray-500 text-sm">Process a payment to see transactions here.</p>
            </div>
          ) : (
            <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F6F9FC] border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Transaction ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Method</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn) => (
                    <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{txn.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{txn.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{txn.customer}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{txn.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{txn.method}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs rounded-full ${recentStatusColors[txn.status]}`}>
                          {txn.status === "success" ? "Approved" : txn.status === "pending" ? "Pending" : "Declined"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400">{filteredTransactions.length} transactions</span>
          </div>
        </div>
      )}
    </div>
  );
}
