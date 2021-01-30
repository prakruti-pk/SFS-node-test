const db = require("../server/db");
const Creditor = require("../server/db/models");
const fs = require("fs");
const path = require("path");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const file = fs.readFileSync(path.join(__dirname, "seed-data.json"), "utf8");
  const creditors = JSON.parse(file);

  for (const creditor of creditors) {
    await Creditor.create(creditor);
  }
  console.log(`seeded ${creditors.length} creditors`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
