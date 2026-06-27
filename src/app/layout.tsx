import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next'

import { Toaster } from '@/components/ui/sonner'
import { TRPCReactProvider } from '@/trpc/client'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Call.AI',
    template: '%s | Call.AI',
  },
  description:
    'AI-powered video calling and collaboration platform with real-time meetings, AI transcription, summaries, and intelligent assistants.',
  applicationName: 'Call.AI',
  keywords: [
    'Call.AI',
    'AI Video Calling',
    'Video Meetings',
    'Meeting Assistant',
    'AI Transcription',
    'AI Summarizer',
    'Next.js',
    'OpenAI',
    'Stream Video',
  ],
  authors: [
    {
      name: 'Ritesh Kushwaha',
    },
  ],
  creator: 'Ritesh Kushwaha',
  openGraph: {
    title: 'Call.AI',
    description:
      'AI-powered video calling and collaboration platform with real-time meetings, AI transcription, summaries, and intelligent assistants.',
    siteName: 'Call.AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Call.AI',
    description: 'AI-powered video calling and collaboration platform.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NuqsAdapter>
      <TRPCReactProvider>
        <html lang="en">
          <body className={`${inter.className} antialiased`}>
            <Toaster />
            {children}
          </body>
        </html>
      </TRPCReactProvider>
    </NuqsAdapter>
  )
}
