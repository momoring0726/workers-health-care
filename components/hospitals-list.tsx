"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Building2,
  Stethoscope,
  Activity,
  ChevronRight
} from "lucide-react";

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

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "Hospital":
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case "Doctor":
        return <Stethoscope className="w-5 h-5 text-teal-600" />;
      case "Clinic":
      default:
        return <Activity className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getTypeBadgeColor = (type?: string) => {
    switch (type) {
      case "Hospital":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Doctor":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Clinic":
      default:
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Premium Header Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-20 relative overflow-hidden">
        {/* Subtle background pattern/overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Healthcare Directory
            </h1>
            <p className="text-blue-100/90 text-lg md:text-xl font-light">
              Find accredited hospitals, clinics, and doctors within the Workers Health Care network.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Filter Section */}
        <div className="rounded-xl bg-white p-4 md:p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, location, or notes..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:w-auto">
              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full sm:w-48 py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
              >
                <option value="All">All Provider Types</option>
                <option value="Hospital">Hospitals</option>
                <option value="Clinic">Clinics</option>
                <option value="Doctor">Doctors</option>
              </select>

              {/* Location Filter */}
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full sm:w-48 py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "All" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 font-medium px-1">
            <span>
              Showing <span className="text-gray-900">{results.length}</span> provider{results.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Results Grid */}
        {initialData.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
              <Search className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No providers available</h3>
            <p className="text-gray-500 max-w-sm mx-auto">The directory is currently empty. Please check back later.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
              <Search className="h-8 w-8 text-blue-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No matches found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any providers matching your search criteria. Try adjusting your filters.</p>
            <button
              onClick={() => {
                setQuery("");
                setTypeFilter("All");
                setLocationFilter("All");
              }}
              className="mt-6 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map((r, i) => (
              <div
                key={`${r.name}-${r._id || i}`}
                className="group relative flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div className="flex-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-3 ${getTypeBadgeColor(r.type)}`}>
                        {r.type || "Clinic"}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
                        {r.name}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                      {getTypeIcon(r.type)}
                    </div>
                  </div>

                  {r.location && (
                    <div className="flex items-start text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                      <span className="leading-tight">{r.location}</span>
                    </div>
                  )}

                  {r.notes && (
                    <div className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100 line-clamp-2">
                      {r.notes}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 group-hover:bg-blue-50/50 transition-colors">
                  <Link
                    href="#"
                    className="flex justify-between items-center text-sm font-medium text-blue-700 w-full"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>View Provider Details</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
