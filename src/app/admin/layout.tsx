import { AuthProvider } from "../Providers"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <main><AuthProvider>{children}</AuthProvider></main>
  }