import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, ArrowRight, Waves, Umbrella, Sun, Sailboat, Heart, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

function BeachDestinationPage() {
  // Mock data for beach destinations
  const beachDestinations = [
    {
      id: 1,
      name: "Maldives",
      location: "South Asia",
      description: "Crystal clear waters, white sand beaches, and luxury overwater bungalows",
      image: "/assets/grid/215355701.jpg",
      rating: 4.9,
      price: "$300",
      popularity: "very-high",
      activities: ["Snorkeling", "Diving", "Spa"],
      bestTimeToVisit: "December to April"
    },
    {
      id: 2,
      name: "Bora Bora",
      location: "French Polynesia",
      description: "Stunning coral reefs and luxurious resorts on a volcanic island",
      image: "/assets/hero/hero4.jpg",
      rating: 4.8,
      price: "$420",
      popularity: "high",
      activities: ["Jet Skiing", "Hiking", "Paddleboarding"],
      bestTimeToVisit: "May to October"
    },
    {
      id: 3,
      name: "Tulum",
      location: "Mexico",
      description: "Ancient ruins overlooking turquoise Caribbean waters and white beaches",
      image: "/assets/grid/308797093.jpg",
      rating: 4.7,
      price: "$150",
      popularity: "high",
      activities: ["Cenote Diving", "Yoga", "Archeological Tours"],
      bestTimeToVisit: "November to April"
    },
    {
      id: 4,
      name: "Santorini",
      location: "Greece",
      description: "Volcanic beaches with black, red, and white sand against dramatic cliffs",
      image: "/assets/hero/hero.jpg",
      rating: 4.8,
      price: "$220",
      popularity: "very-high",
      activities: ["Wine Tasting", "Sailing", "Cliff Jumping"],
      bestTimeToVisit: "June to September"
    },
    {
      id: 5,
      name: "Phi Phi Islands",
      location: "Thailand",
      description: "Stunning limestone cliffs rising from turquoise waters and secluded beaches",
      image: "/assets/hero/hero5.jpg",
      rating: 4.6,
      price: "$110",
      popularity: "high",
      activities: ["Rock Climbing", "Kayaking", "Island Hopping"],
      bestTimeToVisit: "November to April"
    },
    {
      id: 6,
      name: "Seychelles",
      location: "East Africa",
      description: "Pristine beaches with giant granite boulders and rare wildlife",
      image: "/assets/grid/489672294.jpg",
      rating: 4.9,
      price: "$280",
      popularity: "medium",
      activities: ["Birdwatching", "Fishing", "Nature Walks"],
      bestTimeToVisit: "April to May, October to November"
    }
  ];

  // Beach activities with icons
  const beachActivities = [
    { name: "Snorkeling", icon: <Waves className="h-8 w-8 mb-2" /> },
    { name: "Surfing", icon: <Sailboat className="h-8 w-8 mb-2" /> },
    { name: "Sunbathing", icon: <Sun className="h-8 w-8 mb-2" /> },
    { name: "Beach Clubs", icon: <Umbrella className="h-8 w-8 mb-2" /> }
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent z-10"></div>
        <img 
          src="/assets/hero/hero4.jpg" 
          alt="Beautiful Beach Destination" 
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-16">
          <span className="text-blue-300 font-medium mb-2">Explore the World's</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 max-w-xl">
            Most Beautiful Beach Destinations
          </h1>
          <p className="text-lg text-white/90 max-w-lg mb-8">
            Discover pristine shorelines, crystal clear waters, and unforgettable beach experiences
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90">
              Explore Beaches
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              View Beach Activities
            </Button>
          </div>
        </div>
      </div>
      
      {/* Unique Beach Features */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose a Beach Getaway?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect combination of relaxation, adventure, and natural beauty
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beachActivities.map((activity, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center text-blue-600">
                  {activity.icon}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold text-xl mb-2">{activity.name}</h3>
                <p className="text-muted-foreground">
                  {activity.name === "Snorkeling" && "Explore vibrant coral reefs and underwater life"}
                  {activity.name === "Surfing" && "Ride the waves at some of the world's best surf spots"}
                  {activity.name === "Sunbathing" && "Relax on pristine white sand beaches in perfect weather"}
                  {activity.name === "Beach Clubs" && "Experience luxury beachfront entertainment and dining"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Beach Destinations Tabs - Filtered by Region */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Top Beach Destinations</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Best time to visit: May to September</span>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All Regions</TabsTrigger>
              <TabsTrigger value="asia">Asia</TabsTrigger>
              <TabsTrigger value="europe">Europe</TabsTrigger>
              <TabsTrigger value="americas">Americas</TabsTrigger>
              <TabsTrigger value="africa">Africa</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beachDestinations.map(beach => (
                <BeachCard key={beach.id} beach={beach} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="asia">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beachDestinations
                .filter(beach => ["Maldives", "Phi Phi Islands"].includes(beach.name))
                .map(beach => (
                  <BeachCard key={beach.id} beach={beach} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="europe">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beachDestinations
                .filter(beach => ["Santorini"].includes(beach.name))
                .map(beach => (
                  <BeachCard key={beach.id} beach={beach} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="americas">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beachDestinations
                .filter(beach => ["Tulum"].includes(beach.name))
                .map(beach => (
                  <BeachCard key={beach.id} beach={beach} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="africa">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beachDestinations
                .filter(beach => ["Seychelles"].includes(beach.name))
                .map(beach => (
                  <BeachCard key={beach.id} beach={beach} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Featured Beach Destination */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Featured Beach Resort</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-2xl overflow-hidden bg-white shadow-lg">
          <div className="lg:col-span-3 h-[400px] lg:h-auto overflow-hidden">
            <img 
              src="/assets/hero/hero_1.jpg" 
              alt="Luxury Beach Resort" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="lg:col-span-2 p-8 flex flex-col justify-center">
            <Badge className="w-fit mb-4">Premium Resort</Badge>
            <h3 className="text-2xl font-bold mb-2">Oceanic Paradise Resort & Spa</h3>
            <div className="flex items-center mb-4">
              <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-muted-foreground">Maldives, South Asia</span>
            </div>
            <div className="flex items-center mb-6">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-medium mr-1">5.0</span>
              <span className="text-muted-foreground">(128 reviews)</span>
            </div>
            
            <p className="mb-6 text-muted-foreground">
              Experience ultimate luxury with private overwater villas, infinity pools,
              gourmet dining, and exclusive access to pristine beaches and coral reefs.
            </p>
            
            <Separator className="mb-6" />
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Starting from</span>
                <span className="font-bold text-2xl">$580/night</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Availability</span>
                <span className="text-green-600 font-medium">Available</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button className="flex-1">Book Now</Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Beach Trip Planning */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Plan Your Perfect Beach Getaway</h2>
            <p className="text-muted-foreground mb-6">
              Our expert travel consultants will help you create the beach vacation of your dreams,
              tailored to your preferences and budget.
            </p>
            
            <ul className="space-y-3 mb-8">
              {["Personalized itineraries", "Local beach recommendations", "Water activity bookings", "Beachfront accommodations"].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="bg-blue-600 rounded-full p-0.5">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <Button size="lg">Contact a Beach Specialist</Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img 
                src="/assets/grid/215355701.jpg" 
                alt="Beach Planning 1" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden mt-8">
              <img 
                src="/assets/grid/308797093.jpg" 
                alt="Beach Planning 2" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img 
                src="/assets/grid/489672294.jpg" 
                alt="Beach Planning 3" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden mt-8">
              <img 
                src="/assets/hero/6.jpg" 
                alt="Beach Planning 4" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Beach Card Component
function BeachCard({ beach }) {
  // Function to determine the popularity badge color
  const getPopularityColor = (level) => {
    switch(level) {
      case 'very-high': return 'bg-red-500 hover:bg-red-500';
      case 'high': return 'bg-orange-500 hover:bg-orange-500';
      default: return 'bg-green-500 hover:bg-green-500';
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={beach.image}
            alt={beach.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        <Badge 
          className={`absolute top-3 right-3 ${getPopularityColor(beach.popularity)}`}
        >
          {beach.popularity === 'very-high' ? 'Very Popular' : 
           beach.popularity === 'high' ? 'Popular' : 'Hidden Gem'}
        </Badge>
      </div>
      
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{beach.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="font-medium">{beach.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{beach.location}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{beach.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {beach.activities.slice(0, 3).map((activity, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50">{activity}</Badge>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Best time to visit</p>
            <p className="text-sm font-medium">{beach.bestTimeToVisit}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-lg font-bold text-blue-700">{beach.price}<span className="text-xs font-normal">/night</span></p>
          </div>
        </div>
      </CardContent>
      
      <div className="px-6 pb-6">
        <Button className="w-full">View Details</Button>
      </div>
    </Card>
  );
}

export default BeachDestinationPage