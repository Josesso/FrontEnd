import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function PrivateRoute() {
  const {isAutententicated, loading} = useAuth();

  //console.log(loading,isAutententicated)  
  if (loading) return "Loading"

  return isAutententicated ? <Outlet /> : <Navigate to="/login" />;
}