
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface ControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  skip: (seconds: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  progress: number;
  setProgress: (progress: number) => void;
  currentTime: string;
  duration: string;
}

const Controls = ({
  isPlaying,
  togglePlay,
  skip,
  volume,
  setVolume,
  isMuted,
  toggleMute,
  progress,
  setProgress,
  currentTime,
  duration,
}: ControlsProps) => {
  return (
    <div className="flex flex-col w-full px-4 py-2 bg-black/60 backdrop-blur-sm">
      {/* Progress bar */}
      <Slider
        value={[progress]}
        max={100}
        step={0.1}
        onValueChange={(value) => setProgress(value[0])}
        className="cursor-pointer"
      />
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-4">
          {/* Rewind */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => skip(-10)}
            className="text-white hover:bg-white/20"
          >
            <SkipBack size={18} />
          </Button>
          
          {/* Play/Pause */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={togglePlay}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </Button>
          
          {/* Forward */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => skip(10)}
            className="text-white hover:bg-white/20"
          >
            <SkipForward size={18} />
          </Button>
          
          {/* Volume */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
            >
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>
            <Slider 
              value={[isMuted ? 0 : volume * 100]} 
              max={100}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="w-20 cursor-pointer"
            />
          </div>
        </div>
        
        {/* Time */}
        <div className="text-white text-sm">
          {currentTime} / {duration}
        </div>
      </div>
    </div>
  );
};

export default Controls;
