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
    const overlayDismissed = searchParams.get('overlayDismissed')
    setIsVisible(overlayDismissed !== 'true')
  }, [searchParams])

  const handleDismiss = () => {
    setIsDismissed(true)
    const params = new URLSearchParams(searchParams)
    params.set('overlayDismissed', 'true')
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
        className={`relative mx-4 w-full max-w-5xl min-h-[70vh] rounded-lg bg-white p-8 text-center shadow-2xl transition-all duration-500 ease-in-out flex flex-col items-center justify-center ${
          isDismissed ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >

        <h1 className='mb-4 text-3xl font-bold text-gray-800'>
          Website Under Redesign
        </h1>
        <p className='mb-6 text-xl max-w-3xl mx-auto text-gray-600'>
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
