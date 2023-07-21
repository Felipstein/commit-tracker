import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import { Header } from '@/components/containers/Header'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Commit Tracker',
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
          <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-50 via-zinc-50 to-gray-100 transition-colors dark:from-zinc-950 dark:via-zinc-950 dark:to-gray-950">
            <Header />

            {children}

            <Footer />
          </div>
        </Providers>

        <Toaster />
      </body>
    </html>
  )
}
