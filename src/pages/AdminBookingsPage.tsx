import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  getPaginatedBookings,
  type BookingReadOnlyDTO,
} from "@/features/bookings/bookingsApi";

const PAGE_SIZE = 10;

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingReadOnlyDTO[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line
    setIsLoading(true);
    getPaginatedBookings(pageNumber, PAGE_SIZE)
      .then((result) => {
        setBookings(result.data);
        setTotalPages(result.totalPages);
      })
      .catch((error) => {
        toast.error(
          error instanceof Error ? error.message : "Κάτι πήγε στραβά."
        );
      })
      .finally(() => setIsLoading(false));
  }, [pageNumber]);

  return (
    <div className="pt-32 pb-20 px-10 max-w-5xl mx-auto">
      <h1 className="font-serif text-2xl text-ns-dark mb-8">Κρατήσεις</h1>

      {isLoading ? (
        <p className="text-ns-stone">Φόρτωση...</p>
      ) : bookings.length === 0 ? (
        <p className="text-ns-stone">Δεν υπάρχουν κρατήσεις.</p>
      ) : (
        <div className="overflow-x-auto border border-ns-stone-light rounded bg-white shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-ns-cream text-ns-stone uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Αρ. Κράτησης</th>
                <th className="px-4 py-3">Δωμάτια</th>
                <th className="px-4 py-3">Άφιξη</th>
                <th className="px-4 py-3">Αναχώρηση</th>
                <th className="px-4 py-3">Ονοματεπώνυμο</th>
                <th className="px-4 py-3">Επισκέπτες</th>
                <th className="px-4 py-3">Κόστος</th>
                <th className="px-4 py-3">Κατάσταση</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-ns-stone-light">
                  <td className="px-4 py-3 text-ns-dark">{booking.id}</td>
                  <td className="px-4 py-3 text-ns-stone">
                    {booking.roomNames.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-ns-stone">{booking.checkIn}</td>
                  <td className="px-4 py-3 text-ns-stone">{booking.checkOut}</td>
                  <td className="px-4 py-3 text-ns-stone">
                    {booking.guestName}
                  </td>
                  <td className="px-4 py-3 text-ns-stone">
                    {booking.numberOfGuests}
                  </td>
                  <td className="px-4 py-3 text-ns-stone">
                    {booking.totalPrice}€
                  </td>
                  <td className="px-4 py-3 text-ns-stone">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => p - 1)}
          >
            Προηγούμενη
          </Button>
          <span className="text-sm text-ns-stone">
            Σελίδα {pageNumber} από {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            disabled={pageNumber >= totalPages}
            onClick={() => setPageNumber((p) => p + 1)}
          >
            Επόμενη
          </Button>
        </div>
      )}
    </div>
  );
}
