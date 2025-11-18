import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar – fixed on desktop, collapsible on mobile */}
      <Sidebar />

      {/* Main panel */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Page content */}
        <main className="flex-1 p-6">
          <MainContent>{children}</MainContent>
        </main>
      </div>
    </div>
  );
}