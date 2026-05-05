import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google"; // Import font
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["vietnamese"],
  variable: '--font-playfair', // Tạo biến CSS để dùng trong Tailwind
});

export const metadata: Metadata = {
  title: "1 Year of Us",
  description: "Kỷ niệm 1 năm của chúng mình",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${playfair.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  );
}