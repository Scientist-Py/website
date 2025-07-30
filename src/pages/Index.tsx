import { HeroSection } from "@/components/HeroSection";
import { BookingSection } from "@/components/BookingSection";
import { TrustSection } from "@/components/TrustSection";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FloatingBookButton } from "@/components/FloatingBookButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <HeroSection />
      <StatsSection />
      <TestimonialsSection />
      <BookingSection />
      <TrustSection />
      <FloatingBookButton />
    </div>
  );
};

export default Index;