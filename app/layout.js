import "./globals.css";
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata = {
  title: "SustainCode - Web Sustainability Audit",
  description: "Decrypting Digital Rot. Restoring the Web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.className} antialiased bg-background-light dark:bg-background-dark text-on-surface selection:bg-primary selection:text-surface`}>
        {children}
      </body>
    </html>
  );
}
