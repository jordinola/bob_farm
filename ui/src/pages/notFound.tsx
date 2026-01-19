import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-amber-300 w-screen h-svh sm:min-h-screen">
      <img src="/logo.png" alt="Logo" className="m-5 w-32 h-32" />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="rounded-md p-2.5 text-white border-amber-700 bg-amber-500 border-2 cursor-pointer hover:cursor-pointer hover:bg-amber-700"
      >
        Back to dashboard
      </button>
    </div>
  );
};

export default NotFound;
