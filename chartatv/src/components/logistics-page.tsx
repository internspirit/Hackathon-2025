"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  FileText,
  Globe,
  HelpCircle,
  Home,
  PlusCircle,
  Truck,
  Ship,
  Plane,
  Package,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  ChevronRight,
  Check,
  FileCheck,
  Train,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
import Image from "next/image"

type ShipmentStatus = "pending" | "in-transit" | "delivered" | "delayed"

type Shipment = {
  id: string
  trackingNumber: string
  destination: string
  carrier: string
  departureDate: string
  estimatedArrival: string
  status: ShipmentStatus
  product: string
  weight: string
}

type LogisticsProvider = {
  id: string
  name: string
  logo: string
  services: string[]
  rating: number
  specialties: string[]
}

export default function LogisticsPage() {
  const [shippingCostData, setShippingCostData] = useState<{
    country: string;
    transport_modes: {
      airway: {
        cost: string;
        estimated_time: string;
      };
      waterway: {
        cost: string;
        estimated_time: string;
      };
      railway: {
        cost: string;
        estimated_time: string;
      };
    };
  } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [productData, setProductData] = useState<{
    productName: string
    category: string
    dimensions: { length: string; width: string; height: string }
    origin:string;
    PriceData:{PriceData:{HSCODE:string,PriceData:[]}}
    weight:string
  } | null>(null)

  const gatherShippingData = () => {
    const origin = (document.getElementById("origin") as HTMLSelectElement)?.value || "india";
    const destination = (document.getElementById("destination-country") as HTMLSelectElement)?.value || "usa";
    const weight = (document.getElementById("shipping-weight") as HTMLInputElement)?.value || "1";
    
    const dimensions = {
      length: (document.querySelector("input[placeholder='Length']") as HTMLInputElement)?.value || "10",
      width: (document.querySelector("input[placeholder='Width']") as HTMLInputElement)?.value || "10",
      height: (document.querySelector("input[placeholder='Height']") as HTMLInputElement)?.value || "10",
    };
  
    const shippingType = (document.querySelector("input[name='shipping-type']:checked") as HTMLInputElement)?.value || "express";
  
    const additionalServices = {
      insurance: (document.getElementById("insurance") as HTMLInputElement)?.checked || false,
      tracking: (document.getElementById("tracking") as HTMLInputElement)?.checked || false,
      customs: (document.getElementById("customs") as HTMLInputElement)?.checked || false,
    };
  
    return { origin, destination, weight, dimensions, shippingType, additionalServices };
  };
  const handleShippingCalculation = async () => {
    const shippingData = gatherShippingData();
    console.log(shippingData)
    try {
      const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API || "";
     
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a well-structured JSON response that adheres to the following interface:
  
  interface TransportCost {
    country: string;
    transport_modes: {
      airway: {
        cost: string;
        estimated_time: string;
      };
      waterway: {
        cost: string;
        estimated_time: string;
      };
      railway: {
        cost: string;
        estimated_time: string;
      };
    };
  }
  
  Expected JSON Response:
  - A json with the estimated transportation costs and delivery times for the following transport modes **from india** to the destination country per kg rate:
    - **Airway**: Cost and estimated delivery time
    - **Waterway**: Cost and estimated delivery time
    - **Railway**: Cost and estimated delivery time
  
  Data to Analyze:
  ${JSON.stringify(shippingData)}
  
  Ensure the response is realistic, based on global logistics data, fuel costs, and distance-based estimations.`
                  }
                ]
              }
            ]
          })
        }
      );
  
      const data = await response.json();
      console.log("Freight Transport Costs:", data);
      let responseText = data.candidates[0].content.parts[0].text;

      // Remove the markdown code block indicators and 'json' if present
      responseText = responseText.replace(/^```json\s*/, "");
      responseText = responseText.replace(/```\s*$/, "");
      console.log(responseText);

      // Parse the JSON
    
        const parsedData = JSON.parse(responseText);
        setShippingCostData(parsedData);
    } catch (error) {
      console.error("Error fetching freight data:", error);
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("productData")
    if (data) {
      setProductData(JSON.parse(data))
    }
  }, [])

  // Mock shipments data
  const shipments: Shipment[] = [
    {
      id: "SH-001",
      trackingNumber: "TRK12345678",
      destination: "United States",
      carrier: "DHL Express",
      departureDate: "2023-10-15",
      estimatedArrival: "2023-10-20",
      status: "in-transit",
      product: "Textile Products",
      weight: "45 kg",
    },
    {
      id: "SH-002",
      trackingNumber: "TRK87654321",
      destination: "European Union",
      carrier: "FedEx International",
      departureDate: "2023-10-10",
      estimatedArrival: "2023-10-18",
      status: "delayed",
      product: "Handicrafts",
      weight: "32 kg",
    },
    {
      id: "SH-003",
      trackingNumber: "TRK23456789",
      destination: "Singapore",
      carrier: "UPS Worldwide",
      departureDate: "2023-10-05",
      estimatedArrival: "2023-10-12",
      status: "delivered",
      product: "Leather Goods",
      weight: "28 kg",
    },
    {
      id: "SH-004",
      trackingNumber: "TRK34567890",
      destination: "United Arab Emirates",
      carrier: "Shiprocket Global",
      departureDate: "2023-10-18",
      estimatedArrival: "2023-10-25",
      status: "pending",
      product: "Jewelry",
      weight: "5 kg",
    },
  ]

  // Mock logistics providers
  const logisticsProviders: LogisticsProvider[] = [
    {
      id: "lp-001",
      name: "DHL Express",
      logo: "/globe.svg",
      services: ["Air Freight", "Ocean Freight", "Customs Clearance", "Warehousing"],
      rating: 4.8,
      specialties: ["Fast Delivery", "Global Coverage", "Real-time Tracking"],
    },
    {
      id: "lp-002",
      name: "FedEx International",
      logo: "/globe.svg",
      services: ["Air Freight", "Express Delivery", "Customs Clearance", "Insurance"],
      rating: 4.7,
      specialties: ["Express Delivery", "Door-to-Door", "Insurance Options"],
    },
    {
      id: "lp-003",
      name: "UPS Worldwide",
      logo: "/globe.svg",
      services: ["Air Freight", "Ocean Freight", "Customs Clearance", "Supply Chain Solutions"],
      rating: 4.6,
      specialties: ["Reliable Delivery", "Integrated Solutions", "Global Network"],
    },
    {
      id: "lp-004",
      name: "Shiprocket Global",
      logo: "/globe.svg",
      services: ["Air Freight", "Ocean Freight", "Customs Assistance", "MSME Focused"],
      rating: 4.5,
      specialties: ["Cost-effective", "MSME Friendly", "Multiple Carrier Options"],
    },
  ]

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Pending
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            In Transit
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Delivered
          </Badge>
        )
      case "delayed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Delayed
          </Badge>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <FileCheck className="h-5 w-5" />
                {isSidebarOpen && <span>CHAs</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/logistics"
                className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:text-primary"
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">2 in transit, 1 pending</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7.2 days</div>
                    <p className="text-xs text-muted-foreground">-0.5 days from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Shipping Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,245</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-xs text-muted-foreground">+3% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="rates">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="rates">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Shipping Rates
                  </TabsTrigger>
                  <TabsTrigger value="shipments">
                    <Package className="h-4 w-4 mr-2" />
                    Shipments
                  </TabsTrigger>
                  <TabsTrigger value="providers">
                    <Truck className="h-4 w-4 mr-2" />
                    Logistics Providers
                  </TabsTrigger>
                  <TabsTrigger value="tracking">
                    <Globe className="h-4 w-4 mr-2" />
                    Shipment Tracking
                  </TabsTrigger>
                </TabsList>

                {/* Shipments Tab */}
                <TabsContent value="shipments" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle>Recent Shipments</CardTitle>
                          <CardDescription>Manage and track your export shipments</CardDescription>
                        </div>
                        <Button>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          New Shipment
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {shipments.map((shipment) => (
                          <div
                            key={shipment.id}
                            className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                {shipment.status === "in-transit" && <Truck className="h-5 w-5 text-primary" />}
                                {shipment.status === "pending" && <Clock className="h-5 w-5 text-primary" />}
                                {shipment.status === "delivered" && <Package className="h-5 w-5 text-primary" />}
                                {shipment.status === "delayed" && <Clock className="h-5 w-5 text-primary" />}
                              </div>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div>
                                <p className="text-sm font-medium">{shipment.product}</p>
                                <p className="text-xs text-muted-foreground">ID: {shipment.id}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{shipment.carrier}</p>
                                <p className="text-xs text-muted-foreground">Tracking: {shipment.trackingNumber}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{shipment.destination}</p>
                                <p className="text-xs text-muted-foreground">Weight: {shipment.weight}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">ETA: {shipment.estimatedArrival}</p>
                                <p className="text-xs text-muted-foreground">Departed: {shipment.departureDate}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 md:ml-auto">
                              {getStatusBadge(shipment.status)}
                              <Button variant="outline" size="sm">
                                Track
                              </Button>
                              <Button variant="ghost" size="icon">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Logistics Providers Tab */}
                <TabsContent value="providers" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Logistics Providers</CardTitle>
                      <CardDescription>Compare and select logistics partners for your exports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {logisticsProviders.map((provider) => (
                          <div
                            key={provider.id}
                            className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-shrink-0 w-20 h-10 bg-muted rounded flex items-center justify-center">
                              <Image
                              width={40}
                              height={40}
                                src={provider.logo || "/placeholder.svg"}
                                alt={provider.name}
                                className="max-w-full max-h-full"
                              />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center">
                                <h4 className="font-medium">{provider.name}</h4>
                                <div className="ml-2 flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.floor(provider.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                  <span className="ml-1 text-xs font-medium">{provider.rating.toFixed(1)}</span>
                                </div>
                              </div>

                              <div className="mt-2">
                                <p className="text-sm font-medium">Services:</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {provider.services.map((service, index) => (
                                    <Badge key={index} variant="outline" className="bg-muted">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="mt-2">
                                <p className="text-sm font-medium">Specialties:</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {provider.specialties.map((specialty, index) => (
                                    <span key={index} className="text-xs text-muted-foreground">
                                      {specialty}
                                      {index < provider.specialties.length - 1 ? " • " : ""}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                              <Button size="sm">Get Quote</Button>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Shipping Rates Tab */}
                <TabsContent value="rates" className="mt-6">
                  <Card>
                  <CardHeader>
                    <CardTitle>Shipping Rate Calculator</CardTitle>
                    <CardDescription>Calculate shipping costs for your export products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                      <Label htmlFor="origin">Origin Country</Label>
                      <Select defaultValue={productData?.origin}>
                        <SelectTrigger id="origin">
                        <SelectValue placeholder="Select origin" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="nepal">Nepal</SelectItem>
                        <SelectItem value="srilanka">Sri Lanka</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>

                      <div className="space-y-2">
                      <Label htmlFor="destination-country">Destination Country</Label>
                      <Select defaultValue={"usa"}>
                        <SelectTrigger id="destination-country">
                        <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="uae">United Arab Emirates</SelectItem>
                        <SelectItem value="singapore">Singapore</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>

                      <div className="space-y-2">
                      <Label htmlFor="shipping-weight">Package Weight (kg)</Label>
                      <Input id="shipping-weight" type="number" defaultValue={productData?.weight} />
                      </div>

                      <div className="space-y-2">
                      <Label>Package Dimensions (cm)</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <Input placeholder="Length" defaultValue={productData?.dimensions.length} />
                        <Input placeholder="Width" defaultValue={productData?.dimensions.width} />
                        <Input placeholder="Height" defaultValue={productData?.dimensions.height} />
                      </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                      <Label>Shipping Type</Label>
                      <RadioGroup defaultValue="express">
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express">Express (3-5 days)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">Standard (7-10 days)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="economy" id="economy" />
                        <Label htmlFor="economy">Economy (15-20 days)</Label>
                        </div>
                      </RadioGroup>
                      </div>

                      <div className="space-y-2">
                      <Label>Additional Services</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                        <input type="checkbox" id="insurance" className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="insurance">Shipping Insurance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <input type="checkbox" id="tracking" className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="tracking">Advanced Tracking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <input type="checkbox" id="customs" className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="customs">Customs Clearance Assistance</Label>
                        </div>
                      </div>
                      </div>

                      <div className="pt-4">
                      <Button className="w-full" onClick={() => handleShippingCalculation()}>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Calculate Shipping Cost
                      </Button>
                      </div>
                    </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                    <h3 className="text-lg font-medium">Estimated Shipping Costs</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Express</CardTitle>
                        <Plane className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold"> {shippingCostData?.transport_modes?.airway?.cost || "$0"}</div>
                        <p className="text-xs text-muted-foreground"> {shippingCostData?.transport_modes?.airway?.estimated_time || "Delivery: 3-5 days"}</p>
                      </CardContent>
                      </Card>

                      <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Standard</CardTitle>
                        <Train className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{shippingCostData?.transport_modes?.railway?.cost || "$0"}</div>
                        <p className="text-xs text-muted-foreground">{shippingCostData?.transport_modes?.railway?.estimated_time || "Delivery: 7-10 days"}</p>
                      </CardContent>
                      </Card>

                      <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Economy</CardTitle>
                        <Ship className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{shippingCostData?.transport_modes?.waterway?.cost || "$0"}</div>
                        <p className="text-xs text-muted-foreground">{shippingCostData?.transport_modes?.waterway?.estimated_time || "Delivery: 15-20 days"}</p>
                      </CardContent>
                      </Card>
                    </div>
                    </div>
                  </CardContent>
                  </Card>
                </TabsContent>

                {/* Shipment Tracking Tab */}
                <TabsContent value="tracking" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipment Tracking</CardTitle>
                      <CardDescription>Track the status of your export shipments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="md:col-span-2">
                          <div className="space-y-2">
                            <Label htmlFor="tracking-number">Tracking Number</Label>
                            <div className="flex gap-2">
                              <Input id="tracking-number" placeholder="Enter tracking number" className="flex-1" />
                              <Button>Track</Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="space-y-2">
                            <Label htmlFor="carrier">Carrier</Label>
                            <Select defaultValue="all">
                              <SelectTrigger id="carrier">
                                <SelectValue placeholder="Select carrier" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Carriers</SelectItem>
                                <SelectItem value="dhl">DHL Express</SelectItem>
                                <SelectItem value="fedex">FedEx International</SelectItem>
                                <SelectItem value="ups">UPS Worldwide</SelectItem>
                                <SelectItem value="shiprocket">Shiprocket Global</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Package className="h-6 w-6 text-primary" />
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-medium">Shipment #TRK12345678</h3>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1 text-sm">
                              <div className="flex items-center gap-1">
                                <Truck className="h-4 w-4 text-muted-foreground" />
                                <span>DHL Express</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>United States</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>ETA: Oct 20, 2023</span>
                              </div>
                            </div>
                          </div>

                          <div>{getStatusBadge("in-transit")}</div>
                        </div>

                        <div className="space-y-6">
                          <div className="relative">
                            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>

                            <div className="space-y-6">
                              <div className="relative pl-8">
                                <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                </div>
                                <div>
                                  <p className="font-medium">Departed from Origin Warehouse</p>
                                  <p className="text-sm text-muted-foreground">Oct 15, 2023 - 09:45 AM</p>
                                  <p className="text-sm mt-1">Mumbai, India</p>
                                </div>
                              </div>

                              <div className="relative pl-8">
                                <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                </div>
                                <div>
                                  <p className="font-medium">Arrived at Transit Hub</p>
                                  <p className="text-sm text-muted-foreground">Oct 16, 2023 - 02:30 PM</p>
                                  <p className="text-sm mt-1">Dubai, UAE</p>
                                </div>
                              </div>

                              <div className="relative pl-8">
                                <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                                </div>
                                <div>
                                  <p className="font-medium">In Transit to Destination</p>
                                  <p className="text-sm text-muted-foreground">Oct 17, 2023 - 11:15 AM</p>
                                  <p className="text-sm mt-1">In Air</p>
                                </div>
                              </div>

                              <div className="relative pl-8">
                                <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40"></div>
                                </div>
                                <div>
                                  <p className="font-medium text-muted-foreground">Arrival at Destination</p>
                                  <p className="text-sm text-muted-foreground">Expected Oct 18, 2023</p>
                                  <p className="text-sm mt-1 text-muted-foreground">New York, USA</p>
                                </div>
                              </div>

                              <div className="relative pl-8">
                                <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40"></div>
                                </div>
                                <div>
                                  <p className="font-medium text-muted-foreground">Customs Clearance</p>
                                  <p className="text-sm text-muted-foreground">Expected Oct 19, 2023</p>
                                  <p className="text-sm mt-1 text-muted-foreground">New York, USA</p>
                                </div>
                              </div>

                              <div className="relative pl-8">
                                <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40"></div>
                                </div>
                                <div>
                                  <p className="font-medium text-muted-foreground">Out for Delivery</p>
                                  <p className="text-sm text-muted-foreground">Expected Oct 20, 2023</p>
                                  <p className="text-sm mt-1 text-muted-foreground">New York, USA</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <Button variant="outline">Download Tracking Details</Button>
                        <Button variant="outline">Share Tracking</Button>
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



