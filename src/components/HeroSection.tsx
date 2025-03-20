import React from "react";
import CountdownBanner from "./CountdownBanner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRight, Phone } from "lucide-react";

interface HeroSectionProps {
  backgroundImage?: string;
  discountAmount?: string;
  onGetQuoteClick?: () => void;
  onCallClick?: () => void;
}

const HeroSection = ({
  backgroundImage = "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=2070&auto=format&fit=crop",
  discountAmount = "$1,000",
  onGetQuoteClick = () => console.log("Get quote clicked"),
  onCallClick = () => console.log("Call clicked"),
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[600px] bg-slate-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90" />

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-white space-y-6">
        <CountdownBanner />

        {/* CTA Card */}
        <Card className="w-full max-w-md p-4 md:p-6 bg-white/10 backdrop-blur-md border-0 text-white mx-2 md:mx-0">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-center">
            Want A New Roof AND {discountAmount} Cash?
          </h1>

          <p className="text-base md:text-xl mb-4 md:mb-6 text-center text-gray-200">
            Take our short quiz and see if you qualify!
          </p>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold"
              onClick={onGetQuoteClick}
            >
              TAKE THE QUIZ
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Desktop Call Button */}
            <Button
              variant="outline"
              size="lg"
              className="w-full flex bg-slate-800 hover:bg-slate-700 text-white"
              onClick={onCallClick}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call For Immediate Service
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
