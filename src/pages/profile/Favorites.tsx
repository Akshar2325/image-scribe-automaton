
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Mock data - in a real app, this would come from your backend
const favorites = [
  {
    id: "1",
    title: "The Matrix",
    thumbnail: "https://source.unsplash.com/random/300x200/?scifi",
    type: "movie",
    addedAt: "2024-04-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Stranger Things",
    thumbnail: "https://source.unsplash.com/random/300x200/?retro",
    type: "series",
    addedAt: "2024-04-02T15:00:00Z",
  },
];

const Favorites = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((item) => (
            <Link key={item.id} to={`/watch/${item.id}`}>
              <Card className="hover:bg-gray-800/50 transition h-full">
                <CardContent className="p-4 space-y-2">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-400 capitalize">{item.type}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
