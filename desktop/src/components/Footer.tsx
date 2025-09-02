import Logo from "../assets/logo-T.png"

const Footer = () => {
  return (
    <footer className="bg-[#9ACEFE] h-[90px] w-full flex items-center px-4 relative ">
      <img src={Logo} alt="Logo" className="h-32 self-end object-contain" />
    </footer>
  )
}

export default Footer
