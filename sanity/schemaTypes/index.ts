import { type SchemaTypeDefinition } from "sanity";
import { contact } from "./contact";
import { news } from "./news";
import { newsCategory } from "./newsCategory";
import { hospital } from "./hospital";
import { location } from "./location";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contact, news, newsCategory, hospital, location],
};
