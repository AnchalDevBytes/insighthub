import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InsightHub - AI-Powered Analytics Dashboard",
  description:
    "Modern analytics dashboard with real-time insights and comprehensive data visualization.",
  keywords: [
    "analytics",
    "dashboard",
    "insights",
    "data visualization",
    "business intelligence",
  ],
  authors: [{ name: "InsightHub Team" }],
  creator: "InsightHub",
  publisher: "InsightHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
