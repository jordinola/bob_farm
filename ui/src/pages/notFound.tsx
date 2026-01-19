const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-300 w-screen h-svh sm:min-h-screen">
      <img src="/logo.png" alt="Logo" className="m-5 w-32 h-32" />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>
    </div>
  );
};

export default NotFound;
