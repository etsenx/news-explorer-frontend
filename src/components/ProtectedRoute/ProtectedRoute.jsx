import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/");
    }
  }, [navigate]);
  return <Outlet />;
}

export default ProtectedRoute;