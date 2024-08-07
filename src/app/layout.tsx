import type { Metadata } from "next";
import "./globals.css";
import { SystemContextProvider } from "./_components/SystemContext/SystemContext";
import localFont from 'next/font/local';
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "James Berry | Portfolio"
};

const bodyFont = localFont({
  src: './_static/fonts/body.ttf',
  display: 'swap',
  variable: '--font-body'
});

const documentFont = localFont({
  src: './_static/fonts/arial.ttf',
  display: 'swap',
  variable: '--font-document'
});


// const silkscreen = Pixelify_Sans({ subsets: ['latin'], weight: '400', variable: '--font-title' });
// const roboto = Tomorrow({ subsets: ['latin'], weight: '400', variable: '--font-primary' });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
  anomalyReporting: React.ReactNode
}>) {

  const { isMobile } = getSelectorsByUserAgent(headers().get('user-agent') ?? '');

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kpt0bth.css"></link>
      </head>
      <body className={`${bodyFont.variable} ${documentFont.variable} overflow-hidden`}>
        <SystemContextProvider
          initialState={{
            isMobile
          }}
        >
          {children}
        </SystemContextProvider>
      </body>
    </html>
  );
}
