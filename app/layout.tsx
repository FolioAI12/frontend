import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';

export const metadata: Metadata = {
  title: 'FolioAI — AI Portfolio Builder',
  description: 'Generate a stunning portfolio website in minutes using AI. Fill in your details and let Gemini build your perfect portfolio.',
  keywords: 'portfolio builder, AI portfolio, resume website, personal website generator',
  openGraph: {
    title: 'FolioAI — AI Portfolio Builder',
    description: 'Generate a stunning portfolio website in minutes using AI.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
