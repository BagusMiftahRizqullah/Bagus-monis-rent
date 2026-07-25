import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Monis Rent — Design Your Dream Workspace',
    template: '%s | Monis Rent',
  },
  description:
    'Build, customize, and rent a fully furnished workspace delivered and set up at your office in Bali. Premium office equipment rental by Monis Rent.',
  keywords: [
    'office rental',
    'workspace',
    'Bali',
    'furniture rental',
    'Monis Rent',
    'workspace configurator',
  ],
  authors: [{ name: 'Monis Rent' }],
  creator: 'Monis Rent',
  publisher: 'Monis Rent',
  metadataBase: new URL('https://monisrent.com'),
  openGraph: {
    type: 'website',
    locale: 'en_ID',
    url: 'https://monisrent.com',
    siteName: 'Monis Rent',
    title: 'Monis Rent — Design Your Dream Workspace',
    description:
      'Build, customize, and rent a fully furnished workspace delivered and set up at your office in Bali.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Monis Rent Workspace Configurator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monis Rent — Design Your Dream Workspace',
    description:
      'Build, customize, and rent a fully furnished workspace delivered and set up at your office in Bali.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full scroll-smooth antialiased`}
    >
      <body className="h-screen overflow-hidden bg-zinc-50 text-zinc-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}