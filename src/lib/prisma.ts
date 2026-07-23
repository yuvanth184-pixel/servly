import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const globalForPrisma = globalThis as unknown as { prisma: any };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _prisma: any = null;

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
  return new PrismaClient({ adapter });
}

function getPrisma(): any {
  if (process.env.NODE_ENV === "production") {
    if (!_prisma) _prisma = createPrismaClient();
    return _prisma;
  }
  if (!globalForPrisma.prisma) globalForPrisma.prisma = createPrismaClient();
  return globalForPrisma.prisma;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma: any = new Proxy({} as any, {
  get(_, prop) {
    return (getPrisma() as any)[prop as string];
  },
});
