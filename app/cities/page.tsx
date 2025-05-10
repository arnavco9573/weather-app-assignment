"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useCities } from "@/app/hooks/useCities";
import { City } from "@/app/types";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";
import {
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiExternalLink,
} from "react-icons/fi";

export default function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { cities, loading, hasMore, loadCities, error } =
    useCities(searchQuery);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof City;
    direction: "asc" | "desc";
  } | null>(null);
  const [filters, setFilters] = useState<Partial<Record<keyof City, string>>>({
    name: "",
    cou_name_en: "",
    timezone: "",
  });

  // Load initial data
  useEffect(() => {
    loadCities();
  }, []);

  // Autocomplete suggestions (top 5 matches)
  const suggestions = useMemo(() => {
    return cities
      .filter((city) =>
        (city.ascii_name?.toLowerCase() ?? "").includes(
          inputValue.toLowerCase()
        )
      )
      .slice(0, 5);
  }, [cities, inputValue]);

  // Apply sorting
  const sortedCities = useMemo(() => {
    let sortableItems = [...cities];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key] ?? "";
        const bValue = b[sortConfig.key] ?? "";

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [cities, sortConfig]);

  // Apply column filters
  const filteredCities = useMemo(() => {
    return sortedCities.filter((city) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // Skip empty filters

        const cityValue =
          city[key as keyof City]?.toString().toLowerCase() || "";
        return cityValue.includes(value.toLowerCase());
      });
    });
  }, [sortedCities, filters]);

  const requestSort = (key: keyof City) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Debounced search
  const handleSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 300);

  if (loading && cities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error Loading Cities</h2>
          <p className="text-gray-600 mb-4">
            {error.message || "Failed to fetch city data"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <h1 className="text-3xl font-bold">Cities Directory</h1>
            <p className="opacity-90 mt-1">Explore cities around the world</p>
          </div>

          {/* Search with Autocomplete */}
          <div className="p-6 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search cities..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {inputValue && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((city, index) => (
                    <li
                      key={`${city.geoname_id}-${city.coordinates.lat}-${city.coordinates.lon}-${city.ascii_name}-${index}`}
                      className="p-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between"
                      onClick={() => {
                        setInputValue(city.ascii_name);
                        setSearchQuery(city.ascii_name);
                      }}
                    >
                      <div>
                        <p className="font-medium">{city.ascii_name}</p>
                        <p className="text-sm text-gray-500">
                          {city.cou_name_en}
                        </p>
                      </div>
                      <FiExternalLink className="text-gray-400" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Cities Table */}
          <div className="overflow-x-auto">
            <InfiniteScroll
              dataLength={filteredCities.length}
              next={loadCities}
              hasMore={hasMore}
              loader={
                <div className="p-4 text-center bg-white">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              }
              endMessage={
                <div className="p-4 text-center text-gray-500 bg-white">
                  No more cities to load
                </div>
              }
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* City Column */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("ascii_name")}
                    >
                      <div className="flex items-center">
                        City
                        {sortConfig?.key === "ascii_name" ? (
                          sortConfig.direction === "asc" ? (
                            <FiChevronUp className="ml-1" />
                          ) : (
                            <FiChevronDown className="ml-1" />
                          )
                        ) : (
                          <span className="ml-1 opacity-0">
                            <FiChevronUp />
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Filter..."
                        value={filters.name}
                        onChange={(e) =>
                          setFilters({ ...filters, name: e.target.value })
                        }
                        className="mt-2 w-full px-2 py-1 border rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </th>

                    {/* Country Column */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("cou_name_en")}
                    >
                      <div className="flex items-center">
                        Country
                        {sortConfig?.key === "cou_name_en" ? (
                          sortConfig.direction === "asc" ? (
                            <FiChevronUp className="ml-1" />
                          ) : (
                            <FiChevronDown className="ml-1" />
                          )
                        ) : (
                          <span className="ml-1 opacity-0">
                            <FiChevronUp />
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Filter..."
                        value={filters.cou_name_en}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            cou_name_en: e.target.value,
                          })
                        }
                        className="mt-2 w-full px-2 py-1 border rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </th>

                    {/* Timezone Column */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("timezone")}
                    >
                      <div className="flex items-center">
                        Timezone
                        {sortConfig?.key === "timezone" ? (
                          sortConfig.direction === "asc" ? (
                            <FiChevronUp className="ml-1" />
                          ) : (
                            <FiChevronDown className="ml-1" />
                          )
                        ) : (
                          <span className="ml-1 opacity-0">
                            <FiChevronUp />
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Filter..."
                        value={filters.timezone}
                        onChange={(e) =>
                          setFilters({ ...filters, timezone: e.target.value })
                        }
                        className="mt-2 w-full px-2 py-1 border rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCities.map((city, index) => (
                    <tr
                      key={`${city.geoname_id}-${city.coordinates.lat}-${city.coordinates.lon}-${city.ascii_name}-${index}`}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`/weather/${encodeURIComponent(
                            city.ascii_name ?? ""
                          )}`}
                          className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                          onClick={(e) => e.preventDefault()}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            window.open(
                              `/weather/${encodeURIComponent(
                                city.ascii_name ?? ""
                              )}`,
                              "_blank"
                            );
                          }}
                        >
                          {city.ascii_name}
                          <FiExternalLink className="ml-2 text-gray-400" />
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-2">🌍</span>
                          {city.cou_name_en}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {city.timezone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
