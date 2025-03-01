"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductForm({ onRatesReceived }:any) {
  const sendData = () => {
    const formData = {
      productName,
      category,
      dimensions,
      weight,
      origin: "india",
      description: (document.getElementById("description") as HTMLTextAreaElement).value,
    }
    onRatesReceived(formData)
    
  }
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" })
  const [weight, setWeight] = useState("")

  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value)
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Submission Form</CardTitle>
          <CardDescription>Enter your product details to get export documentation and HS code</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={handleProductNameChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="category">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Country of Origin</Label>
                <Select defaultValue="india">
                  <SelectTrigger id="origin">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="nepal">Nepal</SelectItem>
                    <SelectItem value="srilanka">Sri Lanka</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dimensions (cm)</Label>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="Length"
                  value={dimensions.length}
                  onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                />
                <Input
                  placeholder="Width"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                />
                <Input
                  placeholder="Height"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product Description</Label>
              <Textarea id="description" placeholder="Describe your product in detail" className="min-h-[100px]" />
            </div>


            <div className="flex justify-end">
              <Button type="button" onClick={()=>sendData()}>Submit Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

