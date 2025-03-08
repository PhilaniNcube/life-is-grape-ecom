import { NextResponse } from 'next/server'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'

/**
 * Returns a tab-delimited text file for Google Merchant Center feed
 * Documentation: https://support.google.com/merchants/answer/7052112
 */
export async function GET() {
  // Fetch all products
  const products = await fetchQuery(api.products.getShallowProducts)

  // Base URL
  const baseUrl = 'https://lifeisgrape.co.za'

  // Headers required by Google Merchant Center
  const headers = [
    'id',
    'title',
    'description',
    'link',
    'image_link',
    'availability',
    'price',
    'brand',
    'condition',
    'gtin',
    'mpn',
    'google_product_category',
    'shipping',
  ].join('\t')

  // Process products into tab-delimited format
  const productLines = products.map(product => {
    // Format price with currency
    const formattedPrice = `${product.price} ZAR`

    // Map availability status
    const availability = product.in_stock ? 'in stock' : 'out of stock'

    // Create product link
    const link = `${baseUrl}/products/${product.slug}`

    // Format shipping info
    const shipping = 'ZA:::65.00 ZAR'

    // Return tab-delimited line for this product
    return [
      product._id, // id (required)
      product.name, // title (required)
      product.description?.replace(/\t|\n/g, ' ') || '', // description (required)
      link, // link (required)
      product.main_image, // image_link (required)
      availability, // availability (required)
      formattedPrice, // price (required)
      product.name || 'Life is Grape', // brand (required)
      'new', // condition (required)
      '', // gtin (optional)
      '', // mpn (optional)
      'Food & Drink > Beverages > Alcoholic Beverages', // google_product_category
      shipping, // shipping
    ].join('\t')
  })

  // Combine headers and product lines
  const feedContent = [headers, ...productLines].join('\n')

  // Return as text file with appropriate headers
  return new NextResponse(feedContent, {
    headers: {
      'Content-Type': 'text/tab-separated-values',
      'Content-Disposition': 'attachment; filename="google-merchant-feed.txt"',
    },
  })
}
