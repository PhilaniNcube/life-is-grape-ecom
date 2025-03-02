import { littlepot } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const SpecialsBanner = () => {
  return (
    <section className='relative'>
      <Image
        src='https://fabulous-peacock-233.convex.cloud/api/storage/8c74297f-099e-4518-b87b-547dff692e60'
        alt='Sugarbird Fynbos Gin'
        width={1920}
        height={1080}
        className='max-h-[55vh] w-full object-cover'
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='container'>
          <h1
            className={cn(
              'text-4xl font-bold sm:text-5xl lg:text-6xl',
              littlepot.className
            )}
          >
            Be my Valentine
          </h1>
          <p className='mt-4 text-xl'>The perfect gift for your loved one</p>

        </div>
      </div>
    </section>
  )
};
export default SpecialsBanner;
