import { useState, useEffect } from "react";
import Logo from "../assets/logo-T.png";

export default function Footer() {
  const [footerExpanded, setFooterExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const distanceToBottom =
        document.body.offsetHeight - (window.innerHeight + window.scrollY);

      // Expandera footern när vi är inom 90px från botten
      setFooterExpanded(distanceToBottom <= 90);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full bg-[#9ACEFE] flex items-end px-4 z-50 transition-all duration-300 ${
        footerExpanded ? "h-[90px]" : "h-[30px]"
      }`}
    >
      <img
        src={Logo}
        alt="Logo"
        className={`object-contain self-end transition-all duration-300 ${
          footerExpanded ? "h-32" : "h-10"
        }`}
      />
    </footer>
  );
}
