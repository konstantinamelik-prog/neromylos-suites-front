import RoomPreviewCard from "./RoomPreviewCard";
import standardImg from "@/assets/room_standard.jpg";
import superiorImg from "@/assets/room_superior.jpg";
import suiteImg from "@/assets/room_suite.jpg";

const previewRooms = [
  { id: 1, name: "Platanos", priceFrom: 65, imageUrl: standardImg },
  { id: 2, name: "Krini", priceFrom: 95, imageUrl: superiorImg },
  { id: 3, name: "Mylos", priceFrom: 140, imageUrl: suiteImg },
];

const RoomsPreview = () => {
  return (
    <div id="rooms" className="px-10 py-14 max-w-5xl mx-auto">
      <p className="text-xs uppercase tracking-wide text-ns-stone text-center mb-2">
        Τα δωμάτια μας
      </p>
      <h2 className="font-serif text-2xl text-ns-dark text-center mb-10">
        Επίλεξε τη διαμονή σου
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
        {previewRooms.map((room) => (
          <RoomPreviewCard
            key={room.id}
            name={room.name}
            priceFrom={room.priceFrom}
            imageUrl={room.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomsPreview;
