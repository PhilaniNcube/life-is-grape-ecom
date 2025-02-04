'use client'

import { deleteCategoryAction } from '@/actions/categories'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Trash2 } from 'lucide-react'
import { useActionState } from 'react'

const DeleteCategory = ({id, slug}:{id:Id<"categories">, slug:string}) => {

  const [state, formAction, isPending] = useActionState(
    deleteCategoryAction,
    null
  )

  const categoryProducts = useQuery(api.categories.getProductsByCategoryId, {
    categoryId:id,
  })

  const categoryProductsCount = categoryProducts?.length

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' size='sm'>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className='mb-4 text-lg font-semibold'>Delete Category</h3>
        <p className='text-gray-600'>
          Are you sure you want to delete this category?
        </p>
        <form action={formAction} className='mt-6 flex justify-end'>
          <Input type='hidden' name='id' value={id} />
          {categoryProductsCount !== undefined && categoryProductsCount > 0 && (
            <Button
              type='submit'
              variant='destructive'
              className='min-[100px]'
              disabled={isPending}
              size='sm'
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default DeleteCategory
