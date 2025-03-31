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
  Edit
} from "lucide-react";

const AccountPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [activationSection, setActivationSection] = useState("profile");

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
    { id: 1, hotel: "Grand Hotel Paris", location: "Paris, France", date: "Apr 15-18, 2025", status: "Upcoming", price: "$450" },
    { id: 2, hotel: "Tokyo Luxury Suite", location: "Tokyo, Japan", date: "May 3-7, 2025", status: "Upcoming", price: "$720" },
    { id: 3, hotel: "Seaside Resort", location: "Sydney, Australia", date: "Feb 10-15, 2025", status: "Completed", price: "$890" }
  ];

  return (
    <main className="bg-slate-50 min-h-screen pb-16">

      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full bg-white p-1 flex-shrink-0">
                  {user?.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={user?.fullName || "User"} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-teal-100 flex items-center justify-center">
                      <UserCircle size={48} className="text-teal-700" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{user?.fullName || "Guest User"}</h2>
                  <p className="text-sm text-slate-500">{user?.emailAddresses[0].emailAddress}</p>
                </div>
              </div>
              
              <nav className="p-2">
                <ul className="space-y-1">
                  <li className="cursor-pointer" onClick={() => setActivationSection("profile")}>
                    <a className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-600">
                      <User size={18} />
                      <span>Profile</span>
                    </a>
                  </li>

                  <li className="cursor-pointer" onClick={() => setActivationSection("bookings")}>
                    <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
                      <Calendar size={18} />
                      <span>My Bookings</span>
                    </a>
                  </li>
                  <li className="cursor-pointer" onClick={() => setActivationSection("payment")}>
                    <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
                      <CreditCard size={18} />
                      <span>Payment Methods</span>
                    </a>
                  </li>
                  <li className="cursor-pointer" onClick={() => setActivationSection("saved")}>
                    <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
                      <Heart size={18} />
                      <span>Saved Hotels</span> 
                    </a>
                  </li>
                  <li className="cursor-pointer" id="notifications">
                    <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
                      <Bell size={18} />
                      <span>Notifications</span>
                    </a>
                  </li>
                  <li className="cursor-pointer" id="settings">
                    <a  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
                      <Settings size={18} />
                      <span>Settings</span>
                    </a>
                  </li>
                  <li className="cursor-pointer" id="help">
                    <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
                      <HelpCircle size={18} />
                      <span>Help Center</span>
                    </a>
                  </li>
                </ul>
              </nav>
              
              <div className="p-4 border-t border-slate-200">
                <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg text-slate-600 hover:bg-slate-50">
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">

            { activationSection === "profile" && (<section id="profile" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Full Name</label>
                      <p className="font-medium">{user?.fullName || "Not provided"}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Email Address</label>
                      <p className="font-medium">{user?.emailAddresses[0].emailAddress}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Phone Number</label>
                      <p className="font-medium">{user?.phoneNumbers?.[0]?.phoneNumber || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Date of Birth</label>
                      <p className="font-medium">Not provided</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Address</label>
                      <p className="font-medium">Not provided</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Preferred Language</label>
                      <p className="font-medium">English</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>)}

            {activationSection === "bookings" && (<section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold">Recent Bookings</h2>
              </div>
              <div className="p-6">
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto text-slate-300" size={48} />
                    <p className="mt-4 text-slate-500">You haven't made any bookings yet.</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                      Explore Hotels
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map(booking => (
                      <div key={booking.id} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold">{booking.hotel}</h3>
                            <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                              <MapPin size={14} />
                              <span>{booking.location}</span>
                            </div>
                            <p className="text-sm mt-2">{booking.date}</p>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                            <span className={`text-sm px-3 py-1 rounded-full ${
                              booking.status === "Upcoming" 
                                ? "bg-green-100 text-green-700" 
                                : "bg-blue-100 text-blue-700"
                            }`}>
                              {booking.status}
                            </span>
                            <span className="font-semibold">{booking.price}</span>
                          </div>
                        </div>
                        <div className="bg-slate-50 p-3 border-t border-slate-200 flex justify-end">
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-center mt-6">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-2">
                    <span>View all bookings</span>
                  </button>
                </div> 
              </div>
            </section>)}


            {activationSection === "payment" && (<section id="payment" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold">Payment Methods</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1 border rounded-lg p-4 bg-slate-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="text-slate-700" size={20} />
                          <span className="font-medium">Visa ending in 4242</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Expires 09/2026</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                        <button className="text-slate-600 hover:text-slate-800 text-sm">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2">
                  <span>Add Payment Method</span>
                </button>
              </div>
            </section>)}

            {activationSection === "saved" && (<section id="preferences" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold">Travel Preferences</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-2">Preferred Room Type</label>
                    <select className="w-full p-2 border border-slate-300 rounded-lg">
                      <option>Standard Room</option>
                      <option>Deluxe Room</option>
                      <option>Suite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-2">Bed Type</label>
                    <select className="w-full p-2 border border-slate-300 rounded-lg">
                      <option>King</option>
                      <option>Queen</option>
                      <option>Twin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-2">Preferred Currency</label>
                    <select className="w-full p-2 border border-slate-300 rounded-lg">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>JPY (¥)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                    Save Preferences
                  </button>
                </div>
              </div>
            </section>)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;