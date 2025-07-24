// src/app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim();

    // Search across different entities
    const [students, teachers, parents, classes, subjects, lessons, exams, events] = await Promise.all([
      // Students
      prisma.student.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { surname: { contains: searchTerm, mode: "insensitive" } },
            { username: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          surname: true,
          username: true,
          email: true,
          class: { select: { name: true } },
          grade: { select: { level: true } },
        },
        take: 10,
      }),

      // Teachers
      prisma.teacher.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { surname: { contains: searchTerm, mode: "insensitive" } },
            { username: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          surname: true,
          username: true,
          email: true,
          subjects: { select: { name: true } },
        },
        take: 10,
      }),

      // Parents
      prisma.parent.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { surname: { contains: searchTerm, mode: "insensitive" } },
            { username: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          surname: true,
          username: true,
          email: true,
          students: { select: { name: true, surname: true } },
        },
        take: 10,
      }),

      // Classes
      prisma.class.findMany({
        where: {
          name: { contains: searchTerm, mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
          capacity: true,
          grade: { select: { level: true } },
          supervisor: { select: { name: true, surname: true } },
          _count: { select: { students: true } },
        },
        take: 10,
      }),

      // Subjects
      prisma.subject.findMany({
        where: {
          name: { contains: searchTerm, mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
          _count: { select: { teachers: true, lessons: true } },
        },
        take: 10,
      }),

      // Lessons
      prisma.lesson.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { subject: { name: { contains: searchTerm, mode: "insensitive" } } },
            { class: { name: { contains: searchTerm, mode: "insensitive" } } },
            { teacher: { name: { contains: searchTerm, mode: "insensitive" } } },
            { teacher: { surname: { contains: searchTerm, mode: "insensitive" } } },
          ],
        },
        select: {
          id: true,
          name: true,
          day: true,
          startTime: true,
          endTime: true,
          subject: { select: { name: true } },
          class: { select: { name: true } },
          teacher: { select: { name: true, surname: true } },
        },
        take: 10,
      }),

      // Exams
      prisma.exam.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { lesson: { name: { contains: searchTerm, mode: "insensitive" } } },
            { lesson: { subject: { name: { contains: searchTerm, mode: "insensitive" } } } },
          ],
        },
        select: {
          id: true,
          title: true,
          startTime: true,
          endTime: true,
          lesson: {
            select: {
              name: true,
              subject: { select: { name: true } },
              class: { select: { name: true } },
            },
          },
        },
        take: 10,
      }),

      // Events
      prisma.event.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          description: true,
          startTime: true,
          endTime: true,
          class: { select: { name: true } },
        },
        take: 10,
      }),
    ]);

    // Format results with type and navigation info
    const results = [
      ...students.map((student) => ({
        id: student.id,
        type: "student",
        title: `${student.name} ${student.surname}`,
        subtitle: `@${student.username} • ${student.class.name} • Grade ${student.grade.level}`,
        description: student.email || "",
        url: `/list/students/${student.id}`,
      })),
      ...teachers.map((teacher) => ({
        id: teacher.id,
        type: "teacher",
        title: `${teacher.name} ${teacher.surname}`,
        subtitle: `@${teacher.username} • ${teacher.subjects.map(s => s.name).join(", ")}`,
        description: teacher.email || "",
        url: `/list/teachers/${teacher.id}`,
      })),
      ...parents.map((parent) => ({
        id: parent.id,
        type: "parent",
        title: `${parent.name} ${parent.surname}`,
        subtitle: `@${parent.username} • ${parent.students.length} child(ren)`,
        description: parent.email || "",
        url: `/list/parents/${parent.id}`,
      })),
      ...classes.map((cls) => ({
        id: cls.id,
        type: "class",
        title: cls.name,
        subtitle: `Grade ${cls.grade.level} • ${cls._count.students}/${cls.capacity} students`,
        description: cls.supervisor ? `Supervisor: ${cls.supervisor.name} ${cls.supervisor.surname}` : "",
        url: `/list/classes/${cls.id}`,
      })),
      ...subjects.map((subject) => ({
        id: subject.id,
        type: "subject",
        title: subject.name,
        subtitle: `${subject._count.teachers} teacher(s) • ${subject._count.lessons} lesson(s)`,
        description: "",
        url: `/list/subjects/${subject.id}`,
      })),
      ...lessons.map((lesson) => ({
        id: lesson.id,
        type: "lesson",
        title: lesson.name,
        subtitle: `${lesson.subject.name} • ${lesson.class.name} • ${lesson.day}`,
        description: `${lesson.teacher.name} ${lesson.teacher.surname}`,
        url: `/list/lessons/${lesson.id}`,
      })),
      ...exams.map((exam) => ({
        id: exam.id,
        type: "exam",
        title: exam.title,
        subtitle: `${exam.lesson.subject.name} • ${exam.lesson.class.name}`,
        description: `${exam.startTime.toLocaleDateString()} - ${exam.endTime.toLocaleDateString()}`,
        url: `/list/exams/${exam.id}`,
      })),
      ...events.map((event) => ({
        id: event.id,
        type: "event",
        title: event.title,
        subtitle: event.class ? `Class: ${event.class.name}` : "School-wide event",
        description: event.description.substring(0, 100) + (event.description.length > 100 ? "..." : ""),
        url: `/list/events/${event.id}`,
      })),
    ];

    // Sort results by type priority and relevance
    const typePriority = {
      student: 1,
      teacher: 2,
      parent: 3,
      class: 4,
      subject: 5,
      lesson: 6,
      exam: 7,
      event: 8,
    };

    results.sort((a, b) => {
      const priorityDiff = typePriority[a.type as keyof typeof typePriority] - typePriority[b.type as keyof typeof typePriority];
      if (priorityDiff !== 0) return priorityDiff;
      return a.title.localeCompare(b.title);
    });

    return NextResponse.json({ results: results.slice(0, 20) });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}