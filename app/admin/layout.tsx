import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/db/auth";
import { getDB } from "@/lib/db";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifyToken();

  if (!user) {
    redirect("/auth?redirect=/admin");
  }

  const db = await getDB();
  const profile = await db
    .prepare("SELECT role FROM users WHERE id = ?")
    .bind(user.userId)
    .first();

  if (profile?.role !== "admin") {
    redirect("/dojo");
  }

  return <>{children}</>;
}
