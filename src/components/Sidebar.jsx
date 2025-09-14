// components/Sidebar.jsx
import { format } from "date-fns";

export default function Sidebar({
  quakes,
  loading,
  error,
  minMagnitude,
  setMinMagnitude,
  refreshData,
  selectedQuake,
  setSelectedQuake,
}) {
  const fmt = (t) => {
    try {
      return format(new Date(t), "yyyy-MM-dd HH:mm:ss");
    } catch {
      return String(t);
    }
  };

  return (
    <aside className="w-full sm:w-80 bg-white border-r border-gray-200 flex flex-col shadow-md">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          🌍 Earthquake Visualizer
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Last 24 hrs (USGS) • Filter by magnitude
        </p>
      </div>

      {/* Controls */}
      <div className="p-4 space-y-4 border-b border-gray-100">
        {/* Magnitude slider */}
        <div>
          <label className="flex items-center justify-between text-xs text-gray-700 mb-1">
            <span>Min Magnitude</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium text-xs">
              {minMagnitude}
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="8"
            step="0.1"
            value={minMagnitude}
            onChange={(e) => setMinMagnitude(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={refreshData}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Refresh
          </button>
          <button
            onClick={() => {
              setMinMagnitude(0);
              setSelectedQuake(null);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Reset
          </button>
        </div>

        {/* Count */}
        <div className="text-xs text-gray-600">
          Showing:{" "}
          <span className="font-semibold text-gray-800">{quakes.length}</span>{" "}
          results
        </div>
      </div>

      {/* Quake List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {loading && (
          <div className="text-sm text-gray-600">Loading earthquakes…</div>
        )}
        {error && <div className="text-sm text-red-600">Error: {error}</div>}
        {!loading && quakes.length === 0 && (
          <div className="text-sm text-gray-500">
            No earthquakes match the filter.
          </div>
        )}

        <ul className="space-y-2">
          {quakes.map((q) => {
            const id = q.id;
            const { mag, place, time, url } = q.properties || {};
            const selected = selectedQuake && selectedQuake.id === id;

            return (
              <li
                key={id}
                onClick={() => setSelectedQuake(q)}
                className={`p-3 rounded-lg cursor-pointer border text-sm transition shadow-sm break-words ${
                  selected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:shadow"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-800 truncate max-w-[65%]">
                    {place || "Unknown location"}
                  </div>
                  <div
                    className={`font-semibold ${
                      (mag || 0) >= 6
                        ? "text-red-600"
                        : (mag || 0) >= 4
                        ? "text-orange-500"
                        : "text-gray-700"
                    }`}
                  >
                    {(mag || 0).toFixed(1)}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span>{fmt(time)}</span>
                  <a
                    className="text-blue-600 hover:underline text-xs"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    USGS ↗
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <footer className="p-3 text-xs text-gray-500 border-t border-gray-100 text-center">
        Data: USGS • Built for Casey
      </footer>
    </aside>
  );
}
