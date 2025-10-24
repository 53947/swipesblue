import OrderSummary from '../OrderSummary'

export default function OrderSummaryExample() {
  return (
    <div className="max-w-md p-8 bg-background">
      <OrderSummary
        subtotal={209.97}
        tax={18.90}
        shipping={15.00}
        discount={20.00}
        onCheckout={() => console.log('Proceeding to checkout')}
      />
    </div>
  )
}
