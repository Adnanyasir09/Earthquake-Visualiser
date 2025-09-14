import React from "react";

const legendItems = [
  { label: "6+", color: "#800026" },
  { label: "4 – 6", color: "#E31A1C" },
  { label: "2 – 4", color: "#FD8D3C" },
  { label: "< 2", color: "#FED976" },
];

export default function Legend() {
  return (
    <div
      className="absolute top-4 right-4 z-50
        bg-gradient-to-br from-white/80 to-gray-100/70 
        backdrop-blur-md border border-gray-300/40 
        shadow-xl rounded-xl
        p-3 w-36 
        sm:p-5 sm:w-48 
        transition-all duration-200"
    >
      <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4 tracking-wide uppercase">
        Magnitude Legend
      </h2>

      <ul className="space-y-2 sm:space-y-3">
        {legendItems.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 sm:gap-3 hover:bg-gray-200/40 rounded-lg px-2 py-1 transition-colors duration-200"
          >
            <span
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-md ring-1 ring-gray-400/30"
              style={{ background: item.color }}
            ></span>
            <span className="text-[10px] sm:text-xs text-gray-700 font-medium">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
