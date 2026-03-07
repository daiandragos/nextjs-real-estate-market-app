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

// listings to be displayed in home page
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
