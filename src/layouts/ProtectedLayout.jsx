import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Auth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { loggedInUser } = useContext(Auth);

  if (!loggedInUser) return <Navigate to="/login" replace />;

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ProtectedLayout;