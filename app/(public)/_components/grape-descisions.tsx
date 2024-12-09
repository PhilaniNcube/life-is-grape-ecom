import { kanit, work_sans } from "@/app/layout";
import { cn } from "@/lib/utils";
import Image from "next/image";


const GrapeDescisions = () => {
  return (
    <div className='relative'>
      <Image
        src='https://quiet-caterpillar-834.convex.cloud/api/storage/faacc7d1-be0a-41e2-95ab-57fdd09ef192'
        alt='Grape Descisions'
        width={1920}
        height={1280}
        className='h-full max-h-[60vh] w-full object-cover'
        priority
      />
      <div className='absolute inset-0'>
        <div className='container mx-auto h-full'>
          <div className='flex h-full items-center justify-end p-4'>
            <div className='flex w-full max-w-2xl justify-start'>
              <h1
                className={cn(
                  'text-left text-3xl font-bold md:text-5xl lg:text-7xl leading-4',
                  work_sans.className
                )}
              >
                <span className='lowercase text-slate-800'>We Make</span> <br />
                <span className='lowercase text-fuchsia-900'>
                  Grape Descisions!
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default GrapeDescisions;
