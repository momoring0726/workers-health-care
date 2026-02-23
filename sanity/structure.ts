import type { StructureResolver } from "sanity/structure";
import { SINGLETON_IDS } from "./constants";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Contact as a singleton
      S.listItem()
        .title("Contact Information")
        .id("contact")
        .child(
          S.editor().schemaType("contact").documentId(SINGLETON_IDS.CONTACT),
        ),
      // Other document types
      ...S.documentTypeListItems().filter((item) => item.getId() !== "contact"),
    ]);
