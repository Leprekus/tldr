import NavbarMain from './components/navbar/navbar-main'
import './globals.css'
import Providers from './components/Providers'
import Head from 'next/head'
export const metadata = {
  title: 'TLDR',
  description: 'Discover the essence of long posts with TLDR. Say goodbye to sifting through lengthy posts – save your time by getting straight the \'juicy\' part of each post. Find key insights, captivating stories, and important details without the need to read through extensive text. Experience Reddit like never before with TLDR.',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className='max-w-7xl mx-auto overflow-x-hidden'>
        <Providers>
          <NavbarMain/>
          {children}
          </Providers></body>
    </html>
  )
}
