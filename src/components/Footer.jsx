import React from 'react'
import { ChevronDown, SortAsc, SortDesc, Search, MapPin, Filter, ArrowRight } from "lucide-react";

function Footer() {
    return (
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Our Story</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Team</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Safety Resource Center</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Community Guidelines</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Hotels</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Luxury Hotels</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Budget Hotels</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Beach Resorts</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Mountain Retreats</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Subscribe</h4>
            <p className="text-sm text-gray-600 mb-4">Get exclusive deals and travel inspiration</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm flex-grow"
              />
              <button className="bg-blue-500 text-white px-3 py-2 rounded-r-lg hover:bg-blue-600 transition-colors duration-200">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">© 2025 HotelBooking. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-500">Terms</a>
            <a href="#" className="text-gray-600 hover:text-blue-500">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-blue-500">Security</a>
            <a href="#" className="text-gray-600 hover:text-blue-500">Sitemap</a>
          </div>
        </div>
      </footer>
    );
  }

export default Footer