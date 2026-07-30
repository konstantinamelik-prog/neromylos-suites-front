import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/features/auth/AuthProvider";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#rooms", label: "Δωμάτια" },
  { href: "#history", label: "Ιστορία" },
  { href: "#photos", label: "Φωτογραφίες" },
  { href: "#contact", label: "Επικοινωνία" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-ns-dark/60">
      <div className="flex items-center justify-between px-10 py-2">

        <Link to="/">
          <img src={logo} alt="Neromylos Suites" className="h-26 drop-shadow-lg/60" />
        </Link>

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

          {isAuthenticated ? (
            <>
              <Link
                to="/my-bookings"
                className="hover:text-ns-cream transition-colors hover:underline underline-offset-8"
              >
                Οι κρατήσεις μου
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="border border-ns-cream/40 rounded-md px-5 py-2 text-ns-cream hover:bg-ns-cream/10 transition-colors"
              >
                Αποσύνδεση
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="border border-ns-cream/40 rounded-md px-5 py-2 text-ns-cream hover:bg-ns-cream/10 transition-colors"
            >
              Σύνδεση
            </Link>
          )}

          <Link
            to="/search"
            className="bg-ns-cream text-ns-dark rounded-md px-5 py-2 font-medium hover:opacity-90 transition-opacity"
          >
            Κράτηση
          </Link>
        </div>

        <button
          type="button"
          aria-label="Άνοιγμα μενού"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="sm:hidden text-ns-cream p-2"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden flex flex-col gap-1 px-10 pb-5 bg-ns-dark/10 text-lg text-ns-cream/85">
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

          {isAuthenticated ? (
            <>
              <Link
                to="/my-bookings"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 hover:text-ns-cream transition-colors hover:underline underline-offset-8"
              >
                Οι κρατήσεις μου
              </Link>
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="mt-2 w-fit bg-ns-dark/80 border border-ns-cream/40 rounded-md px-5 py-2 text-ns-cream hover:bg-ns-cream/10 transition-colors"
              >
                Αποσύνδεση
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 w-fit bg-ns-dark/80 border border-ns-cream/40 rounded-md px-5 py-2 text-ns-cream hover:bg-ns-cream/10 transition-colors"
            >
              Σύνδεση
            </Link>
          )}

          <Link
            to="/search"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 w-fit bg-ns-cream text-ns-dark rounded-md px-5 py-2 font-medium hover:opacity-90 transition-opacity"
          >
            Κράτηση
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
