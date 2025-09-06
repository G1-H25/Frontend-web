import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


const MainLayout = () => {
  
  const originalTitle = "Paketappen";

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Byt titel när användaren lämnar sidan
        document.title = "🔵 Kom tillbaka!";
      } else {
        // När användaren återvänder, återställ titel och visa overlay
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1 p-6 pb-[90px] bg-[#00072D]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
