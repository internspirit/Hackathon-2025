"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface SurchargesBreakdownProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  surcharges: any[]
  className?: string
}

export default function SurchargesBreakdown({ surcharges, className }: SurchargesBreakdownProps) {
  const chartRef = useRef(null)

  useEffect(() => {
    // Calculate total for percentage calculations
    const total = surcharges.reduce((sum, charge) => sum + charge.amount, 0)

    // Animate the bars
    gsap.fromTo(
      ".surcharge-bar",
      { width: 0 },
      {
        width: (index, target) => {
          const percentage = (Number.parseFloat(target.dataset.amount) / total) * 100
          return `${percentage}%`
        },
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
      },
    )

    // Animate the amounts
    gsap.from(".surcharge-amount", {
      opacity: 0,
      y: 10,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.5,
    })
  }, [surcharges])

  return (
    <Card className={`p-6 shadow-md rounded-xl ${className}`}>
      <div className="flex items-center mb-4">
        <AlertCircle className="h-6 w-6 text-amber-500 mr-3" />
        <h2 className="text-xl font-semibold">Surcharges Breakdown</h2>
      </div>

      <div ref={chartRef} className="space-y-4">
        {surcharges.map((surcharge, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between">
              <p className="text-sm font-medium">{surcharge.description}</p>
              <p className="text-sm font-semibold surcharge-amount">${surcharge.amount.toFixed(2)}</p>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`surcharge-bar h-full rounded-full ${
                  index % 4 === 0
                    ? "bg-blue-500"
                    : index % 4 === 1
                      ? "bg-green-500"
                      : index % 4 === 2
                        ? "bg-amber-500"
                        : "bg-purple-500"
                }`}
                data-amount={surcharge.amount}
              ></div>
            </div>
            <p className="text-xs text-gray-500">
              {surcharge.type} - {surcharge.level}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

