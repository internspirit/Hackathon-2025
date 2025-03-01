"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  FileText,
  Globe,
  HelpCircle,
  Home,
  Truck,
  MapPin,
  Check,
  FileCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type CustomHouseAgent = {
  id: string
  name: string
  logo: string
  specialties: string[]
  rating: number
  experience: string
  price: string
  location: string
  description: string
}

export default function ChaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Add mock CHA data
  const customHouseAgents: CustomHouseAgent[] = [
    {
      id: "cha-001",
      name: "Global Customs Solutions",
      logo: "/globe.svg",
      specialties: ["Textile Export", "EU Documentation", "Certificate of Origin"],
      rating: 4.9,
      experience: "15+ years",
      price: "$150-300 per shipment",
      location: "Mumbai, Delhi",
      description: "Specializes in textile and garment exports to EU and US markets. Expert in handling complex documentation requirements and compliance certifications."
    },
    {
      id: "cha-002",
      name: "Express Customs Clearance",
      logo: "/globe.svg",
      specialties: ["Food Products", "Health Certificates", "FDA Compliance"],
      rating: 4.7,
      experience: "12 years",
      price: "$120-250 per shipment",
      location: "Chennai, Kochi",
      description: "Focused on food product exports with expertise in health certificates, FDA compliance, and phytosanitary documentation."
    },
    {
      id: "cha-003",
      name: "Tech Export Facilitators",
      logo: "/globe.svg",
      specialties: ["Electronics", "Dual-Use Certificates", "BIS Certification"],
      rating: 4.8,
      experience: "10 years",
      price: "$180-350 per shipment",
      location: "Bangalore, Hyderabad",
      description: "Specialized in electronics and technology exports. Expert in handling dual-use certificates and technical compliance documentation."
    },
    {
      id: "cha-004",
      name: "Handicraft Export Specialists",
      logo: "/globe.svg",
      specialties: ["Handicrafts", "GI Certification", "Cultural Goods"],
      rating: 4.6,
      experience: "20+ years",
      price: "$100-200 per shipment",
      location: "Jaipur, Ahmedabad",
      description: "Focused on handicraft exports with expertise in geographical indication certificates and cultural goods documentation."
    }
  ];

  return (
    <div  className="flex min-h-screen bg-background">
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-muted/40 border-r transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b flex items-center justify-between">
        <Link href={'/'} className={`font-semibold text-lg ${!isSidebarOpen && "hidden"}`}>
            Exportrix
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="h-8 w-8"
          >
            {isSidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-panel-left-close"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <path d="M9 3v18" />
                <path d="m16 15-3-3 3-3" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-panel-left-open"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <path d="M9 3v18" />
                <path d="m14 9 3 3-3 3" />
              </svg>
            )}
          </Button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-5 w-5" />
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/cha"
                className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <FileCheck className="h-5 w-5" />
                {isSidebarOpen && <span>CHAs</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/logistics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Truck className="h-5 w-5" />
                {isSidebarOpen && <span>Logistics</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/rodtpe"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <FileText className="h-5 w-5" />
                {isSidebarOpen && <span>RoDTEP</span>}
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <BarChart3 className="h-5 w-5" />
                {isSidebarOpen && <span>Insights</span>}
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <HelpCircle className="h-5 w-5" />
                {isSidebarOpen && <span>Support</span>}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Globe className="h-4 w-4 text-primary" />
            </div>
            {isSidebarOpen && (
              <div>
                <p className="text-sm font-medium">Export Status</p>
                <p className="text-xs text-muted-foreground">
                  Ready for EU Markets
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="border-b bg-background p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Logistics Management</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Get Help
                </Button>
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium">MS</span>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            <div className="grid gap-6">

              <Tabs defaultValue="cha">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="cha">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Custom House Agents
                  </TabsTrigger>
                </TabsList>


                {/* Custom House Agents Tab */}
                <TabsContent value="cha" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom House Agents (CHAs)</CardTitle>
                      <CardDescription>Connect with specialized agents to handle your export documentation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="product-category">Product Category</Label>
                            <Select defaultValue="textiles">
                              <SelectTrigger id="product-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="textiles">Textiles & Garments</SelectItem>
                                <SelectItem value="electronics">Electronics</SelectItem>
                                <SelectItem value="food">Food Products</SelectItem>
                                <SelectItem value="handicrafts">Handicrafts</SelectItem>
                                <SelectItem value="jewelry">Jewelry</SelectItem>
                                <SelectItem value="leather">Leather Goods</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="destination-market">Destination Market</Label>
                            <Select defaultValue="eu">
                              <SelectTrigger id="destination-market">
                                <SelectValue placeholder="Select market" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="eu">European Union</SelectItem>
                                <SelectItem value="usa">United States</SelectItem>
                                <SelectItem value="uae">United Arab Emirates</SelectItem>
                                <SelectItem value="asia">Asia Pacific</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg mb-6">
                          <h3 className="text-sm font-medium mb-2">Required Documentation</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Commercial Invoice</p>
                                <p className="text-xs text-muted-foreground">Required for all exports</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Packing List</p>
                                <p className="text-xs text-muted-foreground">Required for all exports</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Certificate of Origin</p>
                                <p className="text-xs text-muted-foreground">Required for EU exports</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">REACH Compliance Certificate</p>
                                <p className="text-xs text-muted-foreground">Required for textile exports to EU</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-lg font-medium">Recommended Custom House Agents</h3>
                        {customHouseAgents.map((agent) => (
                          <div 
                            key={agent.id} 
                            className="flex flex-col md:flex-row items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-shrink-0 w-20 h-10 bg-muted rounded flex items-center justify-center">
                              <Image
                              height={40}
                              width={40}
                                src={agent.logo || "/globe.svg"}
                                alt={agent.name}
                                className="max-w-full max-h-full"
                              />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center flex-wrap gap-2">
                                <h4 className="font-medium">{agent.name}</h4>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.floor(agent.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                  <span className="ml-1 text-xs font-medium">{agent.rating.toFixed(1)}</span>
                                </div>
                                <Badge variant="outline" className="ml-2">{agent.experience}</Badge>
                                <Badge variant="secondary" className="ml-auto">{agent.price}</Badge>
                              </div>

                              <p className="text-sm text-muted-foreground mt-2">{agent.description}</p>

                              <div className="mt-3">
                                <p className="text-sm font-medium">Specialties:</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {agent.specialties.map((specialty, index) => (
                                    <Badge key={index} variant="outline" className="bg-muted">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{agent.location}</span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                              <Button size="sm">Contact Agent</Button>
                              <Button size="sm" variant="outline">View Details</Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 border rounded-lg bg-muted/30">
                        <h3 className="text-sm font-medium mb-2">How Custom House Agents Help</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary mt-0.5" />
                            <span>Prepare and file all required export documentation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary mt-0.5" />
                            <span>Ensure compliance with destination country regulations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary mt-0.5" />
                            <span>Handle customs clearance and duty calculations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary mt-0.5" />
                            <span>Coordinate with shipping companies and freight forwarders</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary mt-0.5" />
                            <span>Provide guidance on product-specific certification requirements</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}