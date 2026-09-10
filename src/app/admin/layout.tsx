import type { Metadata } from 'next';

// Belt and braces alongside the robots.txt disallow: robots.txt asks crawlers not
// to fetch /admin, this tells any that do anyway not to index or follow it.
export const metadata: Metadata = {
  title: 'Admin',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
