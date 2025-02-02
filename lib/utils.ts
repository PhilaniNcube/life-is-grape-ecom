import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSlugFromName(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/[^a-z0-9-]/g, '')

  return slug
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price)
}

export function generateGiftVoucherCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const codeLength = 7
  let voucherCode = ''

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    voucherCode += characters.charAt(randomIndex)
  }

  return voucherCode
}

export const giftWrappingOptions = [
  {
    name: 'Brown Kraft Single Bottle Gift Box',
    price: 45,
    description:
      'A beautiful brown kraft bottle box with black vinyl lettering of your choice for your celebration.',
    dimensions: '(L)325mm x (W)120mm x (H)85mm',
    image:
      'https://fabulous-peacock-233.convex.cloud/api/storage/d42f5ba4-7278-41a2-a317-90051fcedcae',
    slug: 'brown-kraft-single-bottle-gift-box',
  },
  {
    name: 'Brown Kraft Double Bottle Gift Box',
    price: 55,
    description:
      'A beautiful brown kraft bottle box, hand-painted for your celebration. Perfect for gifts.',
    dimensions: '(L)325mm x (W)240mm x (H)85mm',
    image:
      'https://fabulous-peacock-233.convex.cloud/api/storage/27ccc147-0ca4-4dbd-8333-be1f8cda5559',
    slug: 'brown-kraft-double-bottle-gift-box',
  },
]

export type GiftWrappingOption = typeof giftWrappingOptions[number]
