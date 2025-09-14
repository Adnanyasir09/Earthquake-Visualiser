// components/MapFocus.jsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";

/**
 * MapFocus
 * Smoothly flies to a given target feature (GeoJSON) on the map.
 *
 * Props:
 * - target: GeoJSON feature with geometry.coordinates [lon, lat, depth]
 * - zoom: optional (default = 6)
 * - animate: boolean (default = true)
 * - duration: animation duration in seconds (default = 2.0)
 */
export default function MapFocus({ target, zoom = 6, animate = true, duration = 2.0 }) {
  const map = useMap();

  useEffect(() => {
    if (!target?.geometry?.coordinates) return;

    const [lon, lat] = target.geometry.coordinates;
    if (typeof lat !== "number" || typeof lon !== "number") return;

    map.flyTo([lat, lon], Math.max(zoom, 2), {
      animate,
      duration,
      easeLinearity: 0.25,
    });
  }, [target, zoom, animate, duration, map]);

  return null;
}
