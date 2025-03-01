"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Filter, Home, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for MSME products
const products = [
  {
    id: 1,
    name: "Handcrafted Bamboo Basket",
    price: 499,
    originalPrice: 699,
    description: "Eco-friendly bamboo basket handcrafted by local artisans. Perfect for storage and decoration.",
    category: "Handicrafts",
    rating: 4.5,
    seller: "Green Crafts Co-operative",
    location: "West Bengal",
    inStock: true,
  },
  {
    id: 2,
    name: "Organic Honey (500g)",
    price: 350,
    originalPrice: 400,
    description: "Pure, unprocessed honey sourced from Himalayan beekeepers. No additives or preservatives.",
    category: "Food Products",
    rating: 4.8,
    seller: "Mountain Bee Collective",
    location: "Uttarakhand",
    inStock: true,
  },
  {
    id: 3,
    name: "Handloom Cotton Saree",
    price: 1299,
    originalPrice: 1599,
    description: "Traditional handloom cotton saree with natural dyes. Supports rural women weavers.",
    category: "Textiles",
    rating: 4.6,
    seller: "Women Weavers Association",
    location: "Tamil Nadu",
    inStock: true,
  },
  {
    id: 4,
    name: "Brass Door Knocker",
    price: 850,
    originalPrice: 950,
    description: "Handcrafted brass door knocker with traditional designs. Made by skilled metalworkers.",
    category: "Home Decor",
    rating: 4.3,
    seller: "Heritage Metals",
    location: "Rajasthan",
    inStock: false,
  },
  {
    id: 5,
    name: "Terracotta Cookware Set",
    price: 1499,
    originalPrice: 1899,
    description: "Traditional clay cookware set. Enhances flavor and retains nutrients in food.",
    category: "Kitchen",
    rating: 4.7,
    seller: "Clay Crafts Collective",
    location: "Gujarat",
    inStock: true,
  },
  {
    id: 6,
    name: "Jute Laptop Bag",
    price: 599,
    originalPrice: 799,
    description: "Eco-friendly jute laptop bag with cotton lining. Durable and sustainable.",
    category: "Accessories",
    rating: 4.2,
    seller: "Green Earth Enterprises",
    location: "West Bengal",
    inStock: true,
  },
  {
    id: 7,
    name: "Wooden Puzzle Set",
    price: 399,
    originalPrice: 499,
    description: "Educational wooden puzzle set for children. Made from sustainable wood sources.",
    category: "Toys",
    rating: 4.4,
    seller: "Rural Craftsmen Collective",
    location: "Karnataka",
    inStock: true,
  },
  {
    id: 8,
    name: "Khadi Cotton Shirt",
    price: 899,
    originalPrice: 1099,
    description: "Handspun and handwoven khadi cotton shirt. Breathable and comfortable for all seasons.",
    category: "Clothing",
    rating: 4.5,
    seller: "Khadi Gramodyog",
    location: "Gujarat",
    inStock: true,
  },
  {
    id: 9,
    name: "Coconut Shell Bowls (Set of 4)",
    price: 599,
    originalPrice: 699,
    description: "Eco-friendly serving bowls made from coconut shells. Each piece is unique and handcrafted.",
    category: "Kitchen",
    rating: 4.3,
    seller: "Coastal Crafts Cooperative",
    location: "Kerala",
    inStock: false,
  },
  {
    id: 10,
    name: "Handmade Leather Journal",
    price: 450,
    originalPrice: 550,
    description: "Genuine leather journal with handmade paper. Perfect for sketching and writing.",
    category: "Stationery",
    rating: 4.6,
    seller: "Artisan Paper Works",
    location: "Madhya Pradesh",
    inStock: true,
  },
  {
    id: 11,
    name: "Spice Mix Gift Box",
    price: 699,
    originalPrice: 899,
    description: "Assortment of premium Indian spices in a handcrafted wooden box. Perfect gift for food lovers.",
    category: "Food Products",
    rating: 4.7,
    seller: "Spice Route Collective",
    location: "Kerala",
    inStock: true,
  },
  {
    id: 12,
    name: "Recycled Plastic Floor Mat",
    price: 799,
    originalPrice: 999,
    description: "Durable floor mat made from recycled plastic. Water-resistant and easy to clean.",
    category: "Home Decor",
    rating: 4.1,
    seller: "Green Living Initiative",
    location: "Maharashtra",
    inStock: true,
  },
]

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")

  const categories = ["All", ...new Set(products.map((product) => product.category))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <header className="sticky top-0 z-10 border-b bg-background w-full flex items-center justify-center">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span className="font-semibold">MSME Marketplace</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Sell Products
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight">MSME & Small Scale Products</h1>
              <div className="flex w-full sm:w-auto items-center gap-2">
                <Input
                  placeholder="Search products..."
                  className="w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Products</SheetTitle>
                      <SheetDescription>Narrow down products by category, price range, and more.</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Categories</h3>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={() => {
                          setCategoryFilter("All")
                          setSearchTerm("")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        {!product.inStock && (
                          <Badge variant="outline" className="bg-muted text-muted-foreground">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        {product.category} • {product.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="ml-1 text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">• {product.seller}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                        )}
                        {product.originalPrice > product.price && (
                          <Badge variant="secondary" className="ml-auto">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" disabled={!product.inStock}>
                        {product.inStock ? "Add to Cart" : "Notify When Available"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 MSME Marketplace. Supporting small businesses across India.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

