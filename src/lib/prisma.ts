import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { Prisma } from "@prisma/client";

type PrismaClientInstance = ReturnType<typeof Prisma.Client>;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClientInstance };

function createPrismaClient() {
  const url = new URL(process.env.DATABASE_URL!);
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port),
    user: url.username,
    password: url.password,
    database: url.pathname.replace(/^\//, ""),
    connectionLimit: 20,
  });
  return new (Prisma as unknown as { new (opts: Record<string, unknown>): PrismaClientInstance })({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
