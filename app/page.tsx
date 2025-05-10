import Link from "next/link";
import { FiSearch, FiMapPin, FiGlobe, FiBarChart2 } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Global Weather <span className="text-blue-600">Insights</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Explore real-time weather data, forecasts, and climate information for
          cities worldwide
        </p>

        <div className="max-w-md mx-auto relative">
          <Link href="/cities">
            <div className="cursor-pointer">
              <Link href="/cities">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  Browse Cities
                </button>
              </Link>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FiMapPin className="text-blue-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p className="text-gray-600">
                Access weather data for thousands of cities across every
                continent
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-indigo-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 p-4 rounded-full">
                  <FiGlobe className="text-indigo-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Forecasts</h3>
              <p className="text-gray-600">
                5-day forecasts with temperature, humidity, wind speed and more
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-purple-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <FiBarChart2 className="text-purple-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Data</h3>
              <p className="text-gray-600">
                Sort and filter city data to find exactly what you need
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Weather Insights App</p>
          <p className="text-gray-400 mt-2 text-sm">
            Data provided by OpenWeatherMap and Geonames
          </p>
        </div>
      </footer>
    </div>
  );
}
