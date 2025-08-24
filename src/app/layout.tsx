import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mechanic System",
  description: "Moto Mechanic System Logistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>    
        {children}      
      </body>
    </html>
  );
}
