import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Dhananjay Bansal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className= "bg-[#d5d5d5]"
      >
        {children}
      </body>
    </html>
  );
}
