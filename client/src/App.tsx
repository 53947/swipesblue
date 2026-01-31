import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminLayout from "@/components/AdminLayout";
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
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/products" component={Products} />
      <Route path="/orders" component={Orders} />
      <Route path="/shoppingcart" component={ShoppingCart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/brand-studio" component={BrandStudio} />

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
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <Router />
      </main>
      {!isAdminRoute && <Footer />}
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
