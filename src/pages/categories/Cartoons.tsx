
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Mock data - in a real application, this would come from an API
const cartoons = [
  { id: "cartoon-1", title: "Rick and Morty", imageUrl: "https://source.unsplash.com/random/300x450/?space", genre: "Comedy" },
  { id: "cartoon-2", title: "Adventure Time", imageUrl: "https://source.unsplash.com/random/300x450/?adventure", genre: "Fantasy" },
  { id: "cartoon-3", title: "SpongeBob SquarePants", imageUrl: "https://source.unsplash.com/random/300x450/?ocean", genre: "Comedy" },
  { id: "cartoon-4", title: "Gravity Falls", imageUrl: "https://source.unsplash.com/random/300x450/?mystery", genre: "Mystery" },
  { id: "cartoon-5", title: "Avatar: The Last Airbender", imageUrl: "https://source.unsplash.com/random/300x450/?elements", genre: "Adventure" },
  { id: "cartoon-6", title: "The Simpsons", imageUrl: "https://source.unsplash.com/random/300x450/?family", genre: "Comedy" },
  { id: "cartoon-7", title: "Bojack Horseman", imageUrl: "https://source.unsplash.com/random/300x450/?hollywood", genre: "Drama" },
  { id: "cartoon-8", title: "Steven Universe", imageUrl: "https://source.unsplash.com/random/300x450/?crystal", genre: "Fantasy" },
  { id: "cartoon-9", title: "Arcane", imageUrl: "https://source.unsplash.com/random/300x450/?steampunk", genre: "Action" },
  { id: "cartoon-10", title: "Batman: The Animated Series", imageUrl: "https://source.unsplash.com/random/300x450/?batman", genre: "Action" },
  { id: "cartoon-11", title: "South Park", imageUrl: "https://source.unsplash.com/random/300x450/?colorado", genre: "Comedy" },
  { id: "cartoon-12", title: "The Owl House", imageUrl: "https://source.unsplash.com/random/300x450/?witch", genre: "Fantasy" },
];

// Group cartoons by age rating for a better organized page
const cartoonsByGenre = cartoons.reduce((acc, cartoon) => {
  acc[cartoon.genre] = acc[cartoon.genre] || [];
  acc[cartoon.genre].push(cartoon);
  return acc;
}, {} as Record<string, typeof cartoons>);

const Cartoons = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8 px-4">
          <h1 className="text-3xl font-bold">Cartoons</h1>
          <Link to="/categories" className="text-primary hover:underline">
            View All Categories
          </Link>
        </div>
        
        {Object.entries(cartoonsByGenre).map(([genre, shows]) => (
          <div key={genre} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 px-4">{genre}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
              {shows.map((cartoon) => (
                <Link key={cartoon.id} to={`/watch/${cartoon.id}`} className="hover:scale-105 transition-transform duration-300">
                  <Card className="border-0 overflow-hidden bg-transparent h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative aspect-[2/3] w-full">
                        <img 
                          src={cartoon.imageUrl} 
                          alt={cartoon.title} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="mt-2">
                        <h3 className="font-medium truncate">{cartoon.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Cartoons;
