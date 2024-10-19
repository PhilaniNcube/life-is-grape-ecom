'use client'

import { CreatePostSchema } from '@/lib/schemas'
import { createSlugFromName } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'

import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Editor from '@/components/editor/editor'
import { JSONContent } from 'novel'

type Inputs = z.infer<typeof CreatePostSchema>

const NewPostForm = () => {

 function setContent(content:JSONContent) {
  setValue('content', content, { shouldValidate: true })
 }

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {},
  })

  const title = watch('title')
  useEffect(() => {
    if(title) {
      const slug = createSlugFromName(title)

          if (slug) {
            setValue('slug', slug, { shouldValidate: true })
          }
    }
  }, [title])

  return (
    <div className='container mx-auto'>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <div className='flex items-end justify-between gap-4'>
          <div className='flex-1 space-y-2'>
            <Label htmlFor='title'>Blog title</Label>
            <Input
              id='title'
              placeholder='Blog title'
              type='text'
              {...register('title')}
              defaultValue='i'
            />
            <p
              className='mt-2 text-xs text-destructive'
              role='alert'
              aria-live='polite'
            >
              {errors.title?.message && 'Title is invalid'}
            </p>
          </div>
          <div className='flex-1'>
            <Input
              type='text'
              id='slug'
              placeholder='Slug'
              {...register('slug')}
            />
            <p
              className='mt-2 text-xs text-destructive'
              role='alert'
              aria-live='polite'
            >
              {errors.slug?.message && `${errors.slug?.message}`}
            </p>
          </div>
        </div>
        <div className='mt-4'>
          <Textarea
            rows={3}
            id='content'
            placeholder='Short description of blog article'
            {...register('excerpt')}
          />
            <p
              className='mt-2 text-xs text-destructive'
              role='alert'
              aria-live='polite'
              >
              {errors.excerpt?.message && `${errors.excerpt?.message}`}
            </p>
        </div>
        <div className='mt-6'>
          <Label>Blog Content</Label>
          <Editor editable={true} setContent={setContent} />
        </div>
      </form>
    </div>
  )
}
export default NewPostForm




