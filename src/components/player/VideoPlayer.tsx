
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  backLink?: string;
}

const VideoPlayer = ({ videoUrl, title, backLink = "/" }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const updateDuration = () => setDuration(video.duration);
    const updateTime = () => setCurrentTime(video.currentTime);
    
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("timeupdate", updateTime);
    
    return () => {
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("timeupdate", updateTime);
    };
  }, []);
  
  useEffect(() => {
    if (isControlsVisible) {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
      
      controlsTimerRef.current = setTimeout(() => {
        if (isPlaying) {
          setIsControlsVisible(false);
        }
      }, 3000);
    }
    
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [isControlsVisible, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
    setIsControlsVisible(true);
  };
  
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    setIsControlsVisible(true);
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    
    const seekTime = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
    setIsControlsVisible(true);
  };
  
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
    
    setIsControlsVisible(true);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  return (
    <div 
      className="relative w-full h-screen bg-black"
      onMouseMove={() => setIsControlsVisible(true)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onClick={togglePlay}
      />
      
      {/* Back button */}
      <div className={`absolute top-4 left-4 transition-opacity duration-300 ${isControlsVisible ? "opacity-100" : "opacity-0"}`}>
        <Button variant="ghost" size="icon" asChild>
          <Link to={backLink}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
      </div>
      
      {/* Video title */}
      <div className={`absolute top-4 left-16 transition-opacity duration-300 ${isControlsVisible ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-xl font-medium">{title}</h1>
      </div>
      
      {/* Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-6 transition-opacity duration-300 ${isControlsVisible ? "opacity-100" : "opacity-0"}`}
      >
        {/* Progress bar */}
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #f43f5e ${(currentTime / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.2) 0%)`,
          }}
        />
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
            
            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            <Maximize className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
