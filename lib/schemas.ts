import { z } from 'zod'
// define zod schemas for form actions

// Base product schema
export const BaseProductSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  producer_id: z.string(),
  categories: z.array(z.string()),
  price: z.coerce.number().positive('Price must be positive'),
  main_image: z.string(),
  images: z.array(z.string()),
  in_stock: z.boolean(),
  product_type: z.enum(['wine', 'spirit', 'gift', 'custom_label']),
  on_sale: z.boolean().optional(),
  sale_price: z.coerce.number().optional(),
  volume: z.coerce.number().positive().optional(),
  dimensions: z.string().optional(),
  slug: z.string(),
  meta_description: z.string().optional(),
  featured: z.boolean(),
})

// Product attributes schema
const AttributesSchema = z.object({
  variety: z.string().optional(),
  vintage: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
  alcohol_content: z.coerce.number().min(0).max(100),
  region: z.string(),
  tasting_notes: z.string().optional(),
  serving_suggestion: z.string().optional(),
  awards: z.array(z.string()).optional(),
  pairing_suggestions: z.string().optional(),
  aging: z.string().optional(),
  distillation_method: z.string().optional(),
  description: z.string().optional(),
})

// Product variant schema
const ProductVariantSchema = z.object({
  product_id: z.string(),
  sku: z.string().optional(),
  volume: z.coerce.number().positive(),
  price: z.coerce.number().positive(),
  stock_level: z.coerce.number().min(0),
  barcode: z.string().optional(),
  label_dimensions: z.string().optional(),
  is_on_sale: z.boolean().optional(),
  sale_price: z.coerce.number().optional(),
  sale_start_date: z.coerce.number().optional(),
  sale_end_date: z.coerce.number().optional(),
})

export type Product = z.infer<typeof BaseProductSchema>
export type Attributes = z.infer<typeof AttributesSchema>
export type ProductVariant = z.infer<typeof ProductVariantSchema>

// Create schemas
export const CreateProductSchema = BaseProductSchema

export const CreateAttributesSchema = AttributesSchema.extend({
  product_id: z.string(),
})

export const CreateProductVariantSchema = ProductVariantSchema

// Update schemas
export const UpdateProductSchema = BaseProductSchema.partial().extend({
  id: z.string(),
})

export const UpdateAttributesSchema = AttributesSchema.partial().extend({
  id: z.string(),
})

export const UpdateProductVariantSchema = ProductVariantSchema.partial().extend(
  {
    id: z.string(),
  }
)

export const UpdateVariantPriceSchema = z.object({
  id: z.string(),
  price: z.coerce.number().positive(),
})

export const UpdateVariantSaleStatusSchema = z.object({
  id: z.string(),
  is_on_sale: z.boolean(),
  sale_price: z.coerce.number(),
})

export const UpdateVariantVolumeSchema = z.object({
  id: z.string(),
  volume: z.coerce.number().positive(),
})

export const UpdateVariantStockSchema = z.object({
  id: z.string(),
  stock_level: z.coerce.number().min(0),
})

export const CreateBookingSchema = z.object({
  experience_id: z.string(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  date: z.string(),
  time: z.string(),
  guests: z.coerce.number().int().min(1, 'At least one guest is required'),
  paid: z.boolean(),
})

// Base Gift Schema
export const giftSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  type: z.enum(['box', 'label', 'bag', 'voucher']),
  customization_options: z.object({
    allows_message: z.boolean(),
    message_max_length: z.number().optional(),
    allows_design_choice: z.boolean(),
    available_designs: z.array(z.string()).optional(),
  }),
  compatible_wine_types: z.array(z.enum(['red', 'white'])),
  main_image: z.string(),
  images: z.array(z.string()).optional(),
  in_stock: z.boolean(),
  dimensions: z.string().optional(),
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
  // main_image: z.string().optional(),
  // images: z.array(z.string()).optional(),
  type: z.enum(['box', 'label', 'bag', 'voucher']),
  dimensions: z.string().optional(),
  // compatible_wine_types: z.array(z.enum(['red', 'white'])),
})

// Gift Customization Schema
export const giftCustomizationSchema = z.object({
  gift_id: z.string(),
  customer_message: z.string().optional(),
  selected_design: z.string().optional(),
  selected_wine_type: z.enum(['red', 'white', 'none']),
  selected_wine_id: z.string().optional(),
  order_id: z.string(),
})

// Delete Gift Schema
export const deleteGiftSchema = z.object({
  gift_id: z.string(),
})

// Delete Gift Customization Schema
export const deleteGiftCustomizationSchema = z.object({
  customization_id: z.string(),
})

// Base category schema
export const CategoryFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['wine', 'spirit'], {
    required_error: 'Category type is required',
    invalid_type_error: 'Category type must be either wine or spirit',
  }),
  parent_id: z.string().optional(),
  attributes: z.array(z.string()).default([]),
  sort_order: z.coerce.number().int().min(0).default(0).optional(),
})

// Create category schema
export const CreateCategorySchema = CategoryFormSchema

// Update category schema - all fields optional
export const UpdateCategorySchema = CategoryFormSchema.partial().extend({
  id: z.string({
    required_error: 'Category ID is required',
  }),
})

// Schema for deleting category
export const DeleteCategorySchema = z.object({
  id: z.string({
    required_error: 'Category ID is required',
  }),
})

export type Gift = z.infer<typeof giftSchema>
export type CreateGift = z.infer<typeof createGiftSchema>
export type UpdateGift = z.infer<typeof updateGiftSchema>
export type GiftCustomization = z.infer<typeof giftCustomizationSchema>

// Base producer schema
export const ProducerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['winery', 'distillery', 'brand'], {
    required_error: 'Producer type is required',
    invalid_type_error: 'Type must be winery, distillery or brand',
  }),
  location: z.string().optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional(),
  logo: z.string().optional(), // For storage ID
  website: z.string().url('Must be a valid URL').optional(),
})

// Create producer schema
export const CreateProducerSchema = ProducerFormSchema

// Update producer schema - all fields optional
export const UpdateProducerSchema = ProducerFormSchema.partial().extend({
  id: z.string({
    required_error: 'Producer ID is required',
  }),
})

// Schema for deleting producer
export const DeleteProducerSchema = z.object({
  id: z.string({
    required_error: 'Producer ID is required',
  }),
})

const GiftVoucherSchema = z.object({
  recipient_email: z.string().email(),
  purchaser_email: z.string().email(),
  value: z.coerce.number().positive(),
  code: z.string(),
  paid: z.boolean().optional(),
  redeemed: z.boolean().optional(),
  redeemed_at: z.number().optional(),
  redeemed_order_id: z.string().optional(),
  redeemed_by: z.string().optional(),
  payment_reference: z.string().optional(),
})

export const CreateGiftVoucherSchema = GiftVoucherSchema.partial({
  paid: true,
  redeemed: true,
  redeemed_at: true,
  redeemed_order_id: true,
  redeemed_by: true,
  payment_reference: true,
})

export const RedeemGiftVoucherSchema = z.object({
  code: z.string(),
  order_id: z.string(),
  redeemed_by: z.string(),
})

// Base Personalised Label Schema
const PersonalisedLabelSchema = z.object({
  order_id: z.string(),
  image: z.string(),
  message: z.string().max(500, 'Message must be less than 500 characters'),
})

const ExperienceSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number().positive(),
  duration: z.string(),
  type: z.string().optional(),
  servings: z.string(),
  image: z.string().optional(),
})

const BannerSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  image: z.string(),
  link: z.string(),
})

export const CreateBannerSchema = BannerSchema

export const UpdateBannerSchema = BannerSchema.partial().extend({
  id: z.string(),
})

export type Banner = z.infer<typeof BannerSchema>

export type CreateBanner = z.infer<typeof CreateBannerSchema>

export const CreateExperienceSchema = ExperienceSchema

export type CreateExperience = z.infer<typeof CreateExperienceSchema>

export const UpdateExperienceSchema = ExperienceSchema.partial().extend({
  id: z.string(),
})

export type Experience = z.infer<typeof UpdateExperienceSchema>

export const CreatePersonalisedLabelSchema = PersonalisedLabelSchema

export const UpdatePersonalisedLabelSchema =
  PersonalisedLabelSchema.partial().extend({
    id: z.string(),
  })

export type PersonalisedLabel = z.infer<typeof PersonalisedLabelSchema>

export type GiftVoucher = z.infer<typeof GiftVoucherSchema>
