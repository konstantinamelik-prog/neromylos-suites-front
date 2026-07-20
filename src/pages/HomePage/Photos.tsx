import { useState } from "react";

import outside1 from "@/assets/gallery/outside-1.jpg";
import outside1Full from "@/assets/gallery/outside-1-full.jpg";
import outside2 from "@/assets/gallery/outside-2.jpg";
import outside2Full from "@/assets/gallery/outside-2-full.jpg";
import standardRoom from "@/assets/gallery/standard-room.jpg";
import standardRoomFull from "@/assets/gallery/standard-room-full.jpg";
import standardBathroom from "@/assets/gallery/standard-bathroom.jpg";
import standardBathroomFull from "@/assets/gallery/standard-bathroom-full.jpg";
import superiorRoom from "@/assets/gallery/superior-room.jpg";
import superiorRoomFull from "@/assets/gallery/superior-room-full.jpg";
import suite from "@/assets/gallery/suite.jpg";
import suiteFull from "@/assets/gallery/suite-full.jpg";
import suiteBathroom from "@/assets/gallery/suite-bathroom.jpg";
import suiteBathroomFull from "@/assets/gallery/suite-bathroom-full.jpg";

const galleryImages = [
  { id: 1, src: outside1, fullSrc: outside1Full, alt: "Η αυλή και ο εξωτερικός χώρος" },
  { id: 2, src: outside2, fullSrc: outside2Full, alt: "Η αυλή και ο εξωτερικός χώρος από την είσοδο" },
  { id: 3, src: standardRoom, fullSrc: standardRoomFull, alt: "Δωμάτιο Standard" },
  { id: 4, src: standardBathroom, fullSrc: standardBathroomFull, alt: "Μπάνιο, δωμάτιο Standard" },
  { id: 5, src: superiorRoom, fullSrc: superiorRoomFull, alt: "Δωμάτιο Superior" },
  { id: 6, src: suite, fullSrc: suiteFull, alt: "Δωμάτιο Suite" },
  { id: 7, src: suiteBathroom, fullSrc: suiteBathroomFull, alt: "Μπάνιο, Suite" },
];

const Photos = () => {
  const [selectedImage, setSelectedImage] = useState<
      (typeof galleryImages)[number] | null
  >(null);

  return (
    <div id="photos" className="bg-white">
      <div className="max-w-5xl mx-auto px-10 py-20">
        <p className="text-xs text-ns-stone text-center mb-2">
          ΦΩΤΟΓΡΑΦΙΕΣ
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-ns-dark text-center mb-10">
          Μια γεύση από το Neromylos Suites
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedImage(image)}
              className="cursor-zoom-in"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-[4/3] object-cover rounded-lg hover:opacity-90 transition-opacity"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center px-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            aria-label="Κλείσιμο"
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-ns-cream text-3xl leading-none"
          >
            &times;
          </button>

          <img
            src={selectedImage.fullSrc}
            alt={selectedImage.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Photos;
