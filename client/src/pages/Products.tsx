import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Users, Layers, Shield, Zap, ShoppingCart, BarChart3, Palette, Code } from "lucide-react";
import type { AddOnProduct } from "@shared/schema";
import Header from "@/components/Header";

const iconMap: Record<string, React.ElementType> = {
  "users": Users,
  "layers": Layers,
  "shield": Shield,
  "zap": Zap,
  "shopping-cart": ShoppingCart,
  "bar-chart-3": BarChart3,
  "palette": Palette,
  "code": Code,
};

const categoryLabels: Record<string, string> = {
  "integration": "Integration",
  "security": "Security",
  "marketing": "E-commerce",
  "analytics": "Analytics",
  "general": "General",
};

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: addOns, isLoading } = useQuery<AddOnProduct[]>({
    queryKey: ["/api/add-ons"],
  });

  const filteredProducts = addOns?.filter(addOn => {
    const matchesSearch = !searchTerm || 
      addOn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      addOn.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || addOn.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = addOns
    ? Array.from(new Set(addOns.map(p => p.category).filter(Boolean)))
    : [];

  const formatPrice = (price: string | null | undefined) => {
    if (!price || parseFloat(price) === 0) return "Free";
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const hasFreeOption = (addOn: AddOnProduct) => {
    return addOn.slug === "customer-portal" || 
           addOn.slug === "security-suite" || 
           addOn.slug === "advanced-analytics" ||
           addOn.slug === "custom-branding";
  };

  const requiresProPlus = (addOn: AddOnProduct) => {
    return addOn.requiredTier === "Pro" || addOn.requiredTier === "Enterprise";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-swipes-black">Products</h1>
          <p className="text-swipes-pro-gray">Browse our e-commerce solutions and add-ons</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-product-search"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              data-testid="button-category-all"
              className={selectedCategory === null ? "bg-swipes-blue-deep text-white" : "border-swipes-blue-deep text-swipes-blue-deep"}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category as string)}
                data-testid={`button-category-${category?.toLowerCase().replace(/\s/g, '-')}`}
                className={selectedCategory === category ? "bg-swipes-blue-deep text-white" : "border-swipes-blue-deep text-swipes-blue-deep"}
              >
                {categoryLabels[category as string] || category}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse border border-gray-200">
                <CardHeader>
                  <div className="h-6 bg-muted rounded" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-muted rounded w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(addOn => {
              const IconComponent = iconMap[addOn.icon || ""] || Layers;
              return (
                <Card 
                  key={addOn.id} 
                  className="flex flex-col border border-gray-200 rounded-[7px]" 
                  data-testid={`product-card-${addOn.slug}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <IconComponent className="h-5 w-5 text-swipes-blue-deep" />
                        </div>
                        <CardTitle className="text-lg font-semibold text-swipes-black">{addOn.name}</CardTitle>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {hasFreeOption(addOn) && (
                        <Badge 
                          className="bg-swipes-trusted-green text-white text-xs px-2 py-0.5 no-default-hover-elevate" 
                          data-testid={`badge-free-${addOn.slug}`}
                        >
                          FREE
                        </Badge>
                      )}
                      <Badge 
                        className="bg-swipes-blue-deep text-white text-xs px-2 py-0.5 no-default-hover-elevate" 
                        data-testid={`badge-paid-${addOn.slug}`}
                      >
                        PAID
                      </Badge>
                      {requiresProPlus(addOn) && (
                        <Badge 
                          className="bg-swipes-gold text-black text-xs px-2 py-0.5 no-default-hover-elevate" 
                          data-testid={`badge-pro-${addOn.slug}`}
                        >
                          PRO+
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-swipes-pro-gray mb-4 line-clamp-2">{addOn.description}</p>
                    <div className="flex items-baseline">
                      {hasFreeOption(addOn) ? (
                        <span className="text-2xl font-bold text-swipes-blue-deep" data-testid={`price-${addOn.slug}`}>
                          From {formatPrice(addOn.annualPrice)}/year
                        </span>
                      ) : (
                        <span className="text-2xl font-bold text-swipes-blue-deep" data-testid={`price-${addOn.slug}`}>
                          {formatPrice(addOn.annualPrice)}/year
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/products/${addOn.slug}`} className="w-full">
                      <Button
                        className="w-full bg-swipes-blue-deep text-white rounded-[7px] group"
                        data-testid={`button-learn-more-${addOn.slug}`}
                      >
                        <span className="flex items-center justify-center">
                          Learn More
                          <span className="inline-flex w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </span>
                        </span>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">No products found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
