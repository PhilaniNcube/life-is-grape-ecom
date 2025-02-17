'use client'

import { deleteGiftAction } from '@/actions/gifts'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Id } from '@/convex/_generated/dataModel'
import { CircleDashed, Trash2 } from 'lucide-react'
import { useActionState } from 'react'

const DeleteGiftDialog = ({id}: {id:Id<"gifts">}) => {

  async function clientAction() {
     deleteGiftAction(id)
  }

  const [state, formAction, isPending] = useActionState(clientAction, null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-red-500 text-white' size="sm">
          <Trash2 className='' size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className='flex flex-col gap-4'>
          <h1 className='text-lg font-bold'>Delete Gift</h1>
          <p>Are you sure you want to delete this gift?</p>
          <form action={formAction} className='flex gap-4'>
            <Button type="submit" className='bg-red-600 text-white'>
              {isPending ? <CircleDashed className="animate-spin" /> : 'Delete'}
            </Button>
            <DialogClose className='text-red-500'>Cancel</DialogClose>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default DeleteGiftDialog
