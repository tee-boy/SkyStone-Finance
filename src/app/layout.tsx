import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { PinProvider } from '@/app/Context/PinContext';

export const metadata: Metadata = {
  title: "SKY STONE",
  description: "Sky Stone Mobile App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="@/public/SkystoneLogo.png" type="image/x-icon" />
      <body className="antialiased h-screen w-screen overflow-hidden">
        <main className="h-full w-full">
          <PinProvider>
            {children}
          </PinProvider>

          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </main>
      </body>
    </html>
  );
}
