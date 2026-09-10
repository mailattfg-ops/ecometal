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
    description: "Light Gauge Steel framing, foam concrete and an AI design-to-manufacture platform. Buildings delivered in weeks, not years.",
    images: [{
      // metadataBase resolves `url`, but not secureUrl — that one has to be absolute.
      url: "/og-image.jpg",
      secureUrl: `${siteUrl}/og-image.jpg`,
      type: "image/jpeg",
      width: 1600,
      height: 840,
      alt: "Ecometal Matrix Engineering Pvt. Ltd.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecometal Matrix Engineering - Build better, faster, lighter",
    description: "Light Gauge Steel framing, foam concrete and an AI design-to-manufacture platform. Buildings delivered in weeks, not years.",
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
