import { AuthProvider } from "../Providers"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <main className="p-8 h-screen mx-auto"><AuthProvider>{children}</AuthProvider></main>
  }