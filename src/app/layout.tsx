import { DateRangeProvider } from '@/components/GlobalDateRange';
import { Providers } from './providers';
import '@/app/globals.css';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-200">
        <DateRangeProvider>
          <Providers>{children}</Providers>
        </DateRangeProvider>
        <Footer />
      </body>
    </html>
  );
}
