import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { ConsoleEasterEgg } from "@/components/utils/ConsoleEasterEgg";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bruxa Gaming - Tomb Raider Gameplay PL | TR1-TR6 Remastered",
    template: "%s | Bruxa Gaming",
  },
  description:
    "🎮 Tomb Raider gameplay po polsku! Pełne przejścia TR1-TR6 Remastered, najlepsze momenty, streamy TikTok. Dołącz do przygód z Larą Croft na Bruxa Gaming!",
  keywords: [
    "tomb raider gameplay po polsku",
    "tomb raider pl",
    "lara croft gra",
    "tomb raider remastered polska",
    "tomb raider przejście po polsku",
    "bruxa gaming",
    "tomb raider 1 gameplay",
    "tomb raider 2 polska",
    "tomb raider stream",
  ],
  authors: [{ name: "Bruxa Gaming" }],
  creator: "Bruxa Gaming",
  metadataBase: new URL("https://bruxagaming.vercel.app"),
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://bruxagaming.vercel.app/",
    siteName: "Bruxa Gaming - Tomb Raider Gameplay PL",
    title: "Bruxa Gaming - Tomb Raider Gameplay po Polsku | TR1-TR6 Remastered",
    description:
      "🎮 Pełne gameplay'e z serii Tomb Raider po polsku! Oglądaj przejścia TR1-TR6 Remastered, najlepsze momenty z gry, streamy na TikTok. Dołącz do przygód z Larą Croft!",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bruxa Gaming - Tomb Raider Gameplay Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bruxa Gaming - Tomb Raider Gameplay po Polsku",
    description:
      "🎮 Pełne gameplay'e z serii Tomb Raider po polsku! TR1-TR6 Remastered, highlights, streamy TikTok.",
    images: ["/assets/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/assets/images/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#cd853f",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Bruxa Gaming",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        {/* Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://sheets.googleapis.com" />
      </head>
      <body>
        <ThemeProvider>
          <ConsoleEasterEgg />
          {/* Skip to content for accessibility */}
          <a href="#main-content" className="skip-to-content">
            Przejdź do treści
          </a>

          <Navbar />

          <main id="main-content">{children}</main>

          <Footer />

          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
