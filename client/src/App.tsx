import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminLayout from "@/components/AdminLayout";
import DashboardLayout from "@/components/DashboardLayout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Transactions from "@/pages/Transactions";
import Products from "@/pages/Products";
import ShoppingCart from "@/pages/ShoppingCart";
import Checkout from "@/pages/Checkout";
import Orders from "@/pages/Orders";
import BrandStudio from "@/pages/BrandStudio";
import Pricing from "@/pages/Pricing";
import Demo from "@/pages/Demo";
import Developers from "@/pages/Developers";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLogin from "@/pages/admin/AdminLogin";
import Merchants from "@/pages/admin/Merchants";
import AdminTransactions from "@/pages/admin/AdminTransactions";
import ApiKeys from "@/pages/admin/ApiKeys";
import Webhooks from "@/pages/admin/Webhooks";
import RateManagement from "@/pages/admin/RateManagement";
import NotFound from "@/pages/not-found";
import ProductDetail from "@/pages/ProductDetail";
import VirtualTerminal from "@/pages/dashboard/VirtualTerminal";
import Invoicing from "@/pages/dashboard/Invoicing";
import RecurringBilling from "@/pages/dashboard/RecurringBilling";
import FraudPrevention from "@/pages/dashboard/FraudPrevention";
import CustomerVault from "@/pages/dashboard/CustomerVault";
import PaymentLinks from "@/pages/dashboard/PaymentLinks";
import DisputeManagement from "@/pages/dashboard/DisputeManagement";
import SecurityDashboard from "@/pages/dashboard/SecurityDashboard";
import AnalyticsDashboard from "@/pages/dashboard/AnalyticsDashboard";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import Reporting from "@/pages/dashboard/Reporting";
import CheckoutOptimizer from "@/pages/dashboard/CheckoutOptimizer";
import CartSettings from "@/pages/dashboard/CartSettings";
import MultiGateway from "@/pages/dashboard/MultiGateway";
import CustomerPortal from "@/pages/dashboard/CustomerPortal";
import SubscriptionCheckout from "@/pages/SubscriptionCheckout";
import SubscriptionSuccess from "@/pages/SubscriptionSuccess";
import MerchantProducts from "@/pages/dashboard/MerchantProducts";
import ProductForm from "@/pages/dashboard/ProductForm";
import BulkEditor from "@/pages/dashboard/BulkEditor";
import ImportExport from "@/pages/dashboard/ImportExport";
import TermsOfService from "@/pages/legal/TermsOfService";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import CookiePolicy from "@/pages/legal/CookiePolicy";
import AcceptableUsePolicy from "@/pages/legal/AcceptableUsePolicy";
import About from "@/pages/About";
import EcommerceSuite from "@/pages/products/EcommerceSuite";
import ShoppingCartProduct from "@/pages/products/ShoppingCartProduct";
import CheckoutProduct from "@/pages/products/CheckoutProduct";
import VirtualTerminalProduct from "@/pages/products/VirtualTerminalProduct";
import PaymentLinksProduct from "@/pages/products/PaymentLinksProduct";
import InvoicingProduct from "@/pages/products/InvoicingProduct";
import RecurringBillingProduct from "@/pages/products/RecurringBillingProduct";
import CustomerVaultProduct from "@/pages/products/CustomerVaultProduct";
import FraudPreventionProduct from "@/pages/products/FraudPreventionProduct";
import TierGate from "@/components/TierGate";
import { AdminAuthProvider, useAdminAuth } from "@/contexts/AdminAuthContext";
import { ReactNode } from "react";

function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F9FC] flex items-center justify-center">
        <div className="text-swipes-pro-gray">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Redirect to="/admin/login" />;
  }
  
  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/demo" component={Demo} />
      <Route path="/developers" component={Developers} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Public Product Marketing Pages */}
      <Route path="/products/ecommerce" component={EcommerceSuite} />
      <Route path="/products/cart" component={ShoppingCartProduct} />
      <Route path="/products/checkout" component={CheckoutProduct} />
      <Route path="/products/terminal" component={VirtualTerminalProduct} />
      <Route path="/products/payment-links" component={PaymentLinksProduct} />
      <Route path="/products/invoicing" component={InvoicingProduct} />
      <Route path="/products/billing" component={RecurringBillingProduct} />
      <Route path="/products/customers" component={CustomerVaultProduct} />
      <Route path="/products/fraud" component={FraudPreventionProduct} />

      {/* Product catalog and detail pages */}
      <Route path="/products" component={Products} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/subscribe/:slug" component={SubscriptionCheckout} />
      <Route path="/subscription/success" component={SubscriptionSuccess} />
      <Route path="/cart" component={ShoppingCart} />
      <Route path="/shoppingcart" component={ShoppingCart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/brand-studio" component={BrandStudio} />
      <Route path="/transactions" component={Transactions} />

      {/* Legal Pages */}
      <Route path="/terms" component={TermsOfService} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/cookies" component={CookiePolicy} />
      <Route path="/acceptable-use" component={AcceptableUsePolicy} />

      {/* Dashboard Routes - wrapped in DashboardLayout */}
      <Route path="/dashboard">
        {() => (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/products">
        {() => (
          <DashboardLayout>
            <Products />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/orders">
        {() => (
          <DashboardLayout>
            <Orders />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/transactions">
        {() => (
          <DashboardLayout>
            <Transactions />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/virtual-terminal">
        {() => (
          <DashboardLayout>
            <VirtualTerminal />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/invoicing">
        {() => (
          <DashboardLayout>
            <Invoicing />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/recurring-billing">
        {() => (
          <DashboardLayout>
            <RecurringBilling />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/fraud-prevention">
        {() => (
          <DashboardLayout>
            <FraudPrevention />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/customer-vault">
        {() => (
          <DashboardLayout>
            <CustomerVault />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/payment-links">
        {() => (
          <DashboardLayout>
            <PaymentLinks />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/dispute-management">
        {() => (
          <DashboardLayout>
            <DisputeManagement />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/abandoned-carts">
        {() => (
          <DashboardLayout>
            <TierGate
              requiredTier="Scale"
              featureName="Abandoned Carts"
              featureDescription="Recover lost sales with automated email recovery campaigns."
            >
              <div className="p-8">
                <h1 className="text-2xl font-bold text-swipes-black mb-2">Abandoned Carts</h1>
                <p className="text-swipes-pro-gray">Recover lost sales with automated email recovery.</p>
                <div className="mt-8 p-6 bg-white rounded-[7px] border border-gray-200">
                  <p className="text-swipes-pro-gray">View and manage abandoned cart recovery campaigns.</p>
                </div>
              </div>
            </TierGate>
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/brand-studio">
        {() => (
          <DashboardLayout>
            <BrandStudio />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/analytics">
        {() => (
          <DashboardLayout>
            <AnalyticsDashboard />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/security">
        {() => (
          <DashboardLayout>
            <SecurityDashboard />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/reporting">
        {() => (
          <DashboardLayout>
            <Reporting />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/settings">
        {() => (
          <DashboardLayout>
            <SettingsPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/checkout-optimizer">
        {() => (
          <DashboardLayout>
            <CheckoutOptimizer />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/cart-settings">
        {() => (
          <DashboardLayout>
            <CartSettings />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/gateways">
        {() => (
          <DashboardLayout>
            <MultiGateway />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/customer-portal">
        {() => (
          <DashboardLayout>
            <CustomerPortal />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/api-keys">
        {() => (
          <DashboardLayout>
            <ApiKeys />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/webhooks">
        {() => (
          <DashboardLayout>
            <Webhooks />
          </DashboardLayout>
        )}
      </Route>

      {/* Merchant Catalog Routes (Prompt 13) */}
      <Route path="/dashboard/catalog">
        {() => (
          <DashboardLayout>
            <MerchantProducts />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/catalog/create">
        {() => (
          <DashboardLayout>
            <ProductForm />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/catalog/:id/edit">
        {() => (
          <DashboardLayout>
            <ProductForm />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/catalog/bulk-edit">
        {() => (
          <DashboardLayout>
            <BulkEditor />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/catalog/import">
        {() => (
          <DashboardLayout>
            <ImportExport />
          </DashboardLayout>
        )}
      </Route>

      {/* Admin Login (public) */}
      <Route path="/admin/login" component={AdminLogin} />

      {/* Protected Admin Routes */}
      <Route path="/admin">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>
      <Route path="/admin/merchants">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <Merchants />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>
      <Route path="/admin/transactions">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminTransactions />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>
      <Route path="/admin/rates">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <RateManagement />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>
      <Route path="/admin/api-keys">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <ApiKeys />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>
      <Route path="/admin/webhooks">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <Webhooks />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");
  const isDashboardRoute = location.startsWith("/dashboard");
  const isAuthPage = location === "/login" || location === "/register";
  
  // Auth pages have their own layout
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Router />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F6F9FC]">
      <div className="max-w-[1400px] mx-auto bg-white min-h-screen flex flex-col border-x border-gray-200">
        {!isAdminRoute && <Header />}
        <main className="flex-1 flex flex-col">
          <Router />
        </main>
        {!isAdminRoute && !isDashboardRoute && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <AppLayout />
          <Toaster />
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
