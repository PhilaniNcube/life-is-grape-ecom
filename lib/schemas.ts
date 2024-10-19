import {z} from 'zod';
import {JSONContent} from 'novel';
// define zod schemas for form actions

export const CreateWineSchema = z.object({
  brand: z.string(),
  name: z.string().min(2, 'Name is required'),
  winery_id: z.string(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
  price: z.coerce.number().positive('Price must be positive'),
  main_image: z.string(),
  images: z.array(z.string()).optional(),
  in_stock: z.boolean(),
  alcohol_content: z.coerce.number(),
  serving_suggestion: z.string(),
  variety: z.string().min(1, 'Variety is required'),
  type: z.string().min(1, 'Type is required'),
})


export const CreateBrandSchema = z.object({
  name: z.string()
})

export const CreatePostSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  coverImageId: z.string().optional(),
  content: z.custom<JSONContent>()
})
