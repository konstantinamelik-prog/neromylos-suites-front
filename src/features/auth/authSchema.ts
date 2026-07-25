import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Το όνομα χρήστη είναι υποχρεωτικό." }),
  password: z.string().min(1, { message: "Ο κωδικός είναι υποχρεωτικός." }),
});

export type LoginFields = z.infer<typeof loginSchema>;

// Αντιστοιχεί ένα-προς-ένα στο MemberSignupDTO.cs του backend.
export const signupSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Το όνομα χρήστη πρέπει να έχει 2-50 χαρακτήρες." })
    .max(50, { message: "Το όνομα χρήστη πρέπει να έχει 2-50 χαρακτήρες." }),
  email: z
    .string()
    .email({ message: "Μη έγκυρη διεύθυνση email." })
    .max(100, { message: "Το email δεν πρέπει να ξεπερνάει τους 100 χαρακτήρες." }),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?\W).{8,}$/, {
      message:
        "Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες, ένα κεφαλαίο, ένα πεζό, έναν αριθμό και έναν ειδικό χαρακτήρα.",
    }),
  firstname: z
    .string()
    .min(2, { message: "Το όνομα πρέπει να έχει 2-50 χαρακτήρες." })
    .max(50, { message: "Το όνομα πρέπει να έχει 2-50 χαρακτήρες." }),
  lastname: z
    .string()
    .min(2, { message: "Το επώνυμο πρέπει να έχει 2-50 χαρακτήρες." })
    .max(50, { message: "Το επώνυμο πρέπει να έχει 2-50 χαρακτήρες." }),
  countryCode: z
    .string()
    .length(2, { message: "Ο κωδικός χώρας πρέπει να έχει 2 χαρακτήρες (π.χ. GR)." })
    .optional()
    .or(z.literal("")),
  phoneNumber: z
    .string()
    .min(10, { message: "Το τηλέφωνο πρέπει να έχει 10-15 χαρακτήρες." })
    .max(15, { message: "Το τηλέφωνο πρέπει να έχει 10-15 χαρακτήρες." }),
});

export type SignupFields = z.infer<typeof signupSchema>;
