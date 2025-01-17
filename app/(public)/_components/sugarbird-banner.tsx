import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const SugarbirdBanner = () => {
  return (
    <section className='relative mt-6'>
      <Image
        src='https://quiet-caterpillar-834.convex.cloud/api/storage/b626a9e6-59aa-452f-9e68-666c3628ffe0'
        alt='Sugarbird Fynbos Gin'
        width={1920}
        height={1080}
        className='max-h-[55vh] w-full object-cover'
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='container'>
          <h1 className='text-4xl font-bold sm:text-5xl lg:text-6xl'>
            Sugarbird Fynbos Gin
          </h1>
          <p className='mt-4 text-xl'>
            A unique blend of South African botanicals
          </p>
          <Link href='/products/sugarbird-gin-original-fynbos'>
            <Button className='mt-3 bg-slate-700 text-white'>View Product</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
export default SugarbirdBanner
