import { useState } from "react";
import { Link, useParams } from "react-router";
import { rooms } from "@/features/rooms";

const RoomDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const room = rooms.find((r) => r.slug === slug);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!room) {
    return (
      <div className="max-w-3xl mx-auto px-10 py-24 text-center">
        <p className="text-ns-dark mb-4">Δεν βρέθηκε αυτό το δωμάτιο.</p>
        <Link to="/" className="text-ns-water hover:underline">
          Επιστροφή στην αρχική
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-10 pt-32 pb-20">
      <Link
        to="/#rooms"
        className="text-sm text-ns-stone hover:text-ns-water transition-colors"
      >
        ← Όλα τα δωμάτια
      </Link>

      <h1 className="font-serif text-3xl text-ns-dark mt-4 mb-2">{room.name}</h1>
      <p className="text-ns-stone mb-8">από {room.priceFrom}€/βράδυ</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {room.images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className="cursor-zoom-in"
          >
            <img
              src={image}
              alt={room.name}
              className="w-full h-64 object-cover rounded-lg hover:opacity-90 transition-opacity"
            />
          </button>
        ))}
      </div>

      <p className="text-ns-stone leading-relaxed max-w-2xl">{room.description}</p>

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
            src={selectedImage}
            alt={room.name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default RoomDetailPage;
