// components/MapFocus.jsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";

/**
 * MapFocus
 * Smoothly flies to a given target feature (GeoJSON) on the map.
 *
 * Props:
 * - target: GeoJSON feature with geometry.coordinates [lon, lat, depth]
 * - zoom: optional (default = 6 on desktop, 4 on mobile)
 * - animate: boolean (default = true)
 * - duration: animation duration in seconds (default = 2.0)
 */
export default function MapFocus({
  target,
  zoom,
  animate = true,
  duration = 2.0,
}) {
  const map = useMap();

  useEffect(() => {
    if (!target?.geometry?.coordinates) return;

    const [lon, lat] = target.geometry.coordinates;

    // Validate coordinates
    if (typeof lat !== "number" || typeof lon !== "number") return;

    // Responsive zoom: smaller zoom for mobile
    const isMobile = window.innerWidth < 640; // Tailwind's "sm" breakpoint
    const fallbackZoom = isMobile ? 4 : 6;

    map.flyTo([lat, lon], zoom ?? fallbackZoom, {
      animate,
      duration,
      easeLinearity: 0.25,
    });
  }, [target, zoom, animate, duration, map]);

  return null;
}
