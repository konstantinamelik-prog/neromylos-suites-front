import { z } from "zod";
import { getLocalDateString } from "@/shared/lib/dates";

export const searchSchema = z
  .object({
    checkIn: z
      .string()
      .min(1, { message: "Επίλεξε ημερομηνία άφιξης." })
      .refine((value) => value >= getLocalDateString(), {
        message: "Η άφιξη δεν μπορεί να είναι στο παρελθόν.",
      }),
    checkOut: z.string().min(1, { message: "Επίλεξε ημερομηνία αναχώρησης." }),
    numberOfGuests: z.coerce
      .number({ message: "Δώσε αριθμό επισκεπτών." })
      .min(1, { message: "Τουλάχιστον 1 επισκέπτης." }),
  })
  // Σύγκριση strings ("YYYY-MM-DD" εναντίον "YYYY-MM-DD"), όχι Date objects -
  // έτσι αποφεύγουμε τελείως το UTC-parsing πρόβλημα και στα δύο σημεία.
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Η αναχώρηση πρέπει να είναι μετά την άφιξη.",
    path: ["checkOut"],
  });

export type SearchFields = z.infer<typeof searchSchema>;
