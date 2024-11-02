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

export const UpdateWineSchema = z.object({
  id: z.string(),
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

export const WineType = z.enum(['red', 'white', 'rose', 'sparkling', 'dessert', 'fortified'])

export const CreateBookingSchema = z.object({
  experience_id: z.string(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  date: z.string(),
  time: z.string(),
  guests: z.coerce.number().int().min(1, 'At least one guest is required'),
  paid: z.boolean(),
})


export const CreateItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.enum(['Brandy', 'Whiskey', 'Gin', 'Vodka', 'Rum', 'Tequila']),
  brand_id: z.string(),
  tasting_notes: z.string(),
  price: z.coerce.number(),
  pairing_suggestions: z.string(),
  volume: z.coerce.number(),
  main_image: z.string(),
  images: z.optional(z.array(z.string())),
  cocktail_name: z.string(),
  ingredients: z.string(),
  cocktail_description: z.string(),
  by: z.optional(z.string()),
})


export const UpdateItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(['Brandy', 'Whiskey', 'Gin', 'Vodka', 'Rum', 'Tequila']),
  brand_id: z.string(),
  tasting_notes: z.string(),
  price: z.coerce.number(),
  pairing_suggestions: z.string(),
  volume: z.coerce.number(),
  main_image: z.string(),
  // images: z.optional(z.array(z.string())),
  cocktail_name: z.string(),
  ingredients: z.string(),
  cocktail_description: z.string(),
  by: z.optional(z.string()),
})


// Base Gift Schema
export const giftSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  type: z.enum(["box", "label", "bag"]),
  customization_options: z.object({
    allows_message: z.boolean(),
    message_max_length: z.number().optional(),
    allows_design_choice: z.boolean(),
    available_designs: z.array(z.string()).optional()
  }),
  compatible_wine_types: z.array(
    z.enum(["red", "white"])
  ),
  main_image: z.string(),
  images: z.array(z.string()).optional(),
  in_stock: z.boolean()
})

// Create Gift Schema
export const createGiftSchema = giftSchema

// Update Gift Schema
export const updateGiftSchema = z.object({
  gift_id: z.string(),
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.coerce.number().min(0).optional(),
  in_stock: z.boolean().optional(),
  main_image: z.string().optional(),
  images: z.array(z.string()).optional()
})

// Gift Customization Schema
export const giftCustomizationSchema = z.object({
  gift_id: z.string(),
  customer_message: z.string().optional(),
  selected_design: z.string().optional(),
  selected_wine_type: z.enum(["red", "white", "none"]),
  selected_wine_id: z.string().optional(),
  order_id: z.string()
})

// Delete Gift Schema
export const deleteGiftSchema = z.object({
  gift_id: z.string()
})

// Delete Gift Customization Schema
export const deleteGiftCustomizationSchema = z.object({
  customization_id: z.string()
})

export type Gift = z.infer<typeof giftSchema>
export type CreateGift = z.infer<typeof createGiftSchema>
export type UpdateGift = z.infer<typeof updateGiftSchema>
export type GiftCustomization = z.infer<typeof giftCustomizationSchema>
