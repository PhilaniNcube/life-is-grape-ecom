import { Metadata } from 'next'
import TastingExperiences from '../_components/tasting-experiences'
import TastingExperiencesHero from './_components/tasting-experiences-hero'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Tasting Experiences | Life is Grape',
  description: 'Discover South Africa\'s finest beverages with our curated tasting experiences. Wine, gin, cocktails, brandy, and whiskey tastings in a relaxed environment.',
  openGraph: {
    title: 'Tasting Experiences | Life is Grape',
    description: 'Discover South Africa\'s finest beverages with our curated tasting experiences.',
    images: ['https://quiet-caterpillar-834.convex.cloud/api/storage/1f6285ed-a0b4-405b-825b-b0dc1e96c742'],
  }
}

async function generateJsonLD() {
  const experiences = await fetchQuery(api.tasting_experiences.getTastingExperiences)
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: experiences.map((experience, index) => ({
      '@type': 'Product',
      '@id': `#tasting-${experience._id}`,
      position: index + 1,
      name: experience.name,
      description: experience.description,
      image: experience.image,
      offers: {
        '@type': 'Offer',
        price: experience.price,
        priceCurrency: 'ZAR',
      }
    }))
  }
}

const TastingExperiencesPage = async () => {
  const jsonLD = await generateJsonLD()

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <div>
        <TastingExperiencesHero />
        <TastingExperiences />
      </div>
    </>
  )
}

export default TastingExperiencesPage
