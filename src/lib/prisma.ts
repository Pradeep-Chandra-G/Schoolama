// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Avoid creating multiple instances of PrismaClient
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
}

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
