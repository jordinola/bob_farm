import { Outlet } from "react-router";
import "./App.css";
import Layout from "./Layout";

const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;
