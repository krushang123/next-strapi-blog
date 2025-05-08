import type { Metadata } from 'next';
import { ReactNode } from 'react';

import Provider from './provider';

export const metadata: Metadata = {
  title:
    'Blog Page Built with Next.js and Strapi | Articles on Tech, Wellness & More',
  description:
    'This blog page is powered by Next.js and Strapi, featuring curated articles on technology, personal growth, wellness, and workplace culture.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
