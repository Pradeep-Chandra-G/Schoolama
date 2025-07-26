// src/app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const role = searchParams.get("role"); // Should be passed from frontend
    const userId = searchParams.get("userId"); // Current user's ID

    if (!query || query.trim().length < 2 || !role || !userId) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim();
    let results: any[] = [];

    switch (role.toLowerCase()) {
      case "admin":
        results = await getAdminSearchResults(searchTerm);
        break;
      case "teacher":
        results = await getTeacherSearchResults(searchTerm, userId);
        break;
      case "parent":
        results = await getParentSearchResults(searchTerm, userId);
        break;
      case "student":
        results = await getStudentSearchResults(searchTerm, userId);
        break;
      default:
        return NextResponse.json({ results: [] });
    }

    return NextResponse.json({ results: results.slice(0, 20) });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}

// Admin can see everything
async function getAdminSearchResults(searchTerm: string) {
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

  return formatResults(students, teachers, parents, classes, subjects, lessons, exams, events);
}

// Teacher can see their own classes, students, lessons, subjects, and related exams/events
async function getTeacherSearchResults(searchTerm: string, teacherId: string) {
  const [students, classes, subjects, lessons, exams, events] = await Promise.all([
    // Students in teacher's classes only
    prisma.student.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { surname: { contains: searchTerm, mode: "insensitive" } },
              { username: { contains: searchTerm, mode: "insensitive" } },
              { email: { contains: searchTerm, mode: "insensitive" } },
            ],
          },
          {
            class: {
              lessons: {
                some: { teacherId: teacherId }
              }
            }
          }
        ]
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

    // Classes where teacher teaches
    prisma.class.findMany({
      where: {
        AND: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          {
            lessons: {
              some: { teacherId: teacherId }
            }
          }
        ]
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

    // Subjects taught by teacher
    prisma.subject.findMany({
      where: {
        AND: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          {
            teachers: {
              some: { id: teacherId }
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        _count: { select: { teachers: true, lessons: true } },
      },
      take: 10,
    }),

    // Teacher's lessons only
    prisma.lesson.findMany({
      where: {
        AND: [
          { teacherId: teacherId },
          {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { subject: { name: { contains: searchTerm, mode: "insensitive" } } },
              { class: { name: { contains: searchTerm, mode: "insensitive" } } },
            ],
          }
        ]
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

    // Exams for teacher's lessons only
    prisma.exam.findMany({
      where: {
        AND: [
          { lesson: { teacherId: teacherId } },
          {
            OR: [
              { title: { contains: searchTerm, mode: "insensitive" } },
              { lesson: { name: { contains: searchTerm, mode: "insensitive" } } },
              { lesson: { subject: { name: { contains: searchTerm, mode: "insensitive" } } } },
            ],
          }
        ]
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

    // Events for teacher's classes
    prisma.event.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: searchTerm, mode: "insensitive" } },
              { description: { contains: searchTerm, mode: "insensitive" } },
            ],
          },
          {
            OR: [
              { classId: null }, // School-wide events
              {
                class: {
                  lessons: {
                    some: { teacherId: teacherId }
                  }
                }
              }
            ]
          }
        ]
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

  return formatResults(students, [], [], classes, subjects, lessons, exams, events);
}

// Parent can see their children and related information
async function getParentSearchResults(searchTerm: string, parentId: string) {
  const [students, classes, lessons, exams, events] = await Promise.all([
    // Parent's children only
    prisma.student.findMany({
      where: {
        AND: [
          { parentId: parentId },
          {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { surname: { contains: searchTerm, mode: "insensitive" } },
              { username: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        ]
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

    // Classes of parent's children
    prisma.class.findMany({
      where: {
        AND: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          {
            students: {
              some: { parentId: parentId }
            }
          }
        ]
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

    // Lessons for parent's children's classes
    prisma.lesson.findMany({
      where: {
        AND: [
          {
            class: {
              students: {
                some: { parentId: parentId }
              }
            }
          },
          {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { subject: { name: { contains: searchTerm, mode: "insensitive" } } },
              { teacher: { name: { contains: searchTerm, mode: "insensitive" } } },
              { teacher: { surname: { contains: searchTerm, mode: "insensitive" } } },
            ],
          }
        ]
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

    // Exams for parent's children's lessons
    prisma.exam.findMany({
      where: {
        AND: [
          {
            lesson: {
              class: {
                students: {
                  some: { parentId: parentId }
                }
              }
            }
          },
          {
            OR: [
              { title: { contains: searchTerm, mode: "insensitive" } },
              { lesson: { name: { contains: searchTerm, mode: "insensitive" } } },
              { lesson: { subject: { name: { contains: searchTerm, mode: "insensitive" } } } },
            ],
          }
        ]
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

    // Events for parent's children's classes or school-wide
    prisma.event.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: searchTerm, mode: "insensitive" } },
              { description: { contains: searchTerm, mode: "insensitive" } },
            ],
          },
          {
            OR: [
              { classId: null }, // School-wide events
              {
                class: {
                  students: {
                    some: { parentId: parentId }
                  }
                }
              }
            ]
          }
        ]
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

  return formatResults(students, [], [], classes, [], lessons, exams, events);
}

// Student can see their own information and related data
async function getStudentSearchResults(searchTerm: string, studentId: string) {
  const [lessons, exams, events, classmates] = await Promise.all([
    // Student's lessons
    prisma.lesson.findMany({
      where: {
        AND: [
          {
            class: {
              students: {
                some: { id: studentId }
              }
            }
          },
          {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { subject: { name: { contains: searchTerm, mode: "insensitive" } } },
              { teacher: { name: { contains: searchTerm, mode: "insensitive" } } },
              { teacher: { surname: { contains: searchTerm, mode: "insensitive" } } },
            ],
          }
        ]
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

    // Student's exams
    prisma.exam.findMany({
      where: {
        AND: [
          {
            lesson: {
              class: {
                students: {
                  some: { id: studentId }
                }
              }
            }
          },
          {
            OR: [
              { title: { contains: searchTerm, mode: "insensitive" } },
              { lesson: { name: { contains: searchTerm, mode: "insensitive" } } },
              { lesson: { subject: { name: { contains: searchTerm, mode: "insensitive" } } } },
            ],
          }
        ]
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

    // Events for student's class or school-wide
    prisma.event.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: searchTerm, mode: "insensitive" } },
              { description: { contains: searchTerm, mode: "insensitive" } },
            ],
          },
          {
            OR: [
              { classId: null }, // School-wide events
              {
                class: {
                  students: {
                    some: { id: studentId }
                  }
                }
              }
            ]
          }
        ]
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

    // Student's classmates (optional - only if searching for people)
    prisma.student.findMany({
      where: {
        AND: [
          { id: { not: studentId } }, // Exclude the student themselves
          {
            class: {
              students: {
                some: { id: studentId }
              }
            }
          },
          {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { surname: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        ]
      },
      select: {
        id: true,
        name: true,
        surname: true,
        username: true,
        class: { select: { name: true } },
        grade: { select: { level: true } },
      },
      take: 5,
    }),
  ]);

  return formatResults(classmates, [], [], [], [], lessons, exams, events);
}

function formatResults(students: any[], teachers: any[], parents: any[], classes: any[], subjects: any[], lessons: any[], exams: any[], events: any[]) {
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
      subtitle: `@${teacher.username} • ${teacher.subjects.map((s: { name: any; }) => s.name).join(", ")}`,
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

  return results;
}