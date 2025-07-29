import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, Repeat, TrendingUp } from "lucide-react";

export const StatsSection = () => {
  const [counts, setCounts] = useState({
    orders: 0,
    rating: 0,
    customers: 0,
    satisfaction: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("stats-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const finalValues = {
        orders: 1247,
        rating: 4.9,
        customers: 892,
        satisfaction: 98
      };

      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounts({
          orders: Math.floor(finalValues.orders * progress),
          rating: Number((finalValues.rating * progress).toFixed(1)),
          customers: Math.floor(finalValues.customers * progress),
          satisfaction: Math.floor(finalValues.satisfaction * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounts(finalValues);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const stats = [
    {
      icon: TrendingUp,
      value: counts.orders,
      label: "Total Orders",
      suffix: "+",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Star,
      value: counts.rating,
      label: "Average Rating",
      suffix: "/5",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: Users,
      value: counts.customers,
      label: "Happy Customers",
      suffix: "+",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Repeat,
      value: counts.satisfaction,
      label: "Satisfaction Rate",
      suffix: "%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <section id="stats-section" className="py-16 bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Thousands of Users
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our growing community of satisfied customers who have experienced amazing conversations with Shanaya
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`${stat.bgColor} ${stat.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform`}
            >
              <CardContent className="p-6 text-center">
                <div className={`${stat.color} mb-4 flex justify-center`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className={`${stat.color} text-3xl md:text-4xl font-bold mb-2`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional social proof */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-accent/20">
            <div className="text-2xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Available Support</div>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-accent/20">
            <div className="text-2xl font-bold text-primary mb-2">5 Min</div>
            <div className="text-sm text-muted-foreground">Average Response Time</div>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-accent/20">
            <div className="text-2xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Secure & Private</div>
          </div>
        </div>
      </div>
    </section>
  );
}; 