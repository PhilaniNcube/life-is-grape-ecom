'use client'

import { createBrandAction } from '@/actions/brands'
import SubmitButton from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon } from 'lucide-react'
import { startTransition, useState } from 'react'

const NewBrandDialog = () => {
  const [state, formAction] = useActionState(createBrandAction, null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className='mr-3' />
          New Brand
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className='text-xl font-semibold'>New Brand</h2>
        <form
          action={formData => {
            startTransition(() => {
              formAction(formData)
              setIsOpen(false)
            })
          }}
        >
          <Label htmlFor='name'>Name</Label>
          <Input name='name' id='name' type='text' />
          <SubmitButton className='mt-4'>Create Brand</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default NewBrandDialog
