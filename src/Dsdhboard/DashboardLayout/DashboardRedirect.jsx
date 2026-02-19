
import { Navigate } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useRole from "../../hooks/useRole";


const DashboardRedirect = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role === "admin") {
    return <Navigate to="/dashboard/statistics" replace />;
  }

  if (role === "seller") {
    return <Navigate to="/dashboard/manage-product" replace />;
  }

  if (role === "customer") {
    return <Navigate to="/dashboard/my-orders" replace />;
  }

  return null;
};

export default DashboardRedirect;
