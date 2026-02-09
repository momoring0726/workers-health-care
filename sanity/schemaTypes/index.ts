import { type SchemaTypeDefinition } from "sanity";
import { contact } from "./contact";
import { news } from "./news";
import { newsCategory } from "./newsCategory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contact, news, newsCategory],
};
