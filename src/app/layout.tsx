import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import Navbar from "@/components/Navbar";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <Navbar />
          <main className='max-w-7xl mx-auto px-4 min-h-screen'>
            {children}
          </main>
          <footer className='footer footer-center bg-base-300 text-base-content p-4'>
            <aside>
              <p>
                Copyright © {new Date().getFullYear()} - All right reserved by
                Snack World.Ltd
              </p>
              <p>Developed by Kyaw Kyaw Oo</p>
            </aside>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
