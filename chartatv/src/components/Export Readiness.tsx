"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Circle, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ChecklistItem = {
  id: string
  title: string
  description: string
  completed: boolean
  required: boolean
}

type CertificationType = {
  id: string
  name: string
  description: string
  markets: string[]
  required: boolean
  obtained: boolean
}

type ExportReadinessProps = {
  data: {
    Checklist: ChecklistItem[];
    Certifications: CertificationType[];
  };
};

export function ExportReadiness({ data }: ExportReadinessProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    data?.Checklist||
    [
    {
      id: "business-registration",
      title: "Business Registration",
      description: "Valid business registration or incorporation certificate",
      completed: true,
      required: true,
    },
    {
      id: "export-license",
      title: "Export License",
      description: "Valid export license from DGFT",
      completed: true,
      required: true,
    },
    {
      id: "gst-registration",
      title: "GST Registration",
      description: "GST registration with export endorsement",
      completed: true,
      required: true,
    },
    {
      id: "iec-code",
      title: "IEC Code",
      description: "Import Export Code from DGFT",
      completed: true,
      required: true,
    },
    {
      id: "bank-account",
      title: "Export Bank Account",
      description: "Bank account capable of receiving foreign currency",
      completed: false,
      required: true,
    },
    {
      id: "product-testing",
      title: "Product Testing",
      description: "Laboratory testing for product compliance",
      completed: false,
      required: true,
    },
    {
      id: "packaging-compliance",
      title: "Packaging Compliance",
      description: "Packaging meets international standards",
      completed: false,
      required: true,
    },
    {
      id: "trademark",
      title: "Trademark Registration",
      description: "Registered trademark for international protection",
      completed: false,
      required: false,
    },
  ])

const [certifications, setCertifications] = useState<CertificationType[]>(
  data?.Certifications || [
    {
      id: "ce-marking",
      name: "CE Marking",
      description: "Required for products sold in the European Economic Area",
      markets: ["European Union", "EEA Countries"],
      required: true,
      obtained: false,
    },
    {
      id: "iso-9001",
      name: "ISO 9001",
      description: "Quality Management System certification",
      markets: ["Global"],
      required: false,
      obtained: true,
    },
    {
      id: "fda-approval",
      name: "FDA Approval",
      description: "Required for food, drugs, and cosmetics in the US",
      markets: ["United States"],
      required: true,
      obtained: false,
    },
    {
      id: "organic",
      name: "Organic Certification",
      description: "For organic products",
      markets: ["European Union", "United States", "Japan"],
      required: false,
      obtained: false,
    },
    {
      id: "fair-trade",
      name: "Fair Trade Certification",
      description: "Ensures fair compensation and sustainable practices",
      markets: ["Global"],
      required: false,
      obtained: false,
    },
  ]
)

  const toggleChecklistItem = (id: string) => {
    console.log(data)
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const toggleCertification = (id: string) => {
    setCertifications(certifications.map((cert) => (cert.id === id ? { ...cert, obtained: !cert.obtained } : cert)))
  }

  const completedRequired = checklist.filter((item) => item.required && item.completed).length
  const totalRequired = checklist.filter((item) => item.required).length
  const readinessScore = Math.round((completedRequired / totalRequired) * 100)

  const certificationScore = Math.round(
    (certifications.filter((cert) => cert.required && cert.obtained).length /
      certifications.filter((cert) => cert.required).length) *
      100,
  )

  const overallScore = Math.round((readinessScore + certificationScore) / 2)

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Readiness Assessment</CardTitle>
          <CardDescription>Track your export readiness and required certifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Overall Export Readiness</h3>
              <span className="text-sm font-medium">{overallScore}%</span>
            </div>
            <Progress value={overallScore} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Export Checklist</h3>
              <div className="space-y-4">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <button onClick={() => toggleChecklistItem(item.id)} className="mt-0.5 flex-shrink-0 text-primary">
                      {item.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        {item.required && (
                          <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Required Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <button onClick={() => toggleCertification(cert.id)} className="mt-0.5 flex-shrink-0 text-primary">
                      {cert.obtained ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium">{cert.name}</h4>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                <HelpCircle className="h-3 w-3" />
                                <span className="sr-only">Info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{cert.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        {cert.required && (
                          <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Markets: {cert.markets.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-0">
          <div className="flex items-center text-sm text-muted-foreground">
            <AlertCircle className="mr-1 h-4 w-4" />
            Complete all required items to ensure export compliance
          </div>
          <Button>Generate Compliance Report</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

