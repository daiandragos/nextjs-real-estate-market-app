import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// body font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// heading font
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

// code font
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Real Estate Market | Find Your Best Home",
    template: "%s | Real Estate Market",
  },
  description:
    "Searching for your first house made easy and free. Browse properties, save favorites, and connect with trusted agents.",
  keywords: [
    "real estate",
    "homes for sale",
    "first-time homebuyer",
    "property listings",
    "houses",
    "apartments",
  ],
  authors: [{ name: "RealEstateMarket" }],
  creator: "RealEstateMarket",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RealEstateMarket",
    title: "RealEstateMarket | Find The Best Home",
    description:
      "Searching for your first house made easy and free. Browse properties, save favorites, and connect with trusted agents.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RealEstateMarket | Find The Best Home",
    description:
      "Searching for your first house made easy and free. Browse properties, save favorites, and connect with trusted agents.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#2D2824" },
  ],
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans", geist.variable)}>
        <body
          className={`${geistMono.variable} ${inter.variable} ${plusJakarta.variable} font-body antialiased`}
        >
          {children}
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
