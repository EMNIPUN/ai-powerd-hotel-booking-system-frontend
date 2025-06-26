import React, { useState } from 'react'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const frequentlyAskedQuestions = [
    {
      question: "How do I make a reservation?",
      answer: "You can make a reservation by selecting your destination, check-in and check-out dates, and the number of guests. Browse through the available hotels, select your preferred accommodation, and follow the booking process to confirm your reservation."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept major credit cards including Visa, MasterCard, American Express, and Discover. Some properties may also offer additional payment options during checkout."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking by accessing your account and navigating to the 'My Bookings' section. Please note that cancellation policies vary by property and rate type. Always check the specific terms and conditions before making changes."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and security protocols to protect your payment information. Your data is transmitted securely and we comply with all relevant data protection regulations."
    },
    {
      question: "How do I find the best deals?",
      answer: "To find the best deals, use our search filters, sort by price, and check our special offers section. Signing up for our newsletter will also keep you informed about exclusive promotions and discounts."
    },
    {
      question: "What if I need to check in late?",
      answer: "If you anticipate a late arrival, please contact the hotel directly using the contact information provided in your booking confirmation. Many hotels have 24-hour reception desks, but it's always best to inform them in advance."
    },
    {
      question: "Are there any hidden fees?",
      answer: "We strive for transparency in our pricing. All mandatory fees are included in the total price displayed during booking. Optional services or amenities may incur additional charges as indicated during the booking process."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team through the 'Contact Us' section on the help center page, by sending an email to support@hotelbooking.com, or by calling our 24/7 support line at +1-800-123-4567."
    }
  ]

  const filteredFAQs = searchQuery.length > 0
    ? frequentlyAskedQuestions.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : frequentlyAskedQuestions

  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How Can We Help You?</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to frequently asked questions, get in touch with our support team, or browse our help resources.
        </p>
        
        <div className="relative max-w-xl mx-auto mt-8">
          <Input
            type="text"
            placeholder="Search for answers..."
            className="pl-4 pr-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <Tabs defaultValue="faqs" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="faqs">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="guides">Booking Guides</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about our booking platform</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg text-muted-foreground">No results found. Try different keywords.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Our Support Team</CardTitle>
              <CardDescription>Get in touch with our customer service representatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Email Support</h3>
                      <p className="text-muted-foreground mb-2">For general inquiries and assistance</p>
                      <a href="mailto:support@hotelbooking.com" className="text-primary hover:underline">support@hotelbooking.com</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Phone Support</h3>
                      <p className="text-muted-foreground mb-2">Available 24/7 for urgent matters</p>
                      <a href="tel:+18001234567" className="text-primary hover:underline">+1 (800) 123-4567</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Live Chat</h3>
                      <p className="text-muted-foreground mb-2">Chat with our agents in real-time</p>
                      <Button variant="outline">Start Chat</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Send Us a Message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <Input id="email" type="email" placeholder="your.email@example.com" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                      <Input id="subject" placeholder="How can we help you?" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                      <textarea 
                        id="message" 
                        rows="4" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Please describe your issue or question in detail"
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full">Submit</Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle>Booking Guides</CardTitle>
              <CardDescription>Learn how to make the most of our hotel booking platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Creating and managing your account</li>
                      <li>How to search for accommodations</li>
                      <li>Understanding hotel ratings and reviews</li>
                      <li>Comparing different properties</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">Read Guide</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Making Reservations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Step-by-step booking process</li>
                      <li>Special requests and preferences</li>
                      <li>Group bookings and multi-room reservations</li>
                      <li>Understanding cancellation policies</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">Read Guide</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Payments & Billing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Understanding pricing and taxes</li>
                      <li>Payment methods and security</li>
                      <li>Requesting and managing invoices</li>
                      <li>Handling payment issues</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">Read Guide</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Managing Your Stay</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Check-in and check-out procedures</li>
                      <li>Modifying existing reservations</li>
                      <li>Requesting additional services</li>
                      <li>Post-stay reviews and feedback</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">Read Guide</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-muted rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-muted-foreground">Our customer support team is available 24/7 to assist you.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button variant="outline" className="min-w-[200px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat with us
          </Button>
          <Button className="min-w-[200px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Support
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HelpCenterPage
