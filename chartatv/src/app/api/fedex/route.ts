import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const FEDEX_CLIENT_ID = "l7514be6cf18d3422b984ed2d4275b4bac";
const FEDEX_CLIENT_SECRET = "4d7b3cc34fe847c0a75446f2d5dd83b1";
const OAUTH_URL = "https://apis-sandbox.fedex.com/oauth/token";
const RATE_URL = "https://apis-sandbox.fedex.com/rate/v1/rates/quotes";

async function getAccessToken() {
    try {
        const response = await axios.post(OAUTH_URL, new URLSearchParams({
            grant_type: "client_credentials",
            client_id: FEDEX_CLIENT_ID,
            client_secret: FEDEX_CLIENT_SECRET
        }), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        return response.data.access_token;
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
}
interface Address {
    postalCode: string;
    countryCode: string;
}

interface RequestedPackageLineItem {
    weight: { units: string; value: number };
    dimensions: { length: number; width: number; height: number; units: string };
}

interface RequestedShipment {
    shipper: { address: Address };
    recipient: { address: Address };
    pickupType: string;
    serviceType: string;
    packagingType: string;
    requestedPackageLineItems: RequestedPackageLineItem[];
}

interface RequestData {
    requestedShipment: RequestedShipment;
    pickupType: string;
    serviceType: string;
    packagingType: string;
}

async function getShippingRates(accessToken: string, requestData: RequestData) {
    try {
        const response = await axios.post(RATE_URL, {
            accountNumber: { value: "740561073" },
            requestedShipment: {
                shipper: {
                    address: { postalCode: requestData.requestedShipment.shipper.address.postalCode||"110001", countryCode: requestData.requestedShipment.shipper.address.countryCode||"IN" }
                },
                recipient: {
                    address: { postalCode:requestData.requestedShipment.recipient.address.postalCode|| "10001", countryCode: requestData.requestedShipment.recipient.address.countryCode||"US" }
                },
                pickupType: requestData.pickupType||"DROPOFF_AT_FEDEX_LOCATION",
                serviceType: requestData.serviceType||"INTERNATIONAL_PRIORITY",
                packagingType: requestData.packagingType||"YOUR_PACKAGING",
                rateRequestType: ["LIST"],
                requestedPackageLineItems: [
                    {
                        weight: { units: "KG", value: requestData.requestedShipment.requestedPackageLineItems[0].weight.value||5 },
                        dimensions: { length: requestData.requestedShipment.requestedPackageLineItems[0].dimensions.length|| 30, width: requestData.requestedShipment.requestedPackageLineItems[0].dimensions.width||20, height: requestData.requestedShipment.requestedPackageLineItems[0].dimensions.height||10, units: "CM" }
                    }
                ]
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting rates:", error);
        return null;
    }
}
export async function POST(request:NextRequest){
    const token = await getAccessToken();
    console.log(token)
    const requestData = await request.json()
    if(!token) return NextResponse.json({error: "Error getting token"});
    const data = await getShippingRates(token,requestData);
    console.log(data)
    return NextResponse.json(data);
}