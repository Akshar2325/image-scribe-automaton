
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Mock data - in a real app, this would come from your backend
const watchHistory = [
  {
    id: "1",
    title: "Inception",
    thumbnail: "https://source.unsplash.com/random/300x200/?movie",
    watchedAt: "2024-04-03T10:30:00Z",
    progress: 75,
  },
  {
    id: "2",
    title: "Breaking Bad",
    thumbnail: "https://source.unsplash.com/random/300x200/?tv",
    watchedAt: "2024-04-02T15:20:00Z",
    progress: 90,
  },
];

const History = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Watch History</h1>
        <div className="grid gap-4">
          {watchHistory.map((item) => (
            <Link key={item.id} to={`/watch/${item.id}`}>
              <Card className="hover:bg-gray-800/50 transition">
                <CardContent className="p-4 flex gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-48 h-32 object-cover rounded"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-400">
                        Watched on {new Date(item.watchedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
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

export default History;
