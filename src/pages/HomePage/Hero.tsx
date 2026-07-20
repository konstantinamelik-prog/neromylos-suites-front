import heroImage from "@/assets/hero2.png";

const Hero = () => {
  return (
    <div
      className="relative h-[740px] flex flex-col items-center justify-center text-center px-10 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(20,18,15,0.15), rgba(20,18,15,0.55)), url(${heroImage})`,
      }}
    >
      <h1 className="font-serif text-3xl md:text-4xl font-medium text-ns-cream leading-snug mb-3 max-w-2xl [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]">
        Ένας πέτρινος νερόμυλος, ζωντανός ξανά στον Παρνασσό
      </h1>

      <p className="text-sm text-ns-cream/90 mb-6 tracking-wide">
        Πολύδροσο, Παρνασσός · Boutique διαμονή δίπλα στο νερό
      </p>

      <a
        href="#rooms"
        className="inline-block bg-ns-cream text-ns-dark text-sm font-semibold px-7 py-3 rounded-md hover:opacity-90 transition-opacity"
      >
        Δες τα δωμάτια
      </a>
    </div>
  );
};

export default Hero;
