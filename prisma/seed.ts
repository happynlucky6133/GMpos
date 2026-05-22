import { execFile } from "node:child_process";
import { promisify } from "node:util";
import bcrypt from "bcryptjs";
import type { PrismaClient } from "../src/generated/prisma/client";

type PrismaClientImportCheck = PrismaClient;

const execFileAsync = promisify(execFile);
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://freshstack_admin:freshstack_dev_2026@localhost:5432/freshstack";

const users = [
  {
    email: "admin@freshstack.cc",
    name: "Platform Admin",
    password: "Admin@12345",
    role: "platform_admin",
    companySlug: null,
  },
  {
    email: "admin@gm.freshstack.cc",
    name: "GM Admin",
    password: "Admin@12345",
    role: "company_admin",
    companySlug: "gm",
  },
  {
    email: "admin@yc.freshstack.cc",
    name: "YC Admin",
    password: "Admin@12345",
    role: "company_admin",
    companySlug: "yc",
  },
] as const;

const companies = [
  { name: "GM Company", slug: "gm" },
  { name: "YC Company", slug: "yc" },
] as const;

function cuid() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 18);

  return `c${timestamp}${random}`.padEnd(25, "0").slice(0, 25);
}

function sql(value: string | null) {
  if (value === null) {
    return "NULL";
  }

  return `'${value.replaceAll("'", "''")}'`;
}

async function psql(query: string) {
  const url = new URL(databaseUrl);
  const { stdout } = await execFileAsync(
    "psql",
    [
      "-h",
      url.hostname,
      "-p",
      url.port || "5432",
      "-U",
      decodeURIComponent(url.username),
      "-d",
      url.pathname.slice(1),
      "-X",
      "-q",
      "-t",
      "-A",
      "-F",
      "\t",
      "-v",
      "ON_ERROR_STOP=1",
      "-c",
      query,
    ],
    {
      env: {
        ...process.env,
        PGPASSWORD: decodeURIComponent(url.password),
      },
      maxBuffer: 1024 * 1024,
    },
  );

  return stdout.trim();
}

async function main() {
  void (null as PrismaClientImportCheck | null);

  for (const company of companies) {
    await psql(`
      INSERT INTO "companies" ("id", "name", "slug", "updatedAt")
      VALUES (${sql(cuid())}, ${sql(company.name)}, ${sql(company.slug)}, NOW())
      ON CONFLICT ("slug") DO UPDATE
      SET "name" = EXCLUDED."name", "updatedAt" = NOW();
    `);
  }

  for (const user of users) {
    const password = await bcrypt.hash(user.password, 10);

    await psql(`
      INSERT INTO "users" ("id", "email", "name", "password", "updatedAt")
      VALUES (${sql(cuid())}, ${sql(user.email)}, ${sql(user.name)}, ${sql(password)}, NOW())
      ON CONFLICT ("email") DO UPDATE
      SET "name" = EXCLUDED."name",
          "password" = EXCLUDED."password",
          "isActive" = TRUE,
          "updatedAt" = NOW();
    `);

    if (user.companySlug) {
      await psql(`
        INSERT INTO "company_users" ("id", "companyId", "userId", "role")
        SELECT ${sql(cuid())}, c."id", u."id", ${sql(user.role)}::"Role"
        FROM "companies" c
        CROSS JOIN "users" u
        WHERE c."slug" = ${sql(user.companySlug)}
          AND u."email" = ${sql(user.email)}
        ON CONFLICT ("companyId", "userId") DO UPDATE
        SET "role" = EXCLUDED."role";
      `);
    }
  }

  const result = await psql(`
    SELECT
      u."email",
      u."name",
      COALESCE(c."slug", 'platform') AS "company",
      COALESCE(cu."role"::TEXT, 'platform_admin') AS "role"
    FROM "users" u
    LEFT JOIN "company_users" cu ON cu."userId" = u."id"
    LEFT JOIN "companies" c ON c."id" = cu."companyId"
    WHERE u."email" IN (${users.map((user) => sql(user.email)).join(", ")})
    ORDER BY u."email";
  `);

  console.log("Seed complete:");
  console.log(result);
}

main().catch((error) => {
  console.error("Seed failed:");
  console.error(error);
  process.exit(1);
});
