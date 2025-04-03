
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Mock data - in a real application, this would come from an API
const movies = [
  { id: "movie-1", title: "Interstellar", imageUrl: "https://source.unsplash.com/random/300x450/?space", genre: "Sci-Fi" },
  { id: "movie-2", title: "The Matrix", imageUrl: "https://source.unsplash.com/random/300x450/?digital", genre: "Sci-Fi" },
  { id: "movie-3", title: "Inception", imageUrl: "https://source.unsplash.com/random/300x450/?dream", genre: "Sci-Fi" },
  { id: "movie-4", title: "The Dark Knight", imageUrl: "https://source.unsplash.com/random/300x450/?night", genre: "Action" },
  { id: "movie-5", title: "Pulp Fiction", imageUrl: "https://source.unsplash.com/random/300x450/?vintage", genre: "Crime" },
  { id: "movie-6", title: "The Godfather", imageUrl: "https://source.unsplash.com/random/300x450/?mafia", genre: "Drama" },
  { id: "movie-7", title: "Dune", imageUrl: "https://source.unsplash.com/random/300x450/?sand", genre: "Sci-Fi" },
  { id: "movie-8", title: "No Time to Die", imageUrl: "https://source.unsplash.com/random/300x450/?spy", genre: "Action" },
  { id: "movie-9", title: "The Batman", imageUrl: "https://source.unsplash.com/random/300x450/?bat", genre: "Action" },
  { id: "movie-10", title: "The Shawshank Redemption", imageUrl: "https://source.unsplash.com/random/300x450/?prison", genre: "Drama" },
  { id: "movie-11", title: "Fight Club", imageUrl: "https://source.unsplash.com/random/300x450/?fight", genre: "Drama" },
  { id: "movie-12", title: "Forrest Gump", imageUrl: "https://source.unsplash.com/random/300x450/?running", genre: "Drama" },
];

const Movies = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 px-4">Movies</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`} className="hover-scale transition-transform duration-300">
              <Card className="border-0 overflow-hidden bg-transparent h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative aspect-[2/3] w-full">
                    <img 
                      src={movie.imageUrl} 
                      alt={movie.title} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium truncate">{movie.title}</h3>
                    <p className="text-sm text-gray-400">{movie.genre}</p>
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

export default Movies;
