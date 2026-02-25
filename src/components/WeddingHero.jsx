import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchWeddingHeroVideo } from '../lib/pexels';

const FALLBACK_VIDEO = '/jaimalaa.mp4';
const FALLBACK_POSTER = '/jaimala.jpg';

export default function WeddingHero() {
  const [videoData, setVideoData] = useState(null);
  const [isInView, setIsInView] = useState(true);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Fetch video (cached) when in view
  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;
    fetchWeddingHeroVideo().then((data) => {
      if (!cancelled && data?.url) setVideoData(data);
    });
    return () => { cancelled = true; };
  }, [isInView]);

  // Intersection Observer: load only when hero is in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) setIsInView(true);
      },
      { rootMargin: '50px', threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Parallax: content moves slightly on scroll
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (viewportCenter - center) * 0.08;
      setParallaxY(Math.max(-40, Math.min(40, offset)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pause when tab inactive
  useEffect(() => {
    const onVisibility = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.visibilityState === 'hidden') v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const videoSrc = videoData?.url || FALLBACK_VIDEO;
  const mobileSrc = videoData?.mobileUrl || videoData?.url || FALLBACK_VIDEO;
  const poster = videoData?.poster || FALLBACK_POSTER;

  // Mobile: use smaller resolution URL when available
  const [useMobileVideo, setUseMobileVideo] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setUseMobileVideo(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const currentVideoSrc = useMobileVideo ? mobileSrc : videoSrc;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] min-[480px]:min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Wedding hero"
    >
      {/* Background video – full width, cinematic object-cover; mobile gets smaller resolution */}
      {isInView && (
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            key={currentVideoSrc}
            className="absolute inset-0 w-full h-full object-cover scale-105"
            src={currentVideoSrc}
            poster={poster}
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        </div>
      )}

      {/* Clean overlay – video visible, text readable (mute only, no sound) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/55"
        aria-hidden
      />
      {/* Slightly darker behind text area so text stays clear */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_45%,transparent_0%,rgba(0,0,0,0.25)_70%,rgba(0,0,0,0.4)_100%)]"
        aria-hidden
      />
      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30vmin rgba(0,0,0,0.15)' }}
        aria-hidden
      />

      {/* Center content – clean text (parallax), responsive */}
      <div
        className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center max-w-4xl mx-auto transition-transform duration-150 w-full min-w-0"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <h1
          className="font-wedding text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white tracking-tight leading-tight break-words"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.4)' }}
        >
          Make Your Wedding Memorable
        </h1>
        <p
          className="mt-3 sm:mt-4 md:mt-5 text-sm min-[380px]:text-base sm:text-lg md:text-xl text-white font-light max-w-2xl mx-auto px-0 sm:px-2"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.35)' }}
        >
          Premium Wedding Cards, Banners & Invitation Designs
        </p>
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            to="/category/wedding"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-amber-500 text-white font-semibold shadow-lg shadow-amber-900/30 hover:bg-amber-400 hover:shadow-amber-800/40 transition-all duration-300 min-h-[48px] min-w-0 sm:min-w-[200px] touch-manipulation"
          >
            Design Your Wedding Card
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Pexels attribution – subtle, hidden on very small screens */}
      <a
        href="https://www.pexels.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 text-white/40 text-xs hover:text-white/60 transition-colors z-10 hidden min-[400px]:inline"
      >
        Video by Pexels
      </a>
    </section>
  );
}
