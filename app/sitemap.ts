import { MetadataRoute } from 'next'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic data
  const products = await fetchQuery(api.products.getShallowProducts)
  const wineCategories = await fetchQuery(api.categories.getCategoriesByType, { type: 'wine' })
  const spiritCategories = await fetchQuery(api.categories.getCategoriesByType, { type: 'spirit' })

  // Base URL
  const baseUrl = 'https://lifeisgrape.co.za'

  // Static routes
  const staticRoutes = [
    '',
    '/wines',
    '/spirits',
    '/sale',
    '/specials',
    '/products',
    '/about',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0
  }))

  // Product routes
  const productRoutes = products.map(product => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Wine category routes
  const wineCategoryRoutes = wineCategories.map(category => ({
    url: `${baseUrl}/wines/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  // Spirit category routes
  const spiritCategoryRoutes = spiritCategories.map(category => ({
    url: `${baseUrl}/spirits/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  return [
    ...staticRoutes,
    ...productRoutes,
    ...wineCategoryRoutes,
    ...spiritCategoryRoutes,
  ]
}
