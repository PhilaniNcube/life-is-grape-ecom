import { Doc, Id } from '@/convex/_generated/dataModel'

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



export type ExpandedBooking = {
  _id: Id<'bookings'>
  name: string
  email: string
  date: string
  time: string
  guests: number
  tasting_experience: {
    _id: Id<'tasting_experiences'>
    _creationTime: number
    name: string
    description: string
    price: number
    image: Id<'_storage'>
  }
  tasting_experience_id: Id<'tasting_experiences'>
  paid: boolean
}


export type LiqourListItem = {
  name: string
  _id: Id<'products'>
  description: string
  type: 'Brandy' | 'Gin' | 'Whiskey' | 'Vodka' | 'Rum' | 'Tequila'
  price: number
  volume: number
  brand: string
  main_image: string | null
}


