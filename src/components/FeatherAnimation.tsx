"use client";

import { useEffect, useState } from "react";

interface Feather {
  id: number;
  left: number;
  duration: number;
  delay: number;
  swayDuration: number;
}

export default function FeatherAnimation() {
  const [feathers, setFeathers] = useState<Feather[]>([]);

  useEffect(() => {
    // Create initial feathers
    const initialFeathers: Feather[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 15,
      swayDuration: 2 + Math.random() * 3,
    }));
    setFeathers(initialFeathers);

    // Add new feathers periodically
    const interval = setInterval(() => {
      setFeathers((prev) => {
        // Remove old feathers, keep max 12
        const filtered = prev.slice(-10);
        return [
          ...filtered,
          {
            id: Date.now(),
            left: Math.random() * 100,
            duration: 15 + Math.random() * 20,
            delay: 0,
            swayDuration: 2 + Math.random() * 3,
          },
        ];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {feathers.map((feather) => (
        <span
          key={feather.id}
          className="feather"
          style={{
            left: `${feather.left}%`,
            animationDuration: `${feather.duration}s, ${feather.swayDuration}s`,
            animationDelay: `${feather.delay}s, 0s`,
          }}
        >
          🪶
        </span>
      ))}
    </div>
  );
}
