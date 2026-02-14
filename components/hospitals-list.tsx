"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type Entry = {
  _id?: string;
  name: string;
  type?: "Hospital" | "Clinic" | "Doctor";
  location?: string;
  notes?: string;
};

export default function HospitalsList({
  initialData,
}: {
  initialData: Entry[];
}) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | Entry["type"]>("All");
  const [locationFilter, setLocationFilter] = useState<"All" | string>("All");

  const locations = useMemo(() => {
    const unique = Array.from(
      new Set(
        initialData.map((item) => (item.location || "").trim()).filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [initialData]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = initialData.filter((d) => {
      if (typeFilter !== "All" && d.type !== typeFilter) return false;
      if (locationFilter !== "All") {
        if ((d.location || "").trim() !== locationFilter) return false;
      }
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        (d.location || "").toLowerCase().includes(q) ||
        (d.notes || "").toLowerCase().includes(q)
      );
    });

    return filtered;
  }, [query, typeFilter, locationFilter, initialData]);

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
        <div className="rounded-lg bg-white p-6 shadow-md mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hospitals, clinics or doctors..."
              className="flex-1 rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="rounded-md border border-gray-200 px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Hospital">Hospitals</option>
              <option value="Clinic">Clinics</option>
              <option value="Doctor">Doctors</option>
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-md border border-gray-200 px-3 py-2"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="rounded-lg bg-white p-0 shadow-sm overflow-x-auto">
          {initialData.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-600">
              No providers available at the moment.
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-600">
              No providers found.
            </div>
          ) : (
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                    Provider
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {results.map((r, i) => (
                  <tr key={`${r.name}-${r._id || i}`}>
                    <td className="px-4 py-3 align-top">
                      <div className="font-semibold text-gray-900">
                        {r.name}
                      </div>
                      {r.notes && (
                        <div className="text-sm text-gray-600 mt-1">
                          {r.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-gray-700">
                      {r.type || "Hospital"}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-gray-700">
                      {r.location || "—"}
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <Link
                        href="#"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
