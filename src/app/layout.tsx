import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["700", "800"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["italic"],
  weight: ["600"],
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Apenas Pastel · Frito na hora desde 2021",
  description: "Crocante por fora, recheado até a borda. Pastel de feira artesanal em Belo Horizonte.",
  icons: {
    icon: "/images/logo-simbolo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#880208" },
    { media: "(prefers-color-scheme: dark)", color: "#17100D" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${bricolage.variable} ${fraunces.variable} ${dmSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col selection:bg-brand-yellow selection:text-brand-text-primary">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              style: {
                borderRadius: "999px",
                padding: "12px 20px",
                fontFamily: "var(--font-dm-sans)",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
