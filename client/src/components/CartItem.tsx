import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ id, name, price, quantity, image, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border" data-testid={`cart-item-${id}`}>
      <div className="w-20 h-20 bg-muted rounded-md flex-shrink-0 overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{name}</h3>
        <p className="text-sm text-muted-foreground">${price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
          data-testid={`button-decrease-${id}`}
          style={{ borderColor: "#0000FF", color: "#0000FF" }}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center font-medium" data-testid={`quantity-${id}`}>{quantity}</span>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(id, quantity + 1)}
          data-testid={`button-increase-${id}`}
          style={{ borderColor: "#0000FF", color: "#0000FF" }}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="w-24 text-right font-semibold" style={{ color: "#0000FF" }} data-testid={`total-${id}`}>
        ${(price * quantity).toFixed(2)}
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => onRemove(id)}
        data-testid={`button-remove-${id}`}
        style={{ color: "#FF0040" }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
