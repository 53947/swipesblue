import CheckoutProgress from '../CheckoutProgress'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function CheckoutProgressExample() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="max-w-3xl p-8 bg-background space-y-6">
      <CheckoutProgress currentStep={currentStep} />
      <div className="flex gap-4 justify-center">
        <Button onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}>Previous</Button>
        <Button onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}>Next</Button>
      </div>
    </div>
  )
}
