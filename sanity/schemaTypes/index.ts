import { type SchemaTypeDefinition } from "sanity";
import { property } from "./schemas/property";
import { agent } from "./schemas/agent";
import { lead } from "./schemas/lead";
import { user } from "./schemas/user";
import { amenity } from "./schemas/amenity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [property, agent, lead, user, amenity],
};
