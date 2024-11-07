import React, { startTransition } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { deleteProductAction } from '@/actions/products'

interface DeleteProductDialogProps {
  productId: Id<"products">

}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  productId
}) => {
  const deleteProduct = useMutation(api.products.deleteProduct)

  const handleDelete = async () => {
    try {
      await deleteProduct({ id: productId })
      toast.success('Product deleted successfully')

    } catch (error) {
      toast.error('Failed to delete product')
      console.error('Delete Product Error:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' size='sm'>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the product? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='ghost'>Cancel</Button>
          <Button variant='destructive' onClick={() => {
            startTransition(async() => {
             const result = await deleteProductAction(productId)

              if (result.success) {
                toast.success('Product deleted successfully')
              } else {
                toast.error(result.error)
              }
            })
          }}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteProductDialog
