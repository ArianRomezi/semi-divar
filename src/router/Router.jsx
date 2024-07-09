import { Routes, Route, Navigate } from "react-router-dom";
import HomePgae from "pages/HomePage";
import DashbordPage from "pages/DashbordPage";
import AuthPage from "pages/AuthPage";
import AdminPage from "pages/AdminPage";
import PageNotFound from "pages/404";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/user";
import Loader from "components/modules/Loader";
import AdminPostPage from "../pages/AdminPostPage";

const Router = () => {
  const { data, isLoading, error } = useQuery(["profile"], getProfile);
  console.log(data);

  if (isLoading) return <Loader />;
  return (
    <Routes>
      <Route index element={<HomePgae />} />
      <Route
        path="/dashbord"
        element={data ? <DashbordPage /> : <Navigate to="/auth" />}
      />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin/post"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPostPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
