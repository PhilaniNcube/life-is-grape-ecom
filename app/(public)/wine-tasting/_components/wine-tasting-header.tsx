import { littlepot } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const WineTastingHeader = () => {
  return (
    <section className='relative flex max-h-[70vh] min-h-[500px] items-center justify-center bg-gradient-to-tr from-accent to-accent-foreground'>
      <Image
        src='https://fabulous-peacock-233.convex.cloud/api/storage/f72c2d53-6c68-4d1b-a77a-99aa751ffbe1'
        alt='Wine Tasting'
        width={1920}
        height={1280}
        className='z-0 h-full max-h-[70vh] w-full object-cover'
      />
      <div className='absolute inset-0 bg-gray-300/60'>
        <div className='container mx-auto flex h-full flex-col justify-center'>
          <h1
            className={cn(
              'max-w-[30ch] text-2xl md:text-5xl lg:text-7xl',
              littlepot.className
            )}
          >
            Crafting memorable experiences
          </h1>
          <p className='max-w-[44ch] mt-8 text-sm md:text-lg lg:text-xl'>
            We create events with quality and attention to detail. We understand
            every client has different needs and budgets, which is why we stay
            as flexible as possible.
          </p>
          <Link href='/wine-tasting#experiences'>
            <Button className='mt-4 rounded-none' size='lg'>
              Explore Experiences
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
export default WineTastingHeader
