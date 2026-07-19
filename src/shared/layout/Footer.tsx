const Footer = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-ns-dark text-ns-cream/70">
      <div className="max-w-5xl mx-auto px-10 py-10 flex flex-col sm:flex-row sm:justify-between gap-10">
        <div className="sm:max-w-xs">
          <p className="font-serif text-lg text-ns-cream mb-2">
            Neromylos Suites
          </p>
          <p className="text-sm leading-relaxed">
            Ένας πέτρινος νερόμυλος του 1890, ζωντανός ξανά ως boutique
            κατάλυμα στους πρόποδες του Παρνασσού.
          </p>
        </div>

        <div>
          <p className="text-xs text-ns-cream mb-3">
            ΠΛΟΗΓΗΣΗ
          </p>
          <div className="flex flex-col gap-2 text-sm">
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
          </div>
        </div>

        <div>
          <p className="text-xs text-ns-cream mb-3">
            ΕΠΙΚΟΙΝΩΝΙΑ
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="mailto:info@neromylossuites.gr"
              className="hover:text-ns-cream transition-colors"
            >
              info@neromylossuites.gr
            </a>
            <span>Πολύδροσο, Παρνασσός</span>
          </div>
        </div>
      </div>

      <div className="border-t border-ns-cream/10 px-10 py-5 text-center text-xs">
        &copy; {currentYear} Neromylos Suites. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
