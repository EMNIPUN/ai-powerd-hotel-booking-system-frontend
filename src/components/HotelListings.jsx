import { useGetHotelsForSearchQueryQuery } from "@/lib/api";
import { useState } from "react";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useSelector } from "react-redux";
import { ChevronDown, SortAsc, SortDesc, Search, MapPin, Filter, ArrowRight } from "lucide-react";
import Footer from "./Footer";

export default function HotelListings() {
  const searchValue = useSelector((state) => state.search.value);
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("default");
  
  const {
    data: hotels,
    isLoading,
    isError,
    error,
  } = useGetHotelsForSearchQueryQuery({
    query: searchValue,
  });

  const locations = ["ALL", "France", "Italy", "Australia", "Japan", "Sri Lanaka", "Turkey", "USA", "Spain", "Germany", "Greece"];
  
  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
    setPage(1); 
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setPage(1);
  };

  const filteredHotels =
    selectedLocation === "ALL"
      ? hotels || []
      : (hotels || []).filter(({hotel}) => {
          return hotel.location
            .toLowerCase()
            .includes(selectedLocation.toLowerCase());
    });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.hotel.price - b.hotel.price;
    } else if (sortOrder === "desc") {
      return b.hotel.price - a.hotel.price;
    }
    return 0; // Default order
  });



  const renderHotelGrid = (hotels) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {hotels.length === 0 ? (
          <p className="text-slate-500 col-span-full text-center py-12 bg-slate-50 rounded-lg">
            <Search className="mx-auto mb-3 text-slate-400" size={24} />
            No hotels found matching your criteria.
          </p>
        ) : (
          hotels.map(({ hotel, confidence }) => (
            <HotelCard key={hotel._id} hotel={hotel} confidence={confidence} />
          ))
        )}
      </div>  
    );
  };

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center gap-x-4 overflow-x-auto pb-2">
            {locations.map((location, i) => (
              <LocationTab
                key={i}
                selectedLocation={selectedLocation}
                name={location}
                onClick={handleSelectedLocation}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by price:</span>
            <div className="flex bg-slate-100 rounded-lg">
              <button className="px-3 py-2 rounded-l-lg flex items-center gap-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <SortAsc size={16} />
                <span>Loading...</span>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-slate-100 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
        
        <Footer />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

          <div className="flex items-center gap-x-4 overflow-x-auto pb-2">
            {locations.map((location, i) => (
              <LocationTab
                key={i}
                selectedLocation={selectedLocation}
                name={location}
                onClick={handleSelectedLocation}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by price:</span>
            <div className="flex bg-slate-100 rounded-lg">
              <button
                className={`px-3 py-2 rounded-l-lg flex items-center gap-1 text-sm ${
                  sortOrder === "asc" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleSortChange("asc")}
              >
                <SortAsc size={16} />
                <span>Low to High</span>
              </button>
              <button
                className={`px-3 py-2 rounded-r-lg flex items-center gap-1 text-sm ${
                  sortOrder === "desc" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleSortChange("desc")}
              >
                <SortDesc size={16} />
                <span>High to Low</span>
              </button>
            </div>
          </div>
        </div>


        <div className="p-8 bg-red-50 rounded-lg border border-red-100 text-center">
          <p className="text-red-500 font-medium">
            {error?.message || "An error occurred while loading hotels."}
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
        
        <Footer />
      </section>
    );
  }



  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top trending hotels worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-blue-500" />
              <span className="text-sm font-semibold">Destinations</span>
            </div>
            <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
              {locations.map((location, i) => (
                <LocationTab
                  key={i}
                  selectedLocation={selectedLocation}
                  name={location}
                  onClick={handleSelectedLocation}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter size={16} className="text-blue-500" />
              <span className="text-sm font-semibold">Sort options</span>
            </div>
            <div className="flex bg-slate-50 rounded-lg shadow-sm">
              <button
                className={`px-3 py-2 rounded-l-lg flex items-center gap-1 text-sm ${
                  sortOrder === "asc" ? "bg-blue-500 text-white" : "hover:bg-slate-100"
                }`}
                onClick={() => handleSortChange("asc")}
              >
                <SortAsc size={16} />
                <span>Low to High</span>
              </button>
              <button
                className={`px-3 py-2 rounded-r-lg flex items-center gap-1 text-sm ${
                  sortOrder === "desc" ? "bg-blue-500 text-white" : "hover:bg-slate-100"
                }`}
                onClick={() => handleSortChange("desc")}
              >
                <SortDesc size={16} />
                <span>High to Low</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {renderHotelGrid(sortedHotels)}
      
      
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Featured destinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Paris, France', 'Rome, Italy', 'Tokyo, Japan', 'Sydney, Australia'].map((destination, index) => (
            <div key={index} className="bg-slate-100 rounded-lg overflow-hidden shadow-sm group relative cursor-pointer">
              <div className="h-40 bg-slate-200">
                <img
                  src={`https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?ga=GA1.1.354948533.1732556959&semt=ais_hybrid`}
                  alt={destination}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{destination}</h4>
                  <p className="text-sm text-slate-500">Explore top hotels</p>
                </div>
                <div className="bg-white rounded-full p-2 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </section>
  );
}
