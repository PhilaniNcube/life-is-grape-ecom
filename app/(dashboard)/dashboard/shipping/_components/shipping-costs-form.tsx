'use client'

import { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function ShippingCostsForm() {
  const [insidePe, setInsidePe] = useState<number | ''>('')
  const [peOutskirts, setPeOutskirts] = useState<number | ''>('')
  const [restOfSa, setRestOfSa] = useState<number | ''>('')
  const [isLoading, setIsLoading] = useState(false)

  // Get current shipping costs
  const shippingCosts = useQuery(api.shipping.getShippingCosts)
  
  // Update shipping costs mutation
  const updateShippingCosts = useMutation(api.shipping.updateShippingCosts)

  // Load current values when data is available
  useEffect(() => {
    if (shippingCosts) {
      setInsidePe(shippingCosts.inside_pe)
      setPeOutskirts(shippingCosts.pe_outskirts)
      setRestOfSa(shippingCosts.rest_of_sa)
    }
  }, [shippingCosts])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate that all fields are numbers
      if (typeof insidePe !== 'number' || typeof peOutskirts !== 'number' || typeof restOfSa !== 'number') {
        toast.error('All shipping costs must be valid numbers')
        return
      }

      // Update the shipping costs
      await updateShippingCosts({
        inside_pe: insidePe,
        pe_outskirts: peOutskirts,
        rest_of_sa: restOfSa
      })

      toast.success('Shipping costs updated successfully')
    } catch (error) {
      console.error('Error updating shipping costs:', error)
      toast.error('Failed to update shipping costs')
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to handle numeric inputs
  const handleNumericChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number | ''>>
  ) => {
    if (value === '') {
      setter('')
    } else {
      const parsed = parseFloat(value)
      if (!isNaN(parsed)) {
        setter(parsed)
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Shipping Costs Configuration</CardTitle>
        <CardDescription>
          Set shipping costs for different delivery zones. These prices will be used to calculate shipping costs during checkout.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inside_pe">Port Elizabeth / Gqeberha (R)</Label>
            <Input
              id="inside_pe"
              type="number"
              min="0"
              step="0.01"
              value={insidePe}
              onChange={(e) => handleNumericChange(e.target.value, setInsidePe)}
              placeholder="35"
              required
            />
            <p className="text-xs text-muted-foreground">
              Shipping cost for deliveries within Port Elizabeth / Gqeberha city limits
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pe_outskirts">PE Outskirts (Seaview/Chelsea/Rowallan Park) (R)</Label>
            <Input
              id="pe_outskirts"
              type="number"
              min="0"
              step="0.01"
              value={peOutskirts}
              onChange={(e) => handleNumericChange(e.target.value, setPeOutskirts)}
              placeholder="65"
              required
            />
            <p className="text-xs text-muted-foreground">
              Shipping cost for deliveries to the PE outskirts (Seaview, Chelsea, Rowallan Park)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rest_of_sa">Rest of South Africa (R)</Label>
            <Input
              id="rest_of_sa"
              type="number"
              min="0"
              step="0.01"
              value={restOfSa}
              onChange={(e) => handleNumericChange(e.target.value, setRestOfSa)}
              placeholder="150"
              required
            />
            <p className="text-xs text-muted-foreground">
              Shipping cost for deliveries to the rest of South Africa (Uitenhage, Despatch and beyond)
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Shipping Costs'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
