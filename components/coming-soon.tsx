'use client'

import Image from 'next/image'

export default function RedesignOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative mx-4 flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-2xl">
        <h1 className='mb-4 text-3xl font-bold text-gray-800'>
          Website Under Redesign
        </h1>
        <p className='mx-auto mb-6 max-w-3xl text-xl text-gray-600'>
          We're working on something exciting! Our website will be back soon
          with a fresh new look.
        </p>
        <div className=''>
          <Image
            src='/images/life-is-grape-logo.png'
            width={500}
            height={100}
            alt='Life Is Grape'
            className='w-64 object-cover'
          />
        </div>
        <p className='mt-6 text-sm text-gray-500'>
          Thank you for your patience!
        </p>
      </div>
    </div>
  )
}
