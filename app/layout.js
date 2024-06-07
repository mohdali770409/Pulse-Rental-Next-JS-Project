import React from "react";
// below @ means from root directory that's how we access
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/assets/styles/globals.css";

export const meta = {
  title: "Pulse Rental Website",
  description: "find your dream rental property",
  keywords: "rental, rooms, find rental, flats, find properties",
};
const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <div>{children}</div>
        <Footer/>

      </body>
    </html>
  );
};

export default MainLayout;
