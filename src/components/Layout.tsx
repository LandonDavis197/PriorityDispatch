import Link from 'next/link';
import { MembersProvider } from '../context/MembersContext';

export const metadata = { title: 'Member Directory' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-800">
        <MembersProvider>
          <header className="bg-white border-b shadow-sm">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
                Member Directory
              </Link>
            </div>
          </header>
          <main className="container mx-auto px-6 py-8">{children}</main>
        </MembersProvider>
      </body>
    </html>
  );
}
