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

export default function MultiImageUpload({
  productId,
}: {
  productId: Id<'products'>
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

        {files.length > 0 && (
          <div className='mt-6 space-y-4'>
            <h3 className='font-semibold'>Selected Images:</h3>
            <div className='grid grid-cols-3 gap-4'>
              {files.map((file, index) => (
                <div key={index} className='group relative'>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    className='h-24 w-full rounded-md object-cover'
                  />
                  <button
                    onClick={() => removeFile(file)}
                    className='absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}
      </CardContent>
    </Card>
  )
}
