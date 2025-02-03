'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { useState, useTransition } from 'react'

const SortDialog = ({
  id,
  sort_order,
}: {
  id: Id<'products'>
  sort_order: number | undefined
}) => {
  const updateSortOrder = useMutation(api.products.updateSortOrder)

  const [isPending, startTransition] = useTransition()

  const [sortValue, setSortValue] = useState(sort_order)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline'>
          {sort_order}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className='flex gap-2'>
          <Input
            type='number'
            value={sortValue}
            onChange={e => setSortValue(Number(e.target.value))}
            name='sort_order'
            className='flex-1'
          />
          <Button
            className='max-w-lg'
            onClick={() => {
              startTransition(() => {
                updateSortOrder({ id, sort_order: sortValue ?? 10 })
              })
            }}
          >
            Update Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default SortDialog
