import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Instagram, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">SHANAYA LIVE</h3>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-transparent border-background/20 text-background hover:bg-background/10"
                  onClick={() => window.open('mailto:shanaya.katiyan@email.com', '_blank')}
                >
                  <Mail className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-transparent border-background/20 text-background hover:bg-background/10"
                  onClick={() => window.open('https://wa.me/919999999999', '_blank')}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-transparent border-background/20 text-background hover:bg-background/10"
                  onClick={() => window.open('https://instagram.com/shanaya.katiyan', '_blank')}
                >
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-background/80">
                <div className="flex items-center gap-3 cursor-pointer hover:text-background transition-colors" 
                     onClick={() => window.open('mailto:shanaya.katiyan@email.com', '_blank')}>
                  <Mail className="w-5 h-5" />
                  <span>shanaya.katiyan@email.com</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-background transition-colors"
                     onClick={() => window.open('https://wa.me/919999999999', '_blank')}>
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp: +91 99999 99999</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-background transition-colors"
                     onClick={() => window.open('https://instagram.com/shanaya.katiyan', '_blank')}>
                  <Instagram className="w-5 h-5" />
                  <span>@shanaya.katiyan</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button 
                  className="block text-background/80 hover:text-background transition-colors"
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Packages
                </button>
                <button 
                  className="block text-background/80 hover:text-background transition-colors"
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Now
                </button>
                <button className="block text-background/80 hover:text-background transition-colors">
                  Privacy Policy
                </button>
                <button className="block text-background/80 hover:text-background transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/20 pt-8 text-center">
            <p className="text-background/60 text-sm">
              © 2025 SHANAYA LIVE. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-background/60 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for meaningful connections</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};