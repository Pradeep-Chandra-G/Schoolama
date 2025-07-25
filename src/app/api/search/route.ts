// // src/app/api/search/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const query = searchParams.get("q");

//     if (!query || query.trim().length < 2) {
//       return NextResponse.json({ results: [] });
//     }

//     const searchTerm = query.trim();

//     // Search across different entities
//     const [students, teachers, parents, classes, subjects, lessons, exams, events] = await Promise.all([
//       // Students
//       prisma.student.findMany({
//         where: {
//           OR: [
//             { name: { contains: searchTerm, mode: "insensitive" } },
//             { surname: { contains: searchTerm, mode: "insensitive" } },
//             { username: { contains: searchTerm, mode: "insensitive" } },
//             { email: { contains: searchTerm, mode: "insensitive" } },
//           ],
//         },
//         select: {
//           id: true,
//           name: true,
//           surname: true,
//           username: true,
//           email: true,
//           class: { select: { name: true } },
//           grade: { select: { level: true } },
//         },
//         take: 10,
//       }),

//       // Teachers
//       prisma.teacher.findMany({
//         where: {
//           OR: [
//             { name: { contains: searchTerm, mode: "insensitive" } },
//             { surname: { contains: searchTerm, mode: "insensitive" } },
//             { username: { contains: searchTerm, mode: "insensitive" } },
//             { email: { contains: searchTerm, mode: "insensitive" } },
//           ],
//         },
//         select: {
//           id: true,
//           name: true,
//           surname: true,
//           username: true,
//           email: true,
//           subjects: { select: { name: true } },
//         },
//         take: 10,
//       }),

//       // Parents
//       prisma.parent.findMany({
//         where: {
//           OR: [
//             { name: { contains: searchTerm, mode: "insensitive" } },
//             { surname: { contains: searchTerm, mode: "insensitive" } },
//             { username: { contains: searchTerm, mode: "insensitive" } },
//             { email: { contains: searchTerm, mode: "insensitive" } },
//           ],
//         },
//         select: {
//           id: true,
//           name: true,
//           surname: true,
//           username: true,
//           email: true,
//           students: { select: { name: true, surname: true } },
//         },
//         take: 10,
//       }),

//       // Classes
//       prisma.class.findMany({
//         where: {
//           name: { contains: searchTerm, mode: "insensitive" },
//         },
//         select: {
//           id: true,
//           name: true,
//           capacity: true,
//           grade: { select: { level: true } },
//           supervisor: { select: { name: true, surname: true } },
//           _count: { select: { students: true } },
//         },
//         take: 10,
//       }),

//       // Subjects
//       prisma.subject.findMany({
//         where: {
//           name: { contains: searchTerm, mode: "insensitive" },
//         },
//         select: {
//           id: true,
//           name: true,
//           _count: { select: { teachers: true, lessons: true } },
//         },
//         take: 10,
//       }),

//       // Lessons
//       prisma.lesson.findMany({
//         where: {
//           OR: [
//             { name: { contains: searchTerm, mode: "insensitive" } },
//             { subject: { name: { contains: searchTerm, mode: "insensitive" } } },
//             { class: { name: { contains: searchTerm, mode: "insensitive" } } },
//             { teacher: { name: { contains: searchTerm, mode: "insensitive" } } },
//             { teacher: { surname: { contains: searchTerm, mode: "insensitive" } } },
//           ],
//         },
//         select: {
//           id: true,
//           name: true,
//           day: true,
//           startTime: true,
//           endTime: true,
//           subject: { select: { name: true } },
//           class: { select: { name: true } },
//           teacher: { select: { name: true, surname: true } },
//         },
//         take: 10,
//       }),

//       // Exams
//       prisma.exam.findMany({
//         where: {
//           OR: [
//             { title: { contains: searchTerm, mode: "insensitive" } },
//             { lesson: { name: { contains: searchTerm, mode: "insensitive" } } },
//             { lesson: { subject: { name: { contains: searchTerm, mode: "insensitive" } } } },
//           ],
//         },
//         select: {
//           id: true,
//           title: true,
//           startTime: true,
//           endTime: true,
//           lesson: {
//             select: {
//               name: true,
//               subject: { select: { name: true } },
//               class: { select: { name: true } },
//             },
//           },
//         },
//         take: 10,
//       }),

//       // Events
//       prisma.event.findMany({
//         where: {
//           OR: [
//             { title: { contains: searchTerm, mode: "insensitive" } },
//             { description: { contains: searchTerm, mode: "insensitive" } },
//           ],
//         },
//         select: {
//           id: true,
//           title: true,
//           description: true,
//           startTime: true,
//           endTime: true,
//           class: { select: { name: true } },
//         },
//         take: 10,
//       }),
//     ]);

//     // Format results with type and navigation info
//     const results = [
//       ...students.map((student) => ({
//         id: student.id,
//         type: "student",
//         title: `${student.name} ${student.surname}`,
//         subtitle: `@${student.username} • ${student.class.name} • Grade ${student.grade.level}`,
//         description: student.email || "",
//         url: `/list/students/${student.id}`,
//       })),
//       ...teachers.map((teacher) => ({
//         id: teacher.id,
//         type: "teacher",
//         title: `${teacher.name} ${teacher.surname}`,
//         subtitle: `@${teacher.username} • ${teacher.subjects.map(s => s.name).join(", ")}`,
//         description: teacher.email || "",
//         url: `/list/teachers/${teacher.id}`,
//       })),
//       ...parents.map((parent) => ({
//         id: parent.id,
//         type: "parent",
//         title: `${parent.name} ${parent.surname}`,
//         subtitle: `@${parent.username} • ${parent.students.length} child(ren)`,
//         description: parent.email || "",
//         url: `/list/parents/${parent.id}`,
//       })),
//       ...classes.map((cls) => ({
//         id: cls.id,
//         type: "class",
//         title: cls.name,
//         subtitle: `Grade ${cls.grade.level} • ${cls._count.students}/${cls.capacity} students`,
//         description: cls.supervisor ? `Supervisor: ${cls.supervisor.name} ${cls.supervisor.surname}` : "",
//         url: `/list/classes/${cls.id}`,
//       })),
//       ...subjects.map((subject) => ({
//         id: subject.id,
//         type: "subject",
//         title: subject.name,
//         subtitle: `${subject._count.teachers} teacher(s) • ${subject._count.lessons} lesson(s)`,
//         description: "",
//         url: `/list/subjects/${subject.id}`,
//       })),
//       ...lessons.map((lesson) => ({
//         id: lesson.id,
//         type: "lesson",
//         title: lesson.name,
//         subtitle: `${lesson.subject.name} • ${lesson.class.name} • ${lesson.day}`,
//         description: `${lesson.teacher.name} ${lesson.teacher.surname}`,
//         url: `/list/lessons/${lesson.id}`,
//       })),
//       ...exams.map((exam) => ({
//         id: exam.id,
//         type: "exam",
//         title: exam.title,
//         subtitle: `${exam.lesson.subject.name} • ${exam.lesson.class.name}`,
//         description: `${exam.startTime.toLocaleDateString()} - ${exam.endTime.toLocaleDateString()}`,
//         url: `/list/exams/${exam.id}`,
//       })),
//       ...events.map((event) => ({
//         id: event.id,
//         type: "event",
//         title: event.title,
//         subtitle: event.class ? `Class: ${event.class.name}` : "School-wide event",
//         description: event.description.substring(0, 100) + (event.description.length > 100 ? "..." : ""),
//         url: `/list/events/${event.id}`,
//       })),
//     ];

//     // Sort results by type priority and relevance
//     const typePriority = {
//       student: 1,
//       teacher: 2,
//       parent: 3,
//       class: 4,
//       subject: 5,
//       lesson: 6,
//       exam: 7,
//       event: 8,
//     };

//     results.sort((a, b) => {
//       const priorityDiff = typePriority[a.type as keyof typeof typePriority] - typePriority[b.type as keyof typeof typePriority];
//       if (priorityDiff !== 0) return priorityDiff;
//       return a.title.localeCompare(b.title);
//     });

//     return NextResponse.json({ results: results.slice(0, 20) });
//   } catch (error) {
//     console.error("Search error:", error);
//     return NextResponse.json({ error: "Search failed" }, { status: 500 });
//   }
// }


// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SearchFilters {
  role: string;
  userId: string;
  classId?: string;
  gradeId?: string;
  parentId?: string;
  subjects?: string;
  supervisedClasses?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const role = searchParams.get('role');
    const userId = searchParams.get('userId');

    if (!query || !role || !userId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    if (query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const filters: SearchFilters = {
      role,
      userId,
      classId: searchParams.get('classId') ?? undefined,
      gradeId: searchParams.get('gradeId') ?? undefined,
      parentId: searchParams.get('parentId') ?? undefined,
      subjects: searchParams.get('subjects') ?? undefined,
      supervisedClasses: searchParams.get('supervisedClasses') ?? undefined,
    };

    const results = await performRoleBasedSearch(query, filters);
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function performRoleBasedSearch(query: string, filters: SearchFilters) {
  const searchTerm = query.toLowerCase();
  let results: any[] = [];

  switch (filters.role) {
    case 'admin':
      results = await adminSearch(searchTerm);
      break;
    case 'teacher':
      results = await teacherSearch(searchTerm, filters);
      break;
    case 'student':
      results = await studentSearch(searchTerm, filters);
      break;
    case 'parent':
      results = await parentSearch(searchTerm, filters);
      break;
    default:
      return [];
  }

  return results;
}

async function adminSearch(searchTerm: string) {
  const results: any[] = [];

  // Search students
  const students = await prisma.student.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { surname: { contains: searchTerm, mode: 'insensitive' } },
        { username: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    include: { class: true, grade: true },
    take: 5,
  });

  students.forEach(student => {
    results.push({
      id: student.id,
      type: 'student',
      title: `${student.name} ${student.surname}`,
      subtitle: `Class ${student.class.name} - Grade ${student.grade.level}`,
      description: student.email || '',
      url: `/admin/students/${student.id}`,
    });
  });

  // Search teachers
  const teachers = await prisma.teacher.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { surname: { contains: searchTerm, mode: 'insensitive' } },
        { username: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    include: { subjects: true },
    take: 5,
  });

  teachers.forEach(teacher => {
    results.push({
      id: teacher.id,
      type: 'teacher',
      title: `${teacher.name} ${teacher.surname}`,
      subtitle: `Teacher`,
      description: teacher.subjects.map(s => s.name).join(', '),
      url: `/admin/teachers/${teacher.id}`,
    });
  });

  // Search classes
  const classes = await prisma.class.findMany({
    where: {
      name: { contains: searchTerm, mode: 'insensitive' },
    },
    include: { grade: true, supervisor: true },
    take: 5,
  });

  classes.forEach(cls => {
    results.push({
      id: cls.id,
      type: 'class',
      title: cls.name,
      subtitle: `Grade ${cls.grade.level}`,
      description: cls.supervisor ? `Supervisor: ${cls.supervisor.name} ${cls.supervisor.surname}` : '',
      url: `/admin/classes/${cls.id}`,
    });
  });

  // Search subjects
  const subjects = await prisma.subject.findMany({
    where: {
      name: { contains: searchTerm, mode: 'insensitive' },
    },
    take: 5,
  });

  subjects.forEach(subject => {
    results.push({
      id: subject.id,
      type: 'subject',
      title: subject.name,
      subtitle: 'Subject',
      description: '',
      url: `/admin/subjects/${subject.id}`,
    });
  });

  return results;
}

async function teacherSearch(searchTerm: string, filters: SearchFilters) {
  const results: any[] = [];
  const teacherId = filters.userId;

  // Get teacher's classes and subjects
  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
    include: {
      subjects: true,
      classes: true,
      lessons: {
        include: { class: true, subject: true }
      }
    },
  });

  if (!teacher) return results;

  const teacherClassIds = teacher.classes.map(c => c.id);
  const teacherSubjectIds = teacher.subjects.map(s => s.id);

  // Search students in teacher's classes
  const students = await prisma.student.findMany({
    where: {
      AND: [
        { classId: { in: teacherClassIds } },
        {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { surname: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
      ],
    },
    include: { class: true },
    take: 5,
  });

  students.forEach(student => {
    results.push({
      id: student.id,
      type: 'student',
      title: `${student.name} ${student.surname}`,
      subtitle: `Class ${student.class.name}`,
      description: '',
      url: `/teacher/students/${student.id}`,
    });
  });

  // Search teacher's lessons
  const lessons = await prisma.lesson.findMany({
    where: {
      AND: [
        { teacherId: teacherId },
        { name: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    include: { class: true, subject: true },
    take: 5,
  });

  lessons.forEach(lesson => {
    results.push({
      id: lesson.id,
      type: 'lesson',
      title: lesson.name,
      subtitle: `${lesson.subject.name} - ${lesson.class.name}`,
      description: `${lesson.day} ${lesson.startTime.toLocaleTimeString()}`,
      url: `/teacher/lessons/${lesson.id}`,
    });
  });

  // Search exams in teacher's lessons
  const exams = await prisma.exam.findMany({
    where: {
      AND: [
        { lesson: { teacherId: teacherId } },
        { title: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    include: { lesson: { include: { class: true, subject: true } } },
    take: 5,
  });

  exams.forEach(exam => {
    results.push({
      id: exam.id,
      type: 'exam',
      title: exam.title,
      subtitle: `${exam.lesson.subject.name} - ${exam.lesson.class.name}`,
      description: exam.startTime.toLocaleDateString(),
      url: `/teacher/exams/${exam.id}`,
    });
  });

  return results;
}

async function studentSearch(searchTerm: string, filters: SearchFilters) {
  const results: any[] = [];
  const studentId = filters.userId;

  // Get student's class and grade
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { class: true, grade: true },
  });

  if (!student) return results;

  // Search lessons for student's class
  const lessons = await prisma.lesson.findMany({
    where: {
      AND: [
        { classId: student.classId },
        { name: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    include: { subject: true, teacher: true },
    take: 5,
  });

  lessons.forEach(lesson => {
    results.push({
      id: lesson.id,
      type: 'lesson',
      title: lesson.name,
      subtitle: `${lesson.subject.name}`,
      description: `${lesson.teacher.name} ${lesson.teacher.surname} - ${lesson.day}`,
      url: `/student/lessons/${lesson.id}`,
    });
  });

  // Search exams for student's lessons
  const exams = await prisma.exam.findMany({
    where: {
      AND: [
        { lesson: { classId: student.classId } },
        { title: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    include: { lesson: { include: { subject: true } } },
    take: 5,
  });

  exams.forEach(exam => {
    results.push({
      id: exam.id,
      type: 'exam',
      title: exam.title,
      subtitle: exam.lesson.subject.name,
      description: exam.startTime.toLocaleDateString(),
      url: `/student/exams/${exam.id}`,
    });
  });

  // Search assignments
  const assignments = await prisma.assignment.findMany({
    where: {
      AND: [
        { lesson: { classId: student.classId } },
        { title: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    include: { lesson: { include: { subject: true } } },
    take: 5,
  });

  assignments.forEach(assignment => {
    results.push({
      id: assignment.id,
      type: 'assignment',
      title: assignment.title,
      subtitle: assignment.lesson.subject.name,
      description: `Due: ${assignment.dueDate.toLocaleDateString()}`,
      url: `/student/assignments/${assignment.id}`,
    });
  });

  return results;
}

async function parentSearch(searchTerm: string, filters: SearchFilters) {
  const results: any[] = [];
  const parentId = filters.userId;

  // Get parent's children
  const children = await prisma.student.findMany({
    where: { parentId: parentId },
    include: { class: true, grade: true },
  });

  if (children.length === 0) return results;

  const childrenIds = children.map(c => c.id);
  const childrenClassIds = children.map(c => c.classId);

  // Add children to search results if they match
  children.forEach(child => {
    if (
      child.name.toLowerCase().includes(searchTerm) ||
      child.surname.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        id: child.id,
        type: 'student',
        title: `${child.name} ${child.surname}`,
        subtitle: `Your child - Class ${child.class.name}`,
        description: `Grade ${child.grade.level}`,
        url: `/parent/children/${child.id}`,
      });
    }
  });

  // Search lessons for children's classes
  const lessons = await prisma.lesson.findMany({
    where: {
      AND: [
        { classId: { in: childrenClassIds } },
        { name: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    include: { subject: true, teacher: true, class: true },
    take: 5,
  });

  lessons.forEach(lesson => {
    results.push({
      id: lesson.id,
      type: 'lesson',
      title: lesson.name,
      subtitle: `${lesson.subject.name} - ${lesson.class.name}`,
      description: `${lesson.teacher.name} ${lesson.teacher.surname}`,
      url: `/parent/lessons/${lesson.id}`,
    });
  });

  // Search teachers for children's classes
  const teachers = await prisma.teacher.findMany({
    where: {
      AND: [
        { lessons: { some: { classId: { in: childrenClassIds } } } },
        {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { surname: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
      ],
    },
    include: { subjects: true },
    take: 5,
  });

  teachers.forEach(teacher => {
    results.push({
      id: teacher.id,
      type: 'teacher',
      title: `${teacher.name} ${teacher.surname}`,
      subtitle: 'Teacher',
      description: teacher.subjects.map(s => s.name).join(', '),
      url: `/parent/teachers/${teacher.id}`,
    });
  });

  return results;
}