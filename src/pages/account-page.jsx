import { SignedIn, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Navigate } from "react-router";
import { 
  User, 
  CreditCard, 
  Calendar, 
  Settings, 
  Heart, 
  LogOut, 
  Bell, 
  Shield, 
  HelpCircle,
  MapPin,
  Edit,
  BadgePercent,
  Tag,
  Wallet,
  UserCircle,
  Star,
  Gift,
  CheckCircle,
  MessageSquare,
  Clock,
  ChevronRight,
  AlertCircle,
  Phone,
  RefreshCw,
  Globe
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const AccountPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  
  // More detailed mock data
  const [rewards, setRewards] = useState({
    points: 2450,
    tier: "Silver",
    nextTier: "Gold",
    pointsToNextTier: 550
  });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  const bookings = [
    { 
      id: 1, 
      hotel: "Grand Hotel Paris", 
      location: "Paris, France", 
      date: "Jul 15-18, 2025", 
      status: "Upcoming", 
      price: "$450", 
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073",
      room: "Deluxe Room",
      guests: 2,
      confirmed: true,
      pointsEarned: 450
    },
    { 
      id: 2, 
      hotel: "Tokyo Luxury Suite", 
      location: "Tokyo, Japan", 
      date: "Aug 3-7, 2025", 
      status: "Upcoming", 
      price: "$720", 
      image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2036",
      room: "Executive Suite",
      guests: 2,
      confirmed: true,
      pointsEarned: 720
    },
    { 
      id: 3, 
      hotel: "Seaside Resort", 
      location: "Sydney, Australia", 
      date: "Feb 10-15, 2025", 
      status: "Completed", 
      price: "$890", 
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070",
      room: "Ocean View Suite",
      guests: 3,
      confirmed: true,
      pointsEarned: 890,
      review: 4
    },
    { 
      id: 4, 
      hotel: "Mountain Retreat Lodge", 
      location: "Aspen, USA", 
      date: "Jan 5-10, 2025", 
      status: "Completed", 
      price: "$1,250", 
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070",
      room: "Luxury Cabin",
      guests: 4,
      confirmed: true,
      pointsEarned: 1250,
      review: 5
    },
  ];
  
  const paymentMethods = [
    { id: 1, type: "Visa", last4: "4242", expiry: "09/2026", default: true },
    { id: 2, type: "Mastercard", last4: "8210", expiry: "03/2027", default: false }
  ];
  
  const notifications = [
    { id: 1, type: "Deal", title: "Flash Sale: 25% off on Premium Hotels", date: "1h ago", read: false },
    { id: 2, type: "Booking", title: "Your booking at Grand Hotel Paris is confirmed", date: "2d ago", read: true },
    { id: 3, type: "System", title: "Account security verification needed", date: "5d ago", read: false },
  ];

  return (
    <main className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen pb-16">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Account Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-9">
              <RefreshCw size={14} className="mr-2" /> Refresh
            </Button>
            <Button variant="outline" className="h-9">
              <HelpCircle size={14} className="mr-2" /> Help
            </Button>
          </div>
        </div>
        
        {/* User Profile Card and Stats */}
        <Card className="mb-8 bg-white/80 backdrop-blur">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row">
              <div className="flex items-center gap-5 p-6 lg:min-w-[320px] border-b lg:border-r lg:border-b-0 border-slate-100">
                <div className="w-20 h-20 rounded-full bg-white p-1 ring-2 ring-blue-100 flex-shrink-0">
                  {user?.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={user?.fullName || "User"} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                      <UserCircle size={40} className="text-blue-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-xl text-slate-800">{user?.fullName || "Guest User"}</h2>
                  <p className="text-slate-500">{user?.emailAddresses[0].emailAddress}</p>
                  <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-blue-600">{rewards.tier} Member</Badge>
                </div>
              </div>
              
              <div className="flex-1 p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-xs text-blue-700 font-medium uppercase">Total Stays</p>
                    <p className="text-2xl font-bold text-blue-800">{bookings.length}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg text-center">
                    <p className="text-xs text-emerald-700 font-medium uppercase">Reward Points</p>
                    <p className="text-2xl font-bold text-emerald-800">{rewards.points}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg text-center">
                    <p className="text-xs text-amber-700 font-medium uppercase">To Next Tier</p>
                    <p className="text-2xl font-bold text-amber-800">{rewards.pointsToNextTier}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <p className="text-xs text-purple-700 font-medium uppercase">Upcoming</p>
                    <p className="text-2xl font-bold text-purple-800">2</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">  
                <nav className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Main
                  </div>
                  <ul className="space-y-1 mb-4">
                    <li className="cursor-pointer" onClick={() => setActiveTab("profile")}>
                      <a className={`flex items-center justify-between p-3 rounded-lg ${activeTab === "profile" ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-700"}`}>
                        <div className="flex items-center space-x-3">
                          <User size={18} />
                          <span>Profile</span>
                        </div>
                        {activeTab === "profile" && <ChevronRight size={18} />}
                      </a>
                    </li>
                    <li className="cursor-pointer" onClick={() => setActiveTab("bookings")}>
                      <a className={`flex items-center justify-between p-3 rounded-lg ${activeTab === "bookings" ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-700"}`}>
                        <div className="flex items-center space-x-3">
                          <Calendar size={18} />
                          <span>My Bookings</span>
                        </div>
                        <Badge variant={activeTab !== "bookings" ? "outline" : undefined} className={activeTab !== "bookings" ? "bg-transparent text-slate-500" : ""}>
                          {bookings.filter(b => b.status === "Upcoming").length}
                        </Badge>
                      </a>
                    </li>
                    <li className="cursor-pointer" onClick={() => setActiveTab("rewards")}>
                      <a className={`flex items-center justify-between p-3 rounded-lg ${activeTab === "rewards" ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-700"}`}>
                        <div className="flex items-center space-x-3">
                          <BadgePercent size={18} />
                          <span>Rewards</span>
                        </div>
                        {activeTab === "rewards" && <ChevronRight size={18} />}
                      </a>
                    </li>
                  </ul>
                  
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Settings
                  </div>
                  <ul className="space-y-1 mb-4">
                    <li className="cursor-pointer" onClick={() => setActiveTab("payment")}>
                      <a className={`flex items-center justify-between p-3 rounded-lg ${activeTab === "payment" ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-700"}`}>
                        <div className="flex items-center space-x-3">
                          <CreditCard size={18} />
                          <span>Payment Methods</span>
                        </div>
                        {activeTab === "payment" && <ChevronRight size={18} />}
                      </a>
                    </li>
                    <li className="cursor-pointer" onClick={() => setActiveTab("favorites")}>
                      <a className={`flex items-center justify-between p-3 rounded-lg ${activeTab === "favorites" ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-700"}`}>
                        <div className="flex items-center space-x-3">
                          <Heart size={18} />
                          <span>Saved Hotels</span>
                        </div>
                        {activeTab === "favorites" && <ChevronRight size={18} />}
                      </a>
                    </li>
                    <li className="cursor-pointer" onClick={() => setActiveTab("notifications")}>
                      <a className={`flex items-center justify-between p-3 rounded-lg ${activeTab === "notifications" ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-700"}`}>
                        <div className="flex items-center space-x-3">
                          <Bell size={18} />
                          <span>Notifications</span>
                        </div>
                        <Badge variant={activeTab !== "notifications" ? "outline" : undefined} className={activeTab !== "notifications" ? "bg-transparent text-slate-500" : ""}>
                          {notifications.filter(n => !n.read).length}
                        </Badge>
                      </a>
                    </li>
                    <li className="cursor-pointer" onClick={() => setActiveTab("preferences")}>
                      <a className={`flex items-center justify-between p-3 rounded-lg ${activeTab === "preferences" ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-700"}`}>
                        <div className="flex items-center space-x-3">
                          <Settings size={18} />
                          <span>Preferences</span>
                        </div>
                        {activeTab === "preferences" && <ChevronRight size={18} />}
                      </a>
                    </li>
                  </ul>
                </nav>
                
                <div className="p-4 border-t border-slate-200">
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut size={18} className="mr-3" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Support Card */}
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-md">Need assistance?</CardTitle>
                <CardDescription>Our support team is here to help.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare size={16} className="mr-2" /> Chat Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone size={16} className="mr-2" /> Call Center
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Tab Content */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                  <div>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                    <CardDescription>Manage your personal details and preferences</CardDescription>
                  </div>
                  <Button className="h-9">
                    <Edit size={16} className="mr-2" /> Edit Profile
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm text-slate-500">Full Name</Label>
                        <div className="flex items-center h-10 mt-1">
                          <p className="font-medium">{user?.fullName || "Not provided"}</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-slate-500">Email Address</Label>
                        <div className="flex items-center gap-2 h-10 mt-1">
                          <p className="font-medium">{user?.emailAddresses[0].emailAddress}</p>
                          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">Verified</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-slate-500">Phone Number</Label>
                        <div className="flex items-center h-10 mt-1">
                          <p className="font-medium">{user?.phoneNumbers?.[0]?.phoneNumber || "Not provided"}</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-slate-500">Member Since</Label>
                        <div className="flex items-center h-10 mt-1">
                          <p className="font-medium">June 15, 2024</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm text-slate-500">Date of Birth</Label>
                        <div className="flex items-center h-10 mt-1">
                          <p className="font-medium">Not provided</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-slate-500">Address</Label>
                        <div className="flex items-center h-10 mt-1">
                          <p className="font-medium">Not provided</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-slate-500">Preferred Language</Label>
                        <div className="flex items-center h-10 mt-1">
                          <p className="font-medium">English</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-slate-500">Currency</Label>
                        <div className="flex items-center h-10 mt-1">
                          <p className="font-medium">USD ($)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="flex items-center text-sm text-slate-500">
                    <Shield size={16} className="mr-2" />
                    Your data is securely stored
                  </div>
                  <Button variant="outline">
                    <Globe size={16} className="mr-2" /> Privacy Settings
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Bookings Tab Content */}
            {activeTab === "bookings" && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <CardTitle className="text-xl">My Bookings</CardTitle>
                        <CardDescription>Manage your upcoming and past stays</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar size={16} className="mr-2" /> Calendar View
                        </Button>
                        <Button size="sm">
                          Book New Stay
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="upcoming" className="w-full">
                      <TabsList className="mb-4 grid w-full grid-cols-3">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                      </TabsList>
                      <TabsContent value="upcoming">
                        {bookings.filter(b => b.status === "Upcoming").length === 0 ? (
                          <div className="text-center py-10">
                            <Calendar className="mx-auto text-slate-300" size={48} />
                            <p className="mt-4 text-slate-500">You don't have any upcoming bookings</p>
                            <Button className="mt-4">
                              Explore Hotels
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {bookings.filter(b => b.status === "Upcoming").map(booking => (
                              <div key={booking.id} className="flex flex-col md:flex-row gap-4 border border-slate-200 rounded-lg overflow-hidden hover:border-blue-200 hover:shadow-md transition-all">
                                <div className="w-full md:w-1/4 h-[140px] md:h-auto">
                                  <img 
                                    src={booking.image} 
                                    alt={booking.hotel}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex flex-1 flex-col md:flex-row p-4 gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Badge className="bg-emerald-500">{booking.status}</Badge>
                                      {booking.confirmed && <Badge variant="outline" className="border-emerald-200 text-emerald-700">Confirmed</Badge>}
                                    </div>
                                    <h3 className="text-lg font-semibold">{booking.hotel}</h3>
                                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                                      <MapPin size={14} />
                                      <span>{booking.location}</span>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                      <div>
                                        <p className="text-slate-500">Check-in/out</p>
                                        <p className="font-medium">{booking.date}</p>
                                      </div>
                                      <div>
                                        <p className="text-slate-500">Room Type</p>
                                        <p className="font-medium">{booking.room}</p>
                                      </div>
                                      <div>
                                        <p className="text-slate-500">Guests</p>
                                        <p className="font-medium">{booking.guests} Adults</p>
                                      </div>
                                      <div>
                                        <p className="text-slate-500">Total Price</p>
                                        <p className="font-bold">{booking.price}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-row md:flex-col gap-2 justify-end items-start">
                                    <Button>Modify</Button>
                                    <Button variant="outline">View Details</Button>
                                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">Cancel</Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="completed">
                        <div className="space-y-4">
                          {bookings.filter(b => b.status === "Completed").map(booking => (
                            <div key={booking.id} className="flex flex-col md:flex-row gap-4 border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all">
                              <div className="w-full md:w-1/4 h-[140px] md:h-auto">
                                <img 
                                  src={booking.image} 
                                  alt={booking.hotel}
                                  className="w-full h-full object-cover opacity-90"
                                />
                              </div>
                              <div className="flex flex-1 flex-col md:flex-row p-4 gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="secondary">{booking.status}</Badge>
                                    {booking.review && (
                                      <div className="flex items-center text-amber-500">
                                        {[...Array(booking.review)].map((_, i) => (
                                          <Star key={i} fill="currentColor" size={14} />
                                        ))}
                                        <span className="ml-1 text-xs text-slate-600">Your Rating</span>
                                      </div>
                                    )}
                                  </div>
                                  <h3 className="text-lg font-semibold">{booking.hotel}</h3>
                                  <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                                    <MapPin size={14} />
                                    <span>{booking.location}</span>
                                  </div>
                                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                      <p className="text-slate-500">Stay Dates</p>
                                      <p className="font-medium">{booking.date}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-500">Room Type</p>
                                      <p className="font-medium">{booking.room}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-500">Points Earned</p>
                                      <p className="font-medium text-emerald-600">+{booking.pointsEarned} pts</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-500">Total Price</p>
                                      <p className="font-bold">{booking.price}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-row md:flex-col gap-2 justify-end items-start">
                                  <Button variant="outline">Download Invoice</Button>
                                  <Button variant="outline">Book Again</Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="cancelled">
                        <div className="text-center py-10">
                          <AlertCircle className="mx-auto text-slate-300" size={48} />
                          <p className="mt-4 text-slate-500">You don't have any cancelled bookings</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Rewards Tab Content */}
            {activeTab === "rewards" && (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between border-b">
                    <div>
                      <CardTitle className="text-xl">Rewards Program</CardTitle>
                      <CardDescription>Track your status and rewards</CardDescription>
                    </div>
                    <div className="flex items-center justify-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full">
                      <BadgePercent size={16} />
                      <span className="text-sm font-medium">{rewards.tier}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{rewards.tier} Member</span>
                        <span className="text-sm font-medium">{rewards.nextTier} Member</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-4">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full"
                          style={{ width: `${(rewards.points / (rewards.points + rewards.pointsToNextTier)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-slate-500">
                        <span>{rewards.points} points</span>
                        <span>{rewards.pointsToNextTier} points to {rewards.nextTier}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Available Benefits</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                              <CheckCircle size={18} className="text-green-600 mt-0.5" />
                              <span className="text-sm">10% discount on all bookings</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={18} className="text-green-600 mt-0.5" />
                              <span className="text-sm">Early check-in when available</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={18} className="text-green-600 mt-0.5" />
                              <span className="text-sm">Free room upgrades</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={18} className="text-green-600 mt-0.5" />
                              <span className="text-sm">Earn 1 point for each $1 spent</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Reward Redemptions</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="space-y-3">
                            <li className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Tag size={16} className="text-slate-600" />
                                <span className="text-sm">Free Night Stay</span>
                              </div>
                              <Badge variant="outline">10,000 pts</Badge>
                            </li>
                            <li className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Tag size={16} className="text-slate-600" />
                                <span className="text-sm">Airport Transfer</span>
                              </div>
                              <Badge variant="outline">3,500 pts</Badge>
                            </li>
                            <li className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Tag size={16} className="text-slate-600" />
                                <span className="text-sm">Spa Treatment</span>
                              </div>
                              <Badge variant="outline">5,000 pts</Badge>
                            </li>
                          </ul>
                          <Button className="w-full mt-4">Redeem Rewards</Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-md font-semibold mb-3">Upcoming Member Exclusive Deals</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-blue-100 bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center gap-2">
                            <Gift className="text-blue-600" size={20} />
                            <h4 className="font-medium text-blue-700">Summer Sale</h4>
                          </div>
                          <p className="text-sm text-slate-600 mt-2">Get 25% off premium suites at select locations. Exclusive for members!</p>
                          <p className="text-xs text-blue-600 mt-3">Valid until Aug 31, 2025</p>
                        </div>
                        <div className="border border-purple-100 bg-purple-50 rounded-lg p-4">
                          <div className="flex items-center gap-2">
                            <Gift className="text-purple-600" size={20} />
                            <h4 className="font-medium text-purple-700">Double Points</h4>
                          </div>
                          <p className="text-sm text-slate-600 mt-2">Earn double reward points on all bookings until end of month.</p>
                          <p className="text-xs text-purple-600 mt-3">Valid until Jun 30, 2025</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Payment Methods Tab Content */}
            {activeTab === "payment" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b">
                  <div>
                    <CardTitle className="text-xl">Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment options</CardDescription>
                  </div>
                  <Button>
                    <CreditCard size={16} className="mr-2" /> Add New
                  </Button>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <div key={method.id} 
                        className={`border ${method.default ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-slate-50'} 
                                   rounded-lg p-4 transition-all hover:border-blue-200`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <div className="flex items-center gap-3">
                              {method.type === "Visa" ? (
                                <div className="w-10 h-10 bg-white rounded flex items-center justify-center border border-slate-200">
                                  <span className="font-bold text-blue-800">VISA</span>
                                </div>
                              ) : (
                                <div className="w-10 h-10 bg-white rounded flex items-center justify-center border border-slate-200">
                                  <span className="font-bold text-red-500">MC</span>
                                </div>
                              )}
                              <div>
                                <span className="font-medium">{method.type} •••• {method.last4}</span>
                                {method.default && (
                                  <Badge className="ml-2 bg-blue-100 text-blue-700 border-none text-xs">Default</Badge>
                                )}
                                <p className="text-sm text-slate-500">Expires {method.expiry}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!method.default && (
                              <Button variant="outline" size="sm" className="text-xs h-8">
                                Set as Default
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="text-xs h-8">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs h-8">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border border-dashed border-slate-300 rounded-lg p-6 mt-4 text-center">
                    <CreditCard size={24} className="mx-auto text-slate-400 mb-2" />
                    <h3 className="font-medium text-slate-700">Add New Payment Method</h3>
                    <p className="text-sm text-slate-500 mt-1 mb-3">We accept all major credit cards and PayPal</p>
                    <Button>Add Payment Method</Button>
                  </div>
                  
                  <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2">
                      <Shield size={18} className="text-slate-500" />
                      <p className="text-sm text-slate-600">Your payment information is securely stored and encrypted</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Favorites Tab Content */}
            {activeTab === "favorites" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Saved Hotels</CardTitle>
                  <CardDescription>Hotels and properties you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                      <div className="relative h-40">
                        <img 
                          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" 
                          alt="Luxury Beachfront Resort" 
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500">
                          <Heart fill="currentColor" size={16} />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">Luxury Beachfront Resort</h3>
                        <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                          <MapPin size={14} />
                          <span>Maldives</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} fill="currentColor" size={14} />
                            ))}
                          </div>
                          <span className="text-sm ml-2">5.0 (324 reviews)</span>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <p className="font-bold">$350 <span className="text-sm font-normal text-slate-500">/night</span></p>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                      <div className="relative h-40">
                        <img 
                          src="https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=2070" 
                          alt="Mountain View Lodge" 
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500">
                          <Heart fill="currentColor" size={16} />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">Mountain View Lodge</h3>
                        <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                          <MapPin size={14} />
                          <span>Switzerland</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <div className="flex text-amber-400">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} fill="currentColor" size={14} />
                            ))}
                            <Star size={14} />
                          </div>
                          <span className="text-sm ml-2">4.0 (187 reviews)</span>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <p className="font-bold">$280 <span className="text-sm font-normal text-slate-500">/night</span></p>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <Button variant="outline">Browse More Hotels</Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Notifications Tab Content */}
            {activeTab === "notifications" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b">
                  <div>
                    <CardTitle className="text-xl">Notifications</CardTitle>
                    <CardDescription>Manage your alerts and notifications</CardDescription>
                  </div>
                  <Button variant="outline">
                    Mark All as Read
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'} hover:bg-slate-50 transition-colors duration-200`}
                      >
                        <div className="flex gap-3">
                          <div className={`p-2 rounded-full 
                            ${notification.type === 'Deal' ? 'bg-green-100 text-green-600' : 
                              notification.type === 'Booking' ? 'bg-blue-100 text-blue-600' : 
                              'bg-amber-100 text-amber-600'
                            }`}>
                            {notification.type === 'Deal' ? 
                              <Tag size={16} /> : 
                              notification.type === 'Booking' ? 
                              <Calendar size={16} /> : 
                              <AlertCircle size={16} />
                            }
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className={`font-medium ${notification.read ? 'text-slate-700' : 'text-slate-800'}`}>{notification.title}</h4>
                              <span className="text-xs text-slate-500">{notification.date}</span>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">
                              {notification.type === 'Deal' 
                                ? 'Limited time offer! Book now to save on your next stay.' 
                                : notification.type === 'Booking'
                                ? 'Your upcoming stay details have been confirmed. Check your email for details.'
                                : 'Please verify your account security settings to ensure your account is protected.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <h3 className="font-medium mb-3">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-slate-500">Receive booking confirmations and updates</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-slate-500">Get alerts about offers and promotions</p>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-slate-500">Receive text messages for urgent updates</p>
                      </div>
                      <Switch id="sms-notifications" />
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {/* Travel Preferences Tab Content */}
            {activeTab === "preferences" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Travel Preferences</CardTitle>
                  <CardDescription>Customize your travel and booking experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-slate-700">Preferred Room Type</Label>
                        <select className="w-full p-2 h-10 mt-1 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none">
                          <option>Standard Room</option>
                          <option>Deluxe Room</option>
                          <option>Suite</option>
                          <option>Family Room</option>
                          <option>Executive Suite</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-700">Bed Type</Label>
                        <select className="w-full p-2 h-10 mt-1 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none">
                          <option>King</option>
                          <option>Queen</option> 
                          <option>Twin</option>
                          <option>Double</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-700">Floor Preference</Label>
                        <select className="w-full p-2 h-10 mt-1 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none">
                          <option>No Preference</option>
                          <option>Low Floor</option>
                          <option>High Floor</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-slate-700">Preferred Currency</Label>
                        <select className="w-full p-2 h-10 mt-1 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                          <option>JPY (¥)</option>
                          <option>CAD ($)</option>
                          <option>AUD ($)</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-700">Accessibility Requirements</Label>
                        <select className="w-full p-2 h-10 mt-1 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none">
                          <option>None</option>
                          <option>Wheelchair Accessible</option>
                          <option>Hearing Accessible</option>
                          <option>Visual Accessible</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-700">Special Requests</Label>
                        <select className="w-full p-2 h-10 mt-1 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none">
                          <option>None</option>
                          <option>Early Check-in</option>
                          <option>Late Check-out</option>
                          <option>Extra Pillows</option>
                          <option>Non-smoking Room</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-medium mb-4">Amenity Preferences</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="wifi" className="h-4 w-4 border-slate-300 rounded" />
                        <Label htmlFor="wifi" className="text-sm font-normal">Free WiFi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="breakfast" className="h-4 w-4 border-slate-300 rounded" />
                        <Label htmlFor="breakfast" className="text-sm font-normal">Breakfast</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="pool" className="h-4 w-4 border-slate-300 rounded" />
                        <Label htmlFor="pool" className="text-sm font-normal">Swimming Pool</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="gym" className="h-4 w-4 border-slate-300 rounded" />
                        <Label htmlFor="gym" className="text-sm font-normal">Fitness Center</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="parking" className="h-4 w-4 border-slate-300 rounded" />
                        <Label htmlFor="parking" className="text-sm font-normal">Free Parking</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="spa" className="h-4 w-4 border-slate-300 rounded" />
                        <Label htmlFor="spa" className="text-sm font-normal">Spa Services</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="airport" className="h-4 w-4 border-slate-300 rounded" />
                        <Label htmlFor="airport" className="text-sm font-normal">Airport Transfer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="pets" className="h-4 w-4 border-slate-300 rounded" />
                        <Label htmlFor="pets" className="text-sm font-normal">Pet Friendly</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-end space-x-3">
                    <Button variant="outline">Reset Preferences</Button>
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;