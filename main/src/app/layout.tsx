import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import { Header } from '@/components/containers/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Metrito - Commit Tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="bg-zinc-50 dark:bg-zinc-950 transition-colors flex flex-col min-h-screen">
            <Header />

            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
