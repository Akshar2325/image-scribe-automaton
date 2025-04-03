
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useMovies } from "@/hooks/useContent";
import { Skeleton } from "@/components/ui/skeleton";

const Movies = () => {
  const { data: moviesData, isLoading, error } = useMovies();
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 px-4">Movies</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
            {Array(12).fill(0).map((_, index) => (
              <Card key={index} className="border-0 overflow-hidden bg-transparent h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  <Skeleton className="aspect-[2/3] w-full rounded-md" />
                  <div className="mt-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-400">Error loading movies. Please try again.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
            {moviesData?.data.map((movie) => (
              <Link key={movie.id} to={`/watch/${movie.id}`} className="hover-scale transition-transform duration-300">
                <Card className="border-0 overflow-hidden bg-transparent h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative aspect-[2/3] w-full">
                      <img 
                        src={movie.thumbnail_url} 
                        alt={movie.title} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium truncate">{movie.title}</h3>
                      <p className="text-sm text-gray-400">{movie.genre.join(', ')}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Movies;
