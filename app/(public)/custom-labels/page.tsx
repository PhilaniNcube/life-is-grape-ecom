'use client'

import { useState } from 'react'
import { Wine, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { WineImage } from './_components/wine-image'


export default function CustomWineOrder() {
  const [wineType, setWineType] = useState<'red' | 'white'>('red')
  const [customMessage, setCustomMessage] = useState('')
  const [labelImage, setLabelImage] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(6)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLabelImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(6, prev + change))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the order data to your backend
    console.log('Order submitted:', {
      wineType,
      customMessage,
      labelImage,
      quantity,
    })
    alert('Order submitted successfully!')
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='grid gap-8 md:grid-cols-2'>
        <div className='hidden md:block'>
          <WineImage type={wineType} />
        </div>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Custom Wine Label Order</CardTitle>
            <CardDescription>
              Create your personalized wine bottle with a custom label
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='space-y-6'>
                <div>
                  <Label>Select Wine Type</Label>
                  <RadioGroup
                    value={wineType}
                    onValueChange={value =>
                      setWineType(value as 'red' | 'white')
                    }
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='red' id='red' />
                      <Label htmlFor='red'>House Red</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='white' id='white' />
                      <Label htmlFor='white'>House White</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor='quantity'>
                    Quantity (Minimum 6, in multiples of 6)
                  </Label>
                  <div className='mt-2 flex items-center space-x-2'>
                    <Button
                      type='button'
                      onClick={() => handleQuantityChange(-6)}
                      disabled={quantity <= 6}
                      className='bg-slate-700'
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                    <Input
                      id='quantity'
                      type='number'
                      value={quantity}
                      onChange={e =>
                        setQuantity(
                          Math.max(
                            6,
                            Math.floor(Number.parseInt(e.target.value) / 6) * 6
                          )
                        )
                      }
                      className='w-20 text-center'
                      min={6}
                      step={6}
                    />
                    <Button
                      type='button'
                      onClick={() => handleQuantityChange(6)}
                      className='bg-slate-700'
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor='custom-message'>Custom Label Message</Label>
                  <Textarea
                    id='custom-message'
                    placeholder='Enter your custom message here'
                    value={customMessage}
                    onChange={e => setCustomMessage(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor='label-image'>Upload Label Image</Label>
                  <Input
                    id='label-image'
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                  />
                </div>

                {labelImage && (
                  <div>
                    <Label>Label Preview</Label>
                    <div className='mt-2 overflow-hidden rounded-md border'>
                      <img
                        src={labelImage || '/placeholder.svg'}
                        alt='Label preview'
                        className='h-auto w-full'
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type='submit' onClick={handleSubmit} className='w-full bg-slate-700'>
              <Wine className='mr-2 h-4 w-4' /> Place Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
