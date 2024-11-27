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
import { updateStockAction } from '@/actions/products'

export default function UpdateStockDialog({
  variantId,
  stock_level,
}: {
  variantId?: string
  stock_level?: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [stock, setStock] = useState(stock_level)
  const [state, formAction, isPending] = useActionState(updateStockAction, null)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline'>
          {stock} in stock
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Product Variant Stock Level</DialogTitle>
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
              id='stock_level'
              type='number'
              value={stock}
              name='stock_level'
              onChange={e => setStock(Number(e.target.value))}
              className='col-span-3'
              min='0'
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
