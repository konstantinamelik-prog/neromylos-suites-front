import { Route, Routes } from "react-router";
import RouterLayout from "@/shared/layout/RouterLayout";
import HomePage from "@/pages/HomePage";
import RoomDetailPage from "@/pages/HomePage/RoomDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms/:slug" element={<RoomDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
