import React from "react";
import { Card } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Props {
  youtubeVideoId?: string;
  reviews?: Review[];
  yearsInBusiness?: number;
  bbbRating?: string;
  reviewCount?: number;
  averageRating?: number;
}

const defaultReviews: Review[] = [
  {
    name: "John Smith",
    rating: 5,
    comment:
      "Best roofing service I've ever used. The team was professional and completed the job ahead of schedule.",
    date: "2024-02-15",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Incredible work! They transformed our old roof into something beautiful. The $1,000 discount was a great bonus.",
    date: "2024-02-10",
  },
  {
    name: "Mike Williams",
    rating: 5,
    comment:
      "Very impressed with the quality of work. The team was courteous and cleaned up everything perfectly.",
    date: "2024-02-05",
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment:
      "They made the whole process so easy. From quote to completion, everything was handled professionally.",
    date: "2024-01-30",
  },
];

const SocialProofSection = ({
  youtubeVideoId = "8coYSu1qKhQ", // Replace with your actual YouTube video ID
  reviews = defaultReviews,
  yearsInBusiness = 25,
  bbbRating = "A+",
  reviewCount = 500,
  averageRating = 4.9,
}: Props) => {
  return (
    <section className="w-full bg-white py-8 md:py-12 px-3 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
          Hear From Our Happy Customers
        </h2>

        {/* YouTube Video Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="Customer Testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            Recent Reviews
          </h3>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-4">
                      {review.comment}
                    </p>
                    <div className="mt-auto">
                      <p className="font-semibold text-gray-900">
                        {review.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Badge variant="secondary" className="text-xl px-4 py-2">
                {yearsInBusiness} Years
              </Badge>
            </div>
            <p className="text-gray-600">Years in Business</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Badge variant="secondary" className="text-xl px-4 py-2">
                BBB Rating: {bbbRating}
              </Badge>
            </div>
            <p className="text-gray-600">Better Business Bureau</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-bold">{averageRating}</span>
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="text-gray-600">{reviewCount}+ Customer Reviews</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
