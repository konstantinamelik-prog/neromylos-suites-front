import { Route, Routes } from "react-router";
import RouterLayout from "@/shared/layout/RouterLayout";
import HomePage from "@/pages/HomePage";
import RoomDetailPage from "@/pages/RoomDetailPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms/:slug" element={<RoomDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
