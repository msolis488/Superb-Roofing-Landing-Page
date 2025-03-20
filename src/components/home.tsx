import React, { useState } from "react";
import CountdownBanner from "./CountdownBanner";
import Header from "./Header";
import HeroSection from "./HeroSection";
import SocialProofSection from "./SocialProofSection";
import PortfolioGallery from "./PortfolioGallery";
import GuaranteesSection from "./GuaranteesSection";
import QuizForm from "./QuizForm";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleGetQuoteClick = () => {
    setIsFormOpen(true);
  };

  const handleCallClick = () => {
    window.location.href = "tel:+2108718293";
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Here you would typically send this data to your backend
    alert("Message Sent! We'll contact you shortly about your roof.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        logoUrl="https://i.ibb.co/wrMYx8Vb/logo.png"
        companyName="Your Company Name"
      />

      {/* Add padding top to account for fixed header */}
      <div className="pt-24 md:pt-32">
        <HeroSection
          backgroundImage="https://i.ibb.co/zMcWpf1/hero-image.jpg"
          onGetQuoteClick={handleGetQuoteClick}
          onCallClick={handleCallClick}
        />

        <SocialProofSection />
        <GuaranteesSection />
        <PortfolioGallery />

        <QuizForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
