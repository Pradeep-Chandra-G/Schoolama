// app/pradeep/layout.tsx
import { dmSans } from "@/lib/fonts";

export default function PradeepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout wraps only /pradeep routes
  return <div className={dmSans.className}>{children}</div>;
}
