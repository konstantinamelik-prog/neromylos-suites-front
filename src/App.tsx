import { Route, Routes } from "react-router";
import RouterLayout from "@/shared/layout/RouterLayout";
import ProtectedRoute from "@/shared/layout/ProtectedRoute";
import HomePage from "@/pages/HomePage";
import RoomDetailPage from "@/pages/RoomDetailPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/SearchPage";
import BookingPage from "@/pages/BookingPage";
import BookingConfirmationPage from "@/pages/BookingConfirmationPage";
import AdminBookingsPage from "@/pages/AdminBookingsPage";
import AdminMembersPage from "@/pages/AdminMembersPage";
import MyBookingsPage from "@/pages/MyBookingsPage";

function App() {
  return (
    <Routes>
      <Route element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms/:slug" element={<RoomDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/confirmation" element={<BookingConfirmationPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ADMIN", "RECEPTIONIST"]} />}>
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
          <Route path="/admin/members" element={<AdminMembersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
