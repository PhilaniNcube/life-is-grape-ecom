import { Id } from '@/convex/_generated/dataModel'

export type Post = {
  _id: Id<'posts'>
  _creationTime: number
  coverImageId?: string
  coverImageUrl?: string | null
  title: string
  slug: string
  excerpt: string
  content: string
  authorId: Id<'users'>
  likes: number
  author: {
    _id: Id<'users'>
    _creationTime: number
    firstName?: string | undefined
    lastName?: string | undefined
    imageUrl?: string | undefined
    posts?: Id<'posts'>[] | undefined
    email: string
    clerkUserId: string
  } | null
}

export type WineType =
  | 'Sauvignon Blanc'
  | 'Chardonnay'
  | 'Merlot'
  | 'Cabernet Sauvignon'
  | 'Pinot Noir'
  | 'Pinot Grigio'
  | 'Pinotage'
  | 'Syrah'
  | 'Zinfandel'
  | 'Riesling'
  | 'Port'
  | 'Sherry'
  | 'Madeira'
  | 'Marsala'
  | 'Vermouth'
  | 'Rose'
  | 'Malbec'
  | 'Champagne'
  | 'Prosecco'
  | 'Sangiovese'
  | 'Moscato'

export type Wine = {
  _id: string
  name: string
  year: number
  alcohol_content: number
  in_stock: boolean
  type: WineType
  main_image: string;
  price: number;
  images: Id<'_storage'>[]
  serving_suggestion: string
  variety: 'red' | 'white' | 'rose' | 'sparkling' | 'dessert' | 'fortified'
  brand: { _id: Id<'brands'>; _creationTime: number; name: string } | null
  winery: {
    _id: Id<'wineries'>
    _creationTime: number
    name: string
    location: string
    description: string
    image: Id<'_storage'>
  } | null
}
