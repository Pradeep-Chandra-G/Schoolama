// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// const EventCalendar = () => {
//   const [value, onChange] = useState<Value>(new Date());

//   const router = useRouter();

//   useEffect(() => {
//     if (value instanceof Date) {
//       router.push(`?date=${value}`);
//     }
//   }, [value, router]);

//   return <Calendar onChange={onChange} value={value} />;
// };

// export default EventCalendar;

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      // Format the date properly for the URL parameter
      const formattedDate = value.toISOString().split("T")[0]; // YYYY-MM-DD format
      console.log("Calendar date changed:", formattedDate); // Debug log
      router.push(`?date=${formattedDate}`);
    }
  }, [value, router]);

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;
