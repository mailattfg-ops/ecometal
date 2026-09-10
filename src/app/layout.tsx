import "@fontsource/cal-sans";
import "@fontsource/geist";
import type { Metadata } from "next";
import "./globals.css";
import { siteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "Ecometal Matrix Engineering - Build better, faster, lighter",
  description: "Ecometal Matrix Engineering is a construction technology company building a vertically integrated, AI-native steel construction platform.",
  keywords: ["Eco Metal", "LGS construction", "Light Gauge Steel", "Steel Framing", "AI Construction"],
  openGraph: {
    type: "website",
    siteName: "Ecometal Matrix Engineering Pvt. Ltd.",
    locale: "en_GB",
    url: "/",
    title: "Ecometal Matrix Engineering - Build better, faster, lighter",
    description: "A vertically integrated, AI-native steel construction platform. Light Gauge Steel framing, foam concrete and design-to-manufacture, delivering buildings in weeks.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Ecometal Matrix Engineering Pvt. Ltd." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecometal Matrix Engineering - Build better, faster, lighter",
    description: "A vertically integrated, AI-native steel construction platform. Light Gauge Steel framing, foam concrete and design-to-manufacture, delivering buildings in weeks.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-white">
        {children}
      </body>
    </html>
  );
}
