
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAnime } from "@/hooks/useContent";
import { Skeleton } from "@/components/ui/skeleton";

const Anime = () => {
  const { data: animeData, isLoading, error } = useAnime();
  
  // Group by genre for a better organized page
  const animeByGenre = animeData?.data.reduce((acc, anime) => {
    // Take the first genre for grouping
    const primaryGenre = anime.genre[0] || 'Other';
    acc[primaryGenre] = acc[primaryGenre] || [];
    acc[primaryGenre].push(anime);
    return acc;
  }, {} as Record<string, any[]>) || {};

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8 px-4">
          <h1 className="text-3xl font-bold">Anime</h1>
          <Link to="/categories" className="text-primary hover:underline">
            View All Categories
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
            {Array(12).fill(0).map((_, index) => (
              <Card key={index} className="border-0 overflow-hidden bg-transparent h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  <Skeleton className="aspect-[2/3] w-full rounded-md" />
                  <div className="mt-2">
                    <Skeleton className="h-5 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-400">Error loading anime. Please try again.</p>
          </div>
        ) : (
          Object.entries(animeByGenre).map(([genre, shows]) => (
            <div key={genre} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 px-4">{genre}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
                {shows.map((anime) => (
                  <Link key={anime.id} to={`/watch/${anime.id}`} className="hover:scale-105 transition-transform duration-300">
                    <Card className="border-0 overflow-hidden bg-transparent h-full">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="relative aspect-[2/3] w-full">
                          <img 
                            src={anime.thumbnail_url} 
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
          ))
        )}
      </div>
    </Layout>
  );
};

export default Anime;
