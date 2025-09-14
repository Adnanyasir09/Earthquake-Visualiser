import React from "react";

const legendItems = [
  { label: "6+", color: "#800026" },
  { label: "4 – 6", color: "#E31A1C" },
  { label: "2 – 4", color: "#FD8D3C" },
  { label: "< 2", color: "#FED976" },
];

export default function Legend() {
  return (
    <div className="absolute top-6 right-6 z-50 
      bg-gradient-to-br from-white/80 to-gray-100/70 
      backdrop-blur-md border border-gray-300/40 
      shadow-xl rounded-2xl p-5 w-48">
      
      <h2 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide uppercase">
        Magnitude Legend
      </h2>

      <ul className="space-y-3">
        {legendItems.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-3 hover:bg-gray-200/40 rounded-lg px-2 py-1 transition-colors duration-200"
          >
            <span
              className="w-4 h-4 rounded-full shadow-md ring-1 ring-gray-400/30"
              style={{ background: item.color }}
            ></span>
            <span className="text-xs text-gray-700 font-medium">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
