import React from 'react'
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronRight, MapPin, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

// Define the animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function RecommendationCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const featuredDestinations = [
    {
      title: "Bali, Indonesia",
      description: "Experience the serene beaches and vibrant culture of Bali.",
      imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      location: "Bali, Indonesia",
      rating: 4.8,
      price: "$120",
      amenities: ["Free Wi-Fi", "Pool", "Breakfast"]
    },
    {
      title: "Santorini, Greece",
      description: "Discover the stunning sunsets and whitewashed buildings of Santorini.",
      imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      location: "Santorini, Greece",
      rating: 4.9,
      price: "$200",
      amenities: ["Free Wi-Fi", "Pool", "Breakfast"]
    },
    {
      title: "Kyoto, Japan",
      description: "Immerse yourself in the rich history and culture of Kyoto.",
      imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      location: "Kyoto, Japan",
      rating: 4.7,
      price: "$150",
      amenities: ["Free Wi-Fi", "Pool", "Breakfast"]
    }
  ];
  return (
    <>
      {/* Featured Destinations Section - Enhanced */}
      <motion.div 
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.7, delay: 1 }}
        className="relative z-10 px-4 md:px-8 pb-20 pt-4"
      >
        <div className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <div className="flex flex-col">
              <span>Popular Destinations</span>
              <span className="h-1 w-20 bg-gradient-to-r from-sky-400 to-blue-500 mt-2 rounded-full"></span>
            </div>
          </h2>
          <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl flex items-center gap-2 group">
            View all 
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredDestinations.map((destination, index) => (
            <motion.div 
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
              key={index} 
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 group hover:shadow-sky-500/20 transition-all duration-500"
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={destination.imageUrl} 
                  alt={destination.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/70"></div>
                <div className="absolute top-4 right-4 bg-sky-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  {destination.rating}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  {destination.location}
                </div>
                <div className="absolute bottom-4 right-4 bg-sky-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md">
                  {destination.price}/night
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors duration-300">{destination.title}</h3>
                <p className="text-gray-300 line-clamp-2 mb-4">{destination.description}</p>
                
                <div className="flex gap-2 mb-5">
                  {destination.amenities.map((amenity, i) => (
                    <span key={i} className="bg-white/5 text-xs text-white/80 px-2.5 py-1 rounded-md border border-white/10">
                      {amenity}
                    </span>
                  ))}
                </div>
                
                <Button className="w-full bg-gradient-to-r from-sky-500/80 to-blue-600/80 hover:from-sky-500 hover:to-blue-600 text-white border-none transition-all duration-300 group-hover:shadow-lg shadow-md py-5 rounded-xl">
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default RecommendationCard