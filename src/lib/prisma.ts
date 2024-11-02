import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        // log: ['query'], // Opcional: define logs para queries SQL no console.
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;