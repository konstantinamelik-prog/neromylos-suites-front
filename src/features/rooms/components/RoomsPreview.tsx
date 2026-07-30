import { Link } from "react-router";
import RoomPreviewCard from "./RoomPreviewCard";
import { rooms } from "../data/rooms";

const RoomsPreview = () => {
  return (
    <div id="rooms" className="px-10 py-14 max-w-5xl mx-auto">
      <p className="text-xs text-ns-stone text-center mb-2">
        ΤΑ ΔΩΜΑΤΙΑ ΜΑΣ
      </p>
      <h2 className="font-serif text-2xl text-ns-dark text-center mb-10">
        Επίλεξε τη διαμονή σου
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
        {rooms.map((room) => (
          <Link key={room.slug} to={`/rooms/${room.slug}`}>
            <RoomPreviewCard
              name={room.name}
              priceFrom={room.priceFrom}
              imageUrl={room.thumbnail}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoomsPreview;
