import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

type Phase = 'landing' | 'reveal';

export default function HugDayExperience() {
  const [phase, setPhase] = useState<Phase>('landing');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element with proper URL encoding
    const audioPath = '/assets/KAUN TUJHE Lyrical Video _ Armaan Malik _ M.S. DHONI -THE UNTOLD STORY _ T-Series(M4A_128K).m4a';
    audioRef.current = new Audio(audioPath);
    audioRef.current.loop = true;
    audioRef.current.preload = 'auto';

    // Add event listeners to track audio state
    const audio = audioRef.current;
    
    const handlePlay = () => setIsAudioPlaying(true);
    const handlePause = () => setIsAudioPlaying(false);
    const handleError = (e: ErrorEvent) => {
      console.error('Audio error:', e);
      setShowPlayButton(true);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError as any);

    return () => {
      if (audio) {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('error', handleError as any);
        audio.pause();
      }
      audioRef.current = null;
    };
  }, []);

  const handleButtonClick = async () => {
    setPhase('reveal');
    
    // Try to play audio
    if (audioRef.current) {
      try {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsAudioPlaying(true);
          setShowPlayButton(false);
        }
      } catch (error) {
        // Autoplay blocked, show manual play button
        console.log('Autoplay blocked, showing manual play button');
        setShowPlayButton(true);
        setIsAudioPlaying(false);
      }
    }
  };

  const handleManualPlay = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsAudioPlaying(true);
        setShowPlayButton(false);
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Play failed:', err);
          setShowPlayButton(true);
        });
      }
    }
  };

  if (phase === 'landing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 px-4 py-8 animate-fade-in">
        <div className="max-w-2xl w-full flex flex-col items-center space-y-8 md:space-y-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-cursive text-center text-rose-600 drop-shadow-lg animate-float">
            Happy Hug Day My Love
          </h1>
          
          <div className="w-full max-w-md aspect-[14/9] relative animate-scale-in">
            <img
              src="/assets/generated/teddy-hero-heart-ily.dim_1400x900.png"
              alt="Cute teddy bear holding I love you heart"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          <Button
            onClick={handleButtonClick}
            size="lg"
            className="text-xl md:text-2xl px-8 md:px-12 py-6 md:py-8 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 hover:from-pink-500 hover:via-rose-500 hover:to-red-500 text-white font-semibold shadow-2xl hover:shadow-pink-300/50 transition-all duration-300 hover:scale-110 animate-pulse-soft"
          >
            Hug me! Pop me! 🧸
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden animate-fade-in"
      style={{
        backgroundImage: 'url(/assets/photo4.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Lighter overlay for better background visibility */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

      {/* Audio controls */}
      {showPlayButton && (
        <button
          onClick={handleManualPlay}
          className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm text-rose-600 p-4 rounded-full shadow-lg hover:bg-white transition-all duration-300 animate-bounce-in"
          aria-label="Play audio"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      )}

      {!showPlayButton && phase === 'reveal' && (
        <button
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm text-rose-600 p-4 rounded-full shadow-lg hover:bg-white transition-all duration-300"
          aria-label={isAudioPlaying ? 'Mute audio' : 'Play audio'}
        >
          {isAudioPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      )}

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center space-y-6 md:space-y-8">
        {/* Transparent hugging bears image */}
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[14/9] relative animate-scale-in">
          <img
            src="/assets/generated/hugging-bears-transparent.dim_1400x900.png"
            alt="Hugging bears"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Glassmorphism message card with better readability */}
        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl border border-white/60 animate-pop-in">
          <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed text-center font-serif drop-shadow-sm">
            Apki baahon mein mujhe wo sukoon milta hai jo duniya mein kahin aur nahi. Jab bhi aap mujhe gale lagati ho, lagta hai main sahi jagah par hoon. Apko gale lagane ke liye mujhe kisi wajah ki zaroorat nahi, par aaj ka din ek perfect bahana hai apko thodi der aur thame rakhne ka. 'Mujhe issi tarah thaame rakhiye apni baahon mai sada ki meri rooh ko apke dil ka Sahara mil jaye.' Happy Hug Day My Wifey ji 🤗😘🫶🏻🧿💝
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-4 left-0 right-0 z-10 text-center">
        <p className="text-white/90 text-sm backdrop-blur-sm bg-black/30 inline-block px-4 py-2 rounded-full drop-shadow-lg">
          Built with love using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
