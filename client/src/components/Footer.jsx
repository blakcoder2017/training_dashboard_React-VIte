import React from "react";
import colors from "../hooks/colors";
const Footer = () => {

  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="text-center p-3" style={{ backgroundColor: colors.black }}>
      {currentYear} © Training Analytics Dashboard  || 
      <a style={{color: colors.neon}} href="https://github.com/blakcoder2017/"> Abubakari Sherifdeen</a>
    </div>
    </footer>
  );
}   
export default Footer;