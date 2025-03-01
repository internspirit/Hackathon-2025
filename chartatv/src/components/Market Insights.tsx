"use client"

import { useState } from "react"
import { BarChart, LineChart, PieChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type MarketData = {
  country: string
  demand: number
  growth: number
  competition: number
  tariff: number
  score: number
}

type PriceData = {
  month: string
  min: number
  avg: number
  max: number
}

interface MarketInsightsProps {
  priceDataServer: { PriceData: PriceData[] };
  marketDataServer: { MarketData: MarketData[] };
}

export function MarketInsights({ priceDataServer, marketDataServer }: MarketInsightsProps) {
  const [category, setCategory] = useState("textiles")

  // Mock market data
  const marketData: MarketData[] = marketDataServer?.MarketData ||[
    {
      country: "United States",
      demand: 85,
      growth: 4.2,
      competition: 65,
      tariff: 5.3,
      score: 82,
    },
    {
      country: "European Union",
      demand: 78,
      growth: 3.5,
      competition: 72,
      tariff: 3.8,
      score: 76,
    },
    {
      country: "United Arab Emirates",
      demand: 72,
      growth: 6.8,
      competition: 45,
      tariff: 0,
      score: 88,
    },
    {
      country: "Singapore",
      demand: 65,
      growth: 5.2,
      competition: 55,
      tariff: 0,
      score: 79,
    },
    {
      country: "Japan",
      demand: 70,
      growth: 2.1,
      competition: 80,
      tariff: 6.5,
      score: 68,
    },
  ]

  // Mock price data
  const priceData: PriceData[] =priceDataServer?.PriceData|| [
    { month: "Jan", min: 12.5, avg: 15.8, max: 18.2 },
    { month: "Feb", min: 12.8, avg: 16.2, max: 19.0 },
    { month: "Mar", min: 13.2, avg: 16.5, max: 19.5 },
    { month: "Apr", min: 13.0, avg: 16.3, max: 19.2 },
    { month: "May", min: 12.7, avg: 16.0, max: 18.8 },
    { month: "Jun", min: 12.5, avg: 15.7, max: 18.5 },
    { month: "Jul", min: 12.3, avg: 15.5, max: 18.2 },
    { month: "Aug", min: 12.8, avg: 16.0, max: 18.7 },
    { month: "Sep", min: 13.5, avg: 16.8, max: 19.8 },
    { month: "Oct", min: 14.0, avg: 17.2, max: 20.5 },
    { month: "Nov", min: 14.5, avg: 17.8, max: 21.0 },
    { month: "Dec", min: 14.8, avg: 18.2, max: 21.5 },
  ]

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Market Insights</CardTitle>
              <CardDescription>Demand trends, pricing benchmarks, and recommended markets</CardDescription>
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="textiles">Textiles & Garments</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="food">Food Products</SelectItem>
                <SelectItem value="handicrafts">Handicrafts</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
                <SelectItem value="leather">Leather Goods</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="markets">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="markets">
                <BarChart className="h-4 w-4 mr-2" />
                Target Markets
              </TabsTrigger>
              <TabsTrigger value="pricing">
                <LineChart className="h-4 w-4 mr-2" />
                Pricing Trends
              </TabsTrigger>
              <TabsTrigger value="regulations">
                <PieChart className="h-4 w-4 mr-2" />
                Regulations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="markets" className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Recommended Markets</h3>
                  <div className="space-y-4">
                    {marketData
                      .sort((a, b) => b.score - a.score)
                      .map((market) => (
                        <div
                          key={market.country}
                          className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-bold text-primary">{market.score}</span>
                          </div>

                          <div className="flex-1">
                            <h4 className="font-medium">{market.country}</h4>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                              <span>Demand: {market.demand}%</span>
                              <span>Growth: {market.growth}%</span>
                              <span>Tariff: {market.tariff}%</span>
                            </div>
                          </div>

                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Market Comparison</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Demand Potential</span>
                        <span className="text-muted-foreground">Higher is better</span>
                      </div>
                      <div className="space-y-1">
                        {marketData
                          .sort((a, b) => b.demand - a.demand)
                          .slice(0, 3)
                          .map((market) => (
                            <div key={`demand-${market.country}`} className="flex items-center gap-2">
                              <span className="w-24 text-xs">{market.country}</span>
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${market.demand}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">{market.demand}%</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Growth Rate</span>
                        <span className="text-muted-foreground">Higher is better</span>
                      </div>
                      <div className="space-y-1">
                        {marketData
                          .sort((a, b) => b.growth - a.growth)
                          .slice(0, 3)
                          .map((market) => (
                            <div key={`growth-${market.country}`} className="flex items-center gap-2">
                              <span className="w-24 text-xs">{market.country}</span>
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${market.growth * 10}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">{market.growth}%</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Competition Level</span>
                        <span className="text-muted-foreground">Lower is better</span>
                      </div>
                      <div className="space-y-1">
                        {marketData
                          .sort((a, b) => a.competition - b.competition)
                          .slice(0, 3)
                          .map((market) => (
                            <div key={`competition-${market.country}`} className="flex items-center gap-2">
                              <span className="w-24 text-xs">{market.country}</span>
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-500 rounded-full"
                                  style={{ width: `${market.competition}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">{market.competition}%</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Price Benchmarks</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 bg-muted p-3">
                      <div className="font-medium text-sm">Month</div>
                      <div className="font-medium text-sm">Min ($)</div>
                      <div className="font-medium text-sm">Avg ($)</div>
                      <div className="font-medium text-sm">Max ($)</div>
                    </div>
                    <div className="divide-y">
                      {priceData.slice(0, 6).map((data) => (
                        <div key={data.month} className="grid grid-cols-4 p-3">
                          <div className="text-sm">{data.month}</div>
                          <div className="text-sm">{data.min.toFixed(2)}</div>
                          <div className="text-sm font-medium">{data.avg.toFixed(2)}</div>
                          <div className="text-sm">{data.max.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      View Full Price History
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Pricing Recommendations</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Recommended Price Range</h4>
                          <span className="text-sm font-bold text-primary">$15.50 - $18.20</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on current market conditions and competitor pricing
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Price Trend</h4>
                          <span className="text-sm font-medium text-green-500">Increasing (+5.2%)</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Prices are expected to rise over the next quarter
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Seasonal Factors</h4>
                          <span className="text-sm font-medium">Q4 Peak</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Demand typically increases during holiday season (Oct-Dec)
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Competitive Position</h4>
                          <span className="text-sm font-medium">Mid-range</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Your pricing is competitive within the mid-range segment
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="regulations" className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Regulatory Requirements</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">European Union</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-amber-600 text-xs">!</span>
                            </div>
                            <span>CE Marking required for all textile products</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-amber-600 text-xs">!</span>
                            </div>
                            <span>REACH compliance for chemical substances</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-amber-600 text-xs">!</span>
                            </div>
                            <span>Textile labeling requirements (fiber composition, care instructions)</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">United States</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-amber-600 text-xs">!</span>
                            </div>
                            <span>Textile Fiber Products Identification Act compliance</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-amber-600 text-xs">!</span>
                            </div>
                            <span>Flammability standards (16 CFR Part 1610)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-amber-600 text-xs">!</span>
                            </div>
                            <span>Country of origin labeling</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Tariff Information</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-3 bg-muted p-3">
                        <div className="font-medium text-sm">Country</div>
                        <div className="font-medium text-sm">HS Code</div>
                        <div className="font-medium text-sm">Tariff Rate</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-3 p-3">
                          <div className="text-sm">United States</div>
                          <div className="text-sm">50.07.10</div>
                          <div className="text-sm">5.3%</div>
                        </div>
                        <div className="grid grid-cols-3 p-3">
                          <div className="text-sm">European Union</div>
                          <div className="text-sm">50.07.10</div>
                          <div className="text-sm">3.8%</div>
                        </div>
                        <div className="grid grid-cols-3 p-3">
                          <div className="text-sm">United Arab Emirates</div>
                          <div className="text-sm">50.07.10</div>
                          <div className="text-sm">0%</div>
                        </div>
                        <div className="grid grid-cols-3 p-3">
                          <div className="text-sm">Singapore</div>
                          <div className="text-sm">50.07.10</div>
                          <div className="text-sm">0%</div>
                        </div>
                        <div className="grid grid-cols-3 p-3">
                          <div className="text-sm">Japan</div>
                          <div className="text-sm">50.07.10</div>
                          <div className="text-sm">6.5%</div>
                        </div>
                      </div>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Free Trade Agreements</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Your products may qualify for preferential tariff rates under these FTAs:
                        </p>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <span>India-UAE CEPA (0% tariff)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <span>India-Singapore CECA (0% tariff)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <span>SAFTA (South Asian Free Trade Area)</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
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

