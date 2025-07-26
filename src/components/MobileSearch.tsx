// src/components/MobileSearch.tsx
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import GlobalSearch from "./GlobalSearch";

type MobileSearchProps = {
  role: string;
  userId: string;
};

export default function MobileSearch({ role, userId }: MobileSearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Search Icon Button for Mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Mobile Search Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Search</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <GlobalSearch userId={userId} role={role} />
          </div>
        </div>
      )}
    </>
  );
}
