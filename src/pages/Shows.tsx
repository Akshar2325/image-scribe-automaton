
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Mock data - in a real application, this would come from an API
const shows = [
  { id: "show-1", title: "Breaking Bad", imageUrl: "https://source.unsplash.com/random/300x450/?desert", genre: "Drama" },
  { id: "show-2", title: "Game of Thrones", imageUrl: "https://source.unsplash.com/random/300x450/?medieval", genre: "Fantasy" },
  { id: "show-3", title: "Stranger Things", imageUrl: "https://source.unsplash.com/random/300x450/?retro", genre: "Sci-Fi" },
  { id: "show-4", title: "The Witcher", imageUrl: "https://source.unsplash.com/random/300x450/?fantasy", genre: "Fantasy" },
  { id: "show-5", title: "The Mandalorian", imageUrl: "https://source.unsplash.com/random/300x450/?space,planet", genre: "Sci-Fi" },
  { id: "show-6", title: "The Office", imageUrl: "https://source.unsplash.com/random/300x450/?office", genre: "Comedy" },
  { id: "show-7", title: "Loki", imageUrl: "https://source.unsplash.com/random/300x450/?mythology", genre: "Sci-Fi" },
  { id: "show-8", title: "Squid Game", imageUrl: "https://source.unsplash.com/random/300x450/?game", genre: "Thriller" },
  { id: "show-9", title: "Moon Knight", imageUrl: "https://source.unsplash.com/random/300x450/?moon", genre: "Action" },
  { id: "show-10", title: "The Crown", imageUrl: "https://source.unsplash.com/random/300x450/?royal", genre: "Drama" },
  { id: "show-11", title: "Peaky Blinders", imageUrl: "https://source.unsplash.com/random/300x450/?vintage,gangster", genre: "Crime" },
  { id: "show-12", title: "Friends", imageUrl: "https://source.unsplash.com/random/300x450/?friends", genre: "Comedy" },
];

const Shows = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 px-4">TV Shows</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
          {shows.map((show) => (
            <Link key={show.id} to={`/shows/${show.id}`} className="hover-scale transition-transform duration-300">
              <Card className="border-0 overflow-hidden bg-transparent h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative aspect-[2/3] w-full">
                    <img 
                      src={show.imageUrl} 
                      alt={show.title} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium truncate">{show.title}</h3>
                    <p className="text-sm text-gray-400">{show.genre}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shows;
