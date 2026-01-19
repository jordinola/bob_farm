import { useNavigate } from "react-router";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-5 bg-amber-300 w-screen h-svh sm:min-h-screen">
      <img src="/logo.png" alt="Logo" className="m-5 w-32 h-32" />

      <h1 className="text-4xl font-bold text-green-900">
        Welcome to Bob's Farm!
      </h1>
      <p className="text-lg text-green-800">
        Your one-stop solution for managing your farm produce.
      </p>
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="rounded-md p-2.5 text-white border-amber-700 bg-amber-500 border-2 cursor-pointer hover:cursor-pointer hover:bg-amber-700"
      >
        Start buying...
      </button>
    </div>
  );
};

export default Welcome;
