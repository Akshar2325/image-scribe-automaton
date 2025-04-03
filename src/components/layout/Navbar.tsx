
import { Link } from "react-router-dom";
import { Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black/90 text-white backdrop-blur-sm fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">StreamFlix</Link>
        
        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              <Menu />
            </Button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-black/95 py-4 flex flex-col items-center gap-4 animate-fade-in">
                <Link to="/" className="hover:text-primary transition" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/movies" className="hover:text-primary transition" onClick={() => setMobileMenuOpen(false)}>Movies</Link>
                <Link to="/shows" className="hover:text-primary transition" onClick={() => setMobileMenuOpen(false)}>TV Shows</Link>
                <Link to="/search" className="hover:text-primary transition" onClick={() => setMobileMenuOpen(false)}>
                  <Search className="h-5 w-5" />
                </Link>
                <Link to="/profile" className="hover:text-primary transition" onClick={() => setMobileMenuOpen(false)}>
                  <User className="h-5 w-5" />
                </Link>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-8">
              <Link to="/" className="hover:text-primary transition">Home</Link>
              <Link to="/movies" className="hover:text-primary transition">Movies</Link>
              <Link to="/shows" className="hover:text-primary transition">TV Shows</Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/search">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
