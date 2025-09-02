import Navbar from "./Navbar"
import LoginButton from "./LoginButton"

const Header = () => {
  return (
    <header className="bg-[#9ACEFE] text-[#00072D] ">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Vänster: Titel */}
        <h1 className="text-xl font-bold">Paketappen</h1>

        {/* Mitten: Navbar */}
        <Navbar />

        {/* Höger: Login */}
        <LoginButton />
      </div>
    </header>
  )
}

export default Header
