'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const locations = [
  { name: 'CBD area', fee: 35 },
  { name: 'Seaview/Chelsea/Rowallan Park', fee: 65 },
  { name: 'Uitenhage/Despatch', fee: 150 },
  { name: 'National', fee: 0 },
]

export default function DeliveryCharges() {
  const [selectedLocation, setSelectedLocation] = useState('')
  const [orderAmount, setOrderAmount] = useState('')
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null)

  const calculateDeliveryFee = () => {
    const amount = Number.parseFloat(orderAmount)
    if (isNaN(amount)) {
      alert('Please enter a valid order amount')
      return
    }

    if (amount >= 2000) {
      setDeliveryFee(0)
    } else {
      const location = locations.find(loc => loc.name === selectedLocation)
      if (location) {
        setDeliveryFee(location.fee)
      } else if (selectedLocation === 'National') {
        setDeliveryFee(null)
      } else {
        alert('Please select a valid location')
      }
    }
  }

  return (
    <div className='grid gap-6 md:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle>Local Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-4'>
            Same day delivery if the order is placed before 12pm and if there is
            sufficient stock for the product.
          </p>
          <ul className='space-y-2'>
            {locations.slice(0, 3).map((location, index) => (
              <li key={index} className='flex justify-between'>
                <span>{location.name}</span>
                <span>R{location.fee}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>National Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            <li>Delivery in 2 to 3 working days</li>
            <li>Transit times vary by major centres</li>
            <li>Depends on Courier charges</li>
          </ul>
        </CardContent>
      </Card>

      <Card className='md:col-span-2'>
        <CardHeader>
          <CardTitle>Free Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <p>FREE delivery for all orders of R2000 or more</p>
        </CardContent>
      </Card>

      <Card className='md:col-span-2'>
        <CardHeader>
          <CardTitle>Calculate Delivery Fee</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='location'
                  className='mb-1 block text-sm font-medium text-gray-700'
                >
                  Location
                </label>
                <Select onValueChange={setSelectedLocation}>
                  <SelectTrigger id='location'>
                    <SelectValue placeholder='Select location' />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location, index) => (
                      <SelectItem key={index} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor='orderAmount'
                  className='mb-1 block text-sm font-medium text-gray-700'
                >
                  Order Amount (R)
                </label>
                <Input
                  id='orderAmount'
                  type='number'
                  min='0'
                  step='0.01'
                  value={orderAmount}
                  onChange={e => setOrderAmount(e.target.value)}
                  placeholder='Enter order amount'
                />
              </div>
            </div>
            <Button onClick={calculateDeliveryFee}>
              Calculate Delivery Fee
            </Button>
            {deliveryFee !== null && (
              <p className='text-lg font-semibold'>
                Delivery Fee:{' '}
                {deliveryFee === 0 ? 'FREE' : `R${deliveryFee.toFixed(2)}`}
              </p>
            )}
            {deliveryFee === null && selectedLocation === 'National' && (
              <p className='text-lg font-semibold'>
                Please contact us for a quote on national delivery charges.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
