"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function AudioPlayer({ musicUrl, autoplay = true }: { musicUrl: string, autoplay?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    const events = ['click', 'touchstart', 'pointerdown'];

    const playAudio = () => {
      const promise = audio.play();
      if (promise !== undefined) {
        promise.then(() => {
          setIsPlaying(true);
          // Once successfully playing, we don't need the global click listener
          events.forEach(event => document.removeEventListener(event, playAudio, { capture: true }));
        }).catch(() => {
          // Failed to play (e.g. user hasn't interacted yet). 
          // Fail silently and wait for the next click.
          setIsPlaying(false);
        });
      }
    };

    if (autoplay) {
      // If browser supports userActivation and user has interacted, we can try immediately.
      // Otherwise, we wait for the first click.
      if (typeof navigator !== 'undefined' && navigator.userActivation?.hasBeenActive) {
        playAudio();
      }
    }

    // Always listen for click to unlock audio if it hasn't started yet
    // Use capture: true so we intercept it before e.stopPropagation() is called on buttons
    events.forEach(event => document.addEventListener(event, playAudio, { capture: true }));

    return () => {
      audio.pause();
      audio.src = '';
      events.forEach(event => document.removeEventListener(event, playAudio, { capture: true }));
    };
  }, [musicUrl, autoplay]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-60">
      <button
        onClick={togglePlay}
        className="relative flex items-center justify-center w-12 h-12 bg-stone-900/80 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-[#E6C27A]/30 text-[#E6C27A] hover:bg-stone-800 transition-all duration-300 group"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <div className="flex space-x-[2px] items-end h-4 w-4 justify-center">
            <span className="w-1 h-3/4 bg-[#E6C27A] animate-pulse"></span>
            <span className="w-1 h-full bg-[#E6C27A] animate-[pulse_1s_ease-in-out_infinite_reverse]"></span>
            <span className="w-1 h-1/2 bg-[#E6C27A] animate-[pulse_1.5s_ease-in-out_infinite]"></span>
          </div>
        ) : (
          <svg className="w-5 h-5 -ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        )}
      </button>
    </div>
  );
}
