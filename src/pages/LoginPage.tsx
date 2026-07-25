import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { type LoginFields, loginSchema } from "@/features/auth/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/AuthProvider";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFields) => {
    try {
      await loginUser(data);
      toast.success("Επιτυχής σύνδεση");
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Η σύνδεση απέτυχε");
    }
  };

  return (
    <div className="pt-32 pb-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto p-8 space-y-6 border border-ns-stone-light rounded bg-white shadow"
      >
        <h1 className="font-serif text-2xl text-ns-dark text-center mb-4">
          Σύνδεση
        </h1>

        <Field>
          <FieldLabel htmlFor="username">Όνομα χρήστη</FieldLabel>
          <Input id="username" {...register("username")} />
          {errors.username && (
            <div className="text-red-600 text-sm">{errors.username.message}</div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Κωδικός</FieldLabel>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <div className="text-red-600 text-sm">{errors.password.message}</div>
          )}
        </Field>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Σύνδεση..." : "Σύνδεση"}
        </Button>

        <p className="text-sm text-ns-stone text-center">
          Δεν έχεις λογαριασμό;{" "}
          <Link to="/register" className="text-ns-water hover:underline">
            Εγγραφή
          </Link>
        </p>
      </form>
    </div>
  );
}
