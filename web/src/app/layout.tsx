import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { SkipLink } from "@/components/skip-link";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-ek-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const siteUrl = "https://experiencekit.ai";

const metaTitle = "ExperienceKit.ai | AI-Powered Learning Kits";
const metaDescription =
  "Hands-on learning kits, daily missions, AI reflection, and portfolio-ready proof—built for parents, learners, educators, and schools who want a warm, future-ready path.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "ExperienceKit.ai",
      url: siteUrl,
      description: metaDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "ExperienceKit.ai",
      url: siteUrl,
      description:
        "AI-powered, hands-on learning kits with daily missions, reflection, and portfolio-ready outcomes for families, schools, and learners.",
    },
  ],
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: metaTitle,
    template: "%s | ExperienceKit.ai",
  },
  description: metaDescription,
  applicationName: "ExperienceKit.ai",
  authors: [{ name: "ExperienceKit.ai" }],
  keywords: [
    "ExperienceKit",
    "AI learning kits",
    "hands-on learning",
    "guided exploration",
    "schools",
    "parents",
    "educators",
    "future-ready learners",
    "STEM kits",
    "experience-led learning",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ExperienceKit.ai",
    title: metaTitle,
    description: metaDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ExperienceKit.ai — AI-powered learning kits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full scroll-pt-[7.5rem] sm:scroll-pt-32`}
    >
      <body className="isolate min-h-full flex flex-col bg-stone-50 font-sans text-slate-900 antialiased">
        <SkipLink />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="relative z-[1] flex min-h-full flex-1 flex-col">
          <SiteChrome>{children}</SiteChrome>
        </div>
      </body>
    </html>
  );
}
