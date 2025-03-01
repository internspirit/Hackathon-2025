"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import gsap from "gsap";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import logo from '../../../public/logo-color.svg'

interface Flashcard {
  title: string;
  content: string;
}

interface Country {
  country: string;
  base_price_there: string;
  competitors: string[];
  export_duties: string;
  selling_price: string;
  rationale: string;
  selected?: boolean;
  profit: string;
}

interface BusinessAnalysis {
  bestSuitedCountries: Country[];
  futurePossibilities: string;
  insights: string;
  recommendations: string;
  hs_code: string;
}

export default function BusinessForm() {
  const [businessData, setBusinessData] = useState({
    name: "",
    industry: "",
    revenue: "",
    employees: "",
    description: "",
  });
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  const formRef = useRef(null);
  const resultsRef = useRef(null);
  const cardRef = useRef(null);

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Manufacturing",
    "Food & Beverage",
    "Handicraft",
    "Agriculture",
    "Automotive",
    "Construction",
    "Education",
    "Energy",
    "Entertainment",
    "Fashion",
    "Logistics",
    "Pharmaceuticals",
    "Real Estate",
    "Telecommunications",
    "Tourism",
    "Transportation",
  ];

  const [hs_code, setHSCode] = useState("");
  useEffect(() => {
    // Initial animation for form
    if (formRef.current && !showFlashcards) {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    // Animation for results when they appear
    if (resultsRef.current && showFlashcards) {
      gsap.from(resultsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [showFlashcards]);

  useEffect(() => {
    // Animation for card transition
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    setBusinessData({
      ...businessData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const geminiApiKey: string = process.env.NEXT_PUBLIC_GEMINI_API || "";
      const response: Response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
          geminiApiKey,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a well-structured JSON response that adheres to the following interfaces:

interface Country {
  country: string;
  base_price_there: string;
  competitors: string[];
  export_duties: string;
  selling_price: string;
  rationale: string;
  profit:string
}

interface BusinessData {
  analysis: {
    bestSuitedCountries: Country[];
    futurePossibilities: string;
    insights: string;
    recommendations: string;
    hs_code: string;
  }
}

Expected JSON Response:
- Future Possibilities: Potential growth areas, market expansion opportunities, or emerging trends for the business.
- Insights: Key takeaways, industry trends, or factors affecting market success.
- Best Suited Countries: A list of countries that are most suitable for this business, including:
  - Base price of the product in that country
  - Competitors in that region
  - Export duties
  - Selling price
  - Rationale for choosing that country
- Recommendations: Strategic suggestions to improve business performance, optimize pricing, or expand market reach.
- HS Code: Harmonized System code for the business product.

Business Context:
Use the following business details to generate the JSON response:
${JSON.stringify(businessData)}

Ensure the response is detailed, data-driven, and realistic, considering global market conditions and industry-specific factors.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const result = await response.json();
      console.log('result of gemini: ',result)
      // Get the response text and clean it
      let responseText = result.candidates[0].content.parts[0].text;

      // Remove the markdown code block indicators and 'json' if present
      responseText = responseText.replace(/^```json\s*/, "");
      responseText = responseText.replace(/```\s*$/, "");
      console.log(responseText);

      // Parse the JSON
      try {
        const parsedData = JSON.parse(responseText);
        console.log(parsedData);
        setHSCode(parsedData.analysis.hs_code);

        // Handle the specific JSON structure we received
        const analysisData: BusinessAnalysis =
          parsedData.analysis || parsedData;

        // Set countries with initial selection state
        const countriesWithSelection = analysisData.bestSuitedCountries.map(
          (country) => ({
            ...country,
            selected: false,
          })
        );
        setCountries(countriesWithSelection);

        // Create flashcards based on the parsed data
        const cards: Flashcard[] = [
          {
            title: "Future Possibilities",
            content: analysisData.futurePossibilities || "No data available",
          },
          {
            title: "Insights",
            content: analysisData.insights || "No data available",
          },
          {
            title: "Recommendations",
            content: analysisData.recommendations || "No data available",
          },
          {
            title: "HS Code",
            content: analysisData.hs_code || "No data available",
          },
          {
            title: "Best Suited Countries",
            content: "Select countries to export to:",
          },
          
        ];
        const response =  await fetch('/api/updateUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bussinessName: businessData.name,
            industry:   businessData.industry,
            revenue:  businessData.revenue,
            employees:  businessData.employees,
            description:  businessData.description,
            hs_code: analysisData.hs_code

          }),
        });

        const data = await response.json();
        console.log(data);
        setFlashcards(cards);
        setShowFlashcards(true);
        setCurrentIndex(0);
        toast.success("Business analysis complete!");
      } catch (e) {
        // If JSON parsing fails, create flashcards from the raw text
        console.error("Failed to parse JSON:", e);
        const cards: Flashcard[] = [
          { title: "Business Analysis", content: responseText },
        ];
        setFlashcards(cards);
        setShowFlashcards(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to analyze business. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountrySelection = (country: Country) => {
    const updatedCountries = countries.map((c) =>
      c.country === country.country ? { ...c, selected: !c.selected } : c
    );

    setCountries(updatedCountries);

    // Update selected countries list
    const newSelectedCountries = updatedCountries.filter((c) => c.selected);
    setSelectedCountries(newSelectedCountries);
  };

  const submitSelectedCountries = async() => {


    try {
      
   
    // Send selected countries to backend
    console.log("Selected countries for export:", selectedCountries);

    // Example API call (uncomment and modify as needed)
    
    const response = await fetch('/api/submit-countries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
      
        countries: selectedCountries 
      })
    })
    const data1 = await response.json();
    console.log(data1); 


   if(response){
      handleFreight();
      getRoDTEPByHSCode(hs_code);
   }
    

    toast.success(`Selected ${selectedCountries.length} countries for export!`);
  } catch (error) {
    console.error("Error submitting countries:", error);
    toast.error("Failed to submit selected countries. Please try again.");
  }

  
  };

  const getRoDTEPByHSCode = async (hsCode: string) => {
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
                    text: `Provide the RoDTEP (Remission of Duties and Taxes on Exported Products) rebate percentage for the given HS code in India. 
  Return a JSON object with the following structure:
  
  interface RoDTEPResponse {
    hs_code: string;
    rodtep_rate: string; // Percentage a  s string
    description: string; // Brief description of the product category
  }
  
  HS Code: ${hsCode}
  
  Ensure the response is **only JSON** without markdown formatting.`
                  }
                ]
              }
            ]
          })
        }
      );
  
      const data = await response.json();
      console.log("Raw API Response:", data);
  
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No valid response from Gemini.");
      }
  
      let responseText = data.candidates[0].content.parts[0].text;
  
      // Clean JSON formatting if Gemini adds markdown formatting
      responseText = responseText.replace(/^```json\s*/, "").replace(/```\s*$/, "");
  
      // Parse JSON safely
      const parsedData = JSON.parse(responseText);
      console.log("RoDTEP Data:", parsedData);
  
      return parsedData;
    } catch (error) {
      console.error("Error fetching RoDTEP rate:", error);
      return null;
    }
  };
  

  const handleFreight = async () => {
    setIsLoading(true);
  
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
                    text: `Generate a well-structured JSON response that adheres to the following interface:
  
  interface TransportCost {
    country: string;
    transport_modes: {
      airway: {
        cost: string;
        estimated_time: string;
      };
      waterway: {
        cost: string;
        estimated_time: string;
      };
      railway: {
        cost: string;
        estimated_time: string;
      };
    };
  }
  
  Expected JSON Response:
  - A list of countries with the estimated transportation costs and delivery times for the following transport modes **from india** to these countries per kg rate:
    - **Airway**: Cost and estimated delivery time
    - **Waterway**: Cost and estimated delivery time
    - **Railway**: Cost and estimated delivery time
  
  Countries to Analyze:
  ${JSON.stringify(selectedCountries)}
  
  Ensure the response is realistic, based on global logistics data, fuel costs, and distance-based estimations.`
                  }
                ]
              }
            ]
          })
        }
      );
  
      const data = await response.json();
      console.log("Freight Transport Costs:", data);
      let responseText = data.candidates[0].content.parts[0].text;

      // Remove the markdown code block indicators and 'json' if present
      responseText = responseText.replace(/^```json\s*/, "");
      responseText = responseText.replace(/```\s*$/, "");
      console.log(responseText);

      // Parse the JSON
    
        const parsedData = JSON.parse(responseText);
        console.log(parsedData);
    } catch (error) {
      console.error("Error fetching freight data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const nextCard = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
      },
    });
  };

  const prevCard = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
        );
      },
    });
  };

  const resetForm = () => {
    gsap.to(resultsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      onComplete: () => {
        setShowFlashcards(false);
        setBusinessData({
          name: "",
          industry: "",
          revenue: "",
          employees: "",
          description: "",
        });
        setCountries([]);
        setSelectedCountries([]);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium transition">
            <Image src={logo} alt="" className="size-14 rounded-full"/>
        </Link>
      </div>
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {!showFlashcards ? (
          <div className="p-8" ref={formRef}>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Business Export Analysis
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg shadow-inner mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Business Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={businessData.name}
                    placeholder="Enter your business name"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={businessData.industry}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="revenue"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Annual Revenue ($)
                    </label>
                    <input
                      id="revenue"
                      type="number"
                      name="revenue"
                      value={businessData.revenue}
                      placeholder="e.g. 100000"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="employees"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Number of Employees
                    </label>
                    <input
                      id="employees"
                      type="number"
                      name="employees"
                      value={businessData.employees}
                      placeholder="e.g. 10"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={businessData.description}
                  placeholder="Describe your products, services, current markets, and export goals in detail..."
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-4 mt-6 rounded-lg text-white font-medium transition transform hover:scale-105 ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing Export Opportunities...
                  </span>
                ) : (
                  "Analyze Export Potential"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8" ref={resultsRef}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Business Export Analysis
            </h2>

            <div
              ref={cardRef}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md mb-6"
            >
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                {flashcards[currentIndex].title}
              </h3>

              {currentIndex === flashcards.length - 1 ? (
  <div className="overflow-hidden rounded-lg border border-gray-200">
    {/* Desktop/Tablet View - Hidden on small screens */}
    <div className="hidden md:block">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow className="bg-blue-100">
            <TableHead className="w-10 p-1">✓</TableHead>
            <TableHead className="w-1/7">Country</TableHead>
            <TableHead className="w-1/7">Base Price</TableHead>
            <TableHead className="w-1/7">Competitors</TableHead>
            <TableHead className="w-1/7">Export Duties</TableHead>
            <TableHead className="w-1/7">Selling Price</TableHead>
            <TableHead className="w-1/7">Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {countries.map((country, index) => (
            <TableRow
              key={index}
              className={
                country.selected ? "bg-blue-50" : "hover:bg-gray-50 border"
              }
            >
              <TableCell className="p-1 align-top">
                <Checkbox
                  checked={country.selected}
                  onCheckedChange={() => handleCountrySelection(country)}
                  className="h-4 w-4"
                />
              </TableCell>
              <TableCell className="font-medium align-top break-words whitespace-normal">
                {country.country}
              </TableCell>
              <TableCell className="align-top break-words whitespace-normal">
                {country.base_price_there}
              </TableCell>
              <TableCell className="align-top break-words whitespace-normal">
                {Array.isArray(country.competitors)
                  ? country.competitors.map((comp, i) => (
                      <div key={i} className="mb-1">
                        {comp}
                      </div>
                    ))
                  : country.competitors}
              </TableCell>
              <TableCell className="align-top break-words whitespace-normal">
                {country.export_duties}
              </TableCell>
              <TableCell className="align-top break-words whitespace-normal">
                {country.selling_price}
              </TableCell>
              <TableCell className="align-top break-words whitespace-normal">
                {country.profit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Mobile View - Shown only on small screens */}
    <div className="md:hidden">
      {countries.map((country, index) => (
        <div 
          key={index} 
          className={`p-4 border-b ${country.selected ? "bg-blue-50" : ""}`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg">{country.country}</span>
            <Checkbox
              checked={country.selected}
              onCheckedChange={() => handleCountrySelection(country)}
              className="h-4 w-4"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <span className="text-gray-600 text-sm">Base Price:</span>
              <div>{country.base_price_there}</div>
            </div>
            
            <div>
              <span className="text-gray-600 text-sm">Selling Price:</span>
              <div>{country.selling_price}</div>
            </div>
            
            <div>
              <span className="text-gray-600 text-sm">Profit:</span>
              <div>{country.profit}</div>
            </div>
            
            <div>
              <span className="text-gray-600 text-sm">Export Duties:</span>
              <div>{country.export_duties}</div>
            </div>
          </div>
          
          <div className="mt-2">
            <span className="text-gray-600 text-sm">Competitors:</span>
            <div>
              {Array.isArray(country.competitors)
                ? country.competitors.join(", ")
                : country.competitors}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="p-4 bg-blue-50 border-t">
      <div className="mb-4">
        <h4 className="font-bold text-blue-800 mb-2">
          Selected Countries: {selectedCountries.length}
        </h4>
        {selectedCountries.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedCountries.map((country, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {country.country}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No countries selected
          </p>
        )}
      </div>

      <button
        onClick={submitSelectedCountries}
        disabled={selectedCountries.length === 0}
        className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${
          selectedCountries.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Submit Selected Countries
      </button>
    </div>
  </div>
) : (
  // Regular flashcard content
  <div className="text-gray-700 whitespace-pre-line min-h-32">
    {flashcards[currentIndex].content}
  </div>
)}
              <div className="flex justify-between items-center mt-8">
                <span className="text-sm text-gray-500">
                  {currentIndex + 1} of {flashcards.length}
                </span>
                <div className="flex space-x-3">
                  <button
                    onClick={prevCard}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition transform hover:scale-105"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextCard}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition transform hover:scale-105"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition transform hover:scale-105"
            >
              Start New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
