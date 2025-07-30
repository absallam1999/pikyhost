import { fetchBtns } from "./../../Services/Models/btns";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import classNames from "classnames";
import "./index.scss";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [btns, setBtns] = useState([]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(nextLang);
    localStorage.setItem("i18nextLng", nextLang);
  };

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleScroll = () => {
    const sections = ["hero", "features", "pricing", "contact"];
    let current = "hero";
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section && window.scrollY >= section.offsetTop - 100) {
        current = id;
      }
    });
    setActiveSection(current);
  };

  useEffect(() => {
    fetchBtns().then((btnData) => {
      setBtns(btnData);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    });
  }, []);

  return (
    <nav className="navbar" id="mainNavbar">
      <div className="container">
        <div className="navbar-content">
          <a className="navbar-brand" href="#home" data-aos="fade-right">
            <img
              src="assets/logo.svg"
              alt="PikyHost"
              width="120"
              height="45"
              loading="eager"
            />
          </a>

          <button
            className={classNames("navbar-toggler", { active: isNavOpen })}
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className={classNames("navbar-nav", { active: isNavOpen })}>
            <div className="nav-links">
              {["home", "features", "pricing"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={classNames("nav-link", {
                    active: activeSection === id,
                  })}
                  onClick={() => setIsNavOpen(false)}
                >
                  {t(id)}
                </a>
              ))}
            </div>

            <div className="nav-language-toggle">
              <button
                onClick={toggleLanguage}
                className="nav-lang-btn"
                aria-label="Switch language"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span>{i18n.language === "ar" ? "EN" : "AR"}</span>
              </button>
            </div>

            <div className="nav-cta">
              <a
                href={btns[0]?.link || "#pricing"}
                className="nav-cta-btn"
                onClick={() => setIsNavOpen(false)}
              >
                {t("getStarted")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
