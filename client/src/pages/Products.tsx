import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import type { Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Products() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = products?.filter(product => {
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = products
    ? Array.from(new Set(products.map(p => p.category).filter(Boolean)))
    : [];

  const handleAddToCart = async (productId: string) => {
    try {
      await apiRequest("POST", "/api/cart", {
        productId,
        quantity: 1,
      });

      await queryClient.invalidateQueries({ queryKey: ["/api/cart"] });

      toast({
        title: "Added to cart",
        description: "Product has been added to your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Demo Banner */}
      <div className="bg-swipes-blue-deep text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
          <span className="bg-swipes-purple/20 text-swipes-purple px-2 py-0.5 rounded text-xs font-semibold">DEMO</span>
          <span>This is a live demo of the SwipesBlue product catalog</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-swipes-black">Products</h1>
          <p className="text-swipes-gray">Browse our e-commerce solutions and add-ons</p>
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
            className={selectedCategory === null ? "bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white" : "border-swipes-blue-deep text-swipes-blue-deep"}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category as string)}
              data-testid={`button-category-${category?.toLowerCase().replace(/\s/g, '-')}`}
              className={selectedCategory === category ? "bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white" : "border-swipes-blue-deep text-swipes-blue-deep"}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
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
          {filteredProducts.map(product => (
            <Card key={product.id} className="flex flex-col" data-testid={`product-card-${product.id}`}>
              <CardHeader>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  {product.category && (
                    <Badge variant="secondary" className="no-default-hover-elevate" data-testid={`badge-category-${product.id}`}>
                      {product.category}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-swipes-red" data-testid={`price-${product.id}`}>
                    ${parseFloat(product.price).toFixed(2)}
                  </span>
                  {product.stock !== undefined && product.stock > 0 && (
                    <span className="text-sm text-muted-foreground" data-testid={`stock-${product.id}`}>
                      {product.stock} in stock
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-swipes-red hover:bg-swipes-red/90 text-white"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={product.stock === 0}
                  data-testid={`button-add-to-cart-${product.id}`}
                >
                  <ShoppingCartIcon className="h-4 w-4 mr-2" />
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </CardFooter>
            </Card>
          ))}
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
