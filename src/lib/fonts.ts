// app/fonts.ts
import { Inter, DM_Sans } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
