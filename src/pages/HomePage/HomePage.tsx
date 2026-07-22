import Hero from "./Hero";
import History from "./History";
import Photos from "./Photos";
import Contact from "./Contact";
import { RoomsPreview } from "@/features/rooms";

const HomePage = () => {
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
