import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Globe } from "lucide-react";
import { Link } from "react-router";

function Navigation() {
  const { user } = useUser();

  return (
    <nav className="sticky top-0 z-30 bg-white/70 backdrop-blur-md shadow-md flex items-center justify-between px-6 md:px-12 py-3 md:py-4 border-b border-slate-200">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-sky-600 hover:text-sky-700 transition-colors">
          TravelNest
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to={`/`} className="font-medium text-slate-700 hover:text-sky-600 transition-colors">
            Home
          </Link>
          {user?.publicMetadata?.role === "admin" && (
            <Link to={`/admin/hotels/create`} className="font-medium text-slate-700 hover:text-sky-600 transition-colors">
              Create Hotel
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="ghost" className="text-slate-700 hover:bg-sky-50">
          <Globe className="h-5 w-5 mr-2" />
          EN
        </Button>
        <SignedOut>
          <Button variant="outline" asChild className="font-medium border-sky-500 text-sky-600 hover:bg-sky-50">
            <Link to="/sign-in">Log In</Link>
          </Button>
          <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Button asChild className="font-medium text-sky-600 hover:bg-sky-50">
            <Link to="/account">My Account</Link>
          </Button>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
