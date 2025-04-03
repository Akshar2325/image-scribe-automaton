
import { useParams, useNavigate } from "react-router-dom";
import VideoPlayer from "@/components/player/VideoPlayer";
import { useContent, useAddToWatchHistory, useWatchProgress } from "@/hooks/useContent";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch content data
  const { data: content, isLoading, error } = useContent(id || "");
  
  // Get watch progress
  const { data: progress } = useWatchProgress(id || "");
  
  // Add to watch history mutation
  const { mutate: addToHistory } = useAddToWatchHistory();
  
  // Update watch history when the user watches the video
  const handleTimeUpdate = (currentTime: number, duration: number) => {
    // Only update every 10 seconds to reduce database writes
    if (Math.floor(currentTime) % 10 === 0 && isPlaying) {
      const completed = currentTime / duration > 0.9; // Consider completed if watched 90%
      
      addToHistory({
        contentId: id || "",
        progress: Math.floor(currentTime),
        completed
      });
    }
  };
  
  // Start playing from where the user left off
  useEffect(() => {
    if (progress && progress.progress > 0) {
      // We'll handle this in the video player
    }
  }, [progress]);
  
  if (isLoading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <Skeleton className="w-full max-w-6xl aspect-video rounded-lg" />
      </div>
    );
  }
  
  if (error || !content) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Video not found</h1>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <VideoPlayer 
      videoUrl={content.video_url} 
      title={content.title} 
      backLink="/"
      initialTime={progress?.progress || 0}
      onTimeUpdate={handleTimeUpdate}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  );
};

export default Watch;
