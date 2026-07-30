export type JwtTokenDTO = {
  token: string;
};

export type UserReadOnlyDTO = {
  id: number;
  username: string;
  email: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials: {
  username: string;
  password: string;
}): Promise<JwtTokenDTO> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Λάθος όνομα χρήστη ή κωδικός.");
    }
    throw new Error("Κάτι πήγε στραβά. Δοκιμάστε ξανά.");
  }

  return response.json();
};

export const registerMember = async (fields: {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  countryCode?: string;
}): Promise<UserReadOnlyDTO> => {
  const response = await fetch(`${API_URL}/auth/register/member`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("Υπάρχει ήδη λογαριασμός με αυτό το username ή email.");
    }
    throw new Error("Η εγγραφή απέτυχε. Ελέγξτε τα στοιχεία και δοκιμάστε ξανά.");
  }

  return response.json();
};
