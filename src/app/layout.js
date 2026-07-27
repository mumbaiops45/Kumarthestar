import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
