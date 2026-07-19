import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-around px-10 py-2 bg-ns-dark/70 backdrop-blur-sm">
      <img src={logo} alt="Neromylos Suites" className="h-24" />

      <div className="flex items-center justify-around gap-7 text-m text-ns-cream/75">
        <a href="#rooms" className="hover:text-ns-cream transition-colors">
          Δωμάτια
        </a>
        <a href="#history" className="hover:text-ns-cream transition-colors">
          Ιστορία
        </a>
        <a href="#photos" className="hover:text-ns-cream transition-colors">
          Φωτογραφίες
        </a>
        <a href="#contact" className="hover:text-ns-cream transition-colors">
          Επικοινωνία
        </a>
        <button className="border border-ns-cream/40 rounded-md px-5 py-2 text-ns-cream hover:bg-ns-cream/10 transition-colors">
          Σύνδεση
        </button>
      </div>
    </nav>
  );
};

export default Header;
