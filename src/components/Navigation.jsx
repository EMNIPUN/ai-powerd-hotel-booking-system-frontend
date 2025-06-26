import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { 
  Globe, 
  Search, 
  Menu, 
  X, 
  Calendar, 
  MapPin, 
  Hotel, 
  Heart, 
  HelpCircle, 
  PhoneCall, 
  Bell,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Navigation() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }));

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-md'}`}>
      {/* Top bar with contact, support, etc. */}
      <div className="hidden lg:block bg-slate-800 text-white py-1.5">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center">
              <PhoneCall className="h-4 w-4 mr-1.5" />
              <span>Support: 1-800-TRAVEL-123</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Link to="/help" className="hover:text-sky-300 transition-colors flex items-center">
              <HelpCircle className="h-4 w-4 mr-1" /> Help Center
            </Link>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1.5" />
              <select className="bg-transparent border-none text-white text-sm focus:outline-none">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <SignedIn>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-7 px-2 text-white hover:bg-slate-700">
                    <Bell className="h-4 w-4 mr-1" /> 
                    <Badge className="h-5 w-5 flex items-center justify-center rounded-full bg-sky-500 text-[10px]">2</Badge>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-3 border-b">
                    <h3 className="font-medium">Notifications</h3>
                  </div>
                  <div className="divide-y max-h-[300px] overflow-auto">
                    <div className="p-3 hover:bg-slate-50">
                      <p className="text-sm font-medium">Your booking is confirmed!</p>
                      <p className="text-xs text-slate-500 mt-1">Grand Hotel Paris - Jul 15-18, 2025</p>
                    </div>
                    <div className="p-3 hover:bg-slate-50">
                      <p className="text-sm font-medium">Flash Sale: 25% off Premium Hotels</p>
                      <p className="text-xs text-slate-500 mt-1">Limited time offer - Ends tomorrow</p>
                    </div>
                  </div>
                  <div className="p-2 border-t text-center">
                    <Button variant="link" className="text-sm">View all notifications</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="border-b border-slate-200">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 mr-2 rounded-md flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600">
                <Hotel className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 to-blue-700 text-transparent bg-clip-text">
                TravelNest
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-10">
            <div className="relative max-w-xl w-full">
              {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search for destinations, hotels, or experiences..."
                className="w-full py-2 pl-10 pr-4 border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-sky-500 text-sm"
              /> */}
            </div>
          </div>

          {/* Desktop menu items */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors">
              Home
            </Link>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="px-3 py-2 h-auto text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50">
                  Destinations <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="center">
                <div className="grid grid-cols-1 gap-1 p-2">
                  <Button variant="ghost" asChild className="justify-start font-normal">
                    <Link to="/destinations/popular">Popular Destinations</Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start font-normal">
                    <Link to="/destinations/beach">Beach Resorts</Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start font-normal">
                    <Link to="/destinations/mountain">Mountain Retreats</Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start font-normal">
                    <Link to="/destinations/city">City Breaks</Link>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Link to="/hotels" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors">
              Hotels
            </Link>
            
            <Link to="/deals" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors flex items-center">
              Deals
              <Badge className="ml-1.5 bg-rose-500 hover:bg-rose-600">Hot</Badge>
            </Link>

            {user?.publicMetadata?.role === "admin" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="px-3 py-2 h-auto text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50">
                    Admin <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="center">
                  <div className="grid grid-cols-1 gap-1 p-2">
                    <Button variant="ghost" asChild className="justify-start font-normal">
                      <Link to="/admin/hotels/create">Create Hotel</Link>
                    </Button>
                    <Button variant="ghost" asChild className="justify-start font-normal">
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </Button>
                    <Button variant="ghost" asChild className="justify-start font-normal">
                      <Link to="/admin/bookings">Manage Bookings</Link>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-2">
            <SignedIn>
              <Link to="/favorites" className="hidden md:flex p-2 rounded-full text-slate-700 hover:bg-sky-50 hover:text-sky-600">
                <Heart className="h-5 w-5" />
              </Link>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <UserButton afterSignOutUrl="/" />
                    <div className="hidden md:block ml-2">
                      <p className="text-sm font-medium leading-tight">{user?.fullName?.split(' ')[0] || 'User'}</p>
                      <p className="text-xs text-slate-500 leading-tight">{user?.publicMetadata?.role || 'Member'}</p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <div className="p-2 border-b">
                    <p className="font-medium text-sm">{user?.fullName || 'User'}</p>
                    <p className="text-xs text-slate-500">{user?.primaryEmailAddress?.emailAddress}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-1 p-2">
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/account">My Account</Link>
                    </Button>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/account?tab=bookings">My Bookings</Link>
                    </Button>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/account?tab=rewards">Rewards</Link>
                    </Button>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/favorites">Saved Hotels</Link>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </SignedIn>
            
            <SignedOut>
              <Button variant="outline" asChild className="font-medium border-sky-500 text-sky-600 hover:bg-sky-50">
                <Link to="/sign-in">Log In</Link>
              </Button>
              <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>

            {/* Mobile menu button */}
            <Button variant="ghost" className="lg:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg absolute top-full left-0 right-0 z-50`}>
        <div className="p-4 divide-y divide-slate-100">
          <div className="py-3">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search hotels, destinations..."
                className="w-full py-2 pl-10 pr-4 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <Link to="/" className="block py-2 text-base font-medium text-slate-700 hover:text-sky-600" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/destinations/popular" className="block py-2 text-base font-medium text-slate-700 hover:text-sky-600" onClick={toggleMenu}>
              Popular Destinations
            </Link>
            <Link to="/hotels" className="block py-2 text-base font-medium text-slate-700 hover:text-sky-600" onClick={toggleMenu}>
              Hotels
            </Link>
            <Link to="/deals" className="flex py-2 text-base font-medium text-slate-700 hover:text-sky-600 items-center" onClick={toggleMenu}>
              Deals
              <Badge className="ml-2 bg-rose-500">Hot</Badge>
            </Link>
          </div>

          {user?.publicMetadata?.role === "admin" && (
            <div className="py-3">
              <p className="px-1 mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin</p>
              <Link to="/admin/hotels/create" className="block py-2 text-base font-medium text-slate-700 hover:text-sky-600" onClick={toggleMenu}>
                Create Hotel
              </Link>
              <Link to="/admin/dashboard" className="block py-2 text-base font-medium text-slate-700 hover:text-sky-600" onClick={toggleMenu}>
                Dashboard
              </Link>
              <Link to="/admin/bookings" className="block py-2 text-base font-medium text-slate-700 hover:text-sky-600" onClick={toggleMenu}>
                Manage Bookings
              </Link>
            </div>
          )}

          <SignedIn>
            <div className="py-3">
              <p className="px-1 mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Account</p>
              <Link to="/account" className="block py-2 text-base font-medium text-slate-700 hover:text-sky-600" onClick={toggleMenu}>
                My Account
              </Link>
              <Link to="/account?tab=bookings" className="block py-2 text-base font-medium text-slate-700 hover:text-sky-600" onClick={toggleMenu}>
                My Bookings
              </Link>
              <Link to="/favorites" className="block py-2 text-base font-medium text-slate-700 hover:text-sky-600" onClick={toggleMenu}>
                Saved Hotels
              </Link>
              <Link to="/account?tab=rewards" className="block py-2 text-base font-medium text-slate-700 hover:text-sky-600" onClick={toggleMenu}>
                Rewards & Points
              </Link>
            </div>
          </SignedIn>

          <div className="py-3">
            <Link to="/help" className="flex py-2 text-base font-medium text-slate-700 hover:text-sky-600 items-center" onClick={toggleMenu}>
              <HelpCircle className="h-5 w-5 mr-2" /> Help Center
            </Link>
            <div className="flex items-center py-2">
              <Globe className="h-5 w-5 mr-2 text-slate-700" />
              <select className="bg-transparent border-none text-slate-700 text-base font-medium focus:outline-none">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
