import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-w-[300px]">
      <Navbar />
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}
