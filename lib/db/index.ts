// D1 / Neon database abstraction

export async function getDB() {
  // Cloudflare D1
  const globalD1 = (globalThis as any).__D1_DB || (process.env as any).DB;
  if (globalD1 && typeof globalD1.prepare === "function") {
    return globalD1;
  }

  // Fallback: Neon PostgreSQL
  if (process.env.DATABASE_URL) {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL);

    return {
      prepare(query: string) {
        let params: any[] = [];
        let pgQuery = query;
        let idx = 0;
        pgQuery = pgQuery.replace(/\?/g, () => `$${++idx}`);

        return {
          bind(...values: any[]) {
            params = values;
            return this;
          },
          async first(): Promise<any> {
            const rows = await sql.query(pgQuery, params);
            return rows[0] || null;
          },
          async run() {
            const rows = await sql.query(pgQuery, params);
            return { results: rows as any[], success: true, meta: {} };
          },
          async all() {
            const rows = await sql.query(pgQuery, params);
            return { results: rows as any[], success: true, meta: {} };
          },
        };
      },
    };
  }

  throw new Error("No database available");
}
