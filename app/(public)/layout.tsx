
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='h-[100dvh] flex flex-col'>
      <Header />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  )
}
