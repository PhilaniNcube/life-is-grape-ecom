import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
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
  metadataBase: new URL('https://lifeisgrape.co.za'),
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
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://lifeisgrape.co.za',
    title: 'Life Is Grape',

    description:
      'Established on 1 April 2016, our purpose is to introduce proudly South African brands of hand-crafted wines and spirits to those operating in the trade, and to consumers. These products are produced in South Africa with quality and passion. South Africa is recognised worldwide as producing premium quality, interesting and distinctive wines and spirits in an environmentally sensitive and ethically responsible manner.',
    images: [
      {
        url: 'https://lifeisgrape.co.za/images/circle_logo.png',
        width: 500,
        height: 500,
        alt: 'Life Is Grape',
      },
    ],
  },
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

            poppins.className
          )}
        >
          <NuqsAdapter>
            <Providers>
              {children}
              <Toaster />
            </Providers>
          </NuqsAdapter>
        </body>
      </html>
   </ClerkProvider>
  )
}
