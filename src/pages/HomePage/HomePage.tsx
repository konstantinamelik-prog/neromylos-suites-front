import Layout from "@/shared/layout/Layout";
import Hero from "./Hero";
import { RoomsPreview } from "@/features/rooms";

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <RoomsPreview />
    </Layout>
  );
};

export default HomePage;
