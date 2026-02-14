import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { cn } from "@/lib/utils/cn";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Admin Panel - WanderStay",
  description: "Admin panel for managing WanderStay's hotel booking platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn("antialiased", poppins.className)}
      >
        <Provider>
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
          <Toaster
            position="top-center"
            richColors
            theme="light"
            duration={3000}
            expand
            swipeDirections={["bottom", "top", "left", "right"]}
          />
        </Provider>
      </body>
    </html>
  );
}
