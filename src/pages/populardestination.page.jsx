import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, ArrowRight, TrendingUp, Calendar, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function PopularDestinationPage() {
  // Mock data for popular destinations
  const popularDestinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      description: "Experience the perfect blend of beaches, culture, and relaxation",
      image: "/assets/grid/215355701.jpg",
      rating: 4.8,
      price: "$120",
      trending: true,
      category: "beach"
    },
    {
      id: 2,
      name: "Paris, France",
      description: "Discover the city of lights, art, and romance",
      image: "/assets/grid/308797093.jpg",
      rating: 4.7,
      price: "$180",
      trending: true,
      category: "city"
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      description: "Explore the perfect blend of tradition and modernity",
      image: "/assets/grid/489672294.jpg",
      rating: 4.9,
      price: "$150",
      trending: false,
      category: "city"
    },
    {
      id: 4,
      name: "Santorini, Greece",
      description: "Experience stunning sunsets and beautiful white architecture",
      image: "/assets/hero/hero4.jpg",
      rating: 4.8,
      price: "$200",
      trending: true,
      category: "beach"
    },
    {
      id: 5,
      name: "New York, USA",
      description: "The city that never sleeps, full of excitement and energy",
      image: "/assets/hero/hero5.jpg",
      rating: 4.6,
      price: "$190",
      trending: false,
      category: "city"
    },
    {
      id: 6,
      name: "Swiss Alps",
      description: "Breathtaking mountain views and premium ski resorts",
      image: "/assets/hero/hero.jpg",
      rating: 4.7,
      price: "$220",
      trending: false,
      category: "mountain"
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Discover Popular Destinations
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore the world's most sought-after locations and find your next adventure
        </p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">50+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Popular Destinations</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">10K+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Happy Travelers</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">365</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Days of Adventure</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Tabs for filtering */}
      <Tabs defaultValue="all" className="mb-12">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="all">All Destinations</TabsTrigger>
            <TabsTrigger value="beach">Beach</TabsTrigger>
            <TabsTrigger value="city">City</TabsTrigger>
            <TabsTrigger value="mountain">Mountain</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map(destination => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="beach" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations
              .filter(destination => destination.category === 'beach')
              .map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="city" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations
              .filter(destination => destination.category === 'city')
              .map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="mountain" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations
              .filter(destination => destination.category === 'mountain')
              .map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations
              .filter(destination => destination.trending)
              .map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Featured Section */}
      <div className="mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Packages</h2>
          <Button variant="ghost" className="flex items-center gap-2">
            View all packages <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative h-[400px] rounded-2xl overflow-hidden group">
            <img 
              src="/assets/hero/hero_1.jpg" 
              alt="Luxury Beach Package" 
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-8 text-white">
              <Badge className="mb-4 w-fit bg-primary hover:bg-primary">Limited Offer</Badge>
              <h3 className="text-2xl font-bold mb-2">Luxury Beach Package</h3>
              <p className="mb-4 opacity-90">7 days of pure luxury and relaxation at top-rated beach destinations</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">$1,299</span>
                <Button size="sm" className="text-sm">View Details</Button>
              </div>
            </div>
          </div>
          
          <div className="relative h-[400px] rounded-2xl overflow-hidden group">
            <img 
              src="/assets/hero/6.jpg" 
              alt="Cultural City Tour" 
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-8 text-white">
              <Badge className="mb-4 w-fit bg-primary hover:bg-primary">Most Popular</Badge>
              <h3 className="text-2xl font-bold mb-2">Cultural City Tour</h3>
              <p className="mb-4 opacity-90">Experience the rich history and vibrant culture of iconic cities</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">$999</span>
                <Button size="sm" className="text-sm">View Details</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-24 bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and get exclusive deals on popular destinations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}

// Destination Card Component
function DestinationCard({ destination }) {
  return (
    <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {destination.trending && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
          <div className="flex items-center mb-2">
            <MapPin className="w-4 h-4 text-white opacity-90 mr-1" />
            <span className="text-sm text-white opacity-90">{destination.name.split(",")[1]?.trim()}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-medium text-white">{destination.rating}</span>
            </div>
            <span className="text-sm font-bold text-white">From {destination.price}/night</span>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button className="bg-white text-primary hover:bg-white/90">View Details</Button>
      </div>
    </div>
  );
}

export default PopularDestinationPage