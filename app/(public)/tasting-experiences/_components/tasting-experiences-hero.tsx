import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { GlassWater, Wine, GlassWaterIcon, FlaskRound } from 'lucide-react'

export default function TastingExperiencesHero() {
  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      <Image
        src='https://quiet-caterpillar-834.convex.cloud/api/storage/1f6285ed-a0b4-405b-825b-b0dc1e96c742'
        alt='Elegant tasting setup with various glasses and bottles'
        width={1920}
        height={1080}
        className='absolute inset-0 z-0'
        priority
      />
      <div className='absolute inset-0 z-10 bg-gradient-to-r from-amber-900/90 to-purple-900/90'></div>
      <div className='container relative z-20 mx-auto px-4 text-center sm:px-6 lg:px-8'>
        <h1 className='mb-6 text-2xl font-bold text-white sm:text-4xl lg:text-5xl'>
          Discover South Africa's Finest Beverages
        </h1>
        <div className='mx-auto max-w-3xl rounded-xl bg-white/10 p-6 backdrop-blur-md sm:p-8'>
          <p className='mb-6 text-lg text-gray-100 sm:text-xl'>
            Life is Grape offers immersive tasting experiences, specializing in
            South African wines and a curated selection of gins, cocktails,
            brandy, and whiskey.
          </p>
          <p className='mb-8 text-lg text-gray-100 sm:text-xl'>
            Our mission is to provide a comfortable and relaxed environment for
            our customers at our dedicated venue, showcasing the best of South
            African viticulture and distillation.
          </p>
          <Button className='transform rounded-full bg-white px-8 py-3 text-sm md:text-lg text-amber-900 transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-100'>
            Book Your Tasting Experience
          </Button>
        </div>
        <div className='mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5'>
          <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 backdrop-blur-sm'>
            <Wine className='mb-2 h-8 w-8 text-white' />
            <p className='text-sm text-gray-200'>Wines</p>
          </div>
          <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 backdrop-blur-sm'>
            <GlassWater className='mb-2 h-8 w-8 text-white' />
            <p className='text-sm text-gray-200'>Gins</p>
          </div>
          <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 backdrop-blur-sm'>
            <FlaskRound className='mb-2 h-8 w-8 text-white' />
            <p className='text-sm text-gray-200'>Cocktails</p>
          </div>
          <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 backdrop-blur-sm'>
            <GlassWaterIcon className='mb-2 h-8 w-8 text-white' />
            <p className='text-sm text-gray-200'>Brandy</p>
          </div>
          <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 backdrop-blur-sm'>
            <GlassWaterIcon className='mb-2 h-8 w-8 text-white' />
            <p className='text-sm text-gray-200'>Whiskey</p>
          </div>
        </div>
      </div>
    </section>
  )
}
