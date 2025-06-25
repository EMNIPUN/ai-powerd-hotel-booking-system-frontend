import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';

function HotelMarQueue({ title = "Featured Hotels", subtitle = "Discover our handpicked luxury accommodations" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured hotels or use sample data
    // In a real application, you would fetch this data from your API
    const fetchFeaturedHotels = async () => {
      try {
        // Mock data for demonstration purposes
        // Replace this with actual API call in production
        const mockHotels = [
          {
            _id: "1",
            name: "Grand Palace Resort",
            location: "France",
            image: "/assets/hero/hero_1.jpg",
            rating: 4.9,
            reviews: 432,
            price: 299,
            description: "Experience luxury in the heart of Paris",
            featured: true
          },
          {
            _id: "2",
            name: "Azure Beach Hotel",
            location: "Italy",
            image: "/assets/grid/215355701.jpg",
            rating: 4.8,
            reviews: 317,
            price: 249,
            description: "Beachfront paradise with breathtaking views",
            featured: true
          },
          {
            _id: "3",
            name: "Mountain Retreat Lodge",
            location: "Switzerland",
            image: "/assets/grid/308797093.jpg",
            rating: 4.7,
            reviews: 285,
            price: 329,
            description: "Escape to the tranquility of the mountains",
            featured: true
          },
          {
            _id: "4",
            name: "Riverside Boutique Hotel",
            location: "Japan",
            image: "/assets/grid/489672294.jpg",
            rating: 4.8,
            reviews: 374,
            price: 279,
            description: "Modern luxury with traditional Japanese elements",
            featured: true
          }
        ];

        setHotels(mockHotels);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured hotels:", error);
        setLoading(false);
      }
    };

    fetchFeaturedHotels();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === hotels.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? hotels.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            {hotels.map((hotel) => (
              <div key={hotel._id} className="min-w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div className="relative h-[300px] md:h-[500px] overflow-hidden rounded-xl">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured</Badge>
                  </div>
                  <div className="flex flex-col justify-center space-y-6 p-4">
                    <h3 className="text-2xl md:text-3xl font-bold">{hotel.name}</h3>
                    
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{hotel.rating}</span>
                      <span className="text-muted-foreground">({hotel.reviews} reviews)</span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span>{hotel.location}</span>
                    </div>
                    
                    <p className="text-muted-foreground text-lg">{hotel.description}</p>
                    
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold">${hotel.price}</span>
                      <span className="text-muted-foreground">per night</span>
                    </div>
                    
                    <Link to={`/hotels/${hotel._id}`}>
                      <Button className="w-full md:w-auto">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
          onClick={prevSlide}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
          onClick={nextSlide}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
        
        <div className="mt-6 flex justify-center space-x-2">
          {hotels.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? "bg-primary" : "bg-muted"
              }`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HotelMarQueue;