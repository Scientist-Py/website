import gallery1 from "@/assets/shanaya.jpg";
import gallery2 from "@/assets/FB_IMG_1753773320559.jpg";
import gallery3 from "@/assets/🔥🪭.jpg";

export const GallerySection = () => {
  const images = [
    {
      src: gallery1,
      alt: "Shanaya in casual setting",
      caption: "Warm & Friendly Chats"
    },
    {
      src: gallery2,
      alt: "Shanaya professional look",
      caption: "Beautiful & Engaging"
    },
    {
      src: gallery3,
      alt: "Shanaya reading",
      caption: "Deep & Meaningful Talks"
    }
  ];

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A Glimpse of{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Shanaya's World
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the conversations - authentic, engaging, and always professional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-soft hover:shadow-glow transition-all duration-500 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                

              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full opacity-20 group-hover:opacity-60 transition-opacity animate-float" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-secondary rounded-full opacity-20 group-hover:opacity-60 transition-opacity animate-float" style={{ animationDelay: '1s' }} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg">
            "Every conversation is unique, just like every person I meet." - Shanaya
          </p>
        </div>
      </div>
    </section>
  );
};