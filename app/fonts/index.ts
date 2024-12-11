import { IBM_Plex_Sans } from 'next/font/google'
import localFont from 'next/font/local'

export const ibm_sans = IBM_Plex_Sans({
  style: "italic",
  weight: ["600","700"],
  subsets: ['latin'],
})

export const littlepot = localFont({
  src: './alittlepot.ttf',
  variable: '--font-little-pot',
  weight: '100 900',
})
