"use client"

import { useState } from "react"
import { Check, Clock, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

type ShippingOption = {
  id: string
  provider: string
  logo: string
  price: number
  deliveryTime: string
  features: string[]
  recommended?: boolean
}

export function LogisticsComparison({ data }: { data: { ShippingOption: ShippingOption[] } }) {
  const [destination, setDestination] = useState("usa")
  const [weight, setWeight] = useState("5")
  const [packageType, setPackageType] = useState("box")

  // Mock shipping options based on destination and weight
  const getShippingOptions = (): ShippingOption[] => {
    // This would typically come from an API call
    if(data?.ShippingOption){
      return data.ShippingOption.map((option: ShippingOption) => ({ ...option, logo: "/globe.svg" }))
    }
    else if (destination === "usa") {
      return [
        {
          id: "dhl-express",
          provider: "DHL Express",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 18.5,
          deliveryTime: "3-5 business days",
          features: ["Door-to-door delivery", "Real-time tracking", "Customs clearance"],
        },
        {
          id: "fedex-international",
          provider: "FedEx International",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 19.2,
          deliveryTime: "4-6 business days",
          features: ["Door-to-door delivery", "Real-time tracking", "Customs clearance", "Insurance included"],
          recommended: true,
        },
        {
          id: "ups-worldwide",
          provider: "UPS Worldwide",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 17.8,
          deliveryTime: "5-7 business days",
          features: ["Door-to-door delivery", "Real-time tracking", "Customs clearance"],
        },
        {
          id: "shiprocket-global",
          provider: "Shiprocket Global",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 15.5,
          deliveryTime: "7-10 business days",
          features: ["Door-to-door delivery", "Basic tracking", "Customs assistance"],
        },
      ]
    } else if (destination === "eu") {
      return [
        {
          id: "dhl-express",
          provider: "DHL Express",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 16.5,
          deliveryTime: "3-5 business days",
          features: ["Door-to-door delivery", "Real-time tracking", "Customs clearance"],
          recommended: true,
        },
        {
          id: "fedex-international",
          provider: "FedEx International",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 17.2,
          deliveryTime: "4-6 business days",
          features: ["Door-to-door delivery", "Real-time tracking", "Customs clearance", "Insurance included"],
        },
        {
          id: "ups-worldwide",
          provider: "UPS Worldwide",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 16.8,
          deliveryTime: "5-7 business days",
          features: ["Door-to-door delivery", "Real-time tracking", "Customs clearance"],
        },
        {
          id: "shiprocket-global",
          provider: "Shiprocket Global",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 14.5,
          deliveryTime: "7-10 business days",
          features: ["Door-to-door delivery", "Basic tracking", "Customs assistance"],
        },
      ]
    } else {
      return [
        {
          id: "dhl-express",
          provider: "DHL Express",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 20.5,
          deliveryTime: "4-6 business days",
          features: ["Door-to-door delivery", "Real-time tracking", "Customs clearance"],
        },
        {
          id: "fedex-international",
          provider: "FedEx International",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 21.2,
          deliveryTime: "5-7 business days",
          features: ["Door-to-door delivery", "Real-time tracking", "Customs clearance", "Insurance included"],
        },
        {
          id: "ups-worldwide",
          provider: "UPS Worldwide",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 19.8,
          deliveryTime: "6-8 business days",
          features: ["Door-to-door delivery", "Real-time tracking", "Customs clearance"],
          recommended: true,
        },
        {
          id: "shiprocket-global",
          provider: "Shiprocket Global",
          logo: "/globe.svg",
          price: Number.parseInt(weight) * 17.5,
          deliveryTime: "8-12 business days",
          features: ["Door-to-door delivery", "Basic tracking", "Customs assistance"],
        },
      ]
    }
  }

  const shippingOptions = getShippingOptions()

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Logistics Cost Comparison</CardTitle>
          <CardDescription>Compare shipping rates from different logistics providers</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="compare">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="compare">Compare Rates</TabsTrigger>
              <TabsTrigger value="calculate">Calculate Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="compare" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger id="destination">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                      <SelectItem value="asia">Asia Pacific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Package Weight (kg)</Label>
                  <Select value={weight} onValueChange={setWeight}>
                    <SelectTrigger id="weight">
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 kg</SelectItem>
                      <SelectItem value="5">5 kg</SelectItem>
                      <SelectItem value="10">10 kg</SelectItem>
                      <SelectItem value="20">20 kg</SelectItem>
                      <SelectItem value="50">50 kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="package-type">Package Type</Label>
                  <Select value={packageType} onValueChange={setPackageType}>
                    <SelectTrigger id="package-type">
                      <SelectValue placeholder="Select package type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="box">Standard Box</SelectItem>
                      <SelectItem value="pallet">Pallet</SelectItem>
                      <SelectItem value="envelope">Document Envelope</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                {shippingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg border ${option.recommended ? "border-primary bg-primary/5" : ""}`}
                  >
                    {option.recommended && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        Recommended
                      </div>
                    )}

                    <div className="flex-shrink-0 w-20 h-10 bg-muted rounded flex items-center justify-center">
                      <Image
                      width={40}
                      height={40}
                        src={option.logo || "/placeholder.svg"}
                        alt={option.provider}
                        className="max-w-full max-h-full"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium">{option.provider}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="mr-1 h-4 w-4" />
                        {option.deliveryTime}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {option.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs">
                            <Check className="mr-1 h-3 w-3 text-primary" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xl font-bold">${option.price.toFixed(2)}</div>
                      <Button size="sm">Select</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calculate" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin Country</Label>
                    <Select defaultValue="india">
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
                    <Select defaultValue="usa">
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
                    <Input id="shipping-weight" type="number" defaultValue="5" />
                  </div>

                  <div className="space-y-2">
                    <Label>Package Dimensions (cm)</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <Input placeholder="Length" defaultValue="30" />
                      <Input placeholder="Width" defaultValue="20" />
                      <Input placeholder="Height" defaultValue="15" />
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
                    <Button className="w-full">
                      <Truck className="mr-2 h-4 w-4" />
                      Calculate Shipping Cost
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

