import { Link, useLocation } from "react-router";

const tabs = [
  { to: "/admin/bookings", label: "Κρατήσεις" },
  { to: "/admin/members", label: "Μέλη" },
];

const AdminTabs = () => {
  const location = useLocation();

  return (
    <div className="flex gap-6 border-b border-ns-stone-light mb-8">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.to;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={`pb-3 text-sm font-medium transition-colors ${
              isActive
                ? "text-ns-dark border-b-2 border-ns-water"
                : "text-ns-stone hover:text-ns-dark"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default AdminTabs;
