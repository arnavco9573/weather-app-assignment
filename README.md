# 🌦️ Weather Forecast Application

A modern, responsive weather forecast web application built with **Next.js 13**, **TypeScript**, and **Tailwind CSS**. Get real-time weather updates and 5-day forecasts for cities worldwide.

![Weather App Screenshot](public/screenshot.png) <!-- Replace with your actual screenshot path -->

---

## 🔥 Features

- 🌍 **Global City Search** — Find weather information for any city worldwide.
- ⏳ **Real-time Data** — View current temperature, humidity, and wind speed.
- 📅 **5-Day Forecast** — Detailed weather predictions for upcoming days.
- 🗺️ **Interactive City Table** — Sort, filter, and search through thousands of cities.
- 🌈 **Dynamic UI** — Weather-based backgrounds and icons.
- 📱 **Responsive Design** — Optimized for all devices and screen sizes.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 13 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks
- **Type Checking**: TypeScript
- **Icons**: React Icons
- **APIs**:
  - [OpenWeatherMap](https://openweathermap.org/) (Weather Data)
  - [GeoNames](https://www.geonames.org/) (City Data)

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v16+)
- npm or yarn
- [OpenWeatherMap API Key](https://openweathermap.org/appid) (Free Tier Available)

---

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app

# Install dependencies
npm install
# or
yarn install

```

### 🔐 Configuration
- Create a `.env` file in the root directory of the project and add your OpenWeather API key.

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=YOUR_API_KEY
```

### 🚀 Running the app

```bash
# Run the development server
npm run dev
# or
yarn dev

# Build the application for production
npm run build
# or
yarn build
```

### Project Structure

```bash
weather-forecast-app/
├── app/
│   ├── cities/               # Cities listing page
│   ├── weather/[city]/       # Dynamic weather pages
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # Reusable components
├── hooks/                    # Custom hooks
├── lib/                      # Utility functions and API calls
├── types/                    # TypeScript type definitions
├── public/                   # Static assets
├── styles/                   # Global styles
├── .env.                     # Environment variables
├── next.config.js            # Next.js configuration
```