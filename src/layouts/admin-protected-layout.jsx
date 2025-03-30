import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const AdminProtectedLayout = () => {
  const { user } = useUser();

  if (user.publicMetadata?.role !== "admin") {
    return <Navigate to="/" />
  }

  return <Outlet />;
};

export default AdminProtectedLayout;
