import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}

export default MainLayout;
