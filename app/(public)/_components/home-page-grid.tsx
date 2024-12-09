import { ibm_sans } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { GiftIcon, PinIcon, WineIcon } from "lucide-react";
import Link from "next/link";

const HomePageGrid = () => {
  return (
    <div className='py-8'>
      <div className='container grid gap-6 lg:gap-10 md:grid-cols-2 lg:grid-cols-3'>
        <Link href="/wines" className='cursor-pointer hover:shadow-lg flex flex-col p-6 bg-slate-100 rounded-md shadow-sm'>
          <div className="flex justify-end">
            <WineIcon className='w-12 h-12 text-fuchsia-900' />
          </div>
          <div className='text-2xl md:text-4xl font-bold'>
            <p>shop</p>
            <p className={cn(ibm_sans.className, "text-fuchsia-900 italic lowercase")}>Wines</p>
          </div>
          <p className=' text-gray-700 mt-3 pr-10'>
            We have a wide selection of wines from the best wineries in South Africa. Also take a look at the different spirits we have available, including brandy, whiskey, gin, vodka, rum, tequila, and liqueur.
          </p>
        </Link>
        <Link href="/wine-tasting" className='cursor-pointer hover:shadow-lg flex flex-col p-6 bg-slate-100 rounded-md shadow-sm'>
          <div className="flex justify-end">
            <PinIcon className='w-12 h-12 text-fuchsia-900' />
          </div>
          <div className='text-2xl md:text-4xl font-bold'>
            <p>shop</p>
            <p className={cn(ibm_sans.className, "text-fuchsia-900 italic lowercase")}>Experiences</p>
          </div>
          <p className=' text-gray-700 mt-3 pr-10'>
            Let us take you on a journey through the best wine tasting experiences in South Africa. Also explore brandy, whiskey, gin, vodka, rum, tequila, and liqueur with our knowledgeable team.
          </p>
        </Link>
        <Link href="/gifting" className='cursor-pointer hover:shadow-lg flex flex-col p-6 bg-slate-100 rounded-md shadow-sm'>
          <div className="flex justify-end">
            <GiftIcon className='w-12 h-12 text-fuchsia-900' />
          </div>
          <div className='text-2xl md:text-4xl font-bold'>
            <p>shop</p>
            <p className={cn(ibm_sans.className, "text-fuchsia-900 italic lowercase")}>Gifting</p>
          </div>
          <p className=' text-gray-700 mt-3 pr-10'>
          Pair your wine selection with personalised gift wrapping and share the love with our range of gifting options. Select from our range of gift boxes, custom labels, bags, and accessories.
          </p>
        </Link>
      </div>
    </div>
  )
};
export default HomePageGrid;
