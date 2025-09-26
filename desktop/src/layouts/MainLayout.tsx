import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


const MainLayout = () => {

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
