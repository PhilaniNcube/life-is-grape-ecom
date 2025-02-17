import PublicHeader from '@/components/header'
import Footer from '@/components/footer'
import { CartStoreProvider } from '@/store/cart-store-provider'
import AgeVerificationBanner from '@/components/age-verification'
import ComingSoon from '@/components/coming-soon'
import { Toaster } from '@/components/ui/sonner'

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CartStoreProvider>
      {/* <ComingSoon />   */}
      <div className='flex h-[100dvh] flex-col bg-white'>
        <PublicHeader />
        <main className='grow'>
          <AgeVerificationBanner />
          {children}

        </main>
        <Toaster />
        <Footer />
      </div>
    </CartStoreProvider>
  )
}
