import { Button } from "@/components/ui/button";
import { Video, Star } from "lucide-react";
import shanayaHero from "@/assets/🔥🪭.jpg"; // New hero image
import backgroundWaves from "@/assets/background-waves.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with waves */}
      <div 
        className="absolute inset-0 opacity-20 animate-wave"
        style={{
          backgroundImage: `url(${backgroundWaves})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-3 h-3 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-2 h-2 bg-secondary/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-32 w-4 h-4 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-60 right-20 w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Rated 5.0 by 200+ clients</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    SHANAYA LIVE
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground font-light">
                  Watch My Exclusive Video Content
                </p>
                
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Book a private video call with me for personalized conversations. 
                  Experience meaningful connections in a safe, secure environment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="hero" 
                  size="xl"
                  className="group"
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Video className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Book Video Call With Me
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground pt-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Private Calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Instant Booking</span>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-4 gradient-primary rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative">
                  <img
                    src={shanayaHero}
                    alt="SHANAYA LIVE - Professional Video Call Companion"
                    className="w-80 h-96 object-cover rounded-3xl shadow-2xl animate-float"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Available Now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};