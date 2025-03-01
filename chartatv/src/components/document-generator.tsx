"use client"

import { FileText, Download, CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type DocumentType = {
  id: string
  name: string
  description: string
  status: "available" | "pending" | "unavailable"
  type: "invoice" | "customs" | "compliance" | "shipping"
}

export function DocumentGenerator() {
  const documents: DocumentType[] = [
    {
      id: "commercial-invoice",
      name: "Commercial Invoice",
      description: "Official invoice for customs declaration",
      status: "available",
      type: "invoice",
    },
    {
      id: "packing-list",
      name: "Packing List",
      description: "Detailed list of package contents",
      status: "available",
      type: "shipping",
    },
    {
      id: "certificate-origin",
      name: "Certificate of Origin",
      description: "Certifies the country of origin of goods",
      status: "available",
      type: "customs",
    },
    {
      id: "shipping-bill",
      name: "Shipping Bill",
      description: "Export declaration for customs",
      status: "available",
      type: "customs",
    },
    {
      id: "bill-of-lading",
      name: "Bill of Lading",
      description: "Receipt of cargo for shipment",
      status: "pending",
      type: "shipping",
    },
    {
      id: "letter-credit",
      name: "Letter of Credit",
      description: "Bank guarantee for payment",
      status: "unavailable",
      type: "invoice",
    },
    {
      id: "phytosanitary",
      name: "Phytosanitary Certificate",
      description: "For agricultural products",
      status: "unavailable",
      type: "compliance",
    },
    {
      id: "fumigation",
      name: "Fumigation Certificate",
      description: "Certifies treatment of wooden packaging",
      status: "pending",
      type: "compliance",
    },
    {
      id: "insurance",
      name: "Insurance Certificate",
      description: "Proof of cargo insurance",
      status: "available",
      type: "shipping",
    },
    {
      id: "inspection",
      name: "Inspection Certificate",
      description: "Certifies product quality and condition",
      status: "pending",
      type: "compliance",
    },
  ]

  const getStatusIcon = (status: DocumentType["status"]) => {
    switch (status) {
      case "available":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "unavailable":
        return <AlertCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusText = (status: DocumentType["status"]) => {
    switch (status) {
      case "available":
        return "Ready to download"
      case "pending":
        return "Pending information"
      case "unavailable":
        return "Not available"
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Documentation</CardTitle>
          <CardDescription>Generate and download export documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Documents</TabsTrigger>
                <TabsTrigger value="invoice">Invoice</TabsTrigger>
                <TabsTrigger value="customs">Customs</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4">
                <Select defaultValue="textile-product">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="textile-product">Textile Product</SelectItem>
                    <SelectItem value="handicraft">Handicraft Item</SelectItem>
                    <SelectItem value="leather-goods">Leather Goods</SelectItem>
                  </SelectContent>
                </Select>

                <Button>Generate All</Button>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{doc.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{doc.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs">
                        {getStatusIcon(doc.status)}
                        <span className="hidden sm:inline">{getStatusText(doc.status)}</span>
                      </div>

                      <Button variant="ghost" size="icon" disabled={doc.status !== "available"}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="invoice" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents
                  .filter((doc) => doc.type === "invoice")
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{doc.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{doc.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs">
                          {getStatusIcon(doc.status)}
                          <span className="hidden sm:inline">{getStatusText(doc.status)}</span>
                        </div>

                        <Button variant="ghost" size="icon" disabled={doc.status !== "available"}>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="customs" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents
                  .filter((doc) => doc.type === "customs")
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{doc.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{doc.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs">
                          {getStatusIcon(doc.status)}
                          <span className="hidden sm:inline">{getStatusText(doc.status)}</span>
                        </div>

                        <Button variant="ghost" size="icon" disabled={doc.status !== "available"}>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents
                  .filter((doc) => doc.type === "compliance")
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{doc.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{doc.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs">
                          {getStatusIcon(doc.status)}
                          <span className="hidden sm:inline">{getStatusText(doc.status)}</span>
                        </div>

                        <Button variant="ghost" size="icon" disabled={doc.status !== "available"}>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents
                  .filter((doc) => doc.type === "shipping")
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{doc.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{doc.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs">
                          {getStatusIcon(doc.status)}
                          <span className="hidden sm:inline">{getStatusText(doc.status)}</span>
                        </div>

                        <Button variant="ghost" size="icon" disabled={doc.status !== "available"}>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

