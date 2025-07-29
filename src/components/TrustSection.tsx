import { Shield, Lock, Zap, Eye } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Secure",
    description: "End-to-end encrypted video calls with industry-standard security protocols.",
    color: "text-green-600"
  },
  {
    icon: Lock,
    title: "Private Calls",
    description: "Your conversations are completely private and confidential. No recordings, no sharing.",
    color: "text-blue-600"
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description: "Quick and easy booking process. Get your call scheduled within minutes.",
    color: "text-yellow-600"
  },
  {
    icon: Eye,
    title: "Discreet Experience",
    description: "Professional and discreet service that respects your privacy at all times.",
    color: "text-purple-600"
  }
];

export const TrustSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trust & Privacy
            </span>{" "}
            Matters
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We take your privacy and security seriously. Here's how we ensure a safe and comfortable experience for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-white shadow-soft rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-shadow">
                    <IconComponent className={`w-10 h-10 ${feature.color}`} />
                  </div>
                  
                  {/* Floating accent */}
                  <div className={`absolute -top-1 -right-1 w-6 h-6 ${feature.color.replace('text-', 'bg-')} rounded-full opacity-20 group-hover:opacity-40 transition-opacity animate-pulse`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional trust indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-accent/30 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm font-medium">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
              <span className="text-sm font-medium">No Data Sharing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};