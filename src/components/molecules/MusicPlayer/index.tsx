"use client";

import React, { useRef, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  title: string;
  description: string;
  cover: string | StaticImageData;
  src: string;
}

const MusicPlayer = ({ title, description, cover, src }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        const time = audio.currentTime;
        setCurrentTime(time);
        setProgress((time / audio.duration) * 100);
      }
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percent * 100);
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div
      className="rounded-2xl p-6 transition-all duration-300 group"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--surface-border)",
      }}
    >
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        {}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl shadow-black/50 group-hover:scale-105 transition-transform duration-500">
          <Image
            src={cover}
            alt={title}
            fill
            className={`object-cover ${isPlaying ? "animate-pulse-slow" : ""}`}
          />

          {}
          <button
            onClick={togglePlay}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {isPlaying ? (
              <Pause size={32} className="text-white" />
            ) : (
              <Play size={32} className="text-white ml-1" />
            )}
          </button>
        </div>

        {}
        <div className="flex-grow w-full flex flex-col justify-between h-full py-1">
          <div>
            <h3
              className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h3>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {}
            <div
              className="h-1.5 rounded-full w-full cursor-pointer relative overflow-hidden group/bar"
              style={{ backgroundColor: "var(--surface-border)" }}
              onClick={handleSeek}
            >
              <div
                className="bg-primary h-full rounded-full transition-all duration-100 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
              </div>
            </div>

            {}
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-mono text-text-secondary/70">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleMute}
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button
                  onClick={togglePlay}
                  className="bg-white text-black rounded-full p-2.5 hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300 shadow-lg shadow-white/10"
                >
                  {isPlaying ? (
                    <Pause size={18} fill="currentColor" />
                  ) : (
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
};

export default MusicPlayer;
