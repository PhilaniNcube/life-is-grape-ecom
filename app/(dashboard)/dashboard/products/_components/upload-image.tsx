'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { generateUploadUrl } from '@/convex/products'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ImageUpload({
  handleImageUpload,
}: {
  handleImageUpload: (file: File) => void
}) {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: false,
  })

  const uploadImage = async () => {
    if (!image) return

    setUploading(true)

    // This is a mock upload function. Replace this with your actual upload logic.
    await handleImageUpload(image)

    // Simulating a successful upload
    console.log('Image uploaded successfully')
    setUploading(false)

    // You might want to reset the component state here or show a success message
  }

  return (
    <div className='mx-auto mt-8 max-w-md'>
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-4 text-center ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className='relative h-48 w-full'>
            <Image
              src={preview || '/images//placeholder.svg'}
              alt='Preview'
              className='aspect-square w-48 object-cover'
              width={500}
              height={500}
            />
          </div>
        ) : (
          <p className='text-gray-500'>
            Drag 'n' drop an image here, or click to select one
          </p>
        )}
      </div>

      {image && (
        <div className='mt-4'>
          <p className='mb-2 text-sm text-gray-500'>
            Selected file: {image.name}
          </p>
          <Button
            onClick={uploadImage}
            disabled={uploading}
            className={cn(
              `w-full rounded-lg bg-blue-500 px-4 py-2 text-white`,
              uploading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
            )}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>
      )}
    </div>
  )
}
