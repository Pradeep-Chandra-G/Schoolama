import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

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

  // Build the where clause based on role
  const whereClause: any = {
    startTime: {
      gte: startOfDay,
      lte: endOfDay,
    },
  };

  // Apply role-based filtering (same logic as events list page)
  if (role === "admin") {
    // Admin can see all events for the selected date
    // No additional filtering needed
  } else {
    // For non-admin roles, apply the same filtering logic
    const roleConditions = {
      teacher: { lessons: { some: { teacherId: userId! } } },
      student: { students: { some: { id: userId! } } },
      parent: { students: { some: { parentId: userId! } } },
    };

    whereClause.OR = [
      { classId: null },
      {
        class: roleConditions[role as keyof typeof roleConditions] || {},
      },
    ];
  }

  const data = await prisma.event.findMany({
    where: whereClause,
    include: {
      class: true, // Include class info for better debugging
    },
    orderBy: {
      startTime: "asc",
    },
  });

  // Add debug info (remove this in production)
  console.log("EventList Debug Info:");
  console.log("Role:", role);
  console.log("Date param:", dateParam);
  console.log("Selected date:", selectedDate);
  console.log("Start of day:", startOfDay);
  console.log("End of day:", endOfDay);
  console.log("Where clause:", JSON.stringify(whereClause, null, 2));
  console.log(
    "Found events:",
    data.map((e) => ({
      id: e.id,
      title: e.title,
      startTime: e.startTime,
      classId: e.classId,
      className: e.class?.name,
    }))
  );

  // If no events for the selected date, show a message
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        <p>No events for {selectedDate.toDateString()}</p>
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
            hour12: true,
            timeZone: "Asia/Kolkata",
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
      {/* Show class info for debugging */}
      {event.class && (
        <p className="mt-1 text-xs text-gray-300">Class: {event.class.name}</p>
      )}
    </div>
  ));
};

export default EventList;
