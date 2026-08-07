import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/AuthProvider";
import AdminTabs from "@/shared/layout/AdminTabs";
import {
  getPaginatedMembers,
  deleteUser,
  type MemberReadOnlyDTO,
} from "@/features/members/membersApi";

const PAGE_SIZE = 10;

export default function AdminMembersPage() {
  const { role } = useAuth();
  const isAdmin = role === "ADMIN";

  const [members, setMembers] = useState<MemberReadOnlyDTO[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [lastnameFilter, setLastnameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [countryCodeFilter, setCountryCodeFilter] = useState("");

  const loadMembers = (overrides?: {
    lastname?: string;
    email?: string;
    countryCode?: string;
    pageNumber?: number;
  }) => {
    setIsLoading(true);
    getPaginatedMembers(overrides?.pageNumber ?? pageNumber, PAGE_SIZE, {
      lastname: (overrides?.lastname ?? lastnameFilter) || undefined,
      email: (overrides?.email ?? emailFilter) || undefined,
      countryCode: (overrides?.countryCode ?? countryCodeFilter) || undefined,
    })
      .then((result) => {
        setMembers(result.data);
        setTotalPages(result.totalPages);
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Κάτι πήγε στραβά.");
      })
      .finally(() => setIsLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => loadMembers(), [pageNumber]);

  const handleApplyFilter = () => {
    setPageNumber(1);
    loadMembers({ pageNumber: 1 });
  };

  const handleClearFilter = () => {
    setLastnameFilter("");
    setEmailFilter("");
    setCountryCodeFilter("");
    setPageNumber(1);
    loadMembers({ lastname: "", email: "", countryCode: "", pageNumber: 1 });
  };

  const handleDelete = async (member: MemberReadOnlyDTO) => {
    const confirmed = window.confirm(
      `Οριστική διαγραφή του μέλους "${member.firstname} ${member.lastname}"; Αυτή η ενέργεια δεν αναιρείται.`
    );
    if (!confirmed) return;

    try {
      // Member.Id και User.Id είναι το ίδιο (shared primary key) - επαναχρησιμοποιούμε
      // το ήδη υπάρχον DELETE /users/{id}, όχι ξεχωριστό member endpoint.
      await deleteUser(member.id);
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
      toast.success("Το μέλος διαγράφηκε.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Κάτι πήγε στραβά.");
    }
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-5xl mx-auto">
      <h1 className="font-serif text-2xl text-ns-dark mb-6">Διαχείριση</h1>
      <AdminTabs />

      <div className="flex flex-wrap items-end gap-4 mb-6 p-4 border border-ns-stone-light rounded bg-white shadow">
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
        <div>
          <label className="block text-xs text-ns-stone mb-1">Email</label>
          <input
            type="text"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            placeholder="π.χ. name@example.com"
            className="border border-ns-stone-light rounded px-2 py-1.5 text-sm text-ns-dark"
          />
        </div>
        <div>
          <label className="block text-xs text-ns-stone mb-1">Χώρα</label>
          <input
            type="text"
            value={countryCodeFilter}
            onChange={(e) => setCountryCodeFilter(e.target.value)}
            placeholder="π.χ. GR"
            maxLength={2}
            className="border border-ns-stone-light rounded px-2 py-1.5 text-sm text-ns-dark w-20"
          />
        </div>
        <Button type="button" onClick={handleApplyFilter}>
          Εφαρμογή
        </Button>
        <Button type="button" variant="outline" onClick={handleClearFilter}>
          Καθαρισμός
        </Button>
      </div>

      {isLoading ? (
        <p className="text-ns-stone">Φόρτωση...</p>
      ) : members.length === 0 ? (
        <p className="text-ns-stone">Δεν υπάρχουν μέλη.</p>
      ) : (
        <div className="overflow-x-auto border border-ns-stone-light rounded bg-white shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-ns-cream text-ns-stone text-xs">
              <tr>
                <th className="px-4 py-3">Όνομα χρήστη</th>
                <th className="px-4 py-3">Όνομα</th>
                <th className="px-4 py-3">Επώνυμο</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Τηλέφωνο</th>
                <th className="px-4 py-3">Χώρα</th>
                {isAdmin && <th className="px-2 py-3 w-10"></th>}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-t border-ns-stone-light">
                  <td className="px-4 py-3 text-ns-dark">{member.username}</td>
                  <td className="px-4 py-3 text-ns-stone">{member.firstname}</td>
                  <td className="px-4 py-3 text-ns-stone">{member.lastname}</td>
                  <td className="px-4 py-3 text-ns-stone">{member.email}</td>
                  <td className="px-4 py-3 text-ns-stone">
                    {member.phoneNumber}
                  </td>
                  <td className="px-4 py-3 text-ns-stone">
                    {member.countryCode ?? "—"}
                  </td>
                  {isAdmin && (
                    <td className="px-2 py-3">
                      <button
                        type="button"
                        aria-label="Διαγραφή μέλους"
                        onClick={() => handleDelete(member)}
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

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
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
  );
}
