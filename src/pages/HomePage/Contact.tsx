const Contact = () => {
  return (
      <div id="contact" className="bg-ns-cream">
        <div className="max-w-5xl mx-auto px-10 py-20">
          <p className="text-xs text-ns-stone text-center mb-2">
            ΕΠΙΚΟΙΝΩΝΙΑ
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-ns-dark text-center mb-12">
            Θα χαρούμε να σας φιλοξενήσουμε
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8 sm:flex-row md:flex-col">
              <div>
                <p className="text-xs text-ns-stone mb-2">
                  EMAIL
                </p>
                <a
                    href="mailto:info@neromylossuites.gr"
                    className="text-ns-dark hover:text-ns-water transition-colors"
                >
                  info@neromylossuites.gr
                </a>
              </div>

              <div>
                <p className="text-xs text-ns-stone mb-2">
                  ΤΗΛΕΦΩΝΟ
                </p>
                <a
                    href="tel:+3022340000000"
                    className="text-ns-dark hover:text-ns-water transition-colors"
                >
                  +30 22340 00000
                </a>
              </div>

              <div>
                <p className="text-xs text-ns-stone mb-2">
                  ΔΙΕΥΘΥΝΣΗ
                </p>
                <p className="text-ns-dark">Πολύδροσο, Παρνασσός</p>
              </div>
            </div>

            <iframe
                title="Neromylos Suites στον χάρτη"
                src="https://www.google.com/maps?q=38.635756,22.530874&output=embed"
                className="w-full h-72 md:h-80 rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
  );
};

export default Contact;