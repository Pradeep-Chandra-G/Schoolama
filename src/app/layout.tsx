import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SchooLama - AI-powered LMS for Modern Education",
  description:
    "SchooLama is a free AI-powered LMS built for intelligent learning and education management. Start your trial today and experience smart analytics, personalized content, and streamlined course creation for modern educators.",
  openGraph: {
    title: "SchooLama - AI-Powered Learning Management System",
    description: "Experience intelligent learning with AI-powered features, analytics, and free LMS tools. Get started with your trial today!",
    url: "https://www.schoolama.studio",
    siteName: "SchooLama",
    images: [
      {
        url: "https://www.schoolama.studio/og-image.jpg", // Update this path
        width: 1200,
        height: 630,
        alt: "SchooLama Open Graph Banner",
      },
    ],
    type: "website",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children} <ToastContainer position="bottom-right" theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  );
}
