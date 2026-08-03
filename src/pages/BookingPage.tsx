import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLocation, useNavigate, Link } from "react-router";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/features/bookings/bookingsApi";
import { type BookingFields, bookingSchema } from "@/features/bookings/bookingSchema";
import { useAuth } from "@/features/auth/AuthProvider";
import { getMemberByUsername } from "@/features/auth/membersApi";

type BookingLocationState = {
  roomIds: number[];
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
};

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingLocationState | null;

  const { isAuthenticated, username } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFields>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (!isAuthenticated || !username) return;

    getMemberByUsername(username)
      .then((member) => {
        reset({
          firstname: member.firstname,
          lastname: member.lastname,
          email: member.email,
          phoneNumber: member.phoneNumber,
          countryCode: member.countryCode ?? "",
        });
      })
      .catch(() => {
      });
  }, [isAuthenticated, username, reset]);

  if (!state) {
    return (
      <div className="pt-32 pb-20 px-10 max-w-md mx-auto text-center">
        <p className="text-ns-dark mb-4">
          Δεν βρέθηκαν στοιχεία κράτησης. Ξεκινήστε ξανά την αναζήτηση.
        </p>
        <Link to="/search" className="text-ns-water hover:underline">
          Πηγαίνετε στην αναζήτηση
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: BookingFields) => {
    try {
      const booking = await createBooking({
        ...data,
        countryCode: data.countryCode ? data.countryCode : undefined,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        numberOfGuests: state.numberOfGuests,
        roomIds: state.roomIds,
      });

      toast.success("Η κράτηση καταχωρήθηκε!");
      navigate("/booking/confirmation", { state: booking });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Κάτι πήγε στραβά.");
    }
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-2xl mx-auto">
      <h1 className="font-serif text-2xl text-ns-dark text-center mb-2">
        Στοιχεία κράτησης
      </h1>
      <p className="text-sm text-ns-stone text-center mb-8">
        {state.checkIn} → {state.checkOut} · {state.numberOfGuests} επισκέπτες ·{" "}
        {state.roomIds.length} {state.roomIds.length === 1 ? "δωμάτιο" : "δωμάτια"}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 border border-ns-stone-light rounded bg-white shadow"
      >
        <Field>
          <FieldLabel htmlFor="firstname">Όνομα</FieldLabel>
          <Input id="firstname" {...register("firstname")} />
          {errors.firstname && (
            <div className="text-red-600 text-sm">{errors.firstname.message}</div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="lastname">Επώνυμο</FieldLabel>
          <Input id="lastname" {...register("lastname")} />
          {errors.lastname && (
            <div className="text-red-600 text-sm">{errors.lastname.message}</div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <div className="text-red-600 text-sm">{errors.email.message}</div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="phoneNumber">Τηλέφωνο</FieldLabel>
          <Input id="phoneNumber" {...register("phoneNumber")} />
          {errors.phoneNumber && (
            <div className="text-red-600 text-sm">
              {errors.phoneNumber.message}
            </div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="countryCode">Κωδικός χώρας (προαιρετικό)</FieldLabel>
          <Input id="countryCode" placeholder="GR" {...register("countryCode")} />
          {errors.countryCode && (
            <div className="text-red-600 text-sm">
              {errors.countryCode.message}
            </div>
          )}
        </Field>

        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="specialRequests">
            Ειδικές παρατηρήσεις (προαιρετικό)
          </FieldLabel>
          <Input id="specialRequests" {...register("specialRequests")} />
        </Field>

        <Button type="submit" className="sm:col-span-2" disabled={isSubmitting}>
          {isSubmitting ? "Καταχώρηση..." : "Ολοκλήρωση κράτησης"}
        </Button>
      </form>
    </div>
  );
}
