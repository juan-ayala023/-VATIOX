import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@/components/Analytics';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WaitlistModal } from '@/components/forms/WaitlistModal';
import { OrganizationLd } from '@/components/JsonLd';
import { DevModeToggle } from '@/components/layout/DevModeToggle';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { Providers } from '@/components/Providers';
import { copy } from '@/content/copy';
import { SITE_URL } from '@/lib/config';
import './globals.css';

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-barlow',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: copy.meta.title, template: '%s · VATIOX' },
  description: copy.meta.description,
  applicationName: 'VATIOX',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'VATIOX',
    title: copy.meta.title,
    description: copy.meta.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.meta.title,
    description: copy.meta.description,
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0F0E10',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${barlow.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="grain min-h-svh">
        <a href="#main" className="sr-only z-[100] bg-vx-red px-4 py-3 text-vx-bone focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Saltar al contenido
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
          <WaitlistModal />
          <DevModeToggle />
        </Providers>
        <OrganizationLd />
        <Analytics />
      </body>
    </html>
  );
}
