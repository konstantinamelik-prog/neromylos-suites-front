import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { type SignupFields, signupSchema } from "@/features/auth/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerMember } from "@/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFields) => {
    try {
      await registerMember(data);
      toast.success("Επιτυχής εγγραφή! Μπορείς τώρα να συνδεθείς.");
      navigate("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Η εγγραφή απέτυχε");
    }
  };

  return (
    <div className="pt-32 pb-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto p-8 space-y-6 border border-ns-stone-light rounded bg-white shadow"
      >
        <h1 className="font-serif text-2xl text-ns-dark text-center mb-4">
          Εγγραφή
        </h1>

        <Field>
          <FieldLabel htmlFor="username">Όνομα χρήστη</FieldLabel>
          <Input id="username" {...register("username")} />
          {errors.username && (
            <div className="text-red-600 text-sm">{errors.username.message}</div>
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
          <FieldLabel htmlFor="password">Κωδικός</FieldLabel>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <div className="text-red-600 text-sm">{errors.password.message}</div>
          )}
        </Field>

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
          <FieldLabel htmlFor="phoneNumber">Τηλέφωνο</FieldLabel>
          <Input id="phoneNumber" {...register("phoneNumber")} />
          {errors.phoneNumber && (
            <div className="text-red-600 text-sm">{errors.phoneNumber.message}</div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="countryCode">Κωδικός χώρας (προαιρετικό)</FieldLabel>
          <Input id="countryCode" placeholder="GR" {...register("countryCode")} />
          {errors.countryCode && (
            <div className="text-red-600 text-sm">{errors.countryCode.message}</div>
          )}
        </Field>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Εγγραφή..." : "Εγγραφή"}
        </Button>

        <p className="text-sm text-ns-stone text-center">
          Έχεις ήδη λογαριασμό;{" "}
          <Link to="/login" className="text-ns-water hover:underline">
            Σύνδεση
          </Link>
        </p>
      </form>
    </div>
  );
}
