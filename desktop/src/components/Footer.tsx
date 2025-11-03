import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../assets/logo-T.png";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Footer() {
  const [footerExpanded, setFooterExpanded] = useState(false);
  const location = useLocation(); // fångar sidbyte (pathname)

  const updateFooterState = () => {
    const pageHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const distanceToBottom = pageHeight - (windowHeight + window.scrollY);

    if (pageHeight <= windowHeight) {
      // ingen scroll → stor footer direkt
      setFooterExpanded(true);
    } else {
      // annars bara expandera om man är nära botten
      setFooterExpanded(distanceToBottom <= 90);
    }
  };

  // Kör vid scroll & resize
  useEffect(() => {
    window.addEventListener("scroll", updateFooterState);
    window.addEventListener("resize", updateFooterState);

    return () => {
      window.removeEventListener("scroll", updateFooterState);
      window.removeEventListener("resize", updateFooterState);
    };
  }, []);

  // Kör även vid sidbyte
  useEffect(() => {
    // liten delay så DOM hunnit laddas
    setTimeout(updateFooterState, 50);
  }, [location.pathname]);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full bg-[#9ACEFE] flex items-end px-6 z-50 transition-all duration-300 ${
        footerExpanded ? "h-[90px]" : "h-[30px]"
      }`}
    >
      {/* Logo */}
      <div className="flex-none">
        <img
          src={Logo}
          alt="Logo"
          className={`object-contain self-end transition-all duration-300 ${
            footerExpanded ? "h-32" : "h-10"
          }`}
        />
      </div>

      {/* Länkar (syns bara när footern är expanderad) */}
      {footerExpanded && (
        <div className="flex-1 flex justify-center items-center gap-12 pb-6">
          <a
            href="https://github.com/orgs/G1-H25/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#00072D] hover:text-gray-800 transition"
          >
            <SiGithub size={24} />
            <span>Alla repon i vårt projekt</span>
          </a>

          <a
            href="https://www.linkedin.com/in/thomaskronvold"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#00072D] hover:text-gray-800 transition"
          >
            <SiLinkedin size={24} />
            <span>Sidan skapad av Thomas Kronvold</span>
          </a>
        </div>
      )}
    </footer>
  );
}
