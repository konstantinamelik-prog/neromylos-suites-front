import { getCookie } from "@/shared/lib/cookies";
import { TOKEN_COOKIE_NAME } from "@/features/auth/AuthProvider";

export type RoomReadOnlyDTO = {
  id: number;
  roomNumber: number;
  name: string;
  description: string;
  maxOccupancy: number;
  status: string;
  imageUrl: string | null;
  totalPrice?: number;
};

const API_URL = import.meta.env.VITE_API_URL;
const API_ORIGIN = API_URL.replace(/\/api\/v1\/?$/, "");

export function resolveImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  return `${API_ORIGIN}${imageUrl}`;
}

export const searchAvailability = async (
  checkIn: string,
  checkOut: string
): Promise<RoomReadOnlyDTO[]> => {
  const params = new URLSearchParams({ checkIn, checkOut });

  const response = await fetch(`${API_URL}/rooms/available?${params}`);

  if (!response.ok) {
    throw new Error("Δεν ήταν δυνατή η αναζήτηση. Δοκιμάστε ξανά.");
  }

  return response.json();
};

export type CreateBookingDTO = {
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  specialRequests?: string;
  roomIds: number[];
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  countryCode?: string;
};

export type BookingReadOnlyDTO = {
  id: number;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  totalPrice: number;
  specialRequests: string | null;
  status: string;
  userId: number | null;
  visitorId: number | null;
  guestName: string;
  roomNames: string[];
};

export const createBooking = async (
  fields: CreateBookingDTO
): Promise<BookingReadOnlyDTO> => {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });

  if (!response.ok) {
    throw new Error("Η κράτηση απέτυχε. Ελέγξτε τα στοιχεία και δοκιμάστε ξανά.");
  }

  return response.json();
};

export type PaginatedResult<T> = {
  data: T[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

export const getPaginatedBookings = async (
  pageNumber: number,
  pageSize: number
): Promise<PaginatedResult<BookingReadOnlyDTO>> => {
  const token = getCookie(TOKEN_COOKIE_NAME);

  const response = await fetch(
    `${API_URL}/bookings?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Δεν ήταν δυνατή η ανάκτηση των κρατήσεων.");
  }

  return response.json();
};
