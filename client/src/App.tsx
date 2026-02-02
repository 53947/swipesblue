import { Switch, Route, useLocation } from "wouter";
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
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Merchants from "@/pages/admin/Merchants";
import AdminTransactions from "@/pages/admin/AdminTransactions";
import ApiKeys from "@/pages/admin/ApiKeys";
import Webhooks from "@/pages/admin/Webhooks";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/demo" component={Demo} />
      
      {/* Public Product Demo Pages */}
      <Route path="/products" component={Products} />
      <Route path="/cart" component={ShoppingCart} />
      <Route path="/shoppingcart" component={ShoppingCart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/brand-studio" component={BrandStudio} />
      <Route path="/transactions" component={Transactions} />

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
      <Route path="/dashboard/abandoned-carts">
        {() => (
          <DashboardLayout>
            <div className="p-8">
              <h1 className="text-2xl font-bold text-swipes-black mb-2">Abandoned Carts</h1>
              <p className="text-swipes-pro-gray">Recover lost sales with automated email recovery.</p>
              <div className="mt-8 p-6 bg-white rounded-[7px] border border-gray-200">
                <p className="text-swipes-pro-gray">This feature requires Pro plan or higher.</p>
              </div>
            </div>
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
            <div className="p-8">
              <h1 className="text-2xl font-bold text-swipes-black mb-2">Analytics</h1>
              <p className="text-swipes-pro-gray">View detailed reports and insights about your business.</p>
              <div className="mt-8 p-6 bg-white rounded-[7px] border border-gray-200">
                <p className="text-swipes-pro-gray">Analytics dashboard coming soon.</p>
              </div>
            </div>
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/security">
        {() => (
          <DashboardLayout>
            <div className="p-8">
              <h1 className="text-2xl font-bold text-swipes-black mb-2">Security</h1>
              <p className="text-swipes-pro-gray">Manage fraud prevention and security settings.</p>
              <div className="mt-8 p-6 bg-white rounded-[7px] border border-gray-200">
                <p className="text-swipes-pro-gray">Security settings coming soon.</p>
              </div>
            </div>
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/settings">
        {() => (
          <DashboardLayout>
            <div className="p-8">
              <h1 className="text-2xl font-bold text-swipes-black mb-2">Settings</h1>
              <p className="text-swipes-pro-gray">Configure your account and preferences.</p>
              <div className="mt-8 p-6 bg-white rounded-[7px] border border-gray-200">
                <p className="text-swipes-pro-gray">Settings coming soon.</p>
              </div>
            </div>
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

      {/* Admin Routes */}
      <Route path="/admin">
        {() => (
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/merchants">
        {() => (
          <AdminLayout>
            <Merchants />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/transactions">
        {() => (
          <AdminLayout>
            <AdminTransactions />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/api-keys">
        {() => (
          <AdminLayout>
            <ApiKeys />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/webhooks">
        {() => (
          <AdminLayout>
            <Webhooks />
          </AdminLayout>
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
        <AppLayout />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
