import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pixel Switch - Image Type Convertor',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
