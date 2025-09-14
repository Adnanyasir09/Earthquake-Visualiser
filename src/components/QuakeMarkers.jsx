// components/QuakeMarkers.jsx
import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { magnitudeToRadius, magnitudeColor } from '../utils/magnitudeUtils';

export default function QuakeMarkers({ quakes, selectedQuake, setSelectedQuake }) {
  // Formatter for time
  const fmt = (t) => {
    try {
      return new Date(t).toLocaleString();
    } catch {
      return String(t);
    }
  };

  // Detect if mobile for responsive sizing
  const isMobile = window.innerWidth < 640;

  return (
    <>
      {quakes.map((q) => {
        const [lon, lat, depth] = q.geometry.coordinates;
        const { mag, place, time, url } = q.properties || {};
        const isSelected = selectedQuake && selectedQuake.id === q.id;

        // Dynamic marker radius
        const baseRadius = magnitudeToRadius(mag);
        const radius = baseRadius * (isSelected ? 1.8 : 1) * (isMobile ? 0.7 : 1);

        return (
          <CircleMarker
            key={q.id}
            center={[lat, lon]}
            radius={radius}
            pathOptions={{
              color: magnitudeColor(mag),
              fillColor: magnitudeColor(mag),
              fillOpacity: 0.65,
              weight: isSelected ? 2.5 : 1,
              dashArray: isSelected ? '0' : '2',
            }}
            eventHandlers={{
              click: () => setSelectedQuake(q),
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -radius / 2]}
              opacity={0.9}
              className="bg-white/90 backdrop-blur-sm text-gray-800 rounded-md px-2 py-1 shadow-md text-xs font-medium"
            >
              <div>{place}</div>
              <div>Mag: {(mag || 0).toFixed(1)} • Depth: {depth ?? 'n/a'} km</div>
            </Tooltip>

            <Popup className="text-sm max-w-xs">
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-gray-800">{place}</div>
                <div>
                  <span className="font-medium">Magnitude:</span> {(mag || 0).toFixed(1)}
                </div>
                <div>
                  <span className="font-medium">Depth:</span> {depth ?? 'n/a'} km
                </div>
                <div>
                  <span className="font-medium">Time:</span> {fmt(time)}
                </div>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 text-blue-600 underline text-xs hover:text-blue-800"
                  >
                    Open on USGS
                  </a>
                )}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
