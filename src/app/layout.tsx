import type { Metadata } from "next";
import "./globals.css";
import { Silkscreen, Roboto, Tomorrow, Pixelify_Sans } from "next/font/google";
import { SystemContextProvider } from "./_components/SystemContext/SystemContext";
import localFont from 'next/font/local';

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
})

// const silkscreen = Pixelify_Sans({ subsets: ['latin'], weight: '400', variable: '--font-title' });
// const roboto = Tomorrow({ subsets: ['latin'], weight: '400', variable: '--font-primary' });

export default function RootLayout({
  children,
  anomalyReporting
}: Readonly<{
  children: React.ReactNode;
  anomalyReporting: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kpt0bth.css"></link>
      </head>
      <body className={`${bodyFont.variable} ${documentFont.variable} overflow-hidden`}>
        <SystemContextProvider>
          {children}
          {/* {anomalyReporting} */}
        </SystemContextProvider>
      </body>
    </html>
  );
}
