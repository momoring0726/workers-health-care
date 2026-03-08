"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Building2,
  Stethoscope,
  Activity,
  ChevronRight,
  SortAsc,
  SortDesc,
  Filter,
  X
} from "lucide-react";

import { Hospital } from "@/types";

type SortOption = "name-asc" | "name-desc" | "type";
type FacilityType = "All" | "Hospital" | "Clinic" | "Doctor";

export default function HospitalsList({
  initialData,
}: {
  initialData: Hospital[];
}) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FacilityType>("All");
  const [locationFilter, setLocationFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [showFilters, setShowFilters] = useState(false);

  const locations = useMemo(() => {
    const unique = Array.from(
      new Set(
        initialData.map((item) => (item.location || "").trim()).filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [initialData]);

  const filteredAndSorted = useMemo(() => {
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

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "type") {
        const typeOrder = { Hospital: 1, Clinic: 2, Doctor: 3 };
        const aOrder = typeOrder[a.type as keyof typeof typeOrder] || 4;
        const bOrder = typeOrder[b.type as keyof typeof typeOrder] || 4;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return filtered;
  }, [query, typeFilter, locationFilter, sortBy, initialData]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (typeFilter !== "All") count++;
    if (locationFilter !== "All") count++;
    return count;
  }, [typeFilter, locationFilter]);

  const clearFilters = () => {
    setTypeFilter("All");
    setLocationFilter("All");
    setQuery("");
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "Hospital":
        return <Building2 className="w-5 h-5 text-teal-600" />;
      case "Doctor":
        return <Stethoscope className="w-5 h-5 text-cyan-600" />;
      case "Clinic":
      default:
        return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTypeBadgeColor = (type?: string) => {
    switch (type) {
      case "Hospital":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Doctor":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "Clinic":
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const typeOptions: FacilityType[] = ["All", "Hospital", "Clinic", "Doctor"];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Header - Medical Professional */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-blue-600 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
            Accredited Healthcare Facilities
          </h1>
          <p className="text-teal-100 text-sm md:text-base">
            Find accredited hospitals, clinics, and doctors in your area
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar - Always Visible */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search facilities..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-base"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle - Mobile */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <span className="flex items-center gap-2 text-gray-700 font-medium">
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </span>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Filters Section */}
        <div className={`md:block ${showFilters ? 'block' : 'hidden'} mb-4`}>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            {/* Type Filter - Horizontal Scroll Chips */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Facility Type
              </label>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      typeFilter === type
                        ? "bg-teal-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type === "All" ? "All Types" : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Location & Sort Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors text-sm appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: `right 0.5rem center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `1.5em 1.5em`,
                    paddingRight: `2rem`
                  }}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "All" ? "All Locations" : loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full py-2.5 px-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors text-sm appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: `right 0.5rem center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `1.5em 1.5em`,
                    paddingRight: `2rem`
                  }}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="type">Type</option>
                </select>
              </div>
            </div>

            {/* Clear Filters - Mobile */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="mt-4 w-full py-2 text-sm text-teal-600 font-medium hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredAndSorted.length}</span> facility{filteredAndSorted.length !== 1 ? "s" : ""}
            {query && <span> for "{query}"</span>}
          </p>
        </div>

        {/* Results - Mobile Cards */}
        {initialData.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-4">
              <Building2 className="h-7 w-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No facilities available</h3>
            <p className="text-gray-500 text-sm">The directory is currently empty. Please check back later.</p>
          </div>
        ) : filteredAndSorted.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-50 mb-4">
              <Search className="h-7 w-7 text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No matches found</h3>
            <p className="text-gray-500 text-sm mb-4">We couldn't find any facilities matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSorted.map((facility, index) => (
              <div
                key={`${facility.name}-${facility._id || index}`}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gray-50 flex items-center justify-center">
                    {getTypeIcon(facility.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getTypeBadgeColor(facility.type)}`}>
                        {facility.type || "Clinic"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1 truncate">
                      {facility.name}
                    </h3>
                    {facility.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                        <span className="truncate">{facility.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Link Arrow */}
                  {facility.url && (
                    <Link
                      href={facility.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-100 transition-colors"
                      aria-label={`View details for ${facility.name}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
