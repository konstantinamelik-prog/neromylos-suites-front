import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/AuthProvider";
import { formatDateOnly } from "@/shared/lib/dates";
import {
  getPaginatedBookings,
  updateBookingStatus,
  deleteBooking,
  type BookingReadOnlyDTO,
} from "@/features/bookings/bookingsApi";

const PAGE_SIZE_OPTIONS = [10, 20, 30, 50];

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

const FILTER_STATUS_OPTIONS = ["", ...STATUS_OPTIONS, "DELETED"];

type SortableKey =
  | "id"
  | "checkIn"
  | "checkOut"
  | "numberOfGuests"
  | "totalPrice"
  | "status";

type SortState = { key: SortableKey; direction: "asc" | "desc" } | null;

const SORTABLE_COLUMNS: { key: SortableKey; label: string }[] = [
  { key: "id", label: "Αρ. Κράτησης" },
  { key: "checkIn", label: "Άφιξη" },
  { key: "checkOut", label: "Αναχώρηση" },
  { key: "numberOfGuests", label: "Επισκέπτες" },
  { key: "totalPrice", label: "Κόστος" },
  { key: "status", label: "Κατάσταση" },
];

export default function AdminBookingsPage() {
  const { role } = useAuth();
  const isAdmin = role === "ADMIN";

  const [bookings, setBookings] = useState<BookingReadOnlyDTO[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("");
  const [checkInFilter, setCheckInFilter] = useState("");
  const [checkOutFilter, setCheckOutFilter] = useState("");
  const [lastnameFilter, setLastnameFilter] = useState("");

  const [sort, setSort] = useState<SortState>(null);

  const loadBookings = (overrides?: {
    status?: string;
    checkIn?: string;
    checkOut?: string;
    lastname?: string;
    pageNumber?: number;
    pageSize?: number;
    sort?: SortState;
  }) => {
    const effectiveSort = overrides?.sort !== undefined ? overrides.sort : sort;

    setIsLoading(true);
    getPaginatedBookings(overrides?.pageNumber ?? pageNumber, overrides?.pageSize ?? pageSize, {
      status: (overrides?.status ?? statusFilter) || undefined,
      checkIn: (overrides?.checkIn ?? checkInFilter) || undefined,
      checkOut: (overrides?.checkOut ?? checkOutFilter) || undefined,
      lastname: (overrides?.lastname ?? lastnameFilter) || undefined,
      sortBy: effectiveSort?.key,
      sortDescending: effectiveSort?.direction === "desc",
    })
      .then((result) => {
        setBookings(result.data);
        setTotalPages(result.totalPages);
      })
      .catch((error) => {
        toast.error(
          error instanceof Error ? error.message : "Κάτι πήγε στραβά."
        );
      })
      .finally(() => setIsLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => loadBookings(), [pageNumber, pageSize]);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageNumber(1);
  };

  const handleApplyFilters = () => {
    setPageNumber(1);
    loadBookings({ pageNumber: 1 });
  };

  const handleClearFilters = () => {
    setStatusFilter("");
    setCheckInFilter("");
    setCheckOutFilter("");
    setLastnameFilter("");
    setPageNumber(1);
    loadBookings({ status: "", checkIn: "", checkOut: "", lastname: "", pageNumber: 1 });
  };

  const toggleSort = (key: SortableKey) => {
    const next: SortState =
      !sort || sort.key !== key
        ? { key, direction: "asc" }
        : sort.direction === "asc"
          ? { key, direction: "desc" }
          : null;

    setSort(next);
    setPageNumber(1);
    loadBookings({ sort: next, pageNumber: 1 });
  };

  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    try {
      const updated = await updateBookingStatus(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? updated : b))
      );
      toast.success("Η κατάσταση ενημερώθηκε.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Κάτι πήγε στραβά.");
    }
  };

  const handleDelete = async (bookingId: number) => {
    const confirmed = window.confirm(
      `Οριστική διαγραφή της κράτησης #${bookingId}; Αυτή η ενέργεια δεν αναιρείται.`
    );
    if (!confirmed) return;

    try {
      await deleteBooking(bookingId);
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      toast.success("Η κράτηση διαγράφηκε.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Κάτι πήγε στραβά.");
    }
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-6xl mx-auto">
      <h1 className="font-serif text-2xl text-ns-dark mb-8">Κρατήσεις</h1>

      <div className="flex flex-wrap items-end gap-4 mb-6 p-4 border border-ns-stone-light rounded bg-white shadow">
        <div>
          <label className="block text-xs text-ns-stone mb-1">Κατάσταση</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-ns-stone-light rounded px-2 py-1.5 text-sm text-ns-dark"
          >
            {FILTER_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status || "Όλες"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-ns-stone mb-1">Άφιξη από</label>
          <input
            type="date"
            value={checkInFilter}
            onChange={(e) => setCheckInFilter(e.target.value)}
            className="border border-ns-stone-light rounded px-2 py-1.5 text-sm text-ns-dark"
          />
        </div>

        <div>
          <label className="block text-xs text-ns-stone mb-1">Αναχώρηση έως</label>
          <input
            type="date"
            value={checkOutFilter}
            onChange={(e) => setCheckOutFilter(e.target.value)}
            className="border border-ns-stone-light rounded px-2 py-1.5 text-sm text-ns-dark"
          />
        </div>

        <div>
          <label className="block text-xs text-ns-stone mb-1">Επώνυμο</label>
          <input
            type="text"
            value={lastnameFilter}
            onChange={(e) => setLastnameFilter(e.target.value)}
            placeholder="π.χ. Παπαδοπούλου"
            className="border border-ns-stone-light rounded px-2 py-1.5 text-sm text-ns-dark"
          />
        </div>

        <Button type="button" onClick={handleApplyFilters}>
          Εφαρμογή φίλτρων
        </Button>
        <Button type="button" variant="outline" onClick={handleClearFilters}>
          Καθαρισμός
        </Button>
      </div>

      {isLoading ? (
        <p className="text-ns-stone">Φόρτωση...</p>
      ) : bookings.length === 0 ? (
        <p className="text-ns-stone">Δεν υπάρχουν κρατήσεις.</p>
      ) : (
        <div className="overflow-x-auto border border-ns-stone-light rounded bg-white shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-ns-cream text-ns-stone text-xs">
              <tr>
                <th className="px-4 py-3">Δωμάτια</th>
                {SORTABLE_COLUMNS.slice(0, 3).map((column) => (
                  <th key={column.key} className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleSort(column.key)}
                      className="flex items-center gap-1 hover:text-ns-dark transition-colors"
                    >
                      {column.label}
                      {sort?.key === column.key &&
                        (sort.direction === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        ))}
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3">Ονοματεπώνυμο</th>
                {SORTABLE_COLUMNS.slice(3).map((column) => (
                  <th key={column.key} className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleSort(column.key)}
                      className="flex items-center gap-1 hover:text-ns-dark transition-colors"
                    >
                      {column.label}
                      {sort?.key === column.key &&
                        (sort.direction === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        ))}
                    </button>
                  </th>
                ))}
                {isAdmin && <th className="px-2 py-3 w-10"></th>}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-ns-stone-light">
                  <td className="px-4 py-3 text-ns-stone">
                    {booking.roomNames.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-ns-dark">{booking.id}</td>
                  <td className="px-4 py-3 text-ns-stone">{formatDateOnly(booking.checkIn)}</td>
                  <td className="px-4 py-3 text-ns-stone">{formatDateOnly(booking.checkOut)}</td>
                  <td className="px-4 py-3 text-ns-stone">
                    {booking.guestName}
                  </td>
                  <td className="px-4 py-3 text-ns-stone">
                    {booking.numberOfGuests}
                  </td>
                  <td className="px-4 py-3 text-ns-stone">
                    {booking.totalPrice}€
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value)
                      }
                      className="border border-ns-stone-light rounded px-2 py-1 text-ns-stone text-sm"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  {isAdmin && (
                    <td className="px-2 py-3">
                      <button
                        type="button"
                        aria-label="Διαγραφή κράτησης"
                        onClick={() => handleDelete(booking.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 rounded p-1.5 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && bookings.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <label className="text-sm text-ns-stone">Ανά σελίδα:</label>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border border-ns-stone-light rounded px-2 py-1 text-sm text-ns-dark"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber((p) => p - 1)}
              >
                Προηγούμενη
              </Button>
              <span className="text-sm text-ns-stone">
                Σελίδα {pageNumber} από {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                disabled={pageNumber >= totalPages}
                onClick={() => setPageNumber((p) => p + 1)}
              >
                Επόμενη
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
