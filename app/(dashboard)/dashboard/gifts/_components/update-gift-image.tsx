'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

const UpdateGiftImage = ({
  gift_id,
  image_id,
}: {
  gift_id: Id<'gifts'>
  image_id: Id<'_storage'>
}) => {
  const image = useQuery(api.gifts.fetchGiftImage, { image: image_id })

  const uploadUrl = useMutation(api.gifts.generateGiftUploadUrl)

  const updateImageMutation = useMutation(api.gifts.updateImageId)

  const router = useRouter()

  const [isUploading, setIsUploading] = useState(false)

  console.log(image)

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true)
    const file = event.target.files?.[0]
    if (!file) return

    const postUrl = await uploadUrl()

    const response = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const { storageId } = await response.json()
    console.log(storageId)

    try {
    
      await updateImageMutation({ gift_id, image_id: storageId })
      toast('Please wait while we update the image')
    } catch (error) {
      console.error('Error updating image:', error)
      alert('Failed to update image. Please try again.')
    } finally {
      router.refresh()
      setIsUploading(false)
    }
  }

  return (
    <div className='flex max-w-xl flex-col items-center justify-center'>
      <h1 className='mb-8 text-xl font-bold'>Image Updater</h1>
      <div className='flex flex-col items-center space-y-4'>
        <div className='relative h-64 w-64'>
          {image ? (
            <Image
              src={image}
              alt='Current image'
              width={500}
              height={500}
              className='aspect-square rounded-lg object-cover'
            />
          ) : (
            <Image
              src='/images/placeholder.svg'
              alt='Current image'
              width={500}
              height={500}
              className='aspect-square rounded-lg object-cover'
            />
          )}
        </div>
        <label className='flex cursor-pointer items-center justify-center w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'>
          <Upload className='mr-2 h-5 w-5' />
          {isUploading ? 'Uploading...' : 'Update Image'}
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  )
}

export default UpdateGiftImage
