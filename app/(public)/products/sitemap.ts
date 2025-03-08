import { MetadataRoute } from 'next'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic data
  const products = await fetchQuery(api.products.getShallowProducts)
  const categories = await fetchQuery(api.categories.getCategories)

  // Base URL
  const baseUrl = 'https://lifeisgrape.co.za'

  // Product routes
  const productRoutes = products.map(product => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    title: `${product.name} | Life is Grape`,
    description: product.description,
    item: {
      id: product._id,
      title: product.name,
      description: product.description,
      link: `${baseUrl}/products/${product.slug}`,
      image: product.main_image,
      price: `${product.price} ZAR`,
      currency: 'ZAR',
      availability: product.in_stock ? 'in_stock' : 'out_of_stock',
      condition: 'New',
      shipping: {
        country: 'ZA',
        service: 'Standard',
        price: '65.00 ZAR',
      },
      googleProductCategory: 'Food & Drink > Beverages',
    },
  }))

  return [...productRoutes]
}
