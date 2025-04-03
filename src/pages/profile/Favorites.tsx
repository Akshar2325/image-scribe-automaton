
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/supabase/auth-helpers";
import { getFavorites } from "@/api/favorites";
import { Skeleton } from "@/components/ui/skeleton";

const Favorites = () => {
  // Get current user and then fetch favorites
  const { data: favorites, isLoading, error } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');
      return getFavorites(user.id);
    },
  });

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, index) => (
              <Card key={index} className="hover:bg-gray-800/50 transition h-full">
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="w-full aspect-video object-cover rounded-lg" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-400">Error loading favorites. Please try again.</p>
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((item) => (
              <Link key={item.id} to={`/watch/${item.id}`}>
                <Card className="hover:bg-gray-800/50 transition h-full">
                  <CardContent className="p-4 space-y-2">
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-400 capitalize">{item.content_type.toLowerCase()}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-400">You haven't added any favorites yet.</p>
            <Link to="/" className="text-primary hover:underline mt-2 inline-block">
              Browse content
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
