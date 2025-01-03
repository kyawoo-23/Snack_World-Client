import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BuyNowDialog from "@/components/Dialog/BuyNowDialog";
import CheckOutDialog from "@/components/Dialog/CheckOutDialog";
import { Toaster } from "react-hot-toast";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Snack World",
  description: "Developed by Kyaw Kyaw Oo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={font.className + " min-h-screen"}>
        <Providers>
          <Toaster />
          <Navbar />
          <main className='max-w-5xl mx-auto px-4 min-h-screen'>
            {children}
          </main>
          <BuyNowDialog />
          <CheckOutDialog />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
