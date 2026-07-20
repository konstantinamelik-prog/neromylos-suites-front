import Layout from "@/shared/layout/Layout";
import Hero from "./Hero";
import History from "./History";
import Photos from "./Photos";
import { RoomsPreview } from "@/features/rooms";

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <RoomsPreview />
      <History />
      <Photos />
    </Layout>
  );
};

export default HomePage;
