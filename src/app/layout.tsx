import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "James Berry | Case Studies"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kpt0bth.css"></link>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
