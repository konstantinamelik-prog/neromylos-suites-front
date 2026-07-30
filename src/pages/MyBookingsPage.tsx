import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router";
import { useAuth } from "@/features/auth/AuthProvider";
import { getMemberBookings } from "@/features/auth/membersApi";
import type { BookingReadOnlyDTO } from "@/features/bookings/bookingsApi";

export default function MyBookingsPage() {
  const { userId } = useAuth();
  const [bookings, setBookings] = useState<BookingReadOnlyDTO[] | null>(null);

  useEffect(() => {
    if (!userId) return;

    getMemberBookings(userId)
      .then(setBookings)
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Κάτι πήγε στραβά.");
      });
  }, [userId]);

  return (
    <div className="pt-32 pb-20 px-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-2xl text-ns-dark text-center mb-8">
        Οι κρατήσεις μου
      </h1>

      {bookings === null && <p className="text-ns-stone text-center">Φόρτωση...</p>}

      {bookings && bookings.length === 0 && (
        <p className="text-ns-stone text-center py-12">
          Δεν έχετε κάνει ακόμα καμία κράτηση.{" "}
          <Link to="/search" className="text-ns-water hover:underline">
            Ξεκινήστε μια αναζήτηση
          </Link>
          .
        </p>
      )}

      {bookings && bookings.length > 0 && (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-5 border border-ns-stone-light rounded bg-white shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-serif text-lg text-ns-dark">
                  Κράτηση #{booking.id}
                </p>
                <span className="text-xs uppercase tracking-wide text-ns-stone">
                  {booking.status}
                </span>
              </div>
              <p className="text-sm text-ns-stone">
                {booking.roomNames.join(", ")}
              </p>
              <p className="text-sm text-ns-stone">
                {booking.checkIn} → {booking.checkOut} · {booking.numberOfGuests}{" "}
                επισκέπτες
              </p>
              <p className="text-sm text-ns-dark font-medium mt-1">
                {booking.totalPrice}€
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
