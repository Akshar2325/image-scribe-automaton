
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  description: string;
  imageUrl: string;
  videoId: string;
}

const Hero = ({ title, description, imageUrl, videoId }: HeroProps) => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
          <p className="text-gray-200 text-lg mb-8">{description}</p>
          <div className="flex gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link to={`/watch/${videoId}`}>
                <Play className="mr-2 h-5 w-5" /> Play Now
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link to={`/details/${videoId}`}>More Info</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
