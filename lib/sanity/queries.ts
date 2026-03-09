import { defineQuery } from "next-sanity";

// reusable image fragment
const imageFragment = `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt
`;

// featured listings for homepage
export const FEATURED_PROPERTIES_QUERY = defineQuery(`
  *[_type == "property" && featured == true && status == "active"][0...6] {
    _id,
    title,
    "slug": slug.current,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    address,
    "image": images[0] { ${imageFragment} },
    location
  }
`);

// property search with filters
export const PROPERTIES_SEARCH_QUERY = defineQuery(`
  *[_type == "property" && status == "active"
    && price >= $minPrice && price <= $maxPrice
    && ($beds == 0 || ($bedsIsPlus == true && bedrooms >= $beds) || ($bedsIsPlus == false && bedrooms == $beds))
    && ($baths == 0 || ($bathsIsPlus == true && bathrooms >= $baths) || ($bathsIsPlus == false && bathrooms == $baths))
    && ($type == "" || propertyType == $type)
    && ($city == "" || lower(address.city) match $city + "*" || lower(address.state) match $city + "*" || lower(address.zipCode) match $city + "*")
    && ($minSqft == 0 || squareFeet >= $minSqft)
    && ($maxSqft == 0 || squareFeet <= $maxSqft)
    && ($minYear == 0 || yearBuilt >= $minYear)
    && ($maxYear == 0 || yearBuilt <= $maxYear)
    && ($minLotSize == 0 || lotSize >= $minLotSize)
    && ($maxLotSize == 0 || lotSize <= $maxLotSize)
    && ($daysOnMarket == 0 || dateTime(createdAt) >= dateTime(now()) - 60*60*24*$daysOnMarket)
    && ($openHouse == false || (openHouseDate != null && dateTime(openHouseDate) >= dateTime(now())))
    && ($priceReduced == false || (originalPrice != null && price < originalPrice))
    && ($amenitiesCount == 0 || count((amenities)[@ in $amenities]) == $amenitiesCount)
  ] | order(createdAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    price,
    originalPrice,
    bedrooms,
    bathrooms,
    squareFeet,
    yearBuilt,
    lotSize,
    address,
    "image": images[0] { ${imageFragment} },
    location,
    amenities,
    openHouseDate,
    createdAt,
    propertyType,
    status
  }
`);

// properties count
export const PROPERTIES_COUNT_QUERY = defineQuery(`
  count(*[_type == "property" && status == "active"
    && price >= $minPrice && price <= $maxPrice
    && ($beds == 0 || ($bedsIsPlus == true && bedrooms >= $beds) || ($bedsIsPlus == false && bedrooms == $beds))
    && ($baths == 0 || ($bathsIsPlus == true && bathrooms >= $baths) || ($bathsIsPlus == false && bathrooms == $baths))
    && ($type == "" || propertyType == $type)
    && ($city == "" || lower(address.city) match $city + "*" || lower(address.state) match $city + "*" || lower(address.zipCode) match $city + "*")
    && ($minSqft == 0 || squareFeet >= $minSqft)
    && ($maxSqft == 0 || squareFeet <= $maxSqft)
    && ($minYear == 0 || yearBuilt >= $minYear)
    && ($maxYear == 0 || yearBuilt <= $maxYear)
    && ($minLotSize == 0 || lotSize >= $minLotSize)
    && ($maxLotSize == 0 || lotSize <= $maxLotSize)
    && ($daysOnMarket == 0 || dateTime(createdAt) >= dateTime(now()) - 60*60*24*$daysOnMarket)
    && ($openHouse == false || (openHouseDate != null && dateTime(openHouseDate) >= dateTime(now())))
    && ($priceReduced == false || (originalPrice != null && price < originalPrice))
    && ($amenitiesCount == 0 || count((amenities)[@ in $amenities]) == $amenitiesCount)
  ])
`);

// get property and agent details by id and
export const PROPERTY_DETAIL_QUERY = defineQuery(`
  *[_type == "property" && _id == $id][0] {
    _id,
    title,
    description,
    price,
    propertyType,
    status,
    bedrooms,
    bathrooms,
    squareFeet,
    yearBuilt,
    address,
    location,
    images[] { ${imageFragment} },
    amenities,
    agent-> {
      _id,
      userId,
      name,
      email,
      phone,
      photo { ${imageFragment} },
      bio,
      agency
    }
  }
`);

// agent's listings
export const AGENT_LISTINGS_QUERY = defineQuery(`
  *[_type == "property" && agent._ref == $agentId] | order(createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    price,
    status,
    bedrooms,
    bathrooms,
    "image": images[0] { ${imageFragment} },
    createdAt
  }
`);

// agent's leads
export const AGENT_LEADS_QUERY = defineQuery(`
  *[_type == "lead" && agent._ref == $agentId] | order(createdAt desc) {
    _id,
    buyerName,
    buyerEmail,
    buyerPhone,
    status,
    createdAt,
    property-> {
      _id,
      title,
      "slug": slug.current
    }
  }
`);

// get user profile
export const USER_PROFILE_QUERY = defineQuery(`
  *[_type == "user" && clerkId == $clerkId][0] {
    _id,
    clerkId,
    name,
    email,
    phone,
    photo { ${imageFragment} },
    createdAt
  }
`);

// check if user exists
export const USER_EXISTS_QUERY = defineQuery(`
  *[_type == "user" && clerkId == $clerkId][0]{ _id }
`);

// get agent profile
export const AGENT_PROFILE_QUERY = defineQuery(`
  *[_type == "agent" && userId == $userId][0] {
    _id,
    name,
    email,
    phone,
    photo { ${imageFragment} },
    bio,
    licenseNumber,
    agency,
    onboardingComplete
  }
`);

// get agent by user ID
export const AGENT_BY_USER_ID_QUERY = defineQuery(`
  *[_type == "agent" && userId == $userId][0] {
    _id,
    userId,
    name,
    email,
    onboardingComplete
  }
`);

// get property by id
export const LISTING_BY_ID_QUERY = defineQuery(`
  *[_type == "property" && _id == $id][0] {
    _id,
    title,
    description,
    price,
    propertyType,
    status,
    bedrooms,
    bathrooms,
    squareFeet,
    yearBuilt,
    address,
    location,
    images[] { ${imageFragment} },
    amenities,
    agent
  }
`);

// get user's saved properties
export const USER_SAVED_LISTINGS_QUERY = defineQuery(`
  *[_type == "user" && clerkId == $clerkId][0] {
    savedListings[]-> {
      _id,
      title,
      "slug": slug.current,
      price,
      bedrooms,
      bathrooms,
      squareFeet,
      address,
      "image": images[0] { ${imageFragment} },
      status
    }
  }.savedListings
`);

// get agent for analytics validation
export const ANALYTICS_AGENT_QUERY = defineQuery(`
  *[_type == "agent" && userId == $userId][0]{ _id, name, onboardingComplete }
`);

// properties counts by status
export const ANALYTICS_LISTINGS_TOTAL_QUERY = defineQuery(`
  count(*[_type == "property" && agent._ref == $agentId])
`);

export const ANALYTICS_LISTINGS_ACTIVE_QUERY = defineQuery(`
  count(*[_type == "property" && agent._ref == $agentId && status == "active"])
`);

export const ANALYTICS_LISTINGS_PENDING_QUERY = defineQuery(`
  count(*[_type == "property" && agent._ref == $agentId && status == "pending"])
`);

export const ANALYTICS_LISTINGS_SOLD_QUERY = defineQuery(`
  count(*[_type == "property" && agent._ref == $agentId && status == "sold"])
`);

// lead counts by status
export const ANALYTICS_LEADS_TOTAL_QUERY = defineQuery(`
  count(*[_type == "lead" && agent._ref == $agentId])
`);

export const ANALYTICS_LEADS_NEW_QUERY = defineQuery(`
  count(*[_type == "lead" && agent._ref == $agentId && status == "new"])
`);

export const ANALYTICS_LEADS_CONTACTED_QUERY = defineQuery(`
  count(*[_type == "lead" && agent._ref == $agentId && status == "contacted"])
`);

export const ANALYTICS_LEADS_CLOSED_QUERY = defineQuery(`
  count(*[_type == "lead" && agent._ref == $agentId && status == "closed"])
`);

// top 10 leads grouped
export const ANALYTICS_LEADS_BY_PROPERTY_QUERY = defineQuery(`
  *[_type == "property" && agent._ref == $agentId]{
    "title": title,
    "leadCount": count(*[_type == "lead" && property._ref == ^._id])
  } | order(leadCount desc)[0...10]
`);

// get all amenities
export const AMENITIES_QUERY = defineQuery(`
  *[_type == "amenity"] | order(order asc, label asc) {
    _id,
    value,
    label,
    icon
  }
`);

// get agent id  by user id
export const AGENT_ID_BY_USER_QUERY = defineQuery(`
  *[_type == "agent" && userId == $userId][0]{ _id }
`);

// get onboarded agent
export const AGENT_DASHBOARD_QUERY = defineQuery(`
  *[_type == "agent" && userId == $userId][0]{ _id, name, onboardingComplete }
`);

// check onboarding for agent
export const AGENT_ONBOARDING_CHECK_QUERY = defineQuery(`
  *[_type == "agent" && userId == $userId][0]{ _id, onboardingComplete }
`);

// user contact info for leads
export const USER_CONTACT_QUERY = defineQuery(`
  *[_type == "user" && clerkId == $clerkId][0]{ name, email, phone }
`);

// user with saved IDs
export const USER_SAVED_IDS_QUERY = defineQuery(`
  *[_type == "user" && clerkId == $clerkId][0]{ _id, "savedIds": savedListings[]._ref }
`);

// check existing lead for property/email
export const LEAD_EXISTS_QUERY = defineQuery(`
  *[_type == "lead" && property._ref == $propertyId && buyerEmail == $email][0]{ _id }
`);

// lead with agent ref
export const LEAD_AGENT_REF_QUERY = defineQuery(`
  *[_type == "lead" && _id == $leadId][0]{ agent }
`);

// check property ownership
export const PROPERTY_AGENT_REF_QUERY = defineQuery(`
  *[_type == "property" && _id == $id][0]{ agent }
`);

// count properties by agent
export const DASHBOARD_LISTINGS_COUNT_QUERY = defineQuery(`
  count(*[_type == "property" && agent._ref == $agentId])
`);

// count all leads by agent
export const DASHBOARD_LEADS_COUNT_QUERY = defineQuery(`
  count(*[_type == "lead" && agent._ref == $agentId])
`);

// count new leads by agent
export const DASHBOARD_NEW_LEADS_COUNT_QUERY = defineQuery(`
  count(*[_type == "lead" && agent._ref == $agentId && status == "new"])
`);
