import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  searchAvailability,
  resolveImageUrl,
  type RoomReadOnlyDTO,
} from "@/features/bookings/bookingsApi";
import { type SearchFields, searchSchema } from "@/features/bookings/searchSchema";
import { getLocalDateString } from "@/shared/lib/dates";

export default function SearchPage() {
  const [results, setResults] = useState<RoomReadOnlyDTO[] | null>(null);
  const [selectedRoomIds, setSelectedRoomIds] = useState<number[]>([]);
  const [searchedDates, setSearchedDates] = useState<{
    checkIn: string;
    checkOut: string;
    numberOfGuests: number;
  } | null>(null);

  const today = getLocalDateString();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = async (data: SearchFields) => {
    try {
      const rooms = await searchAvailability(data.checkIn, data.checkOut);
      setResults(rooms);
      setSelectedRoomIds([]);
      setSearchedDates(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Κάτι πήγε στραβά.");
    }
  };

  const toggleRoom = (roomId: number) => {
    setSelectedRoomIds((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
  };

  // Άθροισμα χωρητικότητας ΜΟΝΟ των επιλεγμένων δωματίων - όχι όλων των αποτελεσμάτων.
  const selectedCapacity = (results ?? [])
    .filter((room) => selectedRoomIds.includes(room.id))
    .reduce((sum, room) => sum + room.maxOccupancy, 0);

  const requestedGuests = searchedDates?.numberOfGuests ?? 0;
  const hasEnoughCapacity = selectedCapacity >= requestedGuests;
  const canContinue = selectedRoomIds.length > 0 && hasEnoughCapacity;

  const handleContinue = () => {
    if (!searchedDates || !canContinue) return;
    navigate("/booking", {
      state: {
        roomIds: selectedRoomIds,
        checkIn: searchedDates.checkIn,
        checkOut: searchedDates.checkOut,
        numberOfGuests: searchedDates.numberOfGuests,
      },
    });
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-4xl mx-auto">
      <h1 className="font-serif text-2xl text-ns-dark text-center mb-8">
        Έλεγχος διαθεσιμότητας
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end p-6 border border-ns-stone-light rounded bg-white shadow mb-12"
      >
        <Field>
          <FieldLabel htmlFor="checkIn">Άφιξη</FieldLabel>
          <Input id="checkIn" type="date" min={today} {...register("checkIn")} />
          {errors.checkIn && (
            <div className="text-red-600 text-sm">{errors.checkIn.message}</div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="checkOut">Αναχώρηση</FieldLabel>
          <Input id="checkOut" type="date" min={today} {...register("checkOut")} />
          {errors.checkOut && (
            <div className="text-red-600 text-sm">{errors.checkOut.message}</div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="numberOfGuests">Επισκέπτες</FieldLabel>
          <Input
            id="numberOfGuests"
            type="number"
            min={1}
            {...register("numberOfGuests")}
          />
          {errors.numberOfGuests && (
            <div className="text-red-600 text-sm">
              {errors.numberOfGuests.message}
            </div>
          )}
        </Field>

        <Button type="submit" className="sm:col-span-3" disabled={isSubmitting}>
          {isSubmitting ? "Αναζήτηση..." : "Αναζήτηση διαθεσιμότητας"}
        </Button>
      </form>

      {results && results.length === 0 && (
        <p className="text-center text-ns-stone py-12">
          Δεν βρέθηκαν διαθέσιμα δωμάτια για αυτές τις ημερομηνίες. Δοκιμάστε
          διαφορετικές ημερομηνίες.
        </p>
      )}

      {results && results.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {results.map((room) => {
              const isSelected = selectedRoomIds.includes(room.id);

              return (
                <label
                  key={room.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer border-2 transition-colors ${
                    isSelected ? "border-ns-water" : "border-transparent"
                  }`}
                >
                  {room.imageUrl && (
                    <img
                      src={resolveImageUrl(room.imageUrl)!}
                      alt={room.name}
                      className="h-44 w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-serif text-lg text-ns-dark">
                        {room.name}
                      </p>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRoom(room.id)}
                        className="mt-1.5 accent-ns-water"
                      />
                    </div>
                    <p className="text-sm text-ns-stone mb-2">
                      Μέχρι {room.maxOccupancy} άτομα
                    </p>
                    {room.totalPrice !== undefined && (
                      <p className="text-sm text-ns-dark font-medium mb-2">
                        {room.totalPrice}€ συνολικά
                      </p>
                    )}
                    <p className="text-sm text-ns-stone">{room.description}</p>
                  </div>
                </label>
              );
            })}
          </div>

          {selectedRoomIds.length > 0 && !hasEnoughCapacity && (
            <p className="text-center text-red-600 text-sm mb-4">
              Τα επιλεγμένα δωμάτια χωράνε μέχρι {selectedCapacity} άτομα, αλλά
              ζητήσατε {requestedGuests}. Επιλέξτε κι άλλο δωμάτιο, ή λιγότερους
              επισκέπτες.
            </p>
          )}

          <div className="text-center">
            <Button type="button" onClick={handleContinue} disabled={!canContinue}>
              Συνέχεια με {selectedRoomIds.length}{" "}
              {selectedRoomIds.length === 1 ? "δωμάτιο" : "δωμάτια"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
