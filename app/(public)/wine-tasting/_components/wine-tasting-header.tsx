import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const WineTastingHeader = () => {
  return (
    <section className='relative flex max-h-[70vh] min-h-[500px] items-center justify-center bg-gradient-to-tr from-accent to-accent-foreground'>
      <Image
        src='https://quiet-caterpillar-834.convex.cloud/api/storage/32ece097-8b73-4c84-b9df-8ccc86854e53'
        alt='Wine Tasting'
        width={1920}
        height={1280}
        className='z-0 h-full max-h-[70vh] w-full object-cover'
      />
      <div className='absolute inset-0'>
        <div className='container mx-auto flex h-full flex-col justify-center'>
          <h1 className='max-w-[30ch] text-2xl md:text-4xl'>
            Curated Tasting Experiences, Meticulously Crafted for the Discerning
            Palate
          </h1>
          <Link href="/wine-tasting#experiences">
            <Button className='mt-4 rounded-none' size="lg">Explore Experiences</Button>
          </Link>
        </div>
      </div>
    </section>
  )
};
export default WineTastingHeader;
