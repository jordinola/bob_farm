import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-5 p-5 bg-amber-300 w-screen h-svh lg:flex-row">
      <div className="mx-auto md:w-1/6">
        <img src="/logo.png" alt="Logo" className="m-5 w-32 h-32" />
      </div>
      <div className="md:w-5/6">
        {children}
        <ToastContainer limit={20} />
      </div>
    </div>
  );
};

export default Layout;
