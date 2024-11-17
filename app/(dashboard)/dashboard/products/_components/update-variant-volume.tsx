'use client'

import { startTransition, useActionState, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateVariantVolumeAction } from '@/actions/products'

export default function UpdateVolumeDialog({
  variantId,
  initialVolume,
}: {
  variantId?: string
  initialVolume?: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [volume, setVolume] = useState(initialVolume)
  const [state, formAction, isPending] = useActionState(
    updateVariantVolumeAction,
    null
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant='outline'>{initialVolume}ml</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Product Variant Volume</DialogTitle>
        </DialogHeader>
        <form
          action={formData => {
            startTransition(() => {
              formAction(formData)
            })
          }}
          className='grid gap-4 py-4'
        >
          <div className='grid grid-cols-4 items-center gap-4'>
            <Input type='hidden' value={variantId} name='id' />
            <Label htmlFor='volume' className='text-right'>
              Volume
            </Label>
            <Input
              id='volume'
              type='number'
              value={volume}
              name="volume"
              onChange={e => setVolume(Number(e.target.value))}
              className='col-span-3'
              min='1'
              required
            />
          </div>
          <Button type='submit' disabled={isPending} className='ml-auto'>
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </form>
        {state?.error && (
          <div className='text-red-500 text-sm'>{state.error}</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
