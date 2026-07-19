type RoomPreviewCardProps = {
  name: string;
  priceFrom: number;
  imageUrl?: string;
  accentClass?: string; // fallback χρωματιστό block, μόνο όσο δεν έχουμε imageUrl
};

const RoomPreviewCard = ({
  name,
  priceFrom,
  imageUrl,
  accentClass,
}: RoomPreviewCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="h-52 w-full object-cover" />
      ) : (
        <div className={`h-52 ${accentClass ?? "bg-ns-stone-light"}`} />
      )}

      <div className="p-4">
        <p className="font-serif text-lg text-ns-dark mb-1">{name}</p>
        <p className="text-sm text-ns-stone">από {priceFrom}€/βράδυ</p>
      </div>
    </div>
  );
};

export default RoomPreviewCard;
