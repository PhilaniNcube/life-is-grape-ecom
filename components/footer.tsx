import { FaTiktok, FaFacebookF, FaInstagram } from 'react-icons/fa6'
import Link from 'next/link'
import FooterContactForm from './footer-contact-form'

export default function Footer() {
  return (
    <footer className='bg-blue-50 pb-10 pt-6'>
      <div className='container mx-auto grid gap-4 pb-10 md:grid-cols-2'>
        <div>
          <h2 className='text-xl font-semibold text-slate-800'>Contact</h2>
          <p className='md:text-md text-sm'>
            Thank you for getting in touch. We truly appreciate your questions
            and feedback. We look forward in assisting you. . Please send us a
            WhatsApp on +27 82 931 1253 or fill in the form and we will get back
            to you soonest! Please use the booking calendar for bookings.
          </p>
          <div className='mt-3'>
            <h3 className='text-lg font-semibold text-slate-800'>Email</h3>
            <Link href='mailto:wine@lifeisgrape.co.za' className='text-sm'>
              wine@lifeisgrape.co.za
            </Link>
          </div>
          <div className='mt-3 flex items-center gap-x-3'>
            {/* <Link
              href='https://www.facebook.com/lifeisgrape40'
              className='text-sm'
            >
              <FaFacebookF className='h-6 w-6' />
            </Link> */}
            <Link
              href='https://www.instagram.com/lifeisgrapesa/'
              className='text-sm'
            >
              <FaInstagram className='h-6 w-6' />
            </Link>
            <Link
              href='https://www.tiktok.com/@life.is.grape'
              className='text-sm'
            >
              <FaTiktok className='h-6 w-6' />
            </Link>
          </div>
        </div>
        <div>
          <FooterContactForm />
        </div>
      </div>
      <div className='container flex flex-col items-center justify-between gap-x-3 gap-y-1 text-center text-sm text-muted-foreground sm:flex-row'>
        <p>
          Life Is Grape &copy;{new Date().getFullYear()}. All rights reserved.
        </p>
        <div>
          <Link
            className='text-primary transition-colors hover:text-accent-foreground'
            href='/terms'
          >
            Terms and Conditions
          </Link>
          <p className='text-xs'>
            Developed by{' '}
            <Link
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary transition-colors hover:text-accent-foreground'
              href='https://www.yellowlizard.co.za'
            >
              Yellow Lizard
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
