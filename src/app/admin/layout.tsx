import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/admin.css";

export const metadata: Metadata = {
  title: "Panel Admina | Bruxa Gaming",
  description: "Panel administracyjny do zarządzania zapowiedziami i FAQ",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
