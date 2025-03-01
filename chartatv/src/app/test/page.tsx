"use client";

import { useState } from "react";
import { OpenAI } from "openai";

export default function CompanyDataExtractor() {
  const [url, setUrl] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [companyData, setCompanyData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, // Use a public env variable
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true, // Required for client-side use
  });

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCompanyData(null);

    try {
      const response = await openai.chat.completions.create({
        model: "llama3-8b-8192", // Change model as needed
        messages: [
          {
            role: "system",
            content:
              "You are an AI that extracts structured business information from a company's website. Return the response in JSON format only dont give text before and after it. For revenue just give one number and for employees just give one number not any range.",
          },
          {
            role: "user",
            content: `Extract the following details from ${url} and return a JSON object with these fields:
            
            {
              "Businessname": "",
              "industry": "",
              "revenue": "",
              "employees": "",
              "description": ""
            }

            - "revenue" should contain the company's annual revenue as a string (e.g., "$10M", "$500K", etc.).
            - If any field is missing from the website, return an empty string "".
            - Ensure the response is in proper JSON format.`,
          },
        ],
      });

      console.log("Response:", response);

      // Parse the response into JSON
      const content = response.choices[0].message.content;
      if (content) {
        const extractedData = JSON.parse(content);
        setCompanyData(extractedData);
      } else {
        setCompanyData({ error: "No content received from API" });
      }
     
    } catch (error) {
      console.error("Error:", error);
      setCompanyData({ error: "Failed to extract data" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Company Data Extractor</h1>
      <form onSubmit={handleExtract} className="space-y-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter company website URL..."
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Extracting..." : "Extract Data"}
        </button>
      </form>

      {companyData && (
        <pre className="mt-4 text-wrap p-2 border bg-gray-100 text-sm">{JSON.stringify(companyData, null, 2)}</pre>
      )}
    </div>
  );
}
