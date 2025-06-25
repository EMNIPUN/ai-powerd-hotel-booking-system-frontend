import { useSearchParams } from "react-router";
import { useGetBookingByIdQuery } from "@/lib/api";
import CheckoutForm from "@/components/CheckoutForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CreditCard, Calendar, Clock, HelpCircle, ChevronRight, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [paymentStep, setPaymentStep] = useState(1);

  const { data: booking, isLoading: isBookingLoading } =
    useGetBookingByIdQuery(bookingId);

  if (isBookingLoading && !booking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3 text-lg">Loading your booking details...</span>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="rounded-full bg-red-100 p-3 mb-4">
          <HelpCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Booking Not Found</h2>
        <p className="text-gray-600 mb-4">We couldn't find the booking you're looking for.</p>
        <a href="/hotels" className="text-primary hover:underline flex items-center">
          Browse available hotels <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>
    );
  }

  // Format dates for display
  const checkInDate = booking.checkIn ? format(new Date(booking.checkIn), 'MMM dd, yyyy') : 'Not specified';
  const checkOutDate = booking.checkOut ? format(new Date(booking.checkOut), 'MMM dd, yyyy') : 'Not specified';
  
  // Calculate nights
  const nights = booking.checkIn && booking.checkOut 
    ? Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <main className="container mx-auto px-4 py-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold mb-8 text-center">Complete Your Payment</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Complete your payment securely</CardDescription>
              </CardHeader>
              <CardContent>
                <CheckoutForm bookingId={booking._id} />
              </CardContent>
              <CardFooter className="flex-col items-start border-t pt-4">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">All payments are secure and encrypted</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/visa-3-226460.png" alt="Visa" className="h-8" />
                  <img src="https://cdn.iconscout.com/icon/free/png-256/mastercard-6-226423.png" alt="Mastercard" className="h-8" />
                  <img src="https://cdn.iconscout.com/icon/free/png-256/amex-3-226304.png" alt="Amex" className="h-8" />
                  <img src="https://cdn.iconscout.com/icon/free/png-256/paypal-3-226455.png" alt="PayPal" className="h-8" />
                </div>
              </CardFooter>
            </Card>

            {/* Support Section */}
            <div className="mt-6 bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you're experiencing issues with your payment, our support team is ready to assist you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="text-primary text-sm hover:underline flex items-center">
                  <HelpCircle className="h-4 w-4 mr-1" /> FAQ
                </a>
                <a href="#" className="text-primary text-sm hover:underline flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {booking.hotel && (
                  <div className="flex gap-4 pb-4 border-b">
                    <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100">
                      {booking.hotel.images && booking.hotel.images[0] ? (
                        <img 
                          src={booking.hotel.images[0]} 
                          alt={booking.hotel.name} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{booking.hotel.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{booking.hotel.location}</p>
                      <div className="flex items-center text-yellow-500">
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i} className="text-lg">
                            {i < (booking.hotel.rating || 0) ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <p className="text-sm text-gray-600">{checkInDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Check-out</p>
                      <p className="text-sm text-gray-600">{checkOutDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-gray-600">{nights} {nights === 1 ? 'night' : 'nights'}</p>
                    </div>
                  </div>
                  {booking.guests && (
                    <div className="flex items-center">
                      <div className="h-5 w-5 mr-2 flex items-center justify-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Guests</p>
                        <p className="text-sm text-gray-600">{booking.guests} guests</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Room Rate</span>
                    <span className="text-sm font-medium">${booking.price?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Taxes & Fees</span>
                    <span className="text-sm font-medium">
                      ${((booking.price || 0) * 0.12).toFixed(2)}
                    </span>
                  </div>
                  {booking.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="text-sm">Discount</span>
                      <span className="text-sm font-medium">-${booking.discount?.toFixed(2) || '0.00'}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">
                      ${((booking.price || 0) + (booking.price || 0) * 0.12 - (booking.discount || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t flex-col items-start">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Free cancellation until 24 hours before check-in</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaymentPage;