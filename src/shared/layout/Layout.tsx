import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  addClasses?: string;
}

const Layout = ({ children, addClasses }: LayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col ${addClasses ?? ""}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
