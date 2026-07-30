import { z } from "zod";

export const bookingSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες." }),
  lastname: z
    .string()
    .min(2, { message: "Το επώνυμο πρέπει να έχει τουλάχιστον 2 χαρακτήρες." }),
  email: z.string().email({ message: "Μη έγκυρη διεύθυνση email." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Το τηλέφωνο πρέπει να έχει 10-15 χαρακτήρες." })
    .max(15, { message: "Το τηλέφωνο πρέπει να έχει 10-15 χαρακτήρες." }),
  countryCode: z
    .string()
    .length(2, { message: "Ο κωδικός χώρας πρέπει να έχει 2 χαρακτήρες (π.χ. GR)." })
    .optional()
    .or(z.literal("")),
  specialRequests: z.string().optional(),
});

export type BookingFields = z.infer<typeof bookingSchema>;
