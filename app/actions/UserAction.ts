"use server"

import { db } from "@/src/prisma/db";

async function main() {
  const query = db.sql.public.User
    .select("id", "email", "name")
    .limit(2)
    .build();

  const rows = await db.runtime().query(query);
  console.log(rows);

  await db.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


async function main() {
  const created = await db.orm.public.User.create({
    email: "alice@example.com",
    name: "Alice",
  });
  console.log("Created:", created);

  const users = await db.orm.public.User.all();
  console.log("All users:", users);

  await db.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
