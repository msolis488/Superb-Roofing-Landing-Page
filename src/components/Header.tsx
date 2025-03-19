import React from "react";
import { Phone } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  logoUrl?: string;
  companyName?: string;
  phoneNumber?: string;
}

const Header = ({
  logoUrl = "https://api.dicebear.com/7.x/initials/svg?seed=RoofPro",
  companyName = "Superb Roofing",
  phoneNumber = "(210) 871-8293",
}: HeaderProps) => {
  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber.replace(/\D/g, "")}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-white shadow-md z-50 px-2 md:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <img
            src={logoUrl}
            alt={companyName}
            className="h-8 md:h-12 w-auto max-w-[140px] md:max-w-[200px] object-contain"
          />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-xl md:text-2xl font-bold text-red-600 whitespace-nowrap">
            OFFER ENDS MARCH 31st 2025
          </span>
        </div>

        <Button
          onClick={handleCallClick}
          className="bg-blue-900 hover:bg-blue-800 text-white flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden md:inline">{phoneNumber}</span>
          <span className="md:hidden">Call Now</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
