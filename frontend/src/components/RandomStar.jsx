import React from "react";
import { useMemo } from "react";

function RandomStars({ amount }) {
  // Generate 20 random star objects
  const stars = useMemo(() =>
    Array.from({ length: amount }, () => ({
      x: `${Math.floor(Math.random() * 100)}%`,
      y: `${Math.floor(Math.random() * 100)}%`,
      fontSize: Math.floor(Math.random() * 12 + 16),
      opacity: (Math.random() * 0.3 + 0.7).toFixed(2),
      char: Math.random() > 0.5 ? "✦" : "✧",
      animationDelay: `${Math.random() * 2}s`,

    }))
    , []);

  return (
    <svg width="100%" height="100%">
      {stars.map((star, index) => (
        <text
          key={index}
          x={star.x}
          y={star.y}
          fontSize={star.fontSize}
          fill="white"
          opacity={star.opacity}
          className="animate-pulse "
          style={{ animationDelay: star.animationDelay }}
        >
          {star.char}
        </text>
      ))}
    </svg>
  );
}

export default RandomStars;
