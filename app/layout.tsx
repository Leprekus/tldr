import NavbarMain from './components/navbar/navbar-main'
import './globals.css'
import Providers from './Providers/Providers'
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='max-w-7xl mx-auto overflow-x-hidden'>
        <Providers>
          <NavbarMain/>
          {children}
          </Providers></body>
    </html>
  )
}
