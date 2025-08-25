// src/app/pradeep/layout.tsx
import { dmSans } from "@/lib/fonts";
import "./portfolio.modules.scss";

export default function PradeepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`pradeep-portfolio ${dmSans.className}`}>
        {children}
      </body>
    </html>
  );
}
