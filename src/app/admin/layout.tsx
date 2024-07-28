import { AuthProvider } from "../Providers"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <main className="p-8 mx-auto text-sm"><AuthProvider>{children}</AuthProvider></main>
  }