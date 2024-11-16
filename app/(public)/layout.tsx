
import PublicHeader from '@/components/header'
import Footer from '@/components/footer'
import { CartStoreProvider } from '@/store/cart-store-provider'
import AgeVerificationBanner from '@/components/age-verification'

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CartStoreProvider>
      <div className='flex h-[100dvh] flex-col'>
        <PublicHeader />
        <main className='grow'>
          <AgeVerificationBanner />
          {children}</main>
        <Footer />
      </div>
    </CartStoreProvider>
  )
}
