
import { useParams } from "react-router-dom";
import VideoPlayer from "@/components/player/VideoPlayer";

// In a real application, you would fetch the video data based on the ID
const getVideoData = (id: string) => {
  // This is mock data - in a real app, you'd fetch this from an API
  return {
    title: "Sample Video",
    // Using a sample video URL - in a real app, this would be your actual video URL
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  };
};

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const videoData = getVideoData(id || "");
  
  return (
    <VideoPlayer 
      videoUrl={videoData.videoUrl} 
      title={videoData.title} 
      backLink="/"
    />
  );
};

export default Watch;
