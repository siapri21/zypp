import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthCTA";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
