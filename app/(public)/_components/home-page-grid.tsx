import { ibm_sans, littlepot } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { GiftIcon, PinIcon, WineIcon } from "lucide-react";
import Link from "next/link";

const HomePageGrid = () => {
  return (
    <div className='py-8'>
      <div className='container grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10'>
        <Link
          href='/wines'
          className='flex cursor-pointer flex-col rounded-md bg-slate-100 p-6 shadow-sm hover:shadow-lg'
        >
          <div className='flex justify-end'>
            <WineIcon className='h-12 w-12 text-fuchsia-900' />
          </div>
          <div className='text-2xl font-bold md:text-4xl'>
            <p className={cn(littlepot.className, 'font-bold')}>shop</p>
            <p
              className={cn(
                ibm_sans.className,
                'lowercase italic text-fuchsia-900'
              )}
            >
              Wines
            </p>
          </div>
          <p className='mt-3 pr-10 text-gray-700'>
            We have a wide selection of wines from the best wineries in South
            Africa. Also take a look at the different spirits we have available,
            including brandy, whiskey, gin, vodka, rum, tequila, and liqueur.
          </p>
        </Link>
        <Link
          href='/wine-tasting'
          className='flex cursor-pointer flex-col rounded-md bg-slate-100 p-6 shadow-sm hover:shadow-lg'
        >
          <div className='flex justify-end'>
            <PinIcon className='h-12 w-12 text-fuchsia-900' />
          </div>
          <div className='text-2xl font-bold md:text-4xl'>
            <p className={cn(littlepot.className, 'font-bold')}>shop</p>
            <p
              className={cn(
                ibm_sans.className,
                'lowercase italic text-fuchsia-900'
              )}
            >
              Experiences
            </p>
          </div>
          <p className='mt-3 pr-10 text-gray-700'>
            Let us take you on a journey through the best wine tasting
            experiences in South Africa. Also explore brandy, whiskey, gin,
            vodka, rum, tequila, and liqueur with our knowledgeable team.
          </p>
        </Link>
        <Link
          href='/gifting'
          className='flex cursor-pointer flex-col rounded-md bg-slate-100 p-6 shadow-sm hover:shadow-lg'
        >
          <div className='flex justify-end'>
            <GiftIcon className='h-12 w-12 text-fuchsia-900' />
          </div>
          <div className='text-2xl font-bold md:text-4xl'>
            <p className={cn(littlepot.className, 'font-bold')}>shop</p>
            <p
              className={cn(
                ibm_sans.className,
                'lowercase italic text-fuchsia-900'
              )}
            >
              Gifting
            </p>
          </div>
          <p className='mt-3 pr-10 text-gray-700'>
            Pair your wine selection with personalised gift wrapping and share
            the love with our range of gifting options. Select from our range of
            gift boxes, custom labels, bags, and accessories.
          </p>
        </Link>
      </div>
    </div>
  )
};
export default HomePageGrid;
