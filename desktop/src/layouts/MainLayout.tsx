import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import background from "../assets/background.png";

const MainLayout = () => {
  return (
    <div
      className="min-h-screen flex flex-col relative bg-[#00072D]"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "repeat",
        backgroundSize: '750px 500px', // kan ändras till 'contain' eller 'cover' om du vill testa
        backgroundPosition: "top left",
      }}
    >
      <Header />
      <main className="flex-1 p-6 pb-[90px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
