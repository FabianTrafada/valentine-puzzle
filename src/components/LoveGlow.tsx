"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoveGlow() {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Posisi horizontal random
      delay: Math.random() * 5, // Delay animasi agar jatuhnya tidak bersamaan
      size: Math.random() * (40 - 20) + 20, // Ukuran random antara 20-40px
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "-10%", opacity: 0 }}
          animate={{ y: "100vh", opacity: 1 }}
          transition={{
            duration: 7, // Bikin lebih lama supaya jatuh perlahan
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: heart.delay,
          }}
          className="absolute"
          style={{ left: `${heart.x}%` }}
        >
          <Heart className="text-pink-500 animate-pulse opacity-70" size={heart.size} />
        </motion.div>
      ))}
    </div>
  );
}
