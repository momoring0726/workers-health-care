import type { StructureResolver } from "sanity/structure";

const CONTACT_ID = "d74f0679-a2c2-454f-b4f5-e1ad553393a2";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Contact as a singleton
      S.listItem()
        .title("Contact Information")
        .id("contact")
        .child(S.editor().schemaType("contact").documentId(CONTACT_ID)),
      // Other document types
      ...S.documentTypeListItems().filter((item) => item.getId() !== "contact"),
    ]);
