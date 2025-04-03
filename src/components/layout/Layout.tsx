
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <main className="pt-16 min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      <footer className="bg-black/80 py-6 text-center text-gray-400">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} StreamFlix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
