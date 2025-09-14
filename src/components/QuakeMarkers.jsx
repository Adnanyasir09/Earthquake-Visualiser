// components/QuakeMarkers.jsx
import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { magnitudeToRadius, magnitudeColor } from '../utils/magnitudeUtils';

export default function QuakeMarkers({ quakes, selectedQuake, setSelectedQuake }) {
  const fmt = (t) => {
    try {
      return new Date(t).toLocaleString();
    } catch {
      return String(t);
    }
  };

  return (
    <>
      {quakes.map((q) => {
        const [lon, lat, depth] = q.geometry.coordinates;
        const { mag, place, time, url } = q.properties || {};
        const isSelected = selectedQuake && selectedQuake.id === q.id;

        return (
          <CircleMarker
            key={q.id}
            center={[lat, lon]}
            radius={magnitudeToRadius(mag) * (isSelected ? 1.6 : 1)}
            pathOptions={{
              color: magnitudeColor(mag),
              fillColor: magnitudeColor(mag),
              fillOpacity: 0.6,
              weight: isSelected ? 2 : 0.6,
            }}
            eventHandlers={{ click: () => { setSelectedQuake(q); } }}
          >
            <Tooltip direction="top">
              <div className="text-sm">
                <div className="font-medium">{place}</div>
                <div>Mag: {(mag || 0).toFixed(1)} • Depth: {depth ?? 'n/a'} km</div>
              </div>
            </Tooltip>

            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{place}</div>
                <div>Magnitude: {(mag || 0).toFixed(1)}</div>
                <div>Depth: {depth ?? 'n/a'} km</div>
                <div>Time: {fmt(time)}</div>
                <div className="mt-1">
                  <a href={url} target="_blank" rel="noreferrer" className="text-blue-600">Open on USGS</a>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
