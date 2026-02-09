import { useState } from "react";
import {
  ShoppingCart,
  AlertTriangle,
  RotateCcw,
  DollarSign,
  Mail,
  Clock,
  Percent,
  BarChart3,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MetricCard from "@/components/MetricCard";

const recoveredCarts = [
  { id: "rc-1", customer: "john@example.com", cartValue: "$142.50", emailNumber: "Email 1", recoveredDate: "Oct 24, 2025", discount: "None" },
  { id: "rc-2", customer: "sarah@store.com", cartValue: "$89.99", emailNumber: "Email 2", recoveredDate: "Oct 24, 2025", discount: "10%" },
  { id: "rc-3", customer: "mike@business.co", cartValue: "$234.00", emailNumber: "Email 1", recoveredDate: "Oct 23, 2025", discount: "None" },
  { id: "rc-4", customer: "anna@email.com", cartValue: "$67.50", emailNumber: "Email 3", recoveredDate: "Oct 23, 2025", discount: "15%" },
  { id: "rc-5", customer: "tom@company.io", cartValue: "$310.00", emailNumber: "Email 1", recoveredDate: "Oct 22, 2025", discount: "None" },
  { id: "rc-6", customer: "lisa@mail.com", cartValue: "$55.99", emailNumber: "Email 2", recoveredDate: "Oct 22, 2025", discount: "10%" },
  { id: "rc-7", customer: "david@web.org", cartValue: "$178.00", emailNumber: "Email 1", recoveredDate: "Oct 21, 2025", discount: "None" },
  { id: "rc-8", customer: "emma@shop.com", cartValue: "$92.00", emailNumber: "Email 3", recoveredDate: "Oct 21, 2025", discount: "15%" },
];

const abandonedProducts = [
  { name: "Premium Subscription (Annual)", timesAbandoned: 45, cartValue: "$4,050", abandonmentRate: "34%" },
  { name: "Enterprise Plan", timesAbandoned: 32, cartValue: "$9,600", abandonmentRate: "28%" },
  { name: "Pro Enhancement Bundle", timesAbandoned: 28, cartValue: "$1,400", abandonmentRate: "25%" },
  { name: "Custom Integration Setup", timesAbandoned: 22, cartValue: "$3,300", abandonmentRate: "41%" },
  { name: "API Access License", timesAbandoned: 18, cartValue: "$900", abandonmentRate: "20%" },
];

const dayOfWeekConversion = [
  { day: "Mon", rate: 72 },
  { day: "Tue", rate: 78 },
  { day: "Wed", rate: 75 },
  { day: "Thu", rate: 82 },
  { day: "Fri", rate: 68 },
  { day: "Sat", rate: 55 },
  { day: "Sun", rate: 52 },
];

const maxRate = Math.max(...dayOfWeekConversion.map((d) => d.rate));

const abandonmentPages = [
  { page: "Payment Information", dropoffs: 156, percent: 35 },
  { page: "Shipping Selection", dropoffs: 98, percent: 22 },
  { page: "Cart Review", dropoffs: 78, percent: 18 },
  { page: "Account Creation", dropoffs: 67, percent: 15 },
  { page: "Order Confirmation", dropoffs: 45, percent: 10 },
];

export default function CartSettings() {
  const [cartExpiration, setCartExpiration] = useState("24h");
  const [maxItems, setMaxItems] = useState("50");
  const [allowQuantityChanges, setAllowQuantityChanges] = useState(true);
  const [showInventory, setShowInventory] = useState(false);
  const [enableCartNotes, setEnableCartNotes] = useState(true);
  const [autoApplyCoupons, setAutoApplyCoupons] = useState(false);
  const [taxCalculation, setTaxCalculation] = useState("none");
  const [fixedTaxRate, setFixedTaxRate] = useState("8.25");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("75");
  const [showEstimatedShipping, setShowEstimatedShipping] = useState(true);
  const [cartStyle, setCartStyle] = useState("sidebar");
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [showContinueShopping, setShowContinueShopping] = useState(true);
  const [emptyMessage, setEmptyMessage] = useState("Your cart is empty. Start shopping!");
  const [enableRecoveryEmails, setEnableRecoveryEmails] = useState(true);
  const [email1Discount, setEmail1Discount] = useState(false);
  const [email2Discount, setEmail2Discount] = useState(true);
  const [email3Discount, setEmail3Discount] = useState(true);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-swipes-black">Cart Pro</h1>
        <p className="text-swipes-pro-gray">
          Advanced shopping cart configuration, cart recovery, and cart analytics
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Carts"
          value="142"
          change="Currently in progress"
          changeType="neutral"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Abandoned Today"
          value="23"
          change="-5 from yesterday"
          changeType="positive"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Recovery Rate"
          value="18.5%"
          change="+2.3% from last week"
          changeType="positive"
          icon={RotateCcw}
        />
        <MetricCard
          title="Recovered Revenue"
          value="$1,847"
          change="This week"
          changeType="positive"
          icon={DollarSign}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="cart-settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="cart-settings">Cart Settings</TabsTrigger>
          <TabsTrigger value="recovery">Abandoned Cart Recovery</TabsTrigger>
          <TabsTrigger value="analytics">Cart Analytics</TabsTrigger>
        </TabsList>

        {/* Cart Settings Tab */}
        <TabsContent value="cart-settings" className="space-y-6">
          {/* Cart Behavior */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Cart Behavior</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Cart Expiration</Label>
                <Select value={cartExpiration} onValueChange={setCartExpiration}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="4h">4 hours</SelectItem>
                    <SelectItem value="12h">12 hours</SelectItem>
                    <SelectItem value="24h">24 hours</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Maximum Items Per Cart</Label>
                <Input
                  type="number"
                  value={maxItems}
                  onChange={(e) => setMaxItems(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Allow quantity changes in cart", checked: allowQuantityChanges, onChange: setAllowQuantityChanges },
                { label: "Show inventory count", checked: showInventory, onChange: setShowInventory },
                { label: "Enable cart notes", checked: enableCartNotes, onChange: setEnableCartNotes },
                { label: "Auto-apply coupons", checked: autoApplyCoupons, onChange: setAutoApplyCoupons },
              ].map((toggle) => (
                <div key={toggle.label} className="flex items-center justify-between py-2">
                  <Label className="text-sm text-swipes-black">{toggle.label}</Label>
                  <Switch checked={toggle.checked} onCheckedChange={toggle.onChange} />
                </div>
              ))}
            </div>
          </div>

          {/* Tax & Shipping */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Tax & Shipping</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Tax Calculation</Label>
                <Select value={taxCalculation} onValueChange={setTaxCalculation}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="fixed">Fixed rate</SelectItem>
                    <SelectItem value="api">Tax API</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {taxCalculation === "fixed" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-swipes-black">Fixed Tax Rate (%)</Label>
                  <Input
                    type="number"
                    value={fixedTaxRate}
                    onChange={(e) => setFixedTaxRate(e.target.value)}
                    className="rounded-[7px]"
                    step="0.01"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Free Shipping Threshold ($)</Label>
                <Input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm text-swipes-black">Show estimated shipping in cart</Label>
              <Switch checked={showEstimatedShipping} onCheckedChange={setShowEstimatedShipping} />
            </div>
          </div>

          {/* Design */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Design</h3>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Cart Style</Label>
              <div className="flex gap-3">
                {[
                  { value: "sidebar", label: "Slide-out Sidebar" },
                  { value: "fullpage", label: "Full Page" },
                  { value: "modal", label: "Modal Popup" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCartStyle(option.value)}
                    className={`px-4 py-2 rounded-[7px] text-sm font-medium border transition-colors ${
                      cartStyle === option.value
                        ? "bg-swipes-blue-deep text-white border-swipes-blue-deep"
                        : "bg-white text-swipes-pro-gray border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-swipes-black">Show product thumbnails</Label>
                <Switch checked={showThumbnails} onCheckedChange={setShowThumbnails} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-swipes-black">Show "Continue Shopping" button</Label>
                <Switch checked={showContinueShopping} onCheckedChange={setShowContinueShopping} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Cart Empty State Message</Label>
              <Input
                value={emptyMessage}
                onChange={(e) => setEmptyMessage(e.target.value)}
                className="rounded-[7px]"
              />
            </div>
          </div>
        </TabsContent>

        {/* Abandoned Cart Recovery Tab */}
        <TabsContent value="recovery" className="space-y-6">
          {/* Recovery Automation */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-swipes-black">Recovery Automation</h3>
                <p className="text-sm text-swipes-pro-gray mt-1">
                  Configure automated email sequences for abandoned cart recovery.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-sm text-swipes-black">Enable abandoned cart emails</Label>
                <Switch checked={enableRecoveryEmails} onCheckedChange={setEnableRecoveryEmails} />
              </div>
            </div>

            {enableRecoveryEmails && (
              <div className="space-y-4">
                {/* Email 1 */}
                <div className="p-4 bg-gray-50 rounded-[7px] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-swipes-blue-deep text-white flex items-center justify-center text-sm font-bold">1</div>
                    <h4 className="font-medium text-swipes-black">First Reminder</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                    <div className="space-y-2">
                      <Label className="text-sm text-swipes-pro-gray">Time Delay</Label>
                      <Input defaultValue="1 hour" className="rounded-[7px]" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-swipes-pro-gray">Subject Line</Label>
                      <Input defaultValue="You left something behind!" className="rounded-[7px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pl-11">
                    <div className="flex items-center gap-3">
                      <Label className="text-sm text-swipes-black">Include discount</Label>
                      <Switch checked={email1Discount} onCheckedChange={setEmail1Discount} />
                    </div>
                    <div className="flex gap-4 text-sm text-swipes-pro-gray">
                      <span>Open: <strong className="text-swipes-black">42%</strong></span>
                      <span>Click: <strong className="text-swipes-black">18%</strong></span>
                      <span>Recovery: <strong className="text-swipes-black">8.2%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Email 2 */}
                <div className="p-4 bg-gray-50 rounded-[7px] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-swipes-blue-deep text-white flex items-center justify-center text-sm font-bold">2</div>
                    <h4 className="font-medium text-swipes-black">Second Reminder</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                    <div className="space-y-2">
                      <Label className="text-sm text-swipes-pro-gray">Time Delay</Label>
                      <Input defaultValue="24 hours" className="rounded-[7px]" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-swipes-pro-gray">Subject Line</Label>
                      <Input defaultValue="Your cart is waiting for you" className="rounded-[7px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pl-11">
                    <div className="flex items-center gap-3">
                      <Label className="text-sm text-swipes-black">Include discount</Label>
                      <Switch checked={email2Discount} onCheckedChange={setEmail2Discount} />
                      {email2Discount && (
                        <div className="flex items-center gap-1">
                          <Input defaultValue="10" className="w-16 rounded-[7px]" />
                          <span className="text-sm text-swipes-pro-gray">%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4 text-sm text-swipes-pro-gray">
                      <span>Open: <strong className="text-swipes-black">35%</strong></span>
                      <span>Click: <strong className="text-swipes-black">12%</strong></span>
                      <span>Recovery: <strong className="text-swipes-black">5.8%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Email 3 */}
                <div className="p-4 bg-gray-50 rounded-[7px] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-swipes-blue-deep text-white flex items-center justify-center text-sm font-bold">3</div>
                    <h4 className="font-medium text-swipes-black">Final Reminder</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                    <div className="space-y-2">
                      <Label className="text-sm text-swipes-pro-gray">Time Delay</Label>
                      <Input defaultValue="72 hours" className="rounded-[7px]" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-swipes-pro-gray">Subject Line</Label>
                      <Input defaultValue="Last chance — your items are selling fast!" className="rounded-[7px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pl-11">
                    <div className="flex items-center gap-3">
                      <Label className="text-sm text-swipes-black">Include discount</Label>
                      <Switch checked={email3Discount} onCheckedChange={setEmail3Discount} />
                      {email3Discount && (
                        <div className="flex items-center gap-1">
                          <Input defaultValue="15" className="w-16 rounded-[7px]" />
                          <span className="text-sm text-swipes-pro-gray">%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4 text-sm text-swipes-pro-gray">
                      <span>Open: <strong className="text-swipes-black">28%</strong></span>
                      <span>Click: <strong className="text-swipes-black">9%</strong></span>
                      <span>Recovery: <strong className="text-swipes-black">4.5%</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recovered Carts Table */}
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-swipes-black">Recently Recovered Carts</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Cart Value</TableHead>
                  <TableHead>Recovery Email</TableHead>
                  <TableHead>Recovered Date</TableHead>
                  <TableHead>Discount Applied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recoveredCarts.map((cart) => (
                  <TableRow key={cart.id}>
                    <TableCell className="font-medium text-swipes-black">{cart.customer}</TableCell>
                    <TableCell className="text-swipes-black">{cart.cartValue}</TableCell>
                    <TableCell>
                      <Badge className="bg-swipes-blue-deep text-white">{cart.emailNumber}</Badge>
                    </TableCell>
                    <TableCell className="text-swipes-pro-gray">{cart.recoveredDate}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{cart.discount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Cart Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-swipes-black mb-4">Cart Metrics</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-swipes-pro-gray">Average Cart Value</p>
                  <p className="text-3xl font-bold text-swipes-blue-deep mt-1">$67.42</p>
                </div>
                <div>
                  <p className="text-sm text-swipes-pro-gray">Average Items Per Cart</p>
                  <p className="text-3xl font-bold text-swipes-blue-deep mt-1">2.3</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-swipes-black mb-4">
                Cart-to-Checkout Conversion by Day
              </h3>
              <div className="flex items-end gap-3 h-32">
                {dayOfWeekConversion.map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-swipes-pro-gray font-medium">{item.rate}%</span>
                    <div
                      className="w-full bg-swipes-blue-deep rounded-t-[4px] transition-all"
                      style={{ height: `${(item.rate / maxRate) * 100}px` }}
                    />
                    <span className="text-xs text-swipes-pro-gray">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Most Abandoned Products */}
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-swipes-black">Most Abandoned Products</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Times Abandoned</TableHead>
                  <TableHead>Cart Value</TableHead>
                  <TableHead>Abandonment Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {abandonedProducts.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell className="font-medium text-swipes-black">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-swipes-blue-deep" />
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-swipes-pro-gray">{product.timesAbandoned}</TableCell>
                    <TableCell className="text-swipes-black">{product.cartValue}</TableCell>
                    <TableCell>
                      <Badge className="bg-swipes-muted-red text-white">{product.abandonmentRate}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Top Abandonment Pages */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-swipes-black mb-4">
              Top Cart Abandonment Pages
            </h3>
            <div className="space-y-3">
              {abandonmentPages.map((page) => (
                <div key={page.page} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-swipes-black">{page.page}</span>
                    <span className="text-swipes-pro-gray">{page.dropoffs} drop-offs ({page.percent}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-swipes-muted-red rounded-full transition-all"
                      style={{ width: `${page.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
