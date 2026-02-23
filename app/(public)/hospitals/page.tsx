import HospitalsList from "@/components/hospitals-list";
import type { Metadata } from "next";
import { publicClient } from "@/sanity/lib/client-public";
import { HOSPITALS_QUERY } from "@/sanity/lib/queries";
import { REVALIDATION_CONFIG } from "@/lib/cache-config";

// ISR: Revalidate every hour for hospitals
export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Healthcare Facilities | Workers Health Care",
  description:
    "Find hospitals, clinics, and healthcare providers in our network across the Philippines.",
  openGraph: {
    title: "Healthcare Facilities | Workers Health Care",
    description:
      "Find hospitals, clinics, and healthcare providers in our network across the Philippines.",
    type: "website",
  },
};

async function fetchHospitals() {
  try {
    const res = await publicClient.fetch(
      HOSPITALS_QUERY,
      {},
      {
        next: {
          tags: REVALIDATION_CONFIG.hospitals.tags,
        },
      },
    );
    return res.map(
      (item: {
        _id: string;
        name: string;
        type?: "Hospital" | "Clinic" | "Doctor";
        location?: { _id?: string; name?: string } | null;
        url?: string;
      }) => ({
        ...item,
        location: item.location?.name || "",
      }),
    );
  } catch (err) {
    console.error("fetchHospitals error:", err);
    throw new Error("Failed to fetch hospitals from Sanity");
  }
}

export default async function HospitalsPage() {
  try {
    const hospitals = await fetchHospitals();
    return <HospitalsList initialData={hospitals} />;
  } catch (err) {
    // Render a simple server-side fallback UI with helpful messaging
    console.error("HospitalsPage error:", err);
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">
              Accredited Hospitals, Clinics & Doctors
            </h1>
            <p className="text-blue-100 mt-1">
              Search the full directory of accredited providers.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-red-600">
              Unable to load directory
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              There was a problem loading the hospitals directory. Please try
              again later. If you are the site administrator, check your Sanity
              configuration and environment variables.
            </p>
          </div>
        </div>
      </main>
    );
  }
}
