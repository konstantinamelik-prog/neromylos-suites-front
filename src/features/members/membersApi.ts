import { getCookie } from "@/shared/lib/cookies";
import { TOKEN_COOKIE_NAME } from "@/features/auth/AuthProvider";
import type { PaginatedResult } from "@/features/bookings/bookingsApi";

export type MemberReadOnlyDTO = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  countryCode: string | null;
};

const API_URL = import.meta.env.VITE_API_URL;

export const getMemberByUsername = async (
  username: string
): Promise<MemberReadOnlyDTO> => {
  const token = getCookie(TOKEN_COOKIE_NAME);

  const response = await fetch(`${API_URL}/members/by-username/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Δεν ήταν δυνατή η ανάκτηση του προφίλ.");
  }

  return response.json();
};

export const getMemberBookings = async (
  userId: number
): Promise<import("@/features/bookings/bookingsApi").BookingReadOnlyDTO[]> => {
  const token = getCookie(TOKEN_COOKIE_NAME);

  const response = await fetch(`${API_URL}/members/bookings-by-userId/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Δεν ήταν δυνατή η ανάκτηση των κρατήσεών σας.");
  }

  return response.json();
};

export const deleteUser = async (userId: number): Promise<void> => {
  const token = getCookie(TOKEN_COOKIE_NAME);

  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error(
        "Δεν μπορεί να διαγραφεί - έχει ενεργές ή ολοκληρωμένες κρατήσεις."
      );
    }
    throw new Error("Δεν ήταν δυνατή η διαγραφή του μέλους.");
  }
};
export type MemberFilters = {
  lastname?: string;
  email?: string;
  countryCode?: string;
};

export const getPaginatedMembers = async (
  pageNumber: number,
  pageSize: number,
  filters?: MemberFilters
): Promise<PaginatedResult<MemberReadOnlyDTO>> => {
  const token = getCookie(TOKEN_COOKIE_NAME);

  const params = new URLSearchParams({
    pageNumber: String(pageNumber),
    pageSize: String(pageSize),
  });
  if (filters?.lastname) params.set("lastname", filters.lastname);
  if (filters?.email) params.set("email", filters.email);
  if (filters?.countryCode) params.set("countryCode", filters.countryCode);

  const response = await fetch(`${API_URL}/members?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Δεν ήταν δυνατή η ανάκτηση των μελών.");
  }

  return response.json();
};
