import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for fast public content delivery
});
