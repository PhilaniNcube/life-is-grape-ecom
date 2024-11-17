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
import { updateVariantPriceAction } from '@/actions/products'
import { formatPrice } from '@/lib/utils'

export default function UpdatePriceDialog({
  variantId,
  initialPrice,
}: {
  variantId?: string
  initialPrice?: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [price, setPrice] = useState(initialPrice)
  const [state, formAction, isPending] = useActionState(
    updateVariantPriceAction,
    null
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline'>
          {formatPrice(initialPrice!)}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Product Variant Price</DialogTitle>
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
              id='price'
              type='number'
              value={price}
              name='price'
              onChange={e => setPrice(Number(e.target.value))}
              className='col-span-3'
              step="0.01"
              required
            />
          </div>
          <Button type='submit' disabled={isPending} className='ml-auto'>
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </form>
        {state?.error && (
          <div className='text-sm text-red-500'>{state.error}</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
