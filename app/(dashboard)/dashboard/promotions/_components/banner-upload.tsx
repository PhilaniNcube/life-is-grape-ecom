'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useRouter } from 'next/navigation'
import { set } from 'sanity'
import { CustomButton } from '@/components/ui'

export default function BannerUpload({
  banner_id,
  image_id,
}: {
  banner_id: Id<'banner'>
  image_id: Id<'_storage'>
}) {
  const generateUploadUrl = useMutation(api.banner.generateUploadUrl)
  const updateBannerImage = useMutation(api.banner.updateBannerImage)
  const bannerImage = useQuery(api.banner.getBannerImage, { id: image_id })
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (bannerImage) {
      setBannerUrl(bannerImage)
    }
  }, [bannerImage])

  async function uploadImage(data: FormData) {
    const file = data.get('image') as File

    try {
      const uploadUrl = await generateUploadUrl()

      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'image/*' },
        body: file,
      })

      const { storageId } = await result.json()

      await updateBannerImage({
        id: banner_id,
        imageId: storageId,
      })
    } catch (error) {
      console.error('Error downloading image: ', error)
    }
  }

  async function uploadBanner(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (file) {
      setUploading(true)

      //   check the file type and make sure it's an image
      console.log(file)

      const data = new FormData()
      data.append('image', file)

      await uploadImage(data)

      setUploading(false)

      router.refresh()
    }
  }

  return (
    <div className='w-full'>
      {bannerUrl ? (
        <div className='relative h-48 w-full md:h-64 lg:h-80'>
          <img
            src={bannerUrl || '/placeholder.svg'}
            alt='Banner'
            className='h-full w-full rounded-lg object-cover'
          />
          <Button
            onClick={() => setBannerUrl(null)}
            className='absolute right-2 top-2 bg-white bg-opacity-50 hover:bg-opacity-100'
            size='icon'
          >
            <X className='h-4 w-4' />
            <span className='sr-only'>Remove banner</span>
          </Button>
        </div>
      ) : (
        <div className='flex h-48 w-full items-center justify-center rounded-lg bg-muted md:h-64 lg:h-80'>
          <Upload className='h-8 w-8 text-muted-foreground' />
        </div>
      )}
      <div className='mt-4'>
        <Input
          type='file'
          id='banner'
          accept='image/*'
          onChange={uploadBanner}
          disabled={uploading}
          className='hidden'
        />
        <CustomButton>
          <label htmlFor='banner' className='cursor-pointer'>
            {uploading ? 'Uploading ...' : 'Upload Image'}
          </label>
        </CustomButton>
      </div>
    </div>
  )
}
