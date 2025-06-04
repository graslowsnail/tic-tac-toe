import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!);

try {
  await client`SELECT 1`;
  console.log("✅ Connected to Supabase DB!");
} catch (err) {
  console.error("❌ Could not connect:", err);
}

