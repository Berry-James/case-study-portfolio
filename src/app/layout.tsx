import type { Metadata } from "next";
import "./globals.css";
import { Taskbar } from "./_components/Taskbar/Taskbar";
import { TaskbarContextProvider } from "./_components/Taskbar/context/TaskbarContext";
import { DesktopIcons } from "./_components/DesktopIcons/DesktopIcons";

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
        <TaskbarContextProvider>
          {children}
          <DesktopIcons />
          <Taskbar />
        </TaskbarContextProvider>
      </body>
    </html>
  );
}
