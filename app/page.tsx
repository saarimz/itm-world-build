'use client';

import { Typography } from "@/components/Typography";
import WorldContent from "@/components/mainapp/world/WorldContent";
import { GetPublicMomentsByBrandResponse } from "@/types/graphql";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";


const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV!

const GRAPHQL_ENDPOINT = APP_ENV === "production" ? "https://itm-backend-production.up.railway.app/graphql" : "https://itm-backend-staging.up.railway.app/graphql";

const BRAND_UID = APP_ENV === "production" ? "f03c5f9b-625f-4c33-adf3-0f2e5451a35c" : "bc90c4e8-34a1-4b0e-b6fa-bafede3f20e0";

const worldMomentsQuery = `
  query GetPublicMomentsByBrand($brandUid: String!, $password: String!) {
    getPublicMomentsByBrand(brandUid: $brandUid, password: $password) {
      createdAt
      blurb
      description
      endDate
      name
      startDate
      status
      uid
      updatedAt
      isPrivate
      cursor
      brand {
        uid
        name
        slug
        bio
      }
      coverImage {
        uid
        url
        placeholderUrl
        mimeType
        dimensions {
          width
          height
        }
      }
      venue {
        address
        city
        country
        uid
        name
        postalCode
      }
      slug
      hasTicketingProvider
      hideVenueUntilRsvp
      externalUrl
      timezone
      type
      hideDates
    }
  }
`;

export default function WorldDropsPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [moments, setMoments] = useState<GetPublicMomentsByBrandResponse["data"]["getPublicMomentsByBrand"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: worldMomentsQuery,
          variables: {
            brandUid: BRAND_UID,
            password: password
          }
        }),
      });

      if (!result.ok) {
        throw new Error("Failed to fetch moments");
      }

      const data = await result.json() as GetPublicMomentsByBrandResponse;
      
      if ((data as any).errors) {
        setError((data as any).errors[0]?.message || "Authentication failed");
        return;
      }

      setMoments(data.data.getPublicMomentsByBrand);
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
      setError("Error fetching moments");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <WorldContent initialMoments={moments} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 border-black border-[2px] rounded-[10px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 mb-8">
            <Image src="/wb.png" alt="World Build" width={128} height={128} className="w-24 h-24" />
            <Typography variant="body04" as="p" className="text-gray-400">
              Feb 21 - Feb 28, Buenos Aires, Argentina
            </Typography>
            </div>
            <Typography variant="body04" as="p" className="text-gray-400">
              Enter password to continue
            </Typography>
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="flex justify-center border-2 border-red-500 p-2 rounded-md">
            <Typography variant="body04" className="text-red-500 text-center">
              {error}
            </Typography>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md bg-white text-black border-black border-[2px] font-medium transition-colors
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            {isLoading ? 'Loading...' : 'Enter'}
          </Button>
        </form>
      </div>
    </div>
  );
}