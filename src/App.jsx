// App.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import Sidebar from "./components/Sidebar";
import Legend from "./components/Legend";
import QuakeMarkers from "./components/QuakeMarkers";
import MapFocus from "./components/MapFocus";

const USGS_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export default function App() {
  const [quakes, setQuakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedQuake, setSelectedQuake] = useState(null);

  // Sidebar toggle for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔄 Fetch earthquake data
  useEffect(() => {
    let cancelled = false;

    async function fetchQuakes() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(USGS_URL);
        if (!res.ok) throw new Error("Network response was not ok");

        const json = await res.json();
        if (!cancelled) setQuakes(json.features || []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to fetch data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchQuakes();
    return () => { cancelled = true; };
  }, [refreshKey]);

  // 🔄 Refresh handler
  const refreshData = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  // 🎯 Filtered & sorted quakes
  const filtered = useMemo(() => {
    return quakes
      .filter((q) => {
        const mag = q.properties?.mag;
        return mag !== null && mag !== undefined && mag >= minMagnitude;
      })
      .sort((a, b) => (b.properties.mag || 0) - (a.properties.mag || 0));
  }, [quakes, minMagnitude]);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* 🌟 Mobile overlay toggle */}
      <button
        className="absolute top-4 left-4 z-50 sm:hidden p-2 bg-blue-600 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* 📌 Sidebar */}
      <Sidebar
        quakes={filtered}
        loading={loading}
        error={error}
        minMagnitude={minMagnitude}
        setMinMagnitude={setMinMagnitude}
        refreshData={refreshData}
        selectedQuake={selectedQuake}
        setSelectedQuake={setSelectedQuake}
        mobileOpen={sidebarOpen}
        setMobileOpen={setSidebarOpen}
      />

      {/* 🌍 Map + Legend */}
      <main className="flex-1 relative">
        {/* Legend stays above map always */}
        <Legend />

        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Earthquake markers */}
          <QuakeMarkers
            quakes={filtered}
            selectedQuake={selectedQuake}
            setSelectedQuake={setSelectedQuake}
          />

          {/* Auto focus on selected quake */}
          {selectedQuake && <MapFocus target={selectedQuake} />}
        </MapContainer>

        {/* ⚠️ Error overlay */}
        {error && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg shadow-md z-50">
            Failed to load data: {error}
          </div>
        )}

        {/* ⏳ Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
            <span className="ml-3 text-gray-700 font-medium">
              Loading earthquakes…
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
