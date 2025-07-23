// import prisma from "@/lib/prisma";

// const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
//   const date = dateParam ? new Date(dateParam) : new Date();

//   const data = await prisma.event.findMany({
//     where: {
//       startTime: {
//         gte: new Date(date.setHours(0, 0, 0, 0)),
//         lte: new Date(date.setHours(23, 59, 59, 999)),
//       },
//     },
//   });

//   return data.map((event) => (
//     <div
//       className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
//       key={event.id}
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="font-semibold text-gray-600">{event.title}</h1>
//         <span className="text-gray-300 text-xs">
//           {event.startTime.toLocaleTimeString("en-UK", {
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: false,
//           })}
//         </span>
//       </div>
//       <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
//     </div>
//   ));
// };

// export default EventList;

import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  // Better date parsing - handle the date param from URL properly
  let selectedDate = new Date();

  if (dateParam) {
    // Handle different date formats that might come from the URL
    const parsedDate = new Date(dateParam);
    if (!isNaN(parsedDate.getTime())) {
      selectedDate = parsedDate;
    }
  }

  // Create separate date objects for start and end of day to avoid mutation
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  // First, let's get all events to debug
  const allEvents = await prisma.event.findMany({
    orderBy: {
      startTime: "asc",
    },
  });

  // Then get events for the selected date
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  // Add debug info (remove this in production)
  console.log("Date param:", dateParam);
  console.log("Selected date:", selectedDate);
  console.log("Start of day:", startOfDay);
  console.log("End of day:", endOfDay);
  console.log(
    "All events:",
    allEvents.map((e) => ({ id: e.id, title: e.title, startTime: e.startTime }))
  );
  console.log(
    "Filtered events:",
    data.map((e) => ({ id: e.id, title: e.title, startTime: e.startTime }))
  );

  // If no events for the selected date, show a message
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        <p>No events for {selectedDate.toDateString()}</p>
        {allEvents.length > 0 && (
          <p className="text-xs mt-2">
            Total events in database: {allEvents.length}
          </p>
        )}
      </div>
    );
  }

  return data.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;
