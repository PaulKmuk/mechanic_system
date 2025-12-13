import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

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
        <AuthProvider>
          {children}      
        </AuthProvider>  
      </body>
    </html>
  );
}
