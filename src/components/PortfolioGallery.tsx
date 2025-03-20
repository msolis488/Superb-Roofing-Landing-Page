import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  description?: string;
}

interface Props {
  images?: GalleryImage[];
}

const defaultImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://i.ibb.co/0yhGW7Wn/expert-installation.webp",
    alt: "Modern roof installation",
    description: "Complete roof replacement with architectural shingles",
  },
  {
    id: "2",
    src: "https://i.ibb.co/xqtVYtBy/expert-residential-roofing-services.webp",
    alt: "Classic home roof",
    description: "Traditional asphalt shingle installation",
  },
  {
    id: "3",
    src: "https://i.ibb.co/N20X3kg7/residential-roof-installation-services.webp",
    alt: "Luxury home roofing",
    description: "Premium slate roofing project",
  },
  {
    id: "4",
    src: "https://i.ibb.co/cVnv9r9/Shingle1.webp",
    alt: "Luxury home roofing",
    description: "Premium slate roofing project",
  },
  {
    id: "5",
    src: "https://i.ibb.co/LXYpRJL8/superb-roofing-and-renovation-doing-whole-roof-repair.webp",
    alt: "Luxury home roofing",
    description: "Premium slate roofing project",
  },
  {
    id: "6",
    src: "https://i.ibb.co/Gv2vVYTS/superb-roofing-solar-panel-roof-intallation-12.webp",
    alt: "Luxury home roofing",
    description: "Premium slate roofing project",
  },
  // Add more default images here
];

const PortfolioGallery = ({ images = defaultImages }: Props) => {
  return (
    <section className="w-full bg-gray-50 py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
          Our Recent Projects
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Take a look at some of our recent roofing transformations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <div className="group cursor-pointer relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-lg font-medium px-4 text-center">
                        Click to view
                      </span>
                    </div>
                  </AspectRatio>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-[90vw]">
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto rounded-lg"
                  />
                  {image.description && (
                    <p className="mt-4 text-gray-700 text-lg">
                      {image.description}
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
