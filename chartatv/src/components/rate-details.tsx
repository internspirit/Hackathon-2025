"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"

interface RateDetailsProps {
  shipmentDetails: {
    totalBaseCharge: number,
    shipmentRateDetail: {
      totalSurcharges: number
    },
    totalDiscounts: number,
    totalNetCharge: number,
    currency: string,
    rateType: string,
    ratedWeightMethod: string
  }
  className?: string
}

export default function RateDetails({ shipmentDetails, className }: RateDetailsProps) {
  const priceRef = useRef(null)

useEffect(() => {
    if (priceRef.current) {
        gsap.fromTo(priceRef.current, 
            { textContent: 0 }, 
            { 
                textContent: shipmentDetails?.totalNetCharge,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 0.01 },
                stagger: 0.25,
                onUpdate: function () {
                    // @ts-expect-ignore - GSAP's textContent animation
                    this.targets()[0].innerHTML = `$${Number.parseFloat(this.targets()[0].textContent).toFixed(2)}`
                },
            }
        )
    }
}, [shipmentDetails?.totalNetCharge])


  return (
    <Card className={`p-6 shadow-md rounded-xl ${className}`}>
      <div className="flex items-center mb-4">
        <DollarSign className="h-6 w-6 text-green-600 mr-3" />
        <h2 className="text-xl font-semibold">Rate Summary</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <p className="text-gray-600">Base Charge</p>
          <p className="font-medium">${shipmentDetails?.totalBaseCharge?.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <p className="text-gray-600">Total Surcharges</p>
          <p className="font-medium">${shipmentDetails?.shipmentRateDetail?.totalSurcharges.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <p className="text-gray-600">Discounts</p>
          <p className="font-medium">${shipmentDetails?.totalDiscounts?.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <p className="text-lg font-bold text-gray-800">Total Net Charge</p>
          <p ref={priceRef} className="text-xl font-bold text-green-600">
            ${shipmentDetails?.totalNetCharge.toFixed(2)}
          </p>
        </div>

        <div className="mt-4 bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Currency:</span> {shipmentDetails?.currency}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Rate Type:</span> {shipmentDetails?.rateType}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Weight Method:</span> {shipmentDetails?.ratedWeightMethod}
          </p>
        </div>
      </div>
    </Card>
  )
}

