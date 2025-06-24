import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateBookingMutation, useGetHotelByIdQuery } from "@/lib/api";
import {
  Coffee,
  MapPin,
  MenuIcon as Restaurant,
  Star,
  Tv,
  Wifi,
  Heart,
  ArrowLeft,
  Check,
  Loader2,
  Globe,
  Timer,
  Utensils,
  Phone,
  Mail,
  Calendar,
  User,
} from "lucide-react";

import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingDialog } from "@/components/BookingDialog";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function HotelPage() {
  const { id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(id);
  const [createBooking, { isLoading: isCreateBookingLoading }] =
    useCreateBookingMutation();
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  const handleBook = async (bookingData) => {
    try {
      const booking = await createBooking(bookingData).unwrap();
      navigate(`/booking/payment?bookingId=${booking._id}`);
      toast.success("Booking successful");
    } catch (error) {
      console.log(error);
      toast.error("Booking failed");
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="w-full h-[500px] rounded-xl" />
              <div className="flex space-x-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-28" />
              </div>
            </div>
            <div className="space-y-6">
              <Card className="border shadow-md">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-center">
                        <Skeleton className="h-5 w-5 mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );

  if (isError) return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="bg-red-50 p-8 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Something went wrong</h2>
        <p className="text-red-600 mb-6">{error?.message || "Failed to load hotel details"}</p>
        <Button onClick={() => navigate(-1)} variant="outline" className="mx-auto">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hotels
        </Button>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              />
              <div className="absolute top-4 right-4">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className={`rounded-full ${isFavorite ? 'bg-white' : 'bg-white/80 backdrop-blur-sm hover:bg-white'}`}
                  onClick={toggleFavorite}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-rose-500'}`} />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {['Rooftop View', 'French Cuisine', 'City Center'].map((feature, index) => (
                  <Badge key={index} variant="secondary" className="bg-black/60 text-white backdrop-blur-sm px-3 py-1">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h1 className="text-3xl font-bold mb-3">{hotel.name}</h1>
              
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                <p className="text-muted-foreground">{hotel.location}</p>
                <div className="ml-auto flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-bold">{hotel?.rating ?? "N/A"}</span>
                  <span className="text-sm">
                    ({hotel?.reviews?.toLocaleString() ?? "0"})
                  </span>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>
            </div>

            {/* New Tabs Section for Additional Content */}
            <Tabs defaultValue="overview" className="bg-white rounded-xl shadow-md">
              <TabsList className="grid grid-cols-3 p-0 rounded-t-xl">
                <TabsTrigger value="overview" className="rounded-none rounded-tl-xl py-3">Overview</TabsTrigger>
                <TabsTrigger value="amenities" className="rounded-none py-3">All Amenities</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none rounded-tr-xl py-3">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">About {hotel.name}</h3>
                  <p className="text-muted-foreground">
                    {hotel.name} offers a luxurious retreat in the heart of {hotel.location}. Our elegant rooms provide stunning city views and premium amenities for both business and leisure travelers.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <Timer className="h-5 w-5 text-primary mr-2" />
                      <div>
                        <p className="font-medium">Check-in/Check-out</p>
                        <p className="text-sm text-muted-foreground">3:00 PM / 11:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-primary mr-2" />
                      <div>
                        <p className="font-medium">Languages</p>
                        <p className="text-sm text-muted-foreground">English, French, Spanish</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold pt-4">Nearby Attractions</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Central Park (0.5 miles)</li>
                    <li>City Museum (0.8 miles)</li>
                    <li>Shopping District (0.3 miles)</li>
                    <li>Opera House (1.2 miles)</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="amenities" className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Room Features</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { icon: <Tv className="h-4 w-4" />, name: "Flat-screen TV" },
                        { icon: <Coffee className="h-4 w-4" />, name: "Coffee maker" },
                        { icon: <Wifi className="h-4 w-4" />, name: "Free WiFi" },
                        { icon: <User className="h-4 w-4" />, name: "Air conditioning" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="p-1 rounded-full bg-primary/10 text-primary mr-2">
                            {item.icon}
                          </div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold pt-2">Property Amenities</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { icon: <Restaurant className="h-4 w-4" />, name: "Restaurant" },
                        { icon: <Utensils className="h-4 w-4" />, name: "Breakfast Available" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="p-1 rounded-full bg-primary/10 text-primary mr-2">
                            {item.icon}
                          </div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Services</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { icon: <Check className="h-4 w-4" />, name: "24/7 Reception" },
                        { icon: <Check className="h-4 w-4" />, name: "Room Service" },
                        { icon: <Check className="h-4 w-4" />, name: "Laundry Service" },
                        { icon: <Check className="h-4 w-4" />, name: "Airport Shuttle" },
                        { icon: <Check className="h-4 w-4" />, name: "Concierge" },
                        { icon: <Check className="h-4 w-4" />, name: "Business Center" },
                        { icon: <Check className="h-4 w-4" />, name: "Tour Desk" },
                        { icon: <Check className="h-4 w-4" />, name: "Babysitting" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="text-green-500 mr-2">
                            {item.icon}
                          </div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Guest Reviews</h3>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {hotel?.rating ?? "N/A"} / 5
                    </Badge>
                  </div>
                  
                  {[
                    {
                      name: "Sarah M.",
                      date: "March 15, 2025",
                      rating: 5,
                      comment: "Beautiful hotel with excellent service. The staff was very attentive and the room was spotless. Would definitely stay here again!"
                    },
                    {
                      name: "John D.",
                      date: "February 28, 2025",
                      rating: 4,
                      comment: "Great location and comfortable rooms. The breakfast was delicious but the WiFi was a bit slow in some areas of the hotel."
                    },
                    {
                      name: "Emma L.",
                      date: "January 10, 2025",
                      rating: 5,
                      comment: "Exceptional experience from check-in to check-out. The rooftop restaurant offers amazing views of the city."
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    View All Reviews
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="border-0 shadow-md overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-3xl font-bold text-primary">${hotel.price}</p>
                    <p className="text-sm text-muted-foreground">per night</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Free cancellation up to 24h before check-in</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">No payment needed today</span>
                    </div>
                  </div>
                  
                  <BookingDialog
                    hotelName={hotel.name}
                    hotelId={id}
                    onSubmit={handleBook}
                    isLoading={isCreateBookingLoading}
                  >
                    <Button 
                      className="w-full font-medium" 
                      size="lg"
                      disabled={isCreateBookingLoading}
                    >
                      {isCreateBookingLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Book Now"
                      )}
                    </Button>
                  </BookingDialog>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Amenities</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-2 gap-y-4">
                  {[
                    { icon: <Wifi className="h-5 w-5" />, name: "Free Wi-Fi" },
                    { icon: <Restaurant className="h-5 w-5" />, name: "Restaurant" },
                    { icon: <Tv className="h-5 w-5" />, name: "Flat-screen TV" },
                    { icon: <Coffee className="h-5 w-5" />, name: "Coffee maker" }
                  ].map((amenity, index) => (
                    <div key={index} className="flex items-center group">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3 group-hover:bg-primary group-hover:text-white transition-colors">
                        {amenity.icon}
                      </div>
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* New Card for Availability */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Check Availability</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Check-in</label>
                      <div className="flex items-center border rounded-md p-2">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">Select date</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Check-out</label>
                      <div className="flex items-center border rounded-md p-2">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">Select date</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Guests</label>
                    <div className="flex items-center border rounded-md p-2">
                      <User className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">2 Adults, 0 Children</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Check Availability
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* New Card for Contact Info */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">reservations@{hotel.name.toLowerCase().replace(/\s/g, '')}.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}