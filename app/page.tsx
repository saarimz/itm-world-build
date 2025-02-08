import { Typography } from "@/components/Typography";
import WorldContent from "@/components/mainapp/world/WorldContent";
import { GetWorldMomentsResponse } from "@/types/graphql";

const GRAPHQL_ENDPOINT = "https://itm-backend-staging.up.railway.app/graphql";

export const dynamic = "force-dynamic";

const worldMomentsQuery = `
  query GetWorldMoments {
    getWorldMoments {
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

export default async function WorldDropsPage() {
  const result = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: worldMomentsQuery,
    }),
  });

  if (!result.ok) {
    return (
      <div className="container py-12">
        <Typography variant="h1" as="h1" className="mb-8 text-red-500">
          Error fetching moments
        </Typography>
      </div>
    );
  }

  const data = (await result.json()) as GetWorldMomentsResponse;
  const moments = data.data.getWorldMoments;

  return <WorldContent initialMoments={moments} />;
}