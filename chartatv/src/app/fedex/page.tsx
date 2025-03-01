"use client"

import { useState } from "react"
import ShippingRateForm from "@/components/Shipping_Rate_Form"
import RateDetails from "@/components/rate-details"
import SurchargesBreakdown from "@/components/Surcharges_Breakdown"
import { Truck } from "lucide-react"

export default function Home() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rateData, setRateData] = useState<any>(null)
    
    //@ts-expect-error idk kya ha iska type
  const handleRatesReceived = (data) => {
    setRateData(data)

    // Scroll to results
    if (data) {
      setTimeout(() => {
        const resultsElement = document.getElementById("results")
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }   

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Truck className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">FedEx Shipping Rate Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your shipping details below to get accurate FedEx shipping rates for your package.
          </p>
        </header>

        <ShippingRateForm onRatesReceived={handleRatesReceived} />

        {rateData && (
          <div id="results" className="mt-12 pt-4">
            <h2 className="text-2xl font-bold text-center mb-6">Shipping Rate Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Information */}
              <div className="animate-card">
                <div className="p-6 shadow-md rounded-xl bg-white">
                  <div className="flex items-center mb-4">
                    <Truck className="h-6 w-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold">Service Information</h2>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Service Type</p>
                      <p className="font-medium">{rateData.output?.rateReplyDetails[0]?.serviceName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Packaging Type</p>
                      <p className="font-medium">{rateData.output.rateReplyDetails[0]?.packagingType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Airport ID</p>
                      <p className="font-medium">{rateData.output.rateReplyDetails[0]?.operationalDetail.airportId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium">
                        {
                          rateData.output.rateReplyDetails[0]?.ratedShipmentDetails[0]?.shipmentRateDetail
                            .totalBillingWeight.value
                        }{" "}
                        {
                          rateData.output.rateReplyDetails[0]?.ratedShipmentDetails[0]?.shipmentRateDetail
                            .totalBillingWeight.units
                        }
                        <span className="text-gray-500 text-sm ml-2">
                          (
                          {
                            rateData.output.rateReplyDetails[0]?.ratedShipmentDetails[0]?.shipmentRateDetail
                              .totalRateScaleWeight.value
                          }{" "}
                          {
                            rateData.output.rateReplyDetails[0]?.ratedShipmentDetails[0]?.shipmentRateDetail
                              .totalRateScaleWeight.units
                          }
                          )
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Summary */}
              <RateDetails
                shipmentDetails={rateData.output.rateReplyDetails[0].ratedShipmentDetails[0]}
                className="animate-card"
              />

              {/* Surcharges Breakdown */}
              <SurchargesBreakdown
                surcharges={rateData.output.rateReplyDetails[0]?.ratedShipmentDetails[0]?.shipmentRateDetail?.surCharges}
                className="animate-card md:col-span-2"
              />

              {/* Alerts and Messages */}
              
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

