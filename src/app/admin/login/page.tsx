import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Officer Login", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="silk grain relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-16">
      <LoginForm />
    </div>
  );
}
