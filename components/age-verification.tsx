'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function AgeVerificationBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasConfirmedAge = localStorage.getItem('ageConfirmed')
    if (!hasConfirmedAge) {
      setIsVisible(true)
    }
  }, [])

  const handleConfirm = () => {
    localStorage.setItem('ageConfirmed', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    // Redirect to a safe page or show a message
    window.location.href = 'https://www.aware.org.za/'
  }

  if (!isVisible) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/60 p-4 backdrop-blur-sm'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Age Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            This website contains alcohol-related content. Please confirm that
            you are of legal drinking age in your country or region.
          </p>
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          <Button onClick={handleConfirm} className='w-full'>
            I am over 18 years old
          </Button>
          <Button variant='outline' onClick={handleDecline} className='w-full'>
            I am under 18 years old
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
