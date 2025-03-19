import React, { useState } from "react";
import CountdownBanner from "./CountdownBanner";
import Header from "./Header";
import HeroSection from "./HeroSection";
import SocialProofSection from "./SocialProofSection";
import PortfolioGallery from "./PortfolioGallery";
import GuaranteesSection from "./GuaranteesSection";
import LeadForm from "./LeadForm";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleGetQuoteClick = () => {
    setIsFormOpen(true);
  };

  const handleCallClick = () => {
    window.location.href = "tel:5551234567";
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header logoUrl="/src/assets/logo.png" companyName="Your Company Name" />

      {/* Add padding top to account for fixed header */}
      <div className="pt-24 md:pt-32">
        <HeroSection
          backgroundImage="/src/assets/hero-image.jpg"
          onGetQuoteClick={handleGetQuoteClick}
          onCallClick={handleCallClick}
        />

        <SocialProofSection />
        <GuaranteesSection />
        <PortfolioGallery />

        <LeadForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
