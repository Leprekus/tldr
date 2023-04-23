import '../globals.css'
export const metadata = {
  title: 'Page Not Found',
  description: 'Sorry this page could not be found',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='max-w-7xl mx-auto overflow-x-hidden'>
      
          {children}
       </body>
    </html>
  )
}
