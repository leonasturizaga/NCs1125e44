import DashboardLayout from "./DashboardLayout";

export default function ProtectedLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}