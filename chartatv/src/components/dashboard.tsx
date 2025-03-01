"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  FileCheck,
  FileText,
  Globe,
  HelpCircle,
  Home,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductForm } from "./Product Form";
import { ExportReadiness } from "./Export Readiness";
import { LogisticsComparison } from "./Logistics Comparison";
import { DocumentGenerator } from "./document-generator";
import { MarketInsights } from "./Market Insights";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [finalData, setFinalData] = useState<any>(null);

  const fetchGeminiData = async (requestBody: object) => {
    try {
      const geminiApiKey: string = process.env.NEXT_PUBLIC_GEMINI_API || "";
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();
      // console.log("Result from Gemini:", result);

      // Extract and clean response text
      let responseText = result.candidates[0].content.parts[0].text;
      responseText = responseText
        .replace(/^```json\s*/, "")
        .replace(/```\s*$/, "");

      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateShippingOptions = async (data: any) => {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Generate a structured JSON response with only "ShippingOption":
              {
                "ShippingOption": [array of ShippingOption]
              }
                type ShippingOption = {
                id: string
                provider: string
                logo: string
                price: number
                deliveryTime: string
                features: string[]
                recommended?: boolean
              }
              Use the following product details:
              {
                "category": "${data.category}",
                "description": "${data.description}",
                "dimensions": "${data.dimensions}",
                "origin": "India",
                "productName": "${data.productName}",
                "weight": "${data.weight}"
              }`,
            },
          ],
        },
      ],
    };

    return await fetchGeminiData(requestBody);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateExportReadiness = async (data: any) => {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Generate a structured JSON response with only "ShippingOption":
                {
                  "Checklist": [array of ChecklistItem],
                  "Certifications": [array of CertificationType]
                }
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
                Use the following product details:
                {
                  "category": "${data.category}",
                  "description": "${data.description}",
                  "dimensions": "${data.dimensions}",
                  "origin": "India",
                  "productName": "${data.productName}",
                  "weight": "${data.weight}"
                }`,
            },
          ],
        },
      ],
    };

    return await fetchGeminiData(requestBody);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateMarketData = async (data: any) => {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Generate a structured JSON response with only "MarketData":
              {
                "MarketData": [array of MarketData]
              }
                type MarketData = {
  country: string
  demand: number
  growth: number
  competition: number
  tariff: number
  score: number
}
              Use the following product details:
              {
                "category": "${data.category}",
                "description": "${data.description}",
                "dimensions": "${data.dimensions}",
                "origin": "India",
                "productName": "${data.productName}",
                "weight": "${data.weight}"
              }`,
            },
          ],
        },
      ],
    };

    return await fetchGeminiData(requestBody);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generatePriceData = async (data: any) => {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Generate a structured JSON response with only "PriceData":
              {
                "HSCode": string
                "PriceData": [array of PriceData]
              }
                - HS Code: Harmonized System code for the business product.
                type PriceData = {
  month: string
  min: number
  avg: number
  max: number
}
              Use the following product details:
              {
                "category": "${data.category}",
                "description": "${data.description}",
                "dimensions": "${data.dimensions}",
                "origin": "India",
                "productName": "${data.productName}",
                "weight": "${data.weight}"
              }`,
            },
          ],
        },
      ],
    };

    return await fetchGeminiData(requestBody);
  };

  // Main function to call all requests separately
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRatesReceived = async (data: any) => {
    console.log("Fetching Gemini API responses...");
    
    const [shippingOptions, marketData, priceData, exportReadiness] =
      await Promise.all([
        generateShippingOptions(data),
        generateMarketData(data),
        generatePriceData(data),
        generateExportReadiness(data),
      ]);

    setFinalData({
      shippingOptions,
      marketData,
      priceData,
      exportReadiness,
    });

    console.log("Shipping Options:", shippingOptions);
    console.log("Market Data:", marketData);
    console.log("Price Data:", priceData);
    console.log("Export Readiness:", exportReadiness);
    console.log(finalData.priceData);

    localStorage.setItem("productData", JSON.stringify({ ...data, priceData }));
  };

  return (
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
                href="#"
                className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:text-primary"
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
            <h1 className="text-xl font-semibold">MSME Export Dashboard</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Products Ready for Export
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    +1 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Export Readiness Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last assessment
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Potential Markets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    EU, US, UAE, Singapore, Japan
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="product-form">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="product-form">
                  Product Submission
                </TabsTrigger>
                <TabsTrigger value="export-readiness">
                  Export Readiness
                </TabsTrigger>
                <TabsTrigger value="logistics">
                  Logistics Comparison
                </TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="insights">Market Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="product-form" className="mt-6">
                <ProductForm onRatesReceived={handleRatesReceived} />
              </TabsContent>
              <TabsContent value="export-readiness" className="mt-6">
                <ExportReadiness data={finalData?.exportReadiness?.ShippingOption}/>
              </TabsContent>
              <TabsContent value="logistics" className="mt-6">
                <LogisticsComparison data={finalData?.shippingOptions}/>
              </TabsContent>
              <TabsContent value="documentation" className="mt-6">
                <DocumentGenerator />
              </TabsContent>
              <TabsContent value="insights" className="mt-6">
                <MarketInsights marketDataServer={finalData?.marketData} priceDataServer={finalData?.priceData}/>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
