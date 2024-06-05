import React from "react";
// below @ means from root directory that's how we access
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
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
