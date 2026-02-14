import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://martingaldeca.com"),
  title: "Martín Galdeano Cañizares | CTO & Tech Lead",
  description:
    "Bridging the gap between scalable technology and human creativity. Architecting systems with logic, leading teams with empathy.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Martín Galdeano Cañizares | CTO & Tech Lead",
    description:
      "Bridging the gap between scalable technology and human creativity.",
    url: "https://martingaldeca.com",
    siteName: "Martín Galdeano Cañizares",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martín Galdeano Cañizares | CTO & Tech Lead",
    description:
      "Bridging the gap between scalable technology and human creativity.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
