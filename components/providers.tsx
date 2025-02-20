'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import ConvexClientProvider from '@/components/convex-client-provider'


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>

        {children}
        <ToasterProvider />

    </ConvexClientProvider>
  )
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      richColors
      closeButton
      position='top-center'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}
