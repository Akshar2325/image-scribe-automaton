
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Mock data - in a real application, this would come from an API
const animeShows = [
  { id: "anime-1", title: "Attack on Titan", imageUrl: "https://source.unsplash.com/random/300x450/?japan", genre: "Action" },
  { id: "anime-2", title: "My Hero Academia", imageUrl: "https://source.unsplash.com/random/300x450/?hero", genre: "Adventure" },
  { id: "anime-3", title: "Demon Slayer", imageUrl: "https://source.unsplash.com/random/300x450/?sword", genre: "Fantasy" },
  { id: "anime-4", title: "One Piece", imageUrl: "https://source.unsplash.com/random/300x450/?pirates", genre: "Adventure" },
  { id: "anime-5", title: "Jujutsu Kaisen", imageUrl: "https://source.unsplash.com/random/300x450/?dark", genre: "Supernatural" },
  { id: "anime-6", title: "Naruto", imageUrl: "https://source.unsplash.com/random/300x450/?ninja", genre: "Action" },
  { id: "anime-7", title: "Death Note", imageUrl: "https://source.unsplash.com/random/300x450/?notebook", genre: "Thriller" },
  { id: "anime-8", title: "Fullmetal Alchemist", imageUrl: "https://source.unsplash.com/random/300x450/?metal", genre: "Adventure" },
  { id: "anime-9", title: "Tokyo Ghoul", imageUrl: "https://source.unsplash.com/random/300x450/?tokyo", genre: "Horror" },
  { id: "anime-10", title: "Hunter x Hunter", imageUrl: "https://source.unsplash.com/random/300x450/?hunter", genre: "Adventure" },
  { id: "anime-11", title: "Dragon Ball Z", imageUrl: "https://source.unsplash.com/random/300x450/?dragon", genre: "Action" },
  { id: "anime-12", title: "One Punch Man", imageUrl: "https://source.unsplash.com/random/300x450/?punch", genre: "Comedy" },
];

// Group by genre for a better organized page
const animeByGenre = animeShows.reduce((acc, anime) => {
  acc[anime.genre] = acc[anime.genre] || [];
  acc[anime.genre].push(anime);
  return acc;
}, {} as Record<string, typeof animeShows>);

const Anime = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8 px-4">
          <h1 className="text-3xl font-bold">Anime</h1>
          <Link to="/categories" className="text-primary hover:underline">
            View All Categories
          </Link>
        </div>
        
        {Object.entries(animeByGenre).map(([genre, shows]) => (
          <div key={genre} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 px-4">{genre}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
              {shows.map((anime) => (
                <Link key={anime.id} to={`/watch/${anime.id}`} className="hover:scale-105 transition-transform duration-300">
                  <Card className="border-0 overflow-hidden bg-transparent h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative aspect-[2/3] w-full">
                        <img 
                          src={anime.imageUrl} 
                          alt={anime.title} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="mt-2">
                        <h3 className="font-medium truncate">{anime.title}</h3>
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

export default Anime;
