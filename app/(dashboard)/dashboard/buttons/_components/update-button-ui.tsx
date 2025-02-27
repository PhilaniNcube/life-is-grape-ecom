'use client'

import { updateButtons } from '@/actions/buttons'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { useState, useEffect, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { CustomButton } from '@/components/ui'

export const UpdateButtonUI = () => {
  const button = useQuery(api.buttons.getButton)

  const [isPending, startTransition] = useTransition()

  const [bg, setBg] = useState<string>('#ffffff')
  const [color, setColor] = useState<string>('#000000')
  const [radius, setRadius] = useState<number>(4)

  useEffect(() => {
    if (button) {
      setBg(button.bg || '#ffffff')
      setColor(button.color || '#000000')
      setRadius(button.radius || 4)
    }
  }, [button])

  const onSubmit = async () => {
    if (!button?._id) return

    try {
      startTransition(async () => {
        await updateButtons(button._id, bg, color, radius)
      })
    } catch (error) {
      console.error('Failed to update button styles:', error)
    }
  }

  // Button preview with current styles
  const previewStyle = {
    backgroundColor: bg,
    color: color,
    borderRadius: `${radius}px`,
    padding: '10px 20px',
    border: 'none',
    transition: 'all 0.3s ease',
  }

  if (!button) {
    return <div>Loading button settings...</div>
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Button Customization</CardTitle>
        <CardDescription>
          Modify the appearance of buttons across the application
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='bg-color'>Background Color</Label>
          <div className='flex gap-2'>
            <Input
              id='bg-color'
              type='color'
              value={bg}
              onChange={e => setBg(e.target.value)}
              className='h-10 w-12 p-1'
            />
            <Input
              type='text'
              value={bg}
              onChange={e => setBg(e.target.value)}
              className='flex-1'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='text-color'>Text Color</Label>
          <div className='flex gap-2'>
            <Input
              id='text-color'
              type='color'
              value={color}
              onChange={e => setColor(e.target.value)}
              className='h-10 w-12 p-1'
            />
            <Input
              type='text'
              value={color}
              onChange={e => setColor(e.target.value)}
              className='flex-1'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label>Border Radius: {radius}px</Label>
          <Slider
            value={[radius]}
            min={0}
            max={20}
            step={1}
            onValueChange={value => setRadius(value[0])}
          />
        </div>

        <div className='mt-6'>
          <Label>Button Preview</Label>
          <div className='my-4 flex justify-center'>
            <button style={previewStyle}>Preview Button</button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <CustomButton
          onClick={onSubmit}
          disabled={isPending}
          className='w-full'
        >
          {isPending ? 'Updating...' : 'Update Button Style'}
        </CustomButton>
      </CardFooter>
    </Card>
  )
}

export default UpdateButtonUI
