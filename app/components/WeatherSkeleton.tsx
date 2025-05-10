import React from "react";

export const WeatherSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto animate-pulse">
        {/* Back button skeleton */}
        <div className="h-10 w-24 bg-gray-300 rounded-lg mb-6"></div>

        {/* Main card skeleton */}
        <div className="bg-white/80 rounded-xl shadow-xl overflow-hidden">
          {/* Current weather section */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="h-8 w-48 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 w-64 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center">
                <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                <div className="ml-4">
                  <div className="h-12 w-24 bg-gray-300 rounded"></div>
                  <div className="h-6 w-32 bg-gray-300 rounded mt-2"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="h-5 w-20 bg-gray-300 rounded"></div>
                  <div className="h-7 w-full bg-gray-300 rounded mt-2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Forecast section */}
          <div className="bg-gray-50/80 p-6 md:p-8">
            <div className="h-7 w-48 bg-gray-300 rounded mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="h-6 w-16 bg-gray-300 rounded"></div>
                  <div className="h-16 w-16 bg-gray-300 rounded-full mx-auto my-3"></div>
                  <div className="flex justify-between">
                    <div className="h-6 w-10 bg-gray-300 rounded"></div>
                    <div className="h-6 w-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
