"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card } from "@/components/ui/card"
import { AlertTriangle, Info } from "lucide-react"

interface AlertsSectionProps {
  alerts: { code: string; message: string; alertType: string }[]
  customerMessages: { code: string; message: string }[]
  className?: string
}

export default function AlertsSection({ alerts, customerMessages, className }: AlertsSectionProps) {
  const alertsRef = useRef(null)

  useEffect(() => {
    // Animate alerts and messages
    gsap.from(".alert-item", {
      opacity: 0,
      x: -20,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
    })
  }, [])

  return (
    <Card className={`p-6 shadow-md rounded-xl ${className}`}>
      <div className="flex items-center mb-4">
        <AlertTriangle className="h-6 w-6 text-orange-500 mr-3" />
        <h2 className="text-xl font-semibold">Alerts & Messages</h2>
      </div>

      <div ref={alertsRef} className="space-y-4">
        {alerts.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">System Alerts</h3>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="alert-item bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                  <p className="text-sm font-medium text-orange-700">{alert.code}</p>
                  <p className="text-sm text-gray-700">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">Type: {alert.alertType}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {customerMessages.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Customer Messages</h3>
            <div className="space-y-2">
              {customerMessages.map((message, index) => (
                <div key={index} className="alert-item bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 flex">
                  <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">{message.code}</p>
                    <p className="text-sm text-gray-700">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

