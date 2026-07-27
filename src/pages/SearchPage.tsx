import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
  const today = getLocalDateString();

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

      if (rooms.length === 0) {
        toast.info("Δεν βρέθηκαν διαθέσιμα δωμάτια για αυτές τις ημερομηνίες.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Κάτι πήγε στραβά.");
    }
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

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {results.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
            >
              {room.imageUrl && (
                <img
                  src={resolveImageUrl(room.imageUrl)!}
                  alt={room.name}
                  className="h-44 w-full object-cover"
                />
              )}
              <div className="p-4">
                <p className="font-serif text-lg text-ns-dark mb-1">
                  {room.name}
                </p>
                <p className="text-sm text-ns-stone mb-2">
                  Μέχρι {room.maxOccupancy} άτομα
                </p>
                <p className="text-sm text-ns-stone">{room.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
