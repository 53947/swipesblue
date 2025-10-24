import CartItem from '../CartItem'
import { useState } from 'react'

export default function CartItemExample() {
  const [items, setItems] = useState([
    { id: "1", name: "Premium Widget", price: 29.99, quantity: 2 },
    { id: "2", name: "Deluxe Service Package", price: 149.99, quantity: 1 },
  ]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity } : item));
    console.log('Updated quantity for', id, 'to', quantity);
  };

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    console.log('Removed item', id);
  };

  return (
    <div className="max-w-3xl p-8 bg-background">
      {items.map(item => (
        <CartItem
          key={item.id}
          {...item}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}
