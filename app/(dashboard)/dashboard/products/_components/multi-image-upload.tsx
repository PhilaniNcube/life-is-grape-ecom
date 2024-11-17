'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { revalidatePath } from 'next/cache'

export default function MultiImageUpload({
  productId,
  images,
}: {
  productId: Id<'products'>,
  images: (string | null)[]
}) {
  const [files, setFiles] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const uploadFiles = useMutation(api.products.setProductImages)


  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: true,
  })

  const removeFile = (file: File) => {
    setFiles(prevFiles => prevFiles.filter(f => f !== file))
  }

  const generateUploadUrl = useMutation(api.products.generateUploadUrl)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setFiles(prevFiles => [...prevFiles, ...Array.from(files)])

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const preview = URL.createObjectURL(file)
        setPreviewImages(prevImages => [...prevImages, preview])
        // await uploadImage(file)
        const postUrl = await generateUploadUrl()

        const result = await fetch(postUrl, {
          method: 'POST',
          body: file,
        })

        if (!result.ok) {
          throw new Error('Upload failed')
        }
        const { storageId } = await result.json()

        await uploadFiles({
          id: productId,
          image_id: storageId,
        })

      }

      revalidatePath(`/dashboard/products/${productId}`)


    } catch (error) {
      toast.error('Failed to upload image')
      setPreviewImages([])
    }
  }

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardContent className='p-4'>
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/10'
              : 'border-gray-300 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} onChange={handleImageUpload} />
          {isDragActive ? (
            <p>Drop the images here ...</p>
          ) : (
            <p>
              Drag &apos;n&apos; drop some images here, or click to select files
            </p>
          )}
        </div>

        {images?.length > 0 && (
          <div className='mt-6 space-y-4'>
            <h3 className='font-semibold'>Selected Images:</h3>
            <div className='grid grid-cols-3 gap-4'>
              {images.map((image, index) => {
                if (!image) return null
                return (
                  <div key={image} className='group relative'>
                    <img
                      src={image}
                      alt={`preview ${index}`}
                      className='h-24 w-full rounded-md object-cover'
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
