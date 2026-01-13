import "../styles/globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Raksha — Product & Brand Design",
  description: "End-to-end product design and branding for startups, big thinkers and game changers. 6+ years of industry experience crafting visually stunning apps, software and websites.",
  keywords: ["product design", "brand design", "UI/UX", "web design", "startup design", "portfolio"],
  authors: [{ name: "Raksha" }],
  creator: "Raksha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rakshaaaa.com",
    siteName: "Raksha — Product & Brand Design",
    title: "Raksha — Product & Brand Design",
    description: "End-to-end product design and branding for startups, big thinkers and game changers.",
    images: [
      {
        url: "https://res.cloudinary.com/dky01erho/image/upload/v1760524296/6_3x_shots_so_y310gt.png",
        width: 1200,
        height: 630,
        alt: "Raksha Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raksha — Product & Brand Design",
    description: "End-to-end product design and branding for startups, big thinkers and game changers.",
    images: ["https://res.cloudinary.com/dky01erho/image/upload/v1760524296/6_3x_shots_so_y310gt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F2F2F2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
