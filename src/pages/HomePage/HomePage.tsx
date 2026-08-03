import { useEffect } from "react";
import { useLocation } from "react-router";
import Hero from "./Hero";
import History from "./History";
import Photos from "./Photos";
import Contact from "./Contact";
import { RoomsPreview } from "@/features/rooms";

const HEADER_OFFSET = 104;

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <Hero />
      <RoomsPreview />
      <History />
      <Photos />
      <Contact />
    </>
  );
};

export default HomePage;
