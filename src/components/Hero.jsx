import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { submit } from "@/lib/features/searchSlice";

export default function Hero() {
  const dispatch = useDispatch();
  
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
      description: "Peaceful getaway with stunning views",
      imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/297840629.jpg?k=d20e005d5404a7bea91cb5fe624842f72b27867139c5d65700ab7f69396026ce&o=&hp=1",
      rating: 4.8
    },
    {
      title: "Beach Paradise",
      description: "Relax by crystal clear waters",
      imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/606303798.jpg?k=514943d0025704b27396faf82af167468d8b50b98f311668f206f79ca36cb53d&o=&hp=1",
      rating: 4.9
    },
    {
      title: "City Escape",
      description: "Urban luxury in the heart of downtown",
      imageUrl: "https://media.istockphoto.com/id/2089089465/photo/green-castle-on-mountain-heritance-kandalama-sri-lanka.jpg?s=612x612&w=0&k=20&c=uM7w7H3AdkmqAy7izW56Hs2sQ5uiA0WD6HVb5l9RCKk=",
      rating: 4.7
    }
  ];
  
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/api/placeholder/1920/1080')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/30"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-white justify-center px-4 md:px-8 pt-20 md:pt-32 pb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 text-center leading-tight">
          Find Your <span className="text-sky-400">Perfect</span> Staycation
        </h1>
        <p className="text-lg md:text-xl mb-8 md:mb-12 text-center max-w-2xl text-gray-100">
          Describe your dream destination and experience, and we'll find the
          perfect place for you.
        </p>
        
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-3xl bg-white/10 backdrop-blur-md shadow-lg lg:h-16 rounded-full p-2 flex items-center border border-white/20 transition-all hover:bg-white/15"
        >
          <Input
            type="text"
            name="search"
            placeholder="Describe your destination, experience, or hotel..."
            className="flex-grow bg-transparent lg:text-lg text-white placeholder:text-white/60 border-none outline-none focus:border-none focus:outline-none focus-visible:ring-0 px-6"
          />
          <Button
            type="submit"
            className="rounded-full w-32 md:w-48 flex items-center justify-center gap-x-2 lg:h-12 bg-black hover:bg-slate-800 text-white font-medium transition-all duration-300 shadow-md"
          >
            <Sparkles
              className="w-5 h-5 mr-2 animate-pulse text-sky-400"
            />
            <span className="md:text-lg">AI Search</span>
          </Button>
        </form>
        
        {/* Benefit tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm text-white/80">
          <span className="bg-white/10 px-4 py-2 rounded-full">Instant Results</span>
          <span className="bg-white/10 px-4 py-2 rounded-full">Personalized Matches</span>
          <span className="bg-white/10 px-4 py-2 rounded-full">Best Deals</span>
        </div>
      </div>
      
      {/* Featured Destinations Cards */}
      <div className="relative z-10 px-4 md:px-8 pb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Popular Destinations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredDestinations.map((destination, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10 transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="relative">
                <img 
                  src={destination.imageUrl} 
                  alt={destination.title}
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute top-3 right-3 bg-sky-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                  {destination.rating}★
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{destination.title}</h3>
                <p className="text-gray-300">{destination.description}</p>
                <Button className="mt-4 w-full bg-sky-500 hover:bg-sky-400 text-white">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}