'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


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
    <div className='text-center flex flex-col items-center justify-center h-full'>
      <h1 className='mb-4 text-4xl font-bold'>Coming Soon</h1>
      <p className='mb-8 text-xl'>
        We're working hard to bring you something amazing. Stay tuned!
      </p>




    </div>
  )
}
