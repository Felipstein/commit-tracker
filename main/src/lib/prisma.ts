import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(process.env.NODE_ENV !== 'production' ? { log: ['query'] } : undefined);

export { prisma };