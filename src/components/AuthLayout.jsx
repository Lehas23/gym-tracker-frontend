function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          FitTrack
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Log your workouts. Track your gains.
        </p>
      </div>
      <div className="bg-white p-8 rounded-lg w-96 shadow-md">{children}</div>
    </div>
  );
}

export default AuthLayout;
