import ShippingCostsForm from './_components/shipping-costs-form'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ShippingPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shipping Settings</h1>
        <p className="text-muted-foreground">Manage shipping costs for different delivery zones</p>
      </div>
      
      <div className="grid gap-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>
              These shipping costs will be applied during checkout based on the customer's location.
              Remember that orders over R2000 qualify for free shipping automatically
            </CardDescription>
          </CardHeader>
        </Card>
        
        <ShippingCostsForm />
      </div>
    </div>
  )
}