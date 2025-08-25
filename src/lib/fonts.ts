// src/lib/fonts.ts
import { Inter, DM_Sans } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});