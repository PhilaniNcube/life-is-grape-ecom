import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

import Providers from '@/components/providers'

import './globals.css'

import { Toaster } from 'sonner'



const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Life Is Grape',
  description:
    'Established on 1 April 2016, our purpose is to introduce proudly South African brands of hand-crafted wines and spirits to those operating in the trade, and to consumers. These products are produced in South Africa with quality and passion. South Africa is recognised worldwide as producing premium quality, interesting and distinctive wines and spirits in an environmentally sensitive and ethically responsible manner.',
  keywords: [
    'wine',
    'wine tasting',
    'brandy',
    'whiskey',
    'gin',
    'vodka',
    'rum',
    'tequila',
    'liqueur',
    'south african',
    'hand-crafted',
    'artisanal',
    'premium',
    'quality',
    'passion',
    'environmentally sensitive',
    'ethically responsible',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang='en' className='scroll-smooth' suppressHydrationWarning>
        <body
          className={cn(
            'flex min-h-screen flex-col bg-white',

            poppins.className,

          )}
        >
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
