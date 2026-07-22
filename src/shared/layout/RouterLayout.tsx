import { Outlet } from "react-router";
import Layout from "./Layout";

const RouterLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default RouterLayout;
