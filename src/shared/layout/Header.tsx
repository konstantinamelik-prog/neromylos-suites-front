import { useState } from "react";
import logo from "@/assets/logo.png";

const navLinks = [
  { href: "#rooms", label: "Δωμάτια" },
  { href: "#history", label: "Ιστορία" },
  { href: "#photos", label: "Φωτογραφίες" },
  { href: "#contact", label: "Επικοινωνία" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <nav className="fixed top-0 inset-x-0 z-50 bg-ns-dark/60">
        <div className="flex items-center justify-between px-10 py-2">
          <img src={logo} alt="Neromylos Suites" className="h-26" />

          <div className="hidden sm:flex items-center justify-around gap-7 text-lg text-shadow-2xs text-ns-cream/75">
            {navLinks.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    className="hover:text-ns-cream transition-colors hover:underline underline-offset-8"
                >
                  {link.label}
                </a>
            ))}
            <button className="border border-ns-cream/40 rounded-md px-5 py-2 text-ns-cream hover:bg-ns-cream/10 transition-colors">
              Σύνδεση
            </button>
            {/* TODO: προς το παρόν κάνει scroll στο #rooms.
            Όταν μπει routing + σελίδα αναζήτησης διαθεσιμότητας, να κάνω link εκεί. */}
            <a
                href="#rooms"
                className="bg-ns-cream text-ns-dark rounded-md px-5 py-2 font-medium hover:opacity-90 transition-opacity"
            >
              Κράτηση
            </a>
          </div>

          <button
              type="button"
              aria-label="Άνοιγμα μενού"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="sm:hidden text-ns-cream p-2"
          >
            {isMenuOpen ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
            ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            )}
          </button>
        </div>

        {/* Dropdown μενού, μόνο όταν isMenuOpen === true */}
        {isMenuOpen && (
            <div className="sm:hidden flex flex-col gap-1 px-10 pb-5 bg-ns-dark/60 text-lg text-ns-cream/85">
              {navLinks.map((link) => (
                  <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="py-2 hover:text-ns-cream transition-colors hover:underline underline-offset-8"
                  >
                    {link.label}
                  </a>
              ))}
              <button className="mt-2 w-fit border border-ns-cream/40 rounded-md px-5 py-2 text-ns-cream hover:bg-ns-cream/10 transition-colors">
                Σύνδεση
              </button>
              <a
                  href="#rooms"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 w-fit bg-ns-cream text-ns-dark rounded-md px-5 py-2 font-medium hover:opacity-90 transition-opacity"
              >
                Κράτηση
              </a>
            </div>
        )}
      </nav>
  );
};

export default Header;
