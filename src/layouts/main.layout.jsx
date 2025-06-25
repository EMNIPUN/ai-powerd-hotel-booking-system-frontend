import { Outlet } from "react-router";
import Navigation from "@/components/Navigation";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      <Navigation />
      <main className="flex-1 w-full  mx-auto px-4 sm:px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
