"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Form validation schema
const formSchema = z.object({
  originPostalCode: z.string().min(1, "Postal code is required"),
  originCountryCode: z.string().length(2, "Country code must be 2 characters"),
  destinationPostalCode: z.string().min(1, "Postal code is required"),
  destinationCountryCode: z.string().length(2, "Country code must be 2 characters"),
  weight: z.coerce.number().min(0.1, "Weight must be greater than 0"),
  length: z.coerce.number().min(1, "Length must be greater than 0"),
  width: z.coerce.number().min(1, "Width must be greater than 0"),
  height: z.coerce.number().min(1, "Height must be greater than 0"),
  serviceType: z.string().min(1, "Service type is required"),
  packagingType: z.string().min(1, "Packaging type is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function ShippingRateForm({ onRatesReceived }: { onRatesReceived: (data: unknown) => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originPostalCode: "110001",
      originCountryCode: "IN",
      destinationPostalCode: "10001",
      destinationCountryCode: "US",
      weight: 5,
      length: 30,
      width: 20,
      height: 10,
      serviceType: "INTERNATIONAL_PRIORITY",
      packagingType: "YOUR_PACKAGING",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const payload = {
        requestedShipment: {
          shipper: {
            address: {
              postalCode: data.originPostalCode,
              countryCode: data.originCountryCode,
            },
          },
          recipient: {
            address: {
              postalCode: data.destinationPostalCode,
              countryCode: data.destinationCountryCode,
            },
          },
          pickupType: "DROPOFF_AT_FEDEX_LOCATION",
          serviceType: data.serviceType,
          packagingType: data.packagingType,
          rateRequestType: ["LIST"],
          requestedPackageLineItems: [
            {
              weight: { units: "KG", value: data.weight },
              dimensions: {
                length: data.length,
                width: data.width,
                height: data.height,
                units: "CM",
              },
            },
          ],
        },
      }  

      const response = await axios.post("/api/fedex", payload)
      onRatesReceived(response.data)
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("Failed to get shipping rates. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>FedEx Shipping Rate Calculator</CardTitle>
        <CardDescription>Enter shipping details to get FedEx rate estimates</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Origin</h3>
                <FormField
                  control={form.control}
                  name="originPostalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="110001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="originCountryCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country Code</FormLabel>
                      <FormControl>
                        <Input placeholder="IN" maxLength={2} {...field} />
                      </FormControl>
                      <FormDescription>2-letter country code (e.g., IN for India)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Destination Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Destination</h3>
                <FormField
                  control={form.control}
                  name="destinationPostalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destinationCountryCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country Code</FormLabel>
                      <FormControl>
                        <Input placeholder="US" maxLength={2} {...field} />
                      </FormControl>
                      <FormDescription>2-letter country code (e.g., US for United States)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Package Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Package Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (KG)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" min="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length (CM)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width (CM)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (CM)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Shipping Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Shipping Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="INTERNATIONAL_PRIORITY">International Priority</SelectItem>
                          <SelectItem value="INTERNATIONAL_ECONOMY">International Economy</SelectItem>
                          <SelectItem value="FEDEX_GROUND">FedEx Ground</SelectItem>
                          <SelectItem value="FEDEX_EXPRESS_SAVER">FedEx Express Saver</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="packagingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Packaging Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select packaging type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="YOUR_PACKAGING">Your Packaging</SelectItem>
                          <SelectItem value="FEDEX_BOX">FedEx Box</SelectItem>
                          <SelectItem value="FEDEX_ENVELOPE">FedEx Envelope</SelectItem>
                          <SelectItem value="FEDEX_PAK">FedEx Pak</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded-md border border-red-200">{error}</div>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating Rates...
                </>
              ) : (
                "Calculate Shipping Rates"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

