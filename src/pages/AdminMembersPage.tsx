import { useEffect, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminTabs from "@/shared/layout/AdminTabs";
import {
  getPaginatedMembers,
  getMemberByUsername,
  type MemberReadOnlyDTO,
} from "@/features/members/membersApi";

const PAGE_SIZE = 10;

export default function AdminMembersPage() {
  const [members, setMembers] = useState<MemberReadOnlyDTO[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedMember, setSelectedMember] = useState<MemberReadOnlyDTO | null>(
    null
  );
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    getPaginatedMembers(pageNumber, PAGE_SIZE)
      .then((result) => {
        setMembers(result.data);
        setTotalPages(result.totalPages);
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Κάτι πήγε στραβά.");
      })
      .finally(() => setIsLoading(false));
  }, [pageNumber]);

  const handleOpenMember = async (username: string) => {
    setIsLoadingDetails(true);
    try {
      const member = await getMemberByUsername(username);
      setSelectedMember(member);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Κάτι πήγε στραβά.");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-5xl mx-auto">
      <h1 className="font-serif text-2xl text-ns-dark mb-6">Διαχείριση</h1>
      <AdminTabs />

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
                <th className="px-4 py-3">Ονοματεπώνυμο</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Τηλέφωνο</th>
                <th className="px-4 py-3">Κωδικός χώρας</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  onClick={() => handleOpenMember(member.username)}
                  className="border-t border-ns-stone-light cursor-pointer hover:bg-ns-cream/50 transition-colors"
                >
                  <td className="px-4 py-3 text-ns-dark">{member.username}</td>
                  <td className="px-4 py-3 text-ns-stone">
                    {member.firstname} {member.lastname}
                  </td>
                  <td className="px-4 py-3 text-ns-stone">{member.email}</td>
                  <td className="px-4 py-3 text-ns-stone">{member.phoneNumber}</td>
                  <td className="px-4 py-3 text-ns-stone">{member.countryCode}</td>
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

      {(selectedMember || isLoadingDetails) && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center px-6"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Κλείσιμο"
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-ns-stone hover:text-ns-dark"
            >
              <X size={20} />
            </button>

            {isLoadingDetails ? (
              <p className="text-ns-stone text-center py-8">Φόρτωση...</p>
            ) : (
              selectedMember && (
                <div className="space-y-3">
                  <p className="font-serif text-xl text-ns-dark">
                    {selectedMember.firstname} {selectedMember.lastname}
                  </p>
                  <div className="text-sm text-ns-stone space-y-1">
                    <p>
                      <span className="text-ns-dark font-medium">
                        Όνομα χρήστη:
                      </span>{" "}
                      {selectedMember.username}
                    </p>
                    <p>
                      <span className="text-ns-dark font-medium">Email:</span>{" "}
                      {selectedMember.email}
                    </p>
                    <p>
                      <span className="text-ns-dark font-medium">
                        Τηλέφωνο:
                      </span>{" "}
                      {selectedMember.phoneNumber}
                    </p>
                    {selectedMember.countryCode && (
                      <p>
                        <span className="text-ns-dark font-medium">
                          Κωδικός χώρας:
                        </span>{" "}
                        {selectedMember.countryCode}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
