import PaymentForm from '../PaymentForm'

export default function PaymentFormExample() {
  return (
    <div className="max-w-2xl p-8 bg-background">
      <PaymentForm onSubmit={(data) => console.log('Payment submitted:', data)} />
    </div>
  )
}
