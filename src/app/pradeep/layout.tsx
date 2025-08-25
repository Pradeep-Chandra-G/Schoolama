// src/app/pradeep/layout.tsx
import { dmSans } from "@/lib/fonts";
import "./portfolio.modules.scss";

export default function PradeepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`pradeep-portfolio ${dmSans.className}`}>{children}</div>
  );
}
