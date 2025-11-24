import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
//ThemeProvider was defined at @/context/Theme
import ThemeProvider from "@/context/Theme";
import Navbar from "@/components/navigation/navbar";

const inter = localFont({
   src: "./fonts/interVF.ttf",
   variable: "--font-inter",
   weight: "100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
   src: "./fonts/SpaceGroteskVF.ttf",
   variable: "--font-space-grotesk",
   weight: "300 400 500 600 700",
});

export const metadata: Metadata = {
   title: "Dev Overflow",
   description:
      "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
   icons: {
      icon: "C:UsersShendyDesktoppractice1publicimagessite-logo.svg",
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body /*set inter as className make it defalut font for the app*/
            className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
         >
            {/*wrapped the children between ThemeProvider to make sure the theme aplly ot all pages*/}
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <Navbar />
               {children}
            </ThemeProvider>
         </body>
      </html>
   );
}
