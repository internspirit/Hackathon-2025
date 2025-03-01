"use client"

import { BarChart3, Download, FileCheck, FileText, Globe, HelpCircle, Home, Info, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function RoDTEPSchemePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [hscode, sethscode] = useState(0)
  const [finalData, setFinalData] = useState<{ price?: string; rate?: string }>({})
  const [formData, setFormData] = useState({
    productCategory: "",
    hsCode: hscode,
    fobValue: "",
    quantity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  useEffect(() => {
      const data = localStorage.getItem("productData")
      if (data) {
        const parsedData = JSON.parse(data)
        console.log(parsedData.priceData.PriceData.HSCode)
        sethscode(parseInt(parsedData.priceData.PriceData.HSCode, 10))
        setFormData((prevFormData) => ({
          ...prevFormData,
          hsCode: parseInt(parsedData.priceData.PriceData.HSCode, 10),
        }));
      }
    }, [])
    const handleCalculate = async () => {
    
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
                      text: `Calculate the RoDTEP scheme benefit in INR based on the provided data and rate. Return only the result in JSON format as: {"price":"calculated_value","rate":"provided_rate"}. Ensure the calculation is accurate. Data: ${JSON.stringify(formData)}`
                    }
                  ]
                }
              ]
            })
          }
        );
    
        const data = await response.json();
        let responseText = data.candidates[0].content.parts[0].text;
  
        // Remove the markdown code block indicators and 'json' if present
        responseText = responseText.replace(/^```json\s*/, "");
        responseText = responseText.replace(/```\s*$/, "");
        console.log(responseText);
  
        // Parse the JSON
      
          const parsedData = JSON.parse(responseText);
          console.log(parsedData);
          setFinalData(parsedData);
      } catch (error) {
        console.error("Error fetching freight data:", error);
      }
    };
  return (
    <div className="flex min-h-screen bg-background">
       <div
        className={`${
          isSidebarOpen ? "min-w-64" : "w-20"
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Truck className="h-5 w-5" />
                {isSidebarOpen && <span>Logistics</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/rodtpe"
                className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:text-primary"
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
    <div className="grid gap-6 overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>RoDTEP Scheme</CardTitle>
          <CardDescription>
            Remission of Duties and Taxes on Exported Products (RoDTEP) Scheme Information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility & Rates</TabsTrigger>
              <TabsTrigger value="application">Application Process</TabsTrigger>
              <TabsTrigger value="calculator">Benefit Calculator</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 pt-6">
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important Update</AlertTitle>
                  <AlertDescription>
                    The RoDTEP scheme has been implemented from January 1, 2021, replacing the Merchandise Exports from
                    India Scheme (MEIS).
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">What is RoDTEP?</h3>
                  <p className="text-sm text-muted-foreground">
                    The Remission of Duties and Taxes on Exported Products (RoDTEP) scheme is a new scheme that has been
                    introduced by the Government of India to replace the Merchandise Exports from India Scheme (MEIS).
                    The scheme aims to refund taxes and duties paid by exporters such as VAT on fuel used in
                    transportation, Mandi tax, Duty on electricity used during manufacturing, etc. which were not being
                    refunded so far.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>
                      Rebate of Central, State and Local duties/taxes/levies which are not refunded under any other duty
                      remission schemes
                    </li>
                    <li>
                      Benefit is available in the form of a transferable duty credit/electronic scrip which will be
                      maintained in an electronic ledger
                    </li>
                    <li>The rebate would be claimed as a percentage of the Freight On Board (FOB) value of exports</li>
                    <li>The scheme covers over 8,555 tariff lines, accounting for about 65% of India&apos;s exports</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Benefits for MSMEs</h3>
                  <p className="text-sm text-muted-foreground">
                    The RoDTEP scheme is particularly beneficial for MSMEs as it helps in:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Reducing the export price and making exports more competitive</li>
                    <li>Improving cash flow by providing timely rebates</li>
                    <li>Ensuring zero-rating of exports by removing hidden taxes</li>
                    <li>Simplifying the export process with electronic credit system</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="eligibility" className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Eligibility Criteria</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>All products manufactured or made in India are eligible for the scheme</li>
                    <li>The exporter must have a valid IEC (Import Export Code)</li>
                    <li>The shipping bill must be filed on or after January 1, 2021</li>
                    <li>The exporter must declare intent to claim RoDTEP in the shipping bill</li>
                    <li>
                      Products manufactured or exported under Advance Authorization, EOU, EPCG, SEZ, or by a 100% EOU
                      are not eligible
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">RoDTEP Rates</h3>
                  <p className="text-sm text-muted-foreground">
                    The RoDTEP rates vary from 0.5% to 4.3% of FOB value of exported goods, depending on the product
                    category. Below are sample rates for key MSME export sectors:
                  </p>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sector</TableHead>
                          <TableHead>HS Code Range</TableHead>
                          <TableHead>RoDTEP Rate (%)</TableHead>
                          <TableHead>Cap per Unit (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Textiles</TableCell>
                          <TableCell>50-63</TableCell>
                          <TableCell>1.2 - 4.3</TableCell>
                          <TableCell>₹2.5 - ₹30 per kg</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Leather</TableCell>
                          <TableCell>41-43</TableCell>
                          <TableCell>1.3 - 2.7</TableCell>
                          <TableCell>₹3.5 - ₹18 per kg</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Handicrafts</TableCell>
                          <TableCell>44, 46, 69, 70</TableCell>
                          <TableCell>1.5 - 2.8</TableCell>
                          <TableCell>₹5 - ₹35 per piece</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Engineering Goods</TableCell>
                          <TableCell>72-85</TableCell>
                          <TableCell>0.8 - 2.5</TableCell>
                          <TableCell>₹10 - ₹50 per kg</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Chemicals</TableCell>
                          <TableCell>28-38</TableCell>
                          <TableCell>0.5 - 2.2</TableCell>
                          <TableCell>₹3 - ₹25 per kg</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Note: The above rates are indicative. For exact rates, please refer to the official RoDTEP rate
                    schedule published by DGFT.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="application" className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Application Process</h3>
                  <p className="text-sm text-muted-foreground">
                    The process to claim RoDTEP benefits involves the following steps:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Step 1: Declaration in Shipping Bill</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Select &apos;Y&apos; (Yes) for the RoDTEP scheme in the shipping bill</li>
                        <li>Ensure accurate declaration of export goods</li>
                        <li>File shipping bill through ICEGATE</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Step 2: Processing by Customs</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Customs processes the shipping bill</li>
                        <li>System validates the RoDTEP eligibility</li>
                        <li>Scroll is generated with RoDTEP amounts</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Step 3: Credit in Electronic Ledger</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>RoDTEP credits are transferred to exporter&apos;s electronic ledger</li>
                        <li>Credits are maintained in the ICEGATE portal</li>
                        <li>Exporter can view credits in their account</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Step 4: Utilization of Credits</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Credits can be used for payment of basic customs duty</li>
                        <li>Credits can be transferred to other IEC holders</li>
                        <li>Credits are valid for one year from the date of issuance</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Required Documents</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Valid Import Export Code (IEC)</li>
                        <li>Shipping Bill with RoDTEP declaration</li>
                        <li>Export Invoice</li>
                        <li>Packing List</li>
                        <li>Bill of Lading/Airway Bill</li>
                        <li>Certificate of Origin (if applicable)</li>
                        <li>Bank Realization Certificate (BRC)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Common Issues & Solutions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div>
                          <h5 className="text-sm font-medium">Issue: RoDTEP not reflecting in ledger</h5>
                          <p className="text-xs text-muted-foreground">
                            Solution: Verify that &apos;Y&apos; was selected for RoDTEP in the shipping bill. If correct, contact
                            the DGFT helpdesk with shipping bill details.
                          </p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium">Issue: Incorrect RoDTEP amount</h5>
                          <p className="text-xs text-muted-foreground">
                            Solution: Check if the correct HS code was declared. If there&apos;s a discrepancy, file a
                            grievance through the DGFT website.
                          </p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium">Issue: Unable to transfer credits</h5>
                          <p className="text-xs text-muted-foreground">
                            Solution: Ensure the recipient has a valid IEC and is registered on the ICEGATE portal.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="calculator" className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">RoDTEP Benefit Calculator</h3>
                  <p className="text-sm text-muted-foreground">
                    Calculate the approximate RoDTEP benefit for your export shipment:
                  </p>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="product-category" className="text-sm font-medium">
                            Product Category
                          </label>
                    <select
                      name="productCategory"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.productCategory}
                      onChange={handleChange}
                    >
                            <option value="">Select product category</option>
                            <option value="textiles">Textiles & Garments</option>
                            <option value="leather">Leather Goods</option>
                            <option value="handicrafts">Handicrafts</option>
                            <option value="engineering">Engineering Goods</option>
                            <option value="chemicals">Chemicals</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="hs-code" className="text-sm font-medium">
                            HS Code
                          </label>
                          <input
                            name="hsCode"
                            type="text"
                            value={formData.hsCode}
                            onChange={handleChange}
                            placeholder="Enter HS Code"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="fob-value" className="text-sm font-medium">
                            FOB Value (INR)
                          </label>
                        <input
                          name="fobValue"
                          type="number"
                          value={formData.fobValue}
                          onChange={handleChange}
                          placeholder="Enter FOB value"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="quantity" className="text-sm font-medium">
                            Quantity (kg/pieces)
                          </label>
                    <input
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Enter quantity"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                        </div>

                        <Button className="w-full" onClick={handleCalculate}>Calculate Benefit</Button>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-6 flex flex-col justify-center">
                        <div className="text-center space-y-4">
                          <h4 className="text-lg font-medium">Estimated RoDTEP Benefit</h4>
                          <div className="text-3xl font-bold text-primary">{finalData?.price||"₹0.00"}</div>
                          <div className="text-sm text-muted-foreground">
                            Based on <span className="font-medium">{finalData?.rate||"0%"}</span> RoDTEP rate
                          </div>
                          <p className="text-xs text-muted-foreground mt-4">
                            Note: This is an approximate calculation. Actual benefit may vary based on the exact HS code
                            and applicable caps.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            RoDTEP Helpdesk
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            <Download className="h-4 w-4" />
            Download RoDTEP Guidelines
          </Button>
        </CardFooter>
      </Card>
    </div>
    </div>
  )
}

