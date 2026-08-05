import { getCookie } from "src/shared/lib/cookies";
import { TOKEN_COOKIE_NAME } from "../auth/AuthProvider";
import type { PaginatedResult } from "src/features/bookings/bookingsApi";

export type MemberReadOnlyDTO = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  countryCode: string | null;
};

export type UserReadOnlyDTO = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  userRole: string;
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
): Promise<import("src/features/bookings/bookingsApi").BookingReadOnlyDTO[]> => {
  const token = getCookie(TOKEN_COOKIE_NAME);

  const response = await fetch(`${API_URL}/members/bookings-by-userId/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Δεν ήταν δυνατή η ανάκτηση των κρατήσεών σας.");
  }

  return response.json();
};

export const getPaginatedMembers = async (
  pageNumber: number,
  pageSize: number
): Promise<PaginatedResult<MemberReadOnlyDTO>> => {
  const token = getCookie(TOKEN_COOKIE_NAME);

  const response = await fetch(
    `${API_URL}/members?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!response.ok) {
    throw new Error("Δεν ήταν δυνατή η ανάκτηση των μελών.");
  }

  return response.json();
};
