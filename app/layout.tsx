import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/CommonComponents/Navbar";
import { DM_Sans } from "next/font/google";
import Footer from "@/components/CommonComponents/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthSessionProvider } from "@/contextApi/Authenticate";

const dm_Sans = DM_Sans({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tensi, A Data Management Software",
  description:
    "Tensi is used to store data in the collections and best data manager for all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dm_Sans.className} antialiased`}>
        <AuthSessionProvider>
          <Navbar />
          {children}
          <Toaster richColors position="bottom-right" visibleToasts={3} />
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
