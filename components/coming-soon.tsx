'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { littlepot } from '@/app/fonts'


interface ComingSoonProps {
  launchDate: string
}

export default function ComingSoon() {
  // const [timeRemaining, setTimeRemaining] = useState(
  //   getTimeRemaining(launchDate)
  // )
  const [email, setEmail] = useState('')

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeRemaining(getTimeRemaining(launchDate))
  //   }, 1000)

  //   return () => clearInterval(timer)
  // }, [launchDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Submitted email:', email)
    setEmail('')
    alert("Thank you for your interest! We'll notify you when we launch.")
  }

  return (
    <div className='flex h-[100dvh] flex-col items-center justify-center text-center'>
      <h1 className={cn('mb-4 text-4xl font-bold', littlepot.className)}>Coming Soon</h1>
      <p className='mb-8 text-xl'>
        We're working hard to bring you something amazing. Stay tuned!
      </p>
    </div>
  )
}
