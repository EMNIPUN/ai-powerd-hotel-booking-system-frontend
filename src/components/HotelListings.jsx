import { useGetHotelsForSearchQueryQuery } from "@/lib/api";
import { useState, useEffect } from "react";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useSelector } from "react-redux";
import { ChevronDown, SortAsc, SortDesc, Search, MapPin, Filter, ArrowRight, Star, Grid, List, XCircle } from "lucide-react";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function HotelListings() {
  const searchValue = useSelector((state) => state.search.value);
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("default");
  const [viewMode, setViewMode] = useState(() => {
    // Try to get the saved view preference from localStorage
    const savedView = localStorage.getItem("hotelViewMode");
    return savedView === "list" ? "list" : "grid"; // Default to grid
  });
  const [filterPanelOpen, setFilterPanelOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [starRating, setStarRating] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const {
    data: hotels,
    isLoading,
    isError,
    error,
  } = useGetHotelsForSearchQueryQuery({
    query: searchValue,
  });

  const locations = ["ALL", "France", "Italy", "Australia", "Japan", "Sri Lanka", "Turkey", "USA", "Spain", "Germany", "Greece"];
  
  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };
  
  const toggleFilterPanel = () => {
    setFilterPanelOpen(!filterPanelOpen);
  };
  
  const toggleViewMode = () => {
    const newMode = viewMode === "grid" ? "list" : "grid";
    setViewMode(newMode);
    // Save the preference to localStorage
    try {
      localStorage.setItem("hotelViewMode", newMode);
    } catch (error) {
      console.error("Could not save view mode preference", error);
    }
  };
  
  const handlePriceRangeChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };
  
  const toggleMobileFilters = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };
  
  // Get min and max price from all hotels
  const maxPrice = hotels ? Math.max(...hotels.map(({hotel}) => hotel?.price || 0)) : 2000;
  
  // Get star ratings values
  const starRatingOptions = [5, 4, 3, 2, 1];

  // Filter hotels based on all criteria
  const filteredHotels = (hotels || []).filter(({hotel}) => {
    // Filter by location
    const locationMatch = 
      selectedLocation === "ALL" || 
      hotel.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    // Filter by price range
    const priceMatch = 
      hotel.price >= priceRange[0] && 
      hotel.price <= priceRange[1];
    
    // Filter by star rating (if star rating filter is active)
    const ratingMatch = 
      starRating === 0 || 
      Math.round(hotel.rating) >= starRating;
    
    return locationMatch && priceMatch && ratingMatch;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.hotel.price - b.hotel.price;
    } else if (sortOrder === "desc") {
      return b.hotel.price - a.hotel.price;
    }
    return 0;
  });



  const renderHotels = (hotels) => {
    if (hotels.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full text-center py-12 bg-slate-50 rounded-lg"
        >
          <Search className="mx-auto mb-3 text-slate-400" size={24} />
          <p className="text-slate-500">No hotels found matching your criteria.</p>
          <button 
            onClick={() => {
              setSelectedLocation("ALL");
              setPriceRange([0, 2000]);
              setStarRating(0);
              setSortOrder("default");
            }}
            className="mt-4 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm flex items-center gap-2 mx-auto"
          >
            <XCircle size={16} />
            Clear all filters
          </button>
        </motion.div>
      );
    }
    
    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {hotels
              .filter((h) => h?.hotel)
              .map(({ hotel, confidence }, index) => (
                <motion.div
                  key={hotel._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <HotelCard hotel={hotel} confidence={confidence} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {hotels
              .filter((h) => h?.hotel)
              .map(({ hotel, confidence }, index) => (
                <motion.div
                  key={hotel._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md transition-all hover:border-blue-200"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Image section */}
                    <div className="md:w-1/3 lg:w-1/4 relative">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        className="w-full h-52 md:h-64 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-3 rounded-full text-xs font-semibold">
                        {confidence > 0.8 ? "Best Match" : confidence > 0.6 ? "Great Match" : "Recommended"}
                      </div>
                    </div>
                    
                    {/* Content section */}
                    <div className="md:w-2/3 lg:w-3/4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold mb-1 hover:text-blue-600 transition-colors">
                              <a href={`/hotel/${hotel._id}`}>{hotel.name}</a>
                            </h3>
                            <p className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                              <MapPin size={14} className="text-blue-500" />
                              {hotel.location}
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div className="bg-blue-50 py-2 px-4 rounded-lg text-center">
                              <div className="font-bold text-xl text-blue-700">${hotel.price}</div>
                              <div className="text-xs text-gray-500">per night</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Feature highlights */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(() => {
                            // Generate some features based on the hotel name and price
                            const features = [];
                            
                            // Basic features almost all hotels have
                            features.push('Free WiFi');
                            
                            // Higher-priced hotels tend to have more amenities
                            if (hotel.price > 200) {
                              features.push('Breakfast included');
                              features.push('Pool');
                              features.push('Spa');
                            } else if (hotel.price > 100) {
                              features.push('Breakfast available');
                              // 50% chance of pool for mid-range hotels
                              if (hotel._id.charCodeAt(0) % 2 === 0) {
                                features.push('Pool');
                              }
                            }
                            
                            // Add AC based on location - generally warmer places have AC
                            const warmLocations = ['Australia', 'Sri Lanka', 'Turkey', 'Spain', 'Greece'];
                            if (warmLocations.some(loc => hotel.location.includes(loc))) {
                              features.push('AC');
                            }
                            
                            // Add parking based on hotel name
                            if (hotel._id.charCodeAt(1) % 2 === 0) {
                              features.push('Free parking');
                            }
                            
                            return features.map((feature, i) => (
                              <span key={i} className="bg-gray-100 text-gray-700 text-xs py-1 px-2 rounded-full">
                                {feature}
                              </span>
                            ));
                          })()}
                        </div>
                        
                        {/* Rating section */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < Math.round(hotel.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{hotel.rating.toFixed(1)}</span>
                          <span className="text-sm text-gray-500">
                            ({Math.floor(Math.random() * 200) + 50} reviews)
                          </span>
                        </div>
                        
                        {/* Description */}
                        <p className="line-clamp-3 text-sm text-gray-600 mb-4">{hotel.description}</p>
                        
                        {/* Mobile price - only shown on mobile */}
                        <div className="md:hidden flex justify-between items-center mb-4 mt-2">
                          <div className="font-bold text-xl">${hotel.price} <span className="text-xs font-normal text-gray-500">/ night</span></div>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mt-auto">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <motion.button 
                            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                            </svg>
                            Save
                          </motion.button>
                          <motion.button 
                            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            Reviews
                          </motion.button>
                          <motion.button 
                            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            Alert me
                          </motion.button>
                        </div>
                        
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => {
                              // Simple availability check simulation
                              alert(`${hotel.name} has rooms available for your selected dates!`);
                            }}
                            className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Check Availability
                          </motion.button>
                          <motion.a
                            href={`/hotel/${hotel._id}`} 
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            View Details <ArrowRight size={16} />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <section className="relative">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Loading skeleton for sidebar */}
          <aside className="hidden md:block md:w-1/4 lg:w-1/5 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
              <div className="h-6 bg-slate-200 rounded mb-4 animate-pulse"></div>
              <div className="h-40 bg-slate-100 rounded mb-6 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded mb-2 animate-pulse"></div>
              <div className="h-12 bg-slate-100 rounded mb-6 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded mb-2 animate-pulse"></div>
              <div className="h-20 bg-slate-100 rounded animate-pulse"></div>
            </div>
          </aside>
          
          {/* Loading skeleton for main content */}
          <div className="md:flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex justify-between">
                <div className="h-6 w-24 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-6 w-32 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Loading skeleton - conditionally render grid or list view skeleton */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-48 bg-slate-200 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-6 w-3/4 bg-slate-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-slate-100 rounded mb-3 animate-pulse"></div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="h-4 w-4 bg-slate-200 rounded-full animate-pulse"></div>
                        ))}
                      </div>
                      <div className="h-4 bg-slate-100 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 bg-slate-100 rounded mb-4 animate-pulse"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-6 w-16 bg-slate-200 rounded animate-pulse"></div>
                        <div className="h-8 w-24 bg-blue-100 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 lg:w-1/4">
                        <div className="h-52 bg-slate-200 rounded-lg animate-pulse"></div>
                      </div>
                      <div className="md:w-2/3 lg:w-3/4">
                        <div className="flex justify-between">
                          <div className="w-1/2">
                            <div className="h-7 w-3/4 bg-slate-200 rounded mb-2 animate-pulse"></div>
                            <div className="h-4 w-1/2 bg-slate-100 rounded mb-3 animate-pulse"></div>
                          </div>
                          <div className="hidden md:block">
                            <div className="h-16 w-24 bg-slate-200 rounded animate-pulse"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 mb-4">
                          {[1, 2, 3].map((j) => (
                            <div key={j} className="h-6 w-20 bg-slate-100 rounded-full animate-pulse"></div>
                          ))}
                        </div>
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, j) => (
                            <div key={j} className="h-4 w-4 bg-slate-200 rounded-full animate-pulse"></div>
                          ))}
                          <div className="h-4 w-12 bg-slate-100 rounded ml-2 animate-pulse"></div>
                        </div>
                        <div className="h-4 bg-slate-100 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 bg-slate-100 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 bg-slate-100 rounded mb-4 animate-pulse"></div>
                        <div className="flex justify-between items-center mt-6">
                          <div className="flex gap-2">
                            {[1, 2, 3].map((j) => (
                              <div key={j} className="h-8 w-20 bg-slate-100 rounded animate-pulse"></div>
                            ))}
                          </div>
                          <div className="h-10 w-32 bg-blue-100 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </div>
        </div>
        
        <Footer />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="relative">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar when error */}
          <aside className="hidden md:block md:w-1/4 lg:w-1/5 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter size={16} className="text-blue-500" />
                  Filters
                </h3>
              </div>
              
              {/* Destination filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <MapPin size={14} className="text-blue-500" />
                  Destinations
                </h4>
                <div className="flex flex-col gap-1.5">
                  {locations.map((location, i) => (
                    <button
                      key={i}
                      disabled
                      className="text-left text-sm py-1.5 px-2 rounded-md text-gray-400"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Disabled filters */}
              <div className="opacity-50 pointer-events-none">
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2">Price range</h4>
                  <div className="h-10 bg-slate-100 rounded"></div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Sort by price</h4>
                  <div className="flex flex-col gap-2">
                    <div className="h-8 bg-slate-100 rounded"></div>
                    <div className="h-8 bg-slate-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Error content */}
          <div className="md:flex-1">
            <div className="p-8 bg-red-50 rounded-xl border border-red-100 text-center">
              <div className="mb-4">
                <XCircle size={48} className="text-red-500 mx-auto" />
              </div>
              <p className="text-red-700 font-medium mb-2">
                {error?.message || "An error occurred while loading hotels."}
              </p>
              <p className="text-red-500 mb-6">
                Please try again or check your connection.
              </p>
              <button 
                className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm font-medium"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
        
        <Footer />
      </section>
    );
  }



  return (
    <section className="relative">
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2"> {/* Reduced from mb-4 */}
          Top trending hotels worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </motion.div>

      {/* Mobile filter toggle */}
      <div className="md:hidden mb-3"> {/* Reduced from mb-4 */}
        <button 
          onClick={toggleMobileFilters}
          className="w-full py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2"
        >
          <Filter size={18} />
          {mobileFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        {/* Filter sidebar - desktop version */}
        <motion.aside 
          className={`hidden md:block md:w-1/4 lg:w-1/5 flex-shrink-0 ${filterPanelOpen ? 'md:block' : 'md:hidden'}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sticky top-20">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter size={16} className="text-blue-500" />
                  Filters
                </h3>
                <button 
                  onClick={() => {
                    setSelectedLocation("ALL");
                    setPriceRange([0, maxPrice]);
                    setStarRating(0);
                    setSortOrder("default");
                  }} 
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              </div>
              
              {/* Destination filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <MapPin size={14} className="text-blue-500" />
                  Destinations
                </h4>
                <div className="flex flex-col gap-1.5">
                  {locations.map((location, i) => (
                    <button
                      key={i}
                      className={`text-left text-sm py-1 px-2 rounded-md transition-colors ${
                        selectedLocation === location 
                          ? "bg-blue-100 text-blue-800" 
                          : "hover:bg-slate-100"
                      }`}
                      onClick={() => handleSelectedLocation(location)}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price range filter */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-1">Price range</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
                <div className="px-1">
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="w-full mb-2 accent-blue-600"
                  />
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="w-full accent-blue-600"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1">
                    <input 
                      type="number" 
                      min={0} 
                      max={priceRange[1]} 
                      value={priceRange[0]} 
                      onChange={(e) => handlePriceRangeChange(e, 0)}
                      className="w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="flex-1">
                    <input 
                      type="number" 
                      min={priceRange[0]} 
                      max={maxPrice} 
                      value={priceRange[1]} 
                      onChange={(e) => handlePriceRangeChange(e, 1)}
                      className="w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Star rating filter */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-1">Star rating</h4>
                <div className="flex flex-col gap-1">
                  {starRatingOptions.map((rating) => (
                    <button
                      key={rating}
                      className={`flex items-center gap-1 text-sm py-1 px-2 rounded-md transition-colors ${
                        starRating === rating 
                          ? "bg-blue-100 text-blue-800" 
                          : "hover:bg-slate-100"
                      }`}
                      onClick={() => setStarRating(starRating === rating ? 0 : rating)}
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      {rating === 5 && <span className="ml-1">& up</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort options */}
              <div>
                <h4 className="text-sm font-semibold mb-1">Sort by price</h4>
                <div className="flex flex-col gap-1">
                  <button
                    className={`flex items-center gap-2 text-sm py-1 px-2 rounded-md transition-colors ${
                      sortOrder === "asc" ? "bg-blue-100 text-blue-800" : "hover:bg-slate-100"
                    }`}
                    onClick={() => handleSortChange(sortOrder === "asc" ? "default" : "asc")}
                  >
                    <SortAsc size={14} />
                    <span>Low to High</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 text-sm py-1 px-2 rounded-md transition-colors ${
                      sortOrder === "desc" ? "bg-blue-100 text-blue-800" : "hover:bg-slate-100"
                    }`}
                    onClick={() => handleSortChange(sortOrder === "desc" ? "default" : "desc")}
                  >
                    <SortDesc size={14} />
                    <span>High to Low</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
        
        {/* Mobile filters (slide in from left) */}
        <AnimatePresence>
          {mobileFilterOpen && (
            <motion.div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white h-full w-4/5 max-w-sm overflow-auto"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 20 }}
              >
                <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
                  <h3 className="font-bold flex items-center gap-2">
                    <Filter size={18} className="text-blue-500" />
                    Filters
                  </h3>
                  <button 
                    onClick={toggleMobileFilters}
                    className="p-2 hover:bg-slate-100 rounded-full"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
                
                <div className="p-4">
                  {/* Destination filter - mobile */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <MapPin size={14} className="text-blue-500" />
                      Destinations
                    </h4>
                    <div className="flex flex-col gap-1.5">
                      {locations.map((location, i) => (
                        <button
                          key={i}
                          className={`text-left text-sm py-1.5 px-2 rounded-md transition-colors ${
                            selectedLocation === location 
                              ? "bg-blue-100 text-blue-800" 
                              : "hover:bg-slate-100"
                          }`}
                          onClick={() => {
                            handleSelectedLocation(location);
                            toggleMobileFilters();
                          }}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price range filter - mobile */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2">Price range</h4>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                    <div className="px-1">
                      <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(e, 0)}
                        className="w-full mb-2 accent-blue-600"
                      />
                      <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e, 1)}
                        className="w-full accent-blue-600"
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1">
                        <input 
                          type="number" 
                          min={0} 
                          max={priceRange[1]} 
                          value={priceRange[0]} 
                          onChange={(e) => handlePriceRangeChange(e, 0)}
                          className="w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
                        />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="flex-1">
                        <input 
                          type="number" 
                          min={priceRange[0]} 
                          max={maxPrice} 
                          value={priceRange[1]} 
                          onChange={(e) => handlePriceRangeChange(e, 1)}
                          className="w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Star rating filter - mobile */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2">Star rating</h4>
                    <div className="flex flex-col gap-2">
                      {starRatingOptions.map((rating) => (
                        <button
                          key={rating}
                          className={`flex items-center gap-1 text-sm py-1.5 px-2 rounded-md transition-colors ${
                            starRating === rating 
                              ? "bg-blue-100 text-blue-800" 
                              : "hover:bg-slate-100"
                          }`}
                          onClick={() => setStarRating(starRating === rating ? 0 : rating)}
                        >
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          {rating === 5 && <span className="ml-1">& up</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort options - mobile */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Sort by price</h4>
                    <div className="flex flex-col gap-2">
                      <button
                        className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-md transition-colors ${
                          sortOrder === "asc" ? "bg-blue-100 text-blue-800" : "hover:bg-slate-100"
                        }`}
                        onClick={() => handleSortChange(sortOrder === "asc" ? "default" : "asc")}
                      >
                        <SortAsc size={14} />
                        <span>Low to High</span>
                      </button>
                      <button
                        className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-md transition-colors ${
                          sortOrder === "desc" ? "bg-blue-100 text-blue-800" : "hover:bg-slate-100"
                        }`}
                        onClick={() => handleSortChange(sortOrder === "desc" ? "default" : "desc")}
                      >
                        <SortDesc size={14} />
                        <span>High to Low</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex gap-3">
                    <button 
                      onClick={() => {
                        setSelectedLocation("ALL");
                        setPriceRange([0, maxPrice]);
                        setStarRating(0);
                        setSortOrder("default");
                      }}
                      className="flex-1 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                    >
                      Reset
                    </button>
                    <button 
                      onClick={toggleMobileFilters}
                      className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main content area */}
        <motion.div 
          className="md:flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Filter summary bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-3">{sortedHotels.length} hotels found</span>
                
                {/* Selected filters */}
                <div className="hidden md:flex gap-2 flex-wrap">
                  {selectedLocation !== "ALL" && (
                    <div className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <MapPin size={12} />
                      {selectedLocation}
                      <button onClick={() => setSelectedLocation("ALL")} className="ml-1 hover:text-blue-900">
                        <XCircle size={12} />
                      </button>
                    </div>
                  )}
                  
                  {starRating > 0 && (
                    <div className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Star size={12} />
                      {starRating}+ stars
                      <button onClick={() => setStarRating(0)} className="ml-1 hover:text-blue-900">
                        <XCircle size={12} />
                      </button>
                    </div>
                  )}
                  
                  {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                    <div className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      ${priceRange[0]} - ${priceRange[1]}
                      <button 
                        onClick={() => setPriceRange([0, maxPrice])} 
                        className="ml-1 hover:text-blue-900"
                      >
                        <XCircle size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Toggle filter panel on desktop */}
                <button 
                  onClick={toggleFilterPanel}
                  className="hidden md:flex items-center gap-1 text-sm py-1.5 px-3 rounded-md border border-slate-200 hover:bg-slate-50"
                >
                  <Filter size={16} />
                  {filterPanelOpen ? 'Hide filters' : 'Show filters'}
                </button>
                
                {/* Toggle view mode */}
                <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                  <button
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'hover:bg-slate-50'}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-slate-50'}`}
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hotels display */}
          {renderHotels(sortedHotels)}
          
          {/* Results count at the bottom */}
          {sortedHotels.length > 0 && (
            <motion.p 
              className="text-sm text-center text-slate-500 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Showing {sortedHotels.length} of {hotels?.length || 0} hotels
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
