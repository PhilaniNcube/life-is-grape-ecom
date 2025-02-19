import { littlepot } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { fetchQuery } from 'convex/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const SpecialsBanner = async () => {

  const banner =await  fetchQuery(api.banner.getBanner)

  if (!banner) return


  return (
    <section className='relative mt-6'>
      {banner.image && (
        <Image
          src={banner.image}
          alt='Sugarbird Fynbos Gin'
          width={1920}
          height={1080}
          className='max-h-[55vh] w-full object-cover aspect-video'
        />
      )}
     
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='container'>
          <h1
            className={cn(
              'text-4xl font-bold sm:text-5xl lg:text-6xl',
              littlepot.className
            )}
          >
         {banner.title}
          </h1>
          <p className='mt-4 text-xl'>{banner.subtitle}</p>
          <Link href={banner.link}>
            <Button className='mt-3 w-[200px] rounded-none bg-red-700 text-white'>
              Shop
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
export default SpecialsBanner
