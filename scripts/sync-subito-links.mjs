import { neon } from "@neondatabase/serverless";

const url = (process.env.DATABASE_URL || "")
  .replace(/([?&])channel_binding=require&?/, "$1")
  .replace(/[?&]$/, "");

if (!url) {
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const sql = neon(url);

const updates = [
  {
    id: "punto-2010",
    subito_url:
      "https://www.subito.it/auto/fiat-grande-punto-1-3mjt-75-5p-van-actual-4pt-bergamo-662116617.htm",
  },
  {
    id: "bmw-730d",
    subito_url:
      "https://www.subito.it/auto/bmw-730-730d-cat-bergamo-662114379.htm",
  },
  {
    id: "subaru-outback",
    subito_url:
      "https://www.subito.it/auto/subaru-outback-2-5i-16v-fs-bergamo-662095583.htm",
  },
];

for (const row of updates) {
  await sql`
    UPDATE cars
    SET subito_url = ${row.subito_url}, updated_at = NOW()
    WHERE id = ${row.id}
  `;
  console.log("updated", row.id);
}

console.log("done");
