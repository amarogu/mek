import { AuthProvider } from "../Providers"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <main className="p-8 container h-screen relative mx-auto"><AuthProvider>{children}</AuthProvider></main>
  }