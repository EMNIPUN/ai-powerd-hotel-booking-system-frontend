import { Outlet } from "react-router";
import Navigation from "@/components/Navigation";
import { useState } from "react";

function MainLayout() {
  return (
    <>
      <Navigation  />
      <Outlet />
    </>
  );
}

export default MainLayout;
