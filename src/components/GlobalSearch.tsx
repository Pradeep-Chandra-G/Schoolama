// // src/components/GlobalSearch.tsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   User,
//   Users,
//   BookOpen,
//   Calendar,
//   FileText,
//   MapPin,
//   Trophy,
//   Megaphone,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useDebounce } from "@/hooks/useDebounce";

// interface SearchResult {
//   id: string | number;
//   type: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   url: string;
// }

// const typeIcons = {
//   student: User,
//   teacher: User,
//   parent: Users,
//   class: BookOpen,
//   subject: BookOpen,
//   lesson: Calendar,
//   exam: FileText,
//   event: Megaphone,
// };

// const typeColors = {
//   student: "text-blue-600",
//   teacher: "text-green-600",
//   parent: "text-purple-600",
//   class: "text-orange-600",
//   subject: "text-pink-600",
//   lesson: "text-indigo-600",
//   exam: "text-red-600",
//   event: "text-yellow-600",
// };

// export default function GlobalSearch() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [debouncedQuery] = useDebounce(query, 300);

//   const searchRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   // Search functionality
//   useEffect(() => {
//     if (debouncedQuery.trim().length < 2) {
//       setResults([]);
//       setIsOpen(false);
//       return;
//     }

//     const performSearch = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `/api/search?q=${encodeURIComponent(debouncedQuery)}`
//         );
//         const data = await response.json();
//         setResults(data.results || []);
//         setIsOpen(true);
//         setSelectedIndex(-1);
//       } catch (error) {
//         console.error("Search error:", error);
//         setResults([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     performSearch();
//   }, [debouncedQuery]);

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (!isOpen) return;

//       switch (e.key) {
//         case "ArrowDown":
//           e.preventDefault();
//           setSelectedIndex((prev) =>
//             prev < results.length - 1 ? prev + 1 : prev
//           );
//           break;
//         case "ArrowUp":
//           e.preventDefault();
//           setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
//           break;
//         case "Enter":
//           e.preventDefault();
//           if (selectedIndex >= 0 && results[selectedIndex]) {
//             handleResultClick(results[selectedIndex]);
//           }
//           break;
//         case "Escape":
//           setIsOpen(false);
//           setSelectedIndex(-1);
//           inputRef.current?.blur();
//           break;
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, results, selectedIndex]);

//   // Handle clicks outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//         setSelectedIndex(-1);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleResultClick = (result: SearchResult) => {
//     router.push(result.url);
//     setIsOpen(false);
//     setQuery("");
//     setSelectedIndex(-1);
//     inputRef.current?.blur();
//   };

//   const highlightMatch = (text: string, query: string) => {
//     if (!query.trim()) return text;

//     const regex = new RegExp(
//       `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
//       "gi"
//     );
//     const parts = text.split(regex);

//     return parts.map((part, index) =>
//       regex.test(part) ? (
//         <span key={index} className="bg-yellow-200 font-medium">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   // Global keyboard shortcut (Ctrl/Cmd + K)
//   useEffect(() => {
//     const handleGlobalKeydown = (e: KeyboardEvent) => {
//       if ((e.ctrlKey || e.metaKey) && e.key === "k") {
//         e.preventDefault();
//         inputRef.current?.focus();
//       }
//     };

//     document.addEventListener("keydown", handleGlobalKeydown);
//     return () => document.removeEventListener("keydown", handleGlobalKeydown);
//   }, []);

//   return (
//     <div ref={searchRef} className="relative w-full max-w-md">
//       {/* Search Input */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//         <input
//           ref={inputRef}
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => {
//             if (results.length > 0) setIsOpen(true);
//           }}
//           placeholder="Search students, teachers, classes... (Ctrl+K)"
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//         {isLoading && (
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//             <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         )}
//       </div>

//       {/* Search Results Dropdown */}
//       {isOpen && (
//         <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
//           {results.length === 0 && !isLoading && query.trim().length >= 2 && (
//             <div className="p-4 text-center text-gray-500">
//               No results found for "{query}"
//             </div>
//           )}

//           {results.map((result, index) => {
//             const Icon =
//               typeIcons[result.type as keyof typeof typeIcons] || Search;
//             const colorClass =
//               typeColors[result.type as keyof typeof typeColors] ||
//               "text-gray-600";

//             return (
//               <div
//                 key={`${result.type}-${result.id}`}
//                 onClick={() => handleResultClick(result)}
//                 className={`p-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
//                   index === selectedIndex ? "bg-blue-50" : ""
//                 }`}
//               >
//                 <div className="flex items-start space-x-3">
//                   <Icon className={`w-5 h-5 mt-0.5 ${colorClass}`} />
//                   <div className="flex-1 min-w-0">
//                     <div className="font-medium text-gray-900">
//                       {highlightMatch(result.title, query)}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {highlightMatch(result.subtitle, query)}
//                     </div>
//                     {result.description && (
//                       <div className="text-xs text-gray-500 mt-1">
//                         {highlightMatch(result.description, query)}
//                       </div>
//                     )}
//                   </div>
//                   <div className="text-xs text-gray-400 capitalize bg-gray-100 px-2 py-1 rounded">
//                     {result.type}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {results.length > 0 && (
//             <div className="p-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center">
//               Use ↑↓ to navigate, Enter to select, Esc to close
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// src/components/GlobalSearch.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  User,
  Users,
  BookOpen,
  Calendar,
  FileText,
  MapPin,
  Trophy,
  Megaphone,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string | number;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
}

// Custom useDebounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const typeIcons = {
  student: User,
  teacher: User,
  parent: Users,
  class: BookOpen,
  subject: BookOpen,
  lesson: Calendar,
  exam: FileText,
  event: Megaphone,
};

const typeColors = {
  student: "text-blue-600",
  teacher: "text-green-600",
  parent: "text-purple-600",
  class: "text-orange-600",
  subject: "text-pink-600",
  lesson: "text-indigo-600",
  exam: "text-red-600",
  event: "text-yellow-600",
};

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 300);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Search functionality
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await response.json();
        setResults(data.results || []);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Global keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleGlobalKeydown);
    return () => document.removeEventListener("keydown", handleGlobalKeydown);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Search students, teachers, classes... (Ctrl+K)"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.length === 0 && !isLoading && query.trim().length >= 2 && (
            <div className="p-4 text-center text-gray-500">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {results.map((result, index) => {
            const Icon =
              typeIcons[result.type as keyof typeof typeIcons] || Search;
            const colorClass =
              typeColors[result.type as keyof typeof typeColors] ||
              "text-gray-600";

            return (
              <div
                key={`${result.type}-${result.id}`}
                onClick={() => handleResultClick(result)}
                className={`p-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                  index === selectedIndex ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${colorClass}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900">
                      {highlightMatch(result.title, query)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {highlightMatch(result.subtitle, query)}
                    </div>
                    {result.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        {highlightMatch(result.description, query)}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 capitalize bg-gray-100 px-2 py-1 rounded">
                    {result.type}
                  </div>
                </div>
              </div>
            );
          })}

          {results.length > 0 && (
            <div className="p-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center">
              Use ↑↓ to navigate, Enter to select, Esc to close
            </div>
          )}
        </div>
      )}
    </div>
  );
}
