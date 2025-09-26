import Navbar from "./Navbar"
import LoginButton from "./LoginButton"
import Logo from "../assets/logo-T.png";

const Header = () => {
  return (
    <header className="bg-[#9ACEFE] text-[#00072D]">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Vänster: Titel */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-11 w-auto object-contain transition-all duration-300 relative"
            style={{ top: "-5px", right: "-14px", position: "relative" }}
          />
          <h1 className="text-xl font-bold text-[#00072D] z-10">rackApp</h1>
          
        </div>

        {/* Mitten: Navbar */}
        <Navbar />

        {/* Höger: Login */}
        <LoginButton />
      </div>
    </header>
  )
}

export default Header
