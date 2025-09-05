import Logo from "../assets/logo-T.png"

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-[90px] bg-[#9ACEFE] flex items-end px-4 z-50">
      <img src={Logo} alt="Logo" className="h-32 object-contain self-end" />
    </footer>
  )
}

export default Footer
