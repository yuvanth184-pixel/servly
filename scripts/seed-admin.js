// Seed admin account directly into Railway DB
const bcrypt = require("bcryptjs");

async function main() {
  // Import prisma using the same approach as the app
  const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
  const { PrismaClient } = require("@prisma/client");

  const url = new URL(process.env.DATABASE_URL);
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port),
    user: url.username,
    password: url.password,
    database: url.pathname.replace(/^\//, ""),
    connectionLimit: 5,
  });

  const prisma = new PrismaClient({ adapter });

  const phone = "9677192579";
  const password = "admin123";

  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) {
    console.log(`User ${phone} already exists. Updating role to admin...`);
    await prisma.user.update({ where: { phone }, data: { role: "admin" } });
    console.log("Done — user is now admin.");
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { phone, password: hashed, name: "Admin", role: "admin" },
    });
    console.log(`Admin created: ${phone} / ${password}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
