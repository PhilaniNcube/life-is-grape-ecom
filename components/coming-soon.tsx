'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import Image from 'next/image'

export default function RedesignOverlay() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const overlayDismissed = searchParams.get('dismissed')
    setIsVisible(overlayDismissed !== 'true')
  }, [searchParams])

  const handleDismiss = () => {
    setIsDismissed(true)
    const params = new URLSearchParams(searchParams)
    params.set('dismissed', 'true')
    router.push(`?${params.toString()}`)
    setTimeout(() => setIsVisible(false), 500) // Wait for fade-out animation
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-500 ease-in-out ${
        isDismissed ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`relative mx-4 flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-2xl transition-all duration-500 ease-in-out ${
          isDismissed ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {' '}
        <button
          onClick={handleDismiss}
          className='absolute right-2 top-2 text-gray-500 transition-colors duration-200 hover:text-gray-700'
          aria-label='Dismiss'
        >
          <X size={24} />
        </button>
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
            width={400}
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
