import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Nunito_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const nunitoSans = Nunito_Sans({ 
  subsets: ['latin'],
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: 'Spirit11 - Fantasy Cricket League',
  description: 'The Premier Inter-University Fantasy Cricket League',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${nunitoSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}