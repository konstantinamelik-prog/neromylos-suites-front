import { z } from "zod";
import { getLocalDateString } from "@/shared/lib/dates";

export const searchSchema = z
  .object({
    checkIn: z
      .string()
      .min(1, { message: "Επιλέξτε ημερομηνία άφιξης." })
      .refine((value) => value >= getLocalDateString(), {
        message: "Η άφιξη δεν μπορεί να είναι στο παρελθόν.",
      }),
    checkOut: z.string().min(1, { message: "Επιλέξτε ημερομηνία αναχώρησης." }),
    numberOfGuests: z.coerce
      .number({ message: "Δώστε αριθμό επισκεπτών." })
      .min(1, { message: "Τουλάχιστον 1 επισκέπτης." }),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Η αναχώρηση πρέπει να είναι μετά την άφιξη.",
    path: ["checkOut"],
  });

export type SearchFields = z.infer<typeof searchSchema>;
