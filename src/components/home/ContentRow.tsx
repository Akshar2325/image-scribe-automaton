
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Content {
  id: string;
  title: string;
  imageUrl: string;
  type: "movie" | "show";
}

interface ContentRowProps {
  title: string;
  contents: Content[];
}

const ContentRow = ({ title, contents }: ContentRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  
  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.8;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 px-4">{title}</h2>
      
      <div className="relative group">
        {showLeftButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}
        
        <div 
          ref={rowRef}
          className="flex overflow-x-auto gap-4 px-4 py-2 scrollbar-none"
          onScroll={handleScroll}
        >
          {contents.map((content) => (
            <Link 
              key={content.id} 
              to={content.type === "movie" ? `/movies/${content.id}` : `/shows/${content.id}`}
              className="flex-shrink-0 w-[250px] hover-scale transition-transform duration-300"
            >
              <Card className="border-0 overflow-hidden bg-transparent">
                <CardContent className="p-0">
                  <img 
                    src={content.imageUrl} 
                    alt={content.title} 
                    className="w-full h-[140px] object-cover rounded-md"
                  />
                  <h3 className="mt-2 text-sm font-medium truncate">{content.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {showRightButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContentRow;
