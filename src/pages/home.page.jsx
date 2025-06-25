import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";
import HotelMarQueue from "@/components/HotelMarQueue";




const HomePage = () => {
  return (
    <main>
      <div className="h-auto">
        <Hero />
      </div>
      <div className="bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-md mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HotelListings />
        </div>
      </div>

      {/* Featured Hotels Marquee */}
      <div className="bg-background py-12">
        <HotelMarQueue 
          title="Luxury Featured Properties" 
          subtitle="Discover our handpicked collection of premium accommodations for your next getaway"
        />
      </div>

      <Footer />
    </main>
  )
}

export default HomePage
