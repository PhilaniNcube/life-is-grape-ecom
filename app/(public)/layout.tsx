
import PublicHeader from '@/components/header'
import Footer from '@/components/footer'

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-[100dvh] flex-col'>
      <PublicHeader />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  )
}
