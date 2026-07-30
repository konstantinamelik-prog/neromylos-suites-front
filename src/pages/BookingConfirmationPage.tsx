import { useLocation, Link } from "react-router";
import type { BookingReadOnlyDTO } from "@/features/bookings/bookingsApi";

export default function BookingConfirmationPage() {
  const location = useLocation();
  const booking = location.state as BookingReadOnlyDTO | null;

  if (!booking) {
    return (
      <div className="pt-32 pb-20 px-10 max-w-md mx-auto text-center">
        <p className="text-ns-dark mb-4">Δεν βρέθηκαν στοιχεία κράτησης.</p>
        <Link to="/" className="text-ns-water hover:underline">
          Επιστροφή στην αρχική
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-10 max-w-md mx-auto text-center">
      <h1 className="font-serif text-2xl text-ns-dark mb-2">
        Η κράτησή σου καταχωρήθηκε!
      </h1>
      <p className="text-sm text-ns-stone mb-8">
        Κατάσταση: {booking.status}
      </p>

      <div className="text-left p-6 mb-6 border border-ns-stone-light rounded bg-white shadow space-y-2">
        <p className="text-lg text-ns-stone mb-2">
          <span className="text-ns-dark font-medium"> Αριθμός Κράτησης: </span>{" "}
          {booking.id}
        </p>
        <p className="text-sm text-ns-stone">
            <span className="text-ns-dark font-medium">Δωμάτια:</span>{" "}
            {booking.roomNames.join(", ")}
        </p>
        <p className="text-sm text-ns-stone">
          <span className="text-ns-dark font-medium">Άφιξη:</span>{" "}
          {booking.checkIn}
        </p>
        <p className="text-sm text-ns-stone">
          <span className="text-ns-dark font-medium">Αναχώρηση:</span>{" "}
          {booking.checkOut}
        </p>
        <p className="text-sm text-ns-stone">
          <span className="text-ns-dark font-medium">Επισκέπτες:</span>{" "}
          {booking.numberOfGuests}
        </p>
        <p className="text-sm text-ns-stone">
          <span className="text-ns-dark font-medium">Συνολικό κόστος:</span>{" "}
          {booking.totalPrice}€
        </p>
      </div>

      {booking.status === "PENDING" && (
        <p className="text-sm text-ns-stone mt-6 mb-6 leading-relaxed">
          Το κατάλυμα θα επικοινωνήσει σύντομα μαζί σας με email, για να σας δώσει
          τους τρόπους πληρωμής και να ολοκληρώσετε μαζί την κράτηση.
        </p>
      )}

      <Link
        to="/"
        className="inline-block mt-8 text-ns-water hover:underline"
      >
        Επιστροφή στην αρχική
      </Link>
    </div>
  );
}
