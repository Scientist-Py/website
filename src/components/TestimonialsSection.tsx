import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import testimonialsData from "@/data/testimonials.json";

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const testimonials = testimonialsData.testimonials;
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      let starClass = "text-gray-300";
      
      if (starValue <= Math.floor(rating)) {
        starClass = "text-yellow-400 fill-current";
      } else if (starValue === Math.ceil(rating) && rating % 1 !== 0) {
        starClass = "text-yellow-400 fill-current opacity-60";
      }
      
      return (
        <Star
          key={i}
          className={`w-4 h-4 ${starClass}`}
        />
      );
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-accent/10 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real customers who have experienced amazing conversations with Sassy Poonam
          </p>
        </div>

        {/* Main testimonial display */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-accent/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-primary/30 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(displayedTestimonials[currentIndex].rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      {displayedTestimonials[currentIndex].rating}/5
                    </span>
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-gray-700 mb-6 italic">
                    "{displayedTestimonials[currentIndex].review}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-white font-semibold">
                          {displayedTestimonials[currentIndex].avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {displayedTestimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {displayedTestimonials[currentIndex].package}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {displayedTestimonials[currentIndex].date}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {displayedTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-primary scale-125" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Show All Button */}
        {!showAll && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
            >
              Show All {testimonials.length} Reviews
            </button>
          </div>
        )}

        {/* All Reviews Grid - Only show when showAll is true */}
        {showAll && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8">
              All Customer Reviews
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(testimonial.rating)}
                      <span className="text-sm text-muted-foreground ml-2">
                        {testimonial.rating}/5
                      </span>
                    </div>
                    
                    <blockquote className="text-sm text-gray-700 mb-4 italic">
                      "{testimonial.review}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary text-white text-xs font-semibold">
                            {testimonial.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.package}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.date}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Back to Top Reviews Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setShowAll(false);
                  setCurrentIndex(0);
                }}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium"
              >
                Back to Featured Reviews
              </button>
            </div>
          </div>
        )}

        {/* Quick stats */}
        <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-accent/20">
            <div className="text-2xl font-bold text-primary mb-1">4.9★</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-accent/20">
            <div className="text-2xl font-bold text-primary mb-1">98%</div>
            <div className="text-sm text-muted-foreground">Would Recommend</div>
          </div>
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-accent/20">
            <div className="text-2xl font-bold text-primary mb-1">2.5k+</div>
            <div className="text-sm text-muted-foreground">Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}; 