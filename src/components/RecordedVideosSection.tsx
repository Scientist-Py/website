import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Play, Clock, Eye, Download, Heart, Star, MessageSquare, QrCode, ArrowLeft, Copy, Timer, Video, Phone } from "lucide-react";
import image1 from "@/assets/1.jpeg";
import image2 from "@/assets/2.jpeg";
import image3 from "@/assets/3.jpeg";

export const RecordedVideosSection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'video-calls' | 'recorded-videos'>('video-calls');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedItemForPurchase, setSelectedItemForPurchase] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [userData, setUserData] = useState({ name: '', phone: '' });
  const [showUserForm, setShowUserForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ name: '', phone: '', message: '', type: '' });

  // Video Call Packages
  const videoCallPackages = [
    { id: "friendly", name: "15-minute Nude Video Call - ₹411", price: 411, duration: "15 min", description: "Quick intimate session" },
    { id: "fun", name: "25-minute Nude Video Call - ₹624", price: 624, duration: "25 min", description: "Extended pleasure time" },
    { id: "romantic", name: "35-minute Nude Video Call - ₹874", price: 874, duration: "35 min", description: "Deep romantic connection" },
    { id: "custom", name: "1-hour Custom Experience - ₹1249", price: 1249, duration: "60 min", description: "Full custom experience" }
  ];

  // Recorded Videos
  const recordedVideos = [
    {
      id: "video1",
      title: "Nude Video Call ",
      description: "Exclusive 15-minute Cumming and Screaming",
      duration: "15 min",
      price: 389,
      originalPrice: 599,
      thumbnail: image1,
      category: "Dance",
      views: 1247,
      rating: 4.9,
      tags: ["Popular", "Trending"]
    },
    {
      id: "video2", 
      title: "Morning Cumming",
      description: "A deep and horny cum in the morning in white bed with screaming and moaning",
      duration: "25 min",
      price: 449,
      originalPrice: 699,
      thumbnail: image2,
      category: "Conversation",
      views: 892,
      rating: 4.8,
      tags: ["New"]
    },
    {
      id: "video3",
      title: "Exclusive Nude Video Call ",
      description: "Exclusive 35-minute Full Pleasure Cumming 2 times Very Horny mood",
      duration: "35 min", 
      price: 569,
      originalPrice: 899,
      thumbnail: image3,
      category: "Lifestyle",
      views: 1563,
      rating: 4.7,
      tags: ["Best Seller"]
    }
  ];

  const handlePurchase = (itemId: string, type: 'video-call' | 'recorded-video') => {
    let item;
    if (type === 'video-call') {
      item = videoCallPackages.find(v => v.id === itemId);
    } else {
      item = recordedVideos.find(v => v.id === itemId);
    }
    
    if (!item) return;
    
    setSelectedItemForPurchase({ ...item, type });
    setShowUserForm(true);
  };

  const handleUserFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.name.trim() || !userData.phone.trim()) {
      toast({
        title: "Please fill all fields",
        description: "Name and phone number are required.",
        variant: "destructive"
      });
      return;
    }

    // Send data to Google Sheets
    const sendToGoogleSheets = async () => {
      try {
        const webhookUrl = 'https://script.google.com/macros/s/AKfycbxkIocPRYYU2OVevLK3-DmhtZGXyVWJJYjdwuHbUkfDUeBjyAQbOdUbjhsT9L-aoYwT/exec';
        
        const data = {
          customerName: userData.name,
          phoneNumber: userData.phone,
          itemType: selectedItemForPurchase?.type,
          itemName: selectedItemForPurchase?.type === 'video-call' 
            ? selectedItemForPurchase?.name 
            : selectedItemForPurchase?.title,
                      amount: selectedItemForPurchase?.price,
            upiId: 'ayushiiichauha@ybl',
            paymentStatus: 'Pending',
          userAgent: navigator.userAgent,
          ipAddress: 'Client IP' // You can get this from your server
        };

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          console.log('Data sent to Google Sheets successfully');
        } else {
          console.error('Failed to send data to Google Sheets');
        }
      } catch (error) {
        console.error('Error sending data to Google Sheets:', error);
      }
    };

    // Send data in background (don't block UI)
    sendToGoogleSheets();
    
    setShowUserForm(false);
    setShowPayment(true);
  };

  const handlePreview = (videoId: string) => {
    const video = recordedVideos.find(v => v.id === videoId);
    if (!video) return;
    
    toast({
      title: "Purchase Required! 💳",
      description: `Please purchase "${video.title}" first to access the preview. Click "Buy Now" to proceed with payment.`,
      variant: "destructive"
    });
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showPayment && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setShowPayment(false);
            setShowVerification(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showPayment, timeLeft]);

  // Reset timer when payment is shown
  useEffect(() => {
    if (showPayment) {
      setTimeLeft(180);
    }
  }, [showPayment]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateUPIQR = () => {
    if (!selectedItemForPurchase) return "";
    const amount = selectedItemForPurchase.price;
    const upiId = "ayushiiichauha@ybl";
    const receiverName = "SASSY POONAM";
    const transactionNote = selectedItemForPurchase.type === 'video-call' 
      ? `Video Call - ${selectedItemForPurchase.name}`
      : `Recorded Video - ${selectedItemForPurchase.title}`;
    
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(receiverName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;
  };

  const copyUPIDetails = () => {
    if (!selectedItemForPurchase) return;
    const upiId = "ayushiiichauha@ybl";
    const itemName = selectedItemForPurchase.type === 'video-call' 
      ? selectedItemForPurchase.name 
      : selectedItemForPurchase.title;
    const details = `UPI ID: ${upiId}\nAmount: ₹${selectedItemForPurchase.price}\nFor: ${itemName}\nCustomer: ${userData.name}\nPhone: ${userData.phone}`;
    navigator.clipboard.writeText(details);
    toast({
      title: "UPI Details Copied!",
      description: "Payment details have been copied to your clipboard.",
    });
  };

  const handlePaymentComplete = () => {
    setIsVerifying(true);
    
    const verificationTime = Math.random() * 4000 + 3000;
    
    setTimeout(() => {
      setIsVerifying(false);
      setShowPayment(false);
      setShowVerification(true);
    }, verificationTime);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send contact data to Google Sheets
    const sendContactToGoogleSheets = async () => {
      try {
        const webhookUrl = 'https://script.google.com/macros/s/AKfycbxkIocPRYYU2OVevLK3-DmhtZGXyVWJJYjdwuHbUkfDUeBjyAQbOdUbjhsT9L-aoYwT/exec';
        
        const data = {
          customerName: contactData.name,
          phoneNumber: contactData.phone,
          itemType: 'contact',
          itemName: `Contact Request - ${contactData.type}`,
                      amount: 0,
            upiId: 'ayushiiichauha@ybl',
            paymentStatus: 'Contact Request',
          transactionId: '',
          additionalInfo: contactData.message,
          userAgent: navigator.userAgent,
          ipAddress: 'Client IP'
        };

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          console.log('Contact data sent to Google Sheets successfully');
        } else {
          console.error('Failed to send contact data to Google Sheets');
        }
      } catch (error) {
        console.error('Error sending contact data to Google Sheets:', error);
      }
    };

    // Send contact data in background
    sendContactToGoogleSheets();

    toast({
      title: "Contact Request Sent! 📧",
      description: "We'll get back to you within 24 hours with your custom content details.",
    });

    setShowContactForm(false);
    setContactData({ name: '', phone: '', message: '', type: '' });
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const transactionId = formData.get('transactionId') as string;
    const additionalInfo = formData.get('additionalInfo') as string;

    // Update Google Sheets with verification data
    const updateGoogleSheets = async () => {
      try {
        const webhookUrl = 'https://script.google.com/macros/s/AKfycbxkIocPRYYU2OVevLK3-DmhtZGXyVWJJYjdwuHbUkfDUeBjyAQbOdUbjhsT9L-aoYwT/exec';
        
        const data = {
          customerName: userData.name,
          phoneNumber: userData.phone,
          itemType: selectedItemForPurchase?.type,
          itemName: selectedItemForPurchase?.type === 'video-call' 
            ? selectedItemForPurchase?.name 
            : selectedItemForPurchase?.title,
          amount: selectedItemForPurchase?.price,
          upiId: 'ayushiiichauha@ybl',
          paymentStatus: 'Verification Submitted',
          transactionId: transactionId,
          additionalInfo: additionalInfo,
          userAgent: navigator.userAgent,
          ipAddress: 'Client IP'
        };

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          console.log('Verification data sent to Google Sheets successfully');
        } else {
          console.error('Failed to send verification data to Google Sheets');
        }
      } catch (error) {
        console.error('Error sending verification data to Google Sheets:', error);
      }
    };

    // Send verification data in background
    updateGoogleSheets();

    toast({
      title: "Payment Verification Submitted! 📸",
      description: "We're reviewing your payment screenshot. You'll receive the link within 5-10 minutes.",
    });

    setShowPayment(false);
    setShowVerification(false);
    setSelectedItemForPurchase(null);
    setUserData({ name: '', phone: '' });
  };

  // Contact form
  if (showContactForm) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-glow">
              <CardHeader className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowContactForm(false)}
                  className="w-fit mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Content
                </Button>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Contact Us
                </CardTitle>
                <CardDescription>
                  Tell us about your custom content requirements and we'll get back to you with details.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="font-medium">Custom Content Services</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    We offer personalized video content, custom video calls, and special requests. Just let us know what you're looking for!
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Full Name *</Label>
                    <Input
                      id="contactName"
                      type="text"
                      placeholder="Enter your full name"
                      value={contactData.name}
                      onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="Enter your WhatsApp number"
                      value={contactData.phone}
                      onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll contact you on this number
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactType">Type of Request *</Label>
                    <Select 
                      value={contactData.type} 
                      onValueChange={(value) => setContactData(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your request type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Custom Video Call">Custom Video Call</SelectItem>
                        <SelectItem value="Personalized Video">Personalized Video</SelectItem>
                        <SelectItem value="Special Request">Special Request</SelectItem>
                        <SelectItem value="Bulk Content">Bulk Content</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactMessage">Your Requirements *</Label>
                    <Textarea
                      id="contactMessage"
                      placeholder="Describe what you're looking for in detail..."
                      value={contactData.message}
                      onChange={(e) => setContactData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Be as specific as possible so we can provide accurate pricing
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full"
                    size="lg"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Contact Request
                  </Button>
                </form>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    We'll respond within 24 hours with pricing and details
                  </p>
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Quick Response</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>Custom Pricing</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Secure</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // User data collection form
  if (showUserForm) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-glow">
              <CardHeader className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowUserForm(false)}
                  className="w-fit mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to {selectedItemForPurchase?.type === 'video-call' ? 'Video Calls' : 'Recorded Videos'}
                </Button>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Quick Details Required
                </CardTitle>
                <CardDescription>
                  Please provide your details to proceed with the payment for {selectedItemForPurchase?.type === 'video-call' ? selectedItemForPurchase?.name : selectedItemForPurchase?.title}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="font-medium">Why we need your details?</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    We'll use your phone number to send you the video call link or recorded video access. Your data is safe and will only be used for this transaction.
                  </p>
                </div>

                <div className="bg-accent/50 p-4 rounded-lg text-left space-y-2">
                  <div><strong>Item:</strong> {selectedItemForPurchase?.type === 'video-call' ? selectedItemForPurchase?.name : selectedItemForPurchase?.title}</div>
                  <div><strong>Amount:</strong> ₹{selectedItemForPurchase?.price}</div>
                </div>

                <form onSubmit={handleUserFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={userData.name}
                      onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your WhatsApp number"
                      value={userData.phone}
                      onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll send the link to this number via WhatsApp/SMS
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full"
                    size="lg"
                  >
                    Proceed to Payment
                  </Button>
                </form>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Your details will be securely stored for this transaction only
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Payment verification UI
  if (isVerifying) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-glow">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  Verifying Payment...
                </CardTitle>
                <CardDescription>
                  Please wait while we verify your payment. This may take a few seconds.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="text-lg font-semibold">
                    Verifying payment of ₹{selectedItemForPurchase?.price}
                  </div>
                  
                  <div className="bg-accent/50 p-4 rounded-lg text-left space-y-2">
                    <div><strong>Customer:</strong> {userData.name}</div>
                    <div><strong>Phone:</strong> {userData.phone}</div>
                    <div><strong>Item:</strong> {selectedItemForPurchase?.type === 'video-call' ? selectedItemForPurchase?.name : selectedItemForPurchase?.title}</div>
                    <div><strong>Amount:</strong> ₹{selectedItemForPurchase?.price}</div>
                    <div><strong>UPI ID:</strong> ayushiiichauha@ybl</div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <div className="animate-pulse">Checking payment status</div>
                    <div className="animate-pulse delay-100">.</div>
                    <div className="animate-pulse delay-200">.</div>
                    <div className="animate-pulse delay-300">.</div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Please don't close this page or refresh while we verify your payment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Payment UI
  if (showPayment) {
    const isTimeExpiring = timeLeft <= 30;
    
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-glow">
              <CardHeader className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowPayment(false)}
                  className="w-fit mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to {selectedItemForPurchase?.type === 'video-call' ? 'Video Calls' : 'Recorded Videos'}
                </Button>
                
                <div className={`flex items-center justify-center gap-2 mb-4 p-3 rounded-lg ${
                  isTimeExpiring ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <Timer className={`w-5 h-5 ${isTimeExpiring ? 'text-red-600' : 'text-blue-600'}`} />
                  <span className={`font-mono text-lg font-bold ${isTimeExpiring ? 'text-red-600' : 'text-blue-600'}`}>
                    {formatTime(timeLeft)}
                  </span>
                  <span className={`text-sm ${isTimeExpiring ? 'text-red-600' : 'text-blue-600'}`}>
                    {isTimeExpiring ? 'Time Expiring!' : 'Time Remaining'}
                  </span>
                </div>
                
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <QrCode className="w-6 h-6 text-primary" />
                  Complete Your Payment
                </CardTitle>
                <CardDescription>
                  Scan the QR code below to pay ₹{selectedItemForPurchase?.price} for {selectedItemForPurchase?.type === 'video-call' ? selectedItemForPurchase?.name : selectedItemForPurchase?.title}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-6">
                <div className="relative mx-auto w-fit">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-xl animate-pulse" />
                  
                  <div className="relative bg-white p-8 rounded-3xl shadow-2xl border-4 border-gradient-to-r from-primary to-secondary">
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl">
                      <img 
                        src={generateUPIQR()} 
                        alt="UPI Payment QR Code"
                        className="w-64 h-64 mx-auto drop-shadow-lg"
                      />
                    </div>
                    
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full opacity-60 animate-bounce" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-secondary rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-lg font-semibold">
                    Pay ₹{selectedItemForPurchase?.price} to ayushiiichauha@ybl
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-muted-foreground">UPI ID:</span>
                      <span className="font-mono font-bold text-primary">ayushiiichauha@ybl</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-muted-foreground">Amount:</span>
                      <span className="font-bold text-lg text-green-600">₹{selectedItemForPurchase?.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-muted-foreground">Item:</span>
                      <span className="font-medium">{selectedItemForPurchase?.type === 'video-call' ? selectedItemForPurchase?.name : selectedItemForPurchase?.title}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={copyUPIDetails}
                    className="w-full border-2 hover:bg-primary/5"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Payment Details
                  </Button>
                  
                  <Button 
                    variant="hero" 
                    onClick={handlePaymentComplete}
                    className="w-full"
                    size="lg"
                  >
                    I Have Completed Payment
                  </Button>
                  
                  {isTimeExpiring && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-700 font-medium">
                        ⚠️ Time is running out! Please complete your payment quickly or the session will expire.
                      </p>
                    </div>
                  )}
                  
                  <p className="text-sm text-muted-foreground">
                    After payment, you'll receive the link within 5-10 minutes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Verification UI
  if (showVerification) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-glow">
              <CardHeader className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowVerification(false)}
                  className="w-fit mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Payment
                </Button>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Payment Verification Required
                </CardTitle>
                <CardDescription>
                  Sorry, we couldn't verify your payment automatically. Please upload a screenshot of your payment.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                   <div className="flex items-center gap-2 text-yellow-800 mb-2">
                     <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                     <span className="font-medium">Payment Verification Needed</span>
                   </div>
                   <p className="text-sm text-yellow-700">
                     Either you entered the wrong amount or the payment hasn't been processed yet. Please share your payment screenshot for manual verification.
                   </p>
                 </div>

                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                   <div className="flex items-center gap-2 text-blue-800 mb-2">
                     <div className="w-2 h-2 bg-blue-500 rounded-full" />
                     <span className="font-medium">Having Issues? Contact us on Telegram</span>
                   </div>
                   <p className="text-sm text-blue-700 mb-3">
                     If you're facing any payment issues or need immediate assistance, send your payment screenshot to our Telegram support.
                   </p>
                   <div className="flex items-center gap-2">
                     <span className="text-sm font-medium">Telegram ID:</span>
                                           <span className="font-mono font-bold text-blue-600">@payment_hub_verifier</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText('@payment_hub_verifier');
                          toast({
                            title: "Telegram ID Copied!",
                            description: "Telegram ID copied to clipboard",
                          });
                        }}
                       className="ml-auto"
                     >
                       <Copy className="w-4 h-4 mr-1" />
                       Copy
                     </Button>
                   </div>
                 </div>

                <div className="bg-accent/50 p-4 rounded-lg text-left space-y-2">
                  <div><strong>Customer:</strong> {userData.name}</div>
                  <div><strong>Phone:</strong> {userData.phone}</div>
                  <div><strong>Item:</strong> {selectedItemForPurchase?.type === 'video-call' ? selectedItemForPurchase?.name : selectedItemForPurchase?.title}</div>
                  <div><strong>Amount:</strong> ₹{selectedItemForPurchase?.price}</div>
                  <div><strong>UPI ID:</strong> ayushiiichauha@ybl</div>
                </div>

                <form onSubmit={handleVerificationSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="screenshot">Payment Screenshot</Label>
                    <Input
                      id="screenshot"
                      type="file"
                      accept="image/*"
                      required
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a clear screenshot of your payment confirmation. We don't store this image permanently.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
                    <Input
                      id="transactionId"
                      placeholder="Enter transaction ID if available"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Any additional details about your payment..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full"
                    size="lg"
                  >
                    Submit for Verification
                  </Button>
                </form>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Our team will review your payment within 5-10 minutes
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You'll receive the link via email/SMS once verified
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select between live video calls or exclusive recorded content. Both offer unique experiences tailored just for you.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-2 border border-primary/20 shadow-lg">
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'video-calls' ? 'hero' : 'ghost'}
                onClick={() => setActiveTab('video-calls')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Video Calls
              </Button>
              <Button
                variant={activeTab === 'recorded-videos' ? 'hero' : 'ghost'}
                onClick={() => setActiveTab('recorded-videos')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300"
              >
                <Video className="w-5 h-5" />
                Recorded Videos
              </Button>
            </div>
          </div>
        </div>

                 {/* Video Calls Content */}
         {activeTab === 'video-calls' && (
           <div className="space-y-8">
             <div className="text-center mb-8">
               <h3 className="text-3xl font-bold mb-4">Live Video Call Packages</h3>
               <p className="text-lg text-muted-foreground">
                 Connect with me live for intimate conversations and experiences
               </p>
             </div>

             {/* Video Call Statistics */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
               <Card className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                 <div className="text-2xl font-bold text-primary mb-1">2,847</div>
                 <div className="text-sm text-muted-foreground">Total Calls</div>
               </Card>
               <Card className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                 <div className="text-2xl font-bold text-green-600 mb-1">4.9★</div>
                 <div className="text-sm text-muted-foreground">Avg Rating</div>
               </Card>
               <Card className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                 <div className="text-2xl font-bold text-blue-600 mb-1">98.3%</div>
                 <div className="text-sm text-muted-foreground">Satisfaction</div>
               </Card>
               <Card className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                 <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
                 <div className="text-sm text-muted-foreground">Availability</div>
               </Card>
             </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoCallPackages.map((pkg) => (
                <Card key={pkg.id} className="group hover:shadow-glow transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    
                    <div className="text-3xl font-bold text-primary">
                      ₹{pkg.price}
                    </div>
                    
                    <Button
                      variant="hero"
                      className="w-full"
                      onClick={() => handlePurchase(pkg.id, 'video-call')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recorded Videos Content */}
        {activeTab === 'recorded-videos' && (
          <div className="space-y-8">
                         <div className="text-center mb-8">
               <h3 className="text-3xl font-bold mb-4">Exclusive Recorded Videos</h3>
               <p className="text-lg text-muted-foreground">
                 Watch my exclusive recorded content anytime, anywhere
               </p>
             </div>

             {/* Recorded Videos Statistics */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
               <Card className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                 <div className="text-2xl font-bold text-primary mb-1">156</div>
                 <div className="text-sm text-muted-foreground">Total Videos</div>
               </Card>
               <Card className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                 <div className="text-2xl font-bold text-green-600 mb-1">47.2K</div>
                 <div className="text-sm text-muted-foreground">Total Views</div>
               </Card>
               <Card className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                 <div className="text-2xl font-bold text-blue-600 mb-1">4.8★</div>
                 <div className="text-sm text-muted-foreground">Avg Rating</div>
               </Card>
               <Card className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                 <div className="text-2xl font-bold text-purple-600 mb-1">3.2K</div>
                 <div className="text-sm text-muted-foreground">Downloads</div>
               </Card>
             </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordedVideos.map((video) => (
                <Card key={video.id} className="group hover:shadow-glow transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="w-16 h-16 rounded-full bg-white/90 hover:bg-white"
                          onClick={() => handlePreview(video.id)}
                        >
                          <Play className="w-8 h-8 text-primary ml-1" />
                        </Button>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 flex gap-1">
                      {video.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-2 text-white/90 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{video.rating}</span>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{video.title}</CardTitle>
                        <CardDescription className="text-sm mb-3">
                          {video.description}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{video.duration}</span>
                        <Badge variant="outline" className="text-xs">
                          {video.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">₹{video.price}</span>
                        <span className="text-sm text-muted-foreground line-through">₹{video.originalPrice}</span>
                        <Badge variant="destructive" className="text-xs">
                          {Math.round(((video.originalPrice - video.price) / video.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handlePreview(video.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        variant="hero"
                        size="sm"
                        className="flex-1"
                        onClick={() => handlePurchase(video.id, 'recorded-video')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
                <h3 className="text-2xl font-bold">Want More Exclusive Content?</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Get access to all content with our premium membership. New videos and experiences added weekly!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  View All Content
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setShowContactForm(true)}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact for Custom Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}; 