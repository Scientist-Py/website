import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

export const FloatingBookButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-float">
      <Button
        variant="hero"
        size="lg"
        onClick={scrollToBooking}
        className="rounded-full shadow-2xl hover:shadow-glow px-6 py-3 group"
      >
        <Video className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Book Now</span>
        <span className="sm:hidden">Book</span>
      </Button>
    </div>
  );
};