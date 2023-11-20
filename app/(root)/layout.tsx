import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'

const inter = Poppins({ 
  subsets: ['latin'],
  weight: ["100","200","300","400", "500","700"]
})

export const metadata: Metadata = {
  title: 'NihongoNook',
  description: 'Talk about your favorite anime with like-minded people!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <Topbar />
          
          <main>
            <LeftSidebar />

              <section className='main-container'>
                <div className="">
                  {children}
                </div>
              </section>

            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </ClerkProvider>
    </html>
  )
}
