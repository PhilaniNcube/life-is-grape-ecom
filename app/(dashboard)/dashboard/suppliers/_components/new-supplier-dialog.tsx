'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormEvent, startTransition, useRef, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import SubmitButton from '@/components/submit-button'
import { createWineryAction } from '@/actions/wineries'
import { useRouter } from 'next/navigation'

const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_URL || ''

const NewSupplierDialog = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const imageInput = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const generateUploadUrl = useMutation(api.wineries.generateUploadUrl)
  const [wineryImageId, setWineryImageId] = useState<string | null>(null)

  async function handleSendImage(event: FormEvent) {
    event.preventDefault()

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl()
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': selectedImage!.type },
      body: selectedImage,
    })
    const { storageId } = await result.json()
    // Step 3: Save the newly allocated storage id to the database

    setWineryImageId(storageId)

    setSelectedImage(null)
    imageInput.current!.value = ''
  }

  const [state, formAction] = useActionState(createWineryAction, null)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>New Supplier/Winery</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Supplier/Winery</DialogTitle>
        <form onSubmit={handleSendImage}>
          <Label>Please upload the supplier logo</Label>
          <Input
            ref={imageInput}
            type='file'
            onChange={e => setSelectedImage(e.target.files![0])}
          />

          {selectedImage && (
            <Button disabled={!!wineryImageId} type='submit'>
              Save Image
            </Button>
          )}
        </form>
        <Separator />
        <form
          action={formData => {
            startTransition(() => {
              formAction(formData)
              router.refresh()
              setIsOpen(false)
            })
          }}
        >
          <div>
            <Label htmlFor='name'>Winery/Supplier Name</Label>
            <Input name='name' id='name' />
          </div>
          <div className='mt-2'>
            <Label htmlFor='location'>Location/Region</Label>
            <Input name='location' id='location' />
            {!!wineryImageId && (
              <Input
                defaultValue={wineryImageId}
                name='image'
                id='image'
                className='sr-only'
                type='hidden'
              />
            )}
          </div>
          <div className='my-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea rows={3} name='description' id='description' />
          </div>
          <SubmitButton>Create Supplier</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default NewSupplierDialog
