import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingScreen from "@/components/common/LoadingScreen";
import TopLoadingBar from "@/components/common/TopLoadingBar";
import { Suspense } from 'react';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'The Wadhwani Innovation Network | Centre of Excellence (WIN CoE)',
  description: 'The Wadhwani Innovation Network',
  icons: {
    icon: "/favicon.ico", // This sets your favicon!
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Suspense fallback={null}>
          <TopLoadingBar />
        </Suspense>
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>
              <LoadingProvider>
                <LoadingScreen />
                {children}
              </LoadingProvider>
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
