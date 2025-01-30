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
import { Switch } from '@/components/ui/switch'
import { updateSaleStatusAction } from '@/actions/products'

export default function UpdateSaleDialog({
  variantId,
  is_on_sale,
  initialSalePrice,
}: {
  variantId: string
  is_on_sale: boolean
  initialSalePrice: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  const [state, formAction, isPending] = useActionState(
    updateSaleStatusAction,
    null
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline'>
          {is_on_sale ? 'On Sale' : 'Not On Sale'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Sale Details</DialogTitle>
        </DialogHeader>
        <form
          action={formData => {
            startTransition(() => {
              formAction(formData)
            })
          }}
          className='grid gap-4 py-4'
        >
          <div className=''>
            <Input type='hidden' value={variantId} name='id' />
            <div className='flex w-full flex-col items-start gap-2 rounded-lg border-2 border-dashed border-gray-200 p-8'>
              <Label htmlFor='volume' className='text-right'>
                On Sale
              </Label>
              <Switch
                id='is_on_sale'
                defaultChecked={is_on_sale}
                name='is_on_sale'
                onCheckedChange={checked => {
                  !checked
                }}
                required
              />{' '}
            </div>
          </div>
          <div className=''>
            <Input type='hidden' value={variantId} name='id' />
            <Label htmlFor='volume' className='text-right'>
              Sale Price
            </Label>
            <Input
              id='sale_price'
              type='number'
              defaultValue={initialSalePrice}
              name='sale_price'
              required
            />
          </div>
          <Button type='submit' disabled={isPending} className='ml-auto'>
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
