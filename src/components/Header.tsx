import React from "react";
import { Phone } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  logoUrl?: string;
  companyName?: string;
  phoneNumber?: string;
}

const Header = ({
  logoUrl = "https://i.ibb.co/wrMYx8Vb/logo.png",
  companyName = "Superb Roofing",
  phoneNumber = "(210) 871-8293",
}: HeaderProps) => {
  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber.replace(/\D/g, "")}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center md:justify-between justify-center px-4 md:px-8 gap-4">
        <div className="flex items-center gap-2 absolute left-4 md:relative md:left-0">
          <img
            src={logoUrl}
            alt={companyName}
            className="h-8 md:h-12 w-auto max-w-[100px] md:max-w-[200px] object-contain"
          />
        </div>

        {/* Hide offer text on mobile, show below header */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <span className="text-xl md:text-2xl font-bold text-red-600 whitespace-nowrap">
            OFFER ENDS MARCH 31st 2025
          </span>
        </div>

        <Button
          onClick={handleCallClick}
          className="bg-blue-900 hover:bg-blue-800 text-white flex items-center gap-1 md:gap-2 min-w-fit"
          size="sm"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden md:inline mx-0 px-0">{phoneNumber}</span>
          <span className="md:hidden">Call</span>
        </Button>
      </div>
      {/* Mobile offer banner */}
      <div className="md:hidden w-full bg-red-600 text-white text-center py-1 text-sm font-bold">
        OFFER ENDS MARCH 31st 2025
      </div>
    </header>
  );
};

export default Header;
