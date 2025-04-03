
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ContentRow from "@/components/home/ContentRow";

// Mock data - in a real application, this would come from an API
const featuredContent = {
  title: "Interstellar",
  description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  imageUrl: "https://source.unsplash.com/random/1920x1080/?space,stars",
  videoId: "movie-1",
};

const trendingMovies = [
  { id: "movie-1", title: "Interstellar", imageUrl: "https://source.unsplash.com/random/300x170/?space", type: "movie" },
  { id: "movie-2", title: "The Matrix", imageUrl: "https://source.unsplash.com/random/300x170/?digital", type: "movie" },
  { id: "movie-3", title: "Inception", imageUrl: "https://source.unsplash.com/random/300x170/?dream", type: "movie" },
  { id: "movie-4", title: "The Dark Knight", imageUrl: "https://source.unsplash.com/random/300x170/?night", type: "movie" },
  { id: "movie-5", title: "Pulp Fiction", imageUrl: "https://source.unsplash.com/random/300x170/?vintage", type: "movie" },
  { id: "movie-6", title: "The Godfather", imageUrl: "https://source.unsplash.com/random/300x170/?mafia", type: "movie" },
];

const popularShows = [
  { id: "show-1", title: "Breaking Bad", imageUrl: "https://source.unsplash.com/random/300x170/?desert", type: "show" },
  { id: "show-2", title: "Game of Thrones", imageUrl: "https://source.unsplash.com/random/300x170/?medieval", type: "show" },
  { id: "show-3", title: "Stranger Things", imageUrl: "https://source.unsplash.com/random/300x170/?retro", type: "show" },
  { id: "show-4", title: "The Witcher", imageUrl: "https://source.unsplash.com/random/300x170/?fantasy", type: "show" },
  { id: "show-5", title: "The Mandalorian", imageUrl: "https://source.unsplash.com/random/300x170/?space,planet", type: "show" },
  { id: "show-6", title: "The Office", imageUrl: "https://source.unsplash.com/random/300x170/?office", type: "show" },
];

const newReleases = [
  { id: "movie-7", title: "Dune", imageUrl: "https://source.unsplash.com/random/300x170/?sand", type: "movie" },
  { id: "movie-8", title: "No Time to Die", imageUrl: "https://source.unsplash.com/random/300x170/?spy", type: "movie" },
  { id: "show-7", title: "Loki", imageUrl: "https://source.unsplash.com/random/300x170/?mythology", type: "show" },
  { id: "show-8", title: "Squid Game", imageUrl: "https://source.unsplash.com/random/300x170/?game", type: "show" },
  { id: "movie-9", title: "The Batman", imageUrl: "https://source.unsplash.com/random/300x170/?bat", type: "movie" },
  { id: "show-9", title: "Moon Knight", imageUrl: "https://source.unsplash.com/random/300x170/?moon", type: "show" },
];

const Index = () => {
  return (
    <Layout>
      <Hero {...featuredContent} />
      
      <div className="container mx-auto py-8">
        <ContentRow title="Trending Movies" contents={trendingMovies} />
        <ContentRow title="Popular TV Shows" contents={popularShows} />
        <ContentRow title="New Releases" contents={newReleases} />
      </div>
    </Layout>
  );
};

export default Index;
