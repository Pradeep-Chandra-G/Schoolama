// app/portfolio/components/cursor/Cursor.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./cursor.scss";
import { dmSans } from "@/lib/fonts";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      className={`cursor ${dmSans.className}`}
      animate={{ x: position.x, y: position.y }}
    ></motion.div>
  );
};

export default Cursor;
