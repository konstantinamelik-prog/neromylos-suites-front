import historyImage from "@/assets/history.jpg";

const History = () => {
  return (
      <div id="history" className="bg-ns-cream">
        <div className="max-w-5xl mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
              src={historyImage}
              alt="Ο παλιός νερόμυλος, πριν την ανακαίνιση"
              className="w-full h-64 md:h-[420px] object-cover rounded-lg grayscale"
          />

          <div>
            <p className="text-xs text-ns-stone mb-3">
              Η ΙΣΤΟΡΙΑ ΜΑΣ
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-ns-dark mb-5 leading-snug">
              Από λειτουργικό νερόμυλο του 1890, σε boutique καταφύγιο
            </h2>
            <p className="text-sm text-ns-stone leading-relaxed mb-4">
              Ο νερόμυλος στο Πολύδροσο άλεθε στάρι για το χωριό επί δεκαετίες,
              κινούμενος από το ίδιο ρέμα που περνά ακόμα δίπλα από τα δωμάτια
              σήμερα. Η πέτρα, το ξύλο και ο ήχος του νερού έμειναν ως έχουν —
              μόνο ο σκοπός άλλαξε.
            </p>
            <p className="text-sm text-ns-stone leading-relaxed">
              Η ανακαίνιση κράτησε τους αρχικούς πέτρινους τοίχους και τη
              βασική δομή της στέγης, προσθέτοντας μόνο ό,τι χρειαζόταν για μια
              άνετη, σύγχρονη διαμονή στους πρόποδες του Παρνασσού.
            </p>
          </div>
        </div>
      </div>
  );
};

export default History;
