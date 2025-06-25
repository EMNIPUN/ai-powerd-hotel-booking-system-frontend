import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, MapPin, Star, TrendingUp, Calendar, Users, Search, ChevronRight, DollarSign } from "lucide-react";
import { useDispatch } from "react-redux";
import { submit } from "@/lib/features/searchSlice";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  
  // Images for hero background carousel
  const heroImages = [
    '/assets/hero/hero5.jpg',
    '/assets/hero/hero_1.jpg',
    '/assets/hero/hero.jpg',
    '/assets/hero/hero4.jpg',
  ];
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Auto rotate background images
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    console.log(searchQuery);
    
    dispatch(submit(searchQuery));
  };
  
  // Featured destination cards data
  const featuredDestinations = [
    {
      title: "Mountain Retreat",
      description: "Peaceful getaway with stunning mountain views and luxury amenities surrounded by nature.",
      imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/297840629.jpg?k=d20e005d5404a7bea91cb5fe624842f72b27867139c5d65700ab7f69396026ce&o=&hp=1",
      rating: 4.8,
      location: "Swiss Alps",
      price: "$249",
      amenities: ["Spa", "Pool", "Restaurant"]
    },
    {
      title: "Beach Paradise",
      description: "Luxury beachfront villas with private access to crystal clear waters and white sand beaches.",
      imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/606303798.jpg?k=514943d0025704b27396faf82af167468d8b50b98f311668f206f79ca36cb53d&o=&hp=1",
      rating: 4.9,
      location: "Maldives",
      price: "$399",
      amenities: ["Private Beach", "Infinity Pool", "Water Sports"]
    },
    {
      title: "City Escape",
      description: "Urban luxury in the heart of downtown with panoramic skyline views and premium services.",
      imageUrl: "https://media.istockphoto.com/id/2089089465/photo/green-castle-on-mountain-heritance-kandalama-sri-lanka.jpg?s=612x612&w=0&k=20&c=uM7w7H3AdkmqAy7izW56Hs2sQ5uiA0WD6HVb5l9RCKk=",
      rating: 4.7,
      location: "New York",
      price: "$329",
      amenities: ["Rooftop Bar", "Gym", "Concierge"]
    }
  ];
  
  // Customer testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London, UK",
      text: "The AI recommendations were spot on! Found my dream vacation in seconds.",
      avatar: "https://i.pravatar.cc/100?img=1",
      rating: 5
    },
    {
      name: "Michael Chen",
      location: "Toronto, Canada",
      text: "Booking was incredibly smooth and the hotel exceeded all our expectations.",
      avatar: "https://i.pravatar.cc/100?img=3", 
      rating: 4
    },
    {
      name: "Olivia Rodriguez",
      location: "Sydney, Australia",
      text: "This service made our honeymoon planning so easy and stress-free!",
      avatar: "https://i.pravatar.cc/100?img=5",
      rating: 5
    }
  ];
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="relative left-5 h-[550px] w-[1450px] overflow-hidden rounded-md shadow-xl">
      {/* Background Image Carousel with Overlay */}
      {heroImages.map((image, index) => (
        <motion.div 
          key={index}
          className="absolute inset-0 bg-cover bg-center z-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: activeImage === index ? 1 : 0,
            scale: activeImage === index ? 1.05 : 1
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            scale: { duration: 4 }
          }}
          style={{ backgroundImage: `url('${image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        </motion.div>
      ))}
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-white justify-center px-4 md:px-8 pt-24 md:pt-10 pb-16">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <span className="px-2 py-1 bg-gradient-to-r from-sky-400/20 to-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-sky-300 border border-sky-500/30">
              AI-Powered Travel Experience
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-center leading-tight">
            Discover Your <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Perfect Stay</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-gradient-to-r from-sky-400/30 to-blue-500/30 -z-0 transform -rotate-1"></span>
            </span>
          </h1>
          
          <motion.p 
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl mb-10 md:mb-12 text-center max-w-3xl mx-auto text-gray-200/90 leading-relaxed"
          >
            Tell us your ideal vacation experience, and our AI will instantly find the 
            perfect accommodations tailored exactly to your preferences and desires.
          </motion.p>
        </motion.div>
        
        {/* Search Form - Enhanced Version */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="w-full max-w-4xl"
        >
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-5 shadow-xl border border-white/20">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="relative flex flex-col">
                <label htmlFor="search" className="text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  Describe your perfect stay
                </label>
                <div className="relative">
                  <Input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="E.g., Mountain resort with spa, close to hiking trails and peaceful surroundings..."
                    className="w-full bg-white/10 border-white/20 pl-5 pr-14 py-6 text-white placeholder:text-white/60 rounded-xl focus:ring-sky-500 focus:border-sky-400 h-[60px]"
                  />
                  <Button
                    type="submit"
                    className="absolute right-1.5 top-1.5 rounded-lg h-[48px] w-[48px] p-0 flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg hover:shadow-sky-500/30"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="bg-sky-500/20 rounded-lg p-2">
                      <Calendar className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Check-in / Check-out</p>
                      <p className="text-white font-medium">Select dates</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="bg-sky-500/20 rounded-lg p-2">
                      <Users className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Guests</p>
                      <p className="text-white font-medium">2 adults, 0 children</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="bg-sky-500/20 rounded-lg p-2">
                      <DollarSign className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Budget</p>
                      <p className="text-white font-medium">Any price</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
        </motion.div>
      
      
      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-5"></div>
      </div>
    </div>
  );
}