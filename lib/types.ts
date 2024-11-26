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

type PastackEventType =
  | 'charge.success'
  | 'charge.failed'
  | 'transfer.success'
  | 'transfer.failed'
  | 'paymentrequest.pending'
  | 'paymentrequest.success'
  | 'refund.failed'
  | 'refund.pending'
  | 'refund.processing'
  | 'refund.processed'


export type PaystackEvent = {
  event: PastackEventType
   data: {
    id: number,
    "domain": string,
    "amount": number,
    "currency": string,
    "due_date": string | null,
    "has_invoice": boolean,
    "invoice_number": string | null,
    "description": string,
    "pdf_url": string | null,
    "request_code": string,
    "status": string,
    "paid": boolean,
    "paid_at": string,
    "notifications": [
      {
        "sent_at": string,
        "channel": string
      }
    ],
    "offline_reference": string,
    "customer": number,
    "created_at": string
  }

}
