import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, CreditCard, User, Mail, MessageSquare, QrCode, ArrowLeft, Copy, Timer } from "lucide-react";
import { ContactSupportDialog } from "@/components/ContactSupportDialog";

export const BookingSection = () => {
  const { toast } = useToast();
  const [showPayment, setShowPayment] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    package: "",
    timeSlot: "",
    timeCategory: "",
    dressOption: "",
    message: ""
  });

  const packages = [
    { id: "friendly", name: "15-minute Nude Video Call - ₹411", price: 411 },
    { id: "fun", name: "25-minute Nude Video Call - ₹624", price: 624 },
    { id: "romantic", name: "35-minute Nude Video Call - ₹874", price: 874 },
    { id: "custom", name: "1-hour Custom Experience - ₹1249", price: 1249 }
  ];

  const dressOptions = [
    { id: "black-saree", name: "Black Saree", description: "Striping black saree 1-hour nude video call" },
    { id: "red-saree", name: "Red Saree", description: "Striping red saree 1-hour nude video call" },
    { id: "blue-dress", name: "Blue Dress", description: "Striping blue dress 1-hour nude video call" },
    { id: "pink-outfit", name: "Pink Outfit", description: "Striping pink outfit 1-hour nude video call" },
    { id: "white-dress", name: "White Dress", description: "Striping white dress 1-hour nude video call" },
    { id: "green-saree", name: "Black Top", description: "Striping black top 1-hour nude video call" }
  ];

  const timeSlots = [
    { id: "now", label: "Call NOW (Immediate)", description: "Start call within 5 minutes" },
    { id: "today", label: "Today", description: "Available slots today" },
    { id: "tomorrow", label: "Tomorrow", description: "Available slots tomorrow" },
    { id: "custom", label: "Choose Your Time", description: "Pick any date & time you prefer" }
  ];

  const todaySlots = [
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM", 
    "4:00 PM - 5:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
    "9:00 PM - 10:00 PM"
  ];

  const tomorrowSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM"
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showPayment && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time expired - show verification form
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.package || !formData.timeCategory) {
      toast({
        title: "Please fill all required fields",
        description: "Name, email, package, and timing preference are required.",
        variant: "destructive"
      });
      return;
    }

    // Additional validation for specific time slots
    if (formData.timeCategory !== "now" && !formData.timeSlot) {
      toast({
        title: "Please select a time slot",
        description: "Please choose a specific time for your call.",
        variant: "destructive"
      });
      return;
    }

    // Additional validation for custom package dress selection
    if (formData.package === "custom" && !formData.dressOption) {
      toast({
        title: "Please select a dress",
        description: "Please choose your preferred dress for the custom experience.",
        variant: "destructive"
      });
      return;
    }

    setShowPayment(true);
  };

  const generateUPIQR = () => {
    const selectedPackage = packages.find(p => p.id === formData.package);
    const amount = selectedPackage?.price || 0;
    const upiId = "bobbyrex555@okicici";
    const receiverName = "SASSY POONAM";
    const transactionNote = `Video Call - ${selectedPackage?.name}`;
    
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(receiverName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    // Generate QR code URL using a QR code API
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;
  };

  const copyUPIDetails = () => {
    const selectedPackage = packages.find(p => p.id === formData.package);
    const details = `UPI ID: ayushiiichauha@ybl\nAmount: ₹${selectedPackage?.price}\nFor: ${selectedPackage?.name}`;
    navigator.clipboard.writeText(details);
    toast({
      title: "UPI Details Copied!",
      description: "Payment details have been copied to your clipboard.",
    });
  };

  const handlePaymentComplete = () => {
    setIsVerifying(true);
    
    // Simulate payment verification process for 3-7 seconds
    const verificationTime = Math.random() * 4000 + 3000; // Random time between 3-7 seconds
    
    setTimeout(() => {
      setIsVerifying(false);
      setShowPayment(false);
      setShowVerification(true);
    }, verificationTime);
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment Verification Submitted! 📸",
      description: "We're reviewing your payment screenshot. You'll receive confirmation within 5-10 minutes.",
    });

    // Reset form and all states
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      package: "",
      timeSlot: "",
      timeCategory: "",
      dressOption: "",
      message: ""
    });
    setShowPayment(false);
    setShowVerification(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isVerifying) {
    const selectedPackage = packages.find(p => p.id === formData.package);
    
    return (
      <section id="booking" className="py-20 bg-background">
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
                    Verifying payment of ₹{selectedPackage?.price}
                  </div>
                  
                  <div className="bg-accent/50 p-4 rounded-lg text-left space-y-2">
                    <div><strong>Package:</strong> {selectedPackage?.name}</div>
                    <div><strong>Amount:</strong> ₹{selectedPackage?.price}</div>
                    <div><strong>UPI ID:</strong> ayushiiichauha@ybl</div>
                    <div><strong>Time Slot:</strong> {formData.timeSlot}</div>
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

  if (showPayment) {
    const selectedPackage = packages.find(p => p.id === formData.package);
    const isTimeExpiring = timeLeft <= 30; // Show warning when 30 seconds or less
    
    return (
      <section id="booking" className="py-20 bg-background">
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
                  Back to Booking
                </Button>
                
                {/* Timer Display */}
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
                  Scan the QR code below to pay ₹{selectedPackage?.price} for {selectedPackage?.name}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-6">
                {/* Stylish QR Code Container */}
                <div className="relative mx-auto w-fit">
                  {/* Gradient background */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-xl animate-pulse" />
                  
                  {/* QR Code container */}
                  <div className="relative bg-white p-8 rounded-3xl shadow-2xl border-4 border-gradient-to-r from-primary to-secondary">
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl">
                      <img 
                        src={generateUPIQR()} 
                        alt="UPI Payment QR Code"
                        className="w-64 h-64 mx-auto drop-shadow-lg"
                      />
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full opacity-60 animate-bounce" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-secondary rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-lg font-semibold">
                    Pay ₹{selectedPackage?.price} to ayushiiichauha@ybl
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-muted-foreground">UPI ID:</span>
                      <span className="font-mono font-bold text-primary">ayushiiichauha@ybl</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-muted-foreground">Amount:</span>
                      <span className="font-bold text-lg text-green-600">₹{selectedPackage?.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-muted-foreground">Service:</span>
                      <span className="font-medium">{selectedPackage?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-muted-foreground">Time Slot:</span>
                      <span className="font-medium">{formData.timeSlot}</span>
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
                    After payment, you'll receive a confirmation and video call link within 5 minutes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (showVerification) {
    const selectedPackage = packages.find(p => p.id === formData.package);
    
    return (
      <section id="booking" className="py-20 bg-background">
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

                <div className="bg-accent/50 p-4 rounded-lg text-left space-y-2">
                  <div><strong>Package:</strong> {selectedPackage?.name}</div>
                  <div><strong>Amount:</strong> ₹{selectedPackage?.price}</div>
                  <div><strong>UPI ID:</strong> ayushiiichauha@ybl</div>
                  <div><strong>Time Slot:</strong> {formData.timeSlot}</div>
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
                    You'll receive an email/SMS confirmation once verified
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
    <section id="booking" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Book a{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Video Call With Me
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and get ready for an amazing conversation experience with me.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft hover:shadow-glow transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Booking Details
                  </CardTitle>
                  <CardDescription>
                    Please provide your details to schedule your video call with me.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">
                        WhatsApp Number (Optional)
                      </Label>
                      <Input
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Select Package *</Label>
                        <Select value={formData.package} onValueChange={(value) => handleInputChange("package", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose your package" />
                          </SelectTrigger>
                          <SelectContent>
                            {packages.map((pkg) => (
                              <SelectItem key={pkg.id} value={pkg.id}>
                                {pkg.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          When would you like to call? *
                        </Label>
                        <Select value={formData.timeCategory} onValueChange={(value) => {
                          handleInputChange("timeCategory", value);
                          if (value === "now") {
                            handleInputChange("timeSlot", "Call NOW (Immediate)");
                          } else {
                            handleInputChange("timeSlot", "");
                          }
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose when to call" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot.id} value={slot.id}>
                                <div className="flex flex-col">
                                  <span className={`font-medium ${slot.id === "now" ? "text-green-600" : ""}`}>
                                    {slot.id === "now" && "⚡ "}{slot.label}
                                  </span>
                                  <span className="text-xs text-muted-foreground">{slot.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Show specific time slots when Today or Tomorrow is selected */}
                    {(formData.timeCategory === "today" || formData.timeCategory === "tomorrow") && (
                      <div className="space-y-2">
                        <Label>Select specific time slot</Label>
                        <Select value={formData.timeSlot} onValueChange={(value) => handleInputChange("timeSlot", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {(formData.timeCategory === "today" ? todaySlots : tomorrowSlots).map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Show custom time input when Custom is selected */}
                    {formData.timeCategory === "custom" && (
                      <div className="space-y-2">
                        <Label>Enter your preferred date and time</Label>
                        <Input
                          type="datetime-local"
                          value={formData.timeSlot}
                          onChange={(e) => handleInputChange("timeSlot", e.target.value)}
                          placeholder="Select date and time"
                        />
                      </div>
                    )}

                    {/* Show special message for Call NOW option */}
                    {formData.timeCategory === "now" && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                          <span className="text-lg">⚡</span>
                          <span className="text-sm font-medium">Ready for immediate call!</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          After payment, you'll receive a video call link within 5 minutes.
                        </p>
                      </div>
                    )}

                    {/* Dress selection for Custom Package */}
                    {formData.package === "custom" && (
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <span className="text-lg">👗</span>
                          Choose Your Preferred Dress *
                        </Label>
                        <Select value={formData.dressOption} onValueChange={(value) => handleInputChange("dressOption", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your preferred dress" />
                          </SelectTrigger>
                          <SelectContent>
                            {dressOptions.map((dress) => (
                              <SelectItem key={dress.id} value={dress.id}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{dress.name}</span>
                                  <span className="text-xs text-muted-foreground">{dress.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Special Requests (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Any specific topics you'd like to discuss or special requests..."
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.package && (
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <div className="font-medium">
                        {packages.find(p => p.id === formData.package)?.name}
                      </div>
                      {formData.timeCategory && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {formData.timeCategory === "now" ? "Call NOW (Immediate)" : 
                           formData.timeCategory === "today" ? "Today" :
                           formData.timeCategory === "tomorrow" ? "Tomorrow" : "Choose Your Time"}
                          {formData.timeSlot && formData.timeCategory !== "now" && (
                            <span className="block mt-1">at {formData.timeSlot}</span>
                          )}
                        </div>
                      )}
                      {formData.package === "custom" && formData.dressOption && (
                        <div className="text-sm text-muted-foreground mt-1">
                          <span className="block">👗 {dressOptions.find(d => d.id === formData.dressOption)?.name}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Secure payment processing
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Private video call link
                    </div>
                    <div className="flex items-center gap-2 text-purple-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      24/7 customer support
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-sm text-muted-foreground">Questions?</div>
                    <ContactSupportDialog />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};