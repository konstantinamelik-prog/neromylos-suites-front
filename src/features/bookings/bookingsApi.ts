export type RoomReadOnlyDTO = {
  id: number;
  roomNumber: number;
  name: string;
  description: string;
  maxOccupancy: number;
  status: string;
  imageUrl: string | null;
};

const API_URL = import.meta.env.VITE_API_URL;
// Το VITE_API_URL είναι π.χ. "http://localhost:8081/api/v1" - για εικόνες
// χρειαζόμαστε μόνο τη "ρίζα" (http://localhost:8081), όχι το /api/v1.
const API_ORIGIN = API_URL.replace(/\/api\/v1\/?$/, "");

// Το backend επιστρέφει το ImageUrl σαν σχετικό path (π.χ. "/images/rooms/standard-room.jpg").
// Το μετατρέπουμε σε πλήρες URL ώστε να δουλεύει σε <img src="...">.
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
    throw new Error("Δεν μπόρεσε να ολοκληρωθεί η αναζήτηση. Δοκίμασε ξανά.");
  }

  return response.json();
};
