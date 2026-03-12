import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

interface HospitalRow {
  name: string;
  type: "Hospital" | "Clinic" | "Doctor";
  location: string;
  url?: string;
}

interface LocationMap {
  [name: string]: string;
}

// Create client lazily inside the handler to ensure env vars are available
function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-08";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !dataset || !token) {
    throw new Error(
      `Missing Sanity env vars: ${[
        !projectId && "NEXT_PUBLIC_SANITY_PROJECT_ID",
        !dataset && "NEXT_PUBLIC_SANITY_DATASET",
        !token && "SANITY_API_WRITE_TOKEN",
      ]
        .filter(Boolean)
        .join(", ")}`
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}

// Parse CSV from text
function parseCSV(csvText: string): HospitalRow[] {
  const lines = csvText.split("\n");
  const hospitals: HospitalRow[] = [];

  let isHeader = true;
  for (const line of lines) {
    if (!line.trim()) continue;

    if (isHeader) {
      isHeader = false;
      continue;
    }

    const [name, type, location, url] = line.split(",").map((s) => s.trim());

    if (name && type && location) {
      hospitals.push({
        name,
        type: type as "Hospital" | "Clinic" | "Doctor",
        location,
        url: url || undefined,
      });
    }
  }

  return hospitals;
}

async function upsertLocation(
  client: ReturnType<typeof createClient>,
  locationName: string,
  locationMap: LocationMap
): Promise<string> {
  if (locationMap[locationName]) {
    return locationMap[locationName];
  }

  const existing = await client.fetch<{ _id: string }>(
    `*[_type == "location" && name == $name][0]`,
    { name: locationName }
  );

  if (existing && existing._id) {
    locationMap[locationName] = existing._id;
    return existing._id;
  }

  const newLocation = await client.create({
    _type: "location",
    name: locationName,
  });

  locationMap[locationName] = newLocation._id;
  return newLocation._id;
}

async function createHospital(
  client: ReturnType<typeof createClient>,
  hospital: HospitalRow,
  locationId: string
): Promise<void> {
  const doc = {
    _type: "hospital",
    name: hospital.name,
    type: hospital.type,
    location: {
      _type: "reference",
      _ref: locationId,
    },
    ...(hospital.url && { url: hospital.url }),
  };

  await client.create(doc);
}

export async function POST(request: NextRequest) {
  try {
    // Create client inside handler so env vars are resolved at runtime
    const client = getSanityClient();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.name.endsWith(".csv")) {
      return NextResponse.json(
        { error: "File must be CSV format" },
        { status: 400 }
      );
    }

    const csvText = await file.text();
    const hospitals = parseCSV(csvText);

    if (hospitals.length === 0) {
      return NextResponse.json(
        { error: "CSV file is empty or has invalid format" },
        { status: 400 }
      );
    }

    const locationMap: LocationMap = {};

    // Use batched transactions for better performance and to avoid timeouts
    const transaction = client.transaction();

    // First pass: collect unique locations and upsert them
    for (const hospital of hospitals) {
      await upsertLocation(client, hospital.location, locationMap);
    }

    // Second pass: batch create all hospitals in a single transaction
    for (const hospital of hospitals) {
      const locationId = locationMap[hospital.location];
      transaction.create({
        _type: "hospital",
        name: hospital.name,
        type: hospital.type,
        location: {
          _type: "reference",
          _ref: locationId,
        },
        ...(hospital.url && { url: hospital.url }),
      });
    }

    await transaction.commit();

    return NextResponse.json({
      success: true,
      message: `✅ Imported ${hospitals.length} hospitals successfully`,
      count: hospitals.length,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      {
        error: "Import failed. Check server logs for details.",
      },
      { status: 500 }
    );
  }
}
