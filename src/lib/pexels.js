/**
 * Pexels video search for Wedding Hero.
 * Fetches "indian wedding jaimala" video, prefers horizontal HD, 10–40s duration.
 * Cache in sessionStorage for performance. Fallback to /videos/wedding.mp4 if API fails.
 */

const CACHE_KEY = 'pexels_wedding_hero_jaimala';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const SEARCH_QUERY = 'indian wedding jaimala';
const PEXELS_VIDEO_SEARCH = 'https://api.pexels.com/videos/search';

function getApiKey() {
  return typeof import.meta !== 'undefined' && import.meta.env?.VITE_PEXELS_API_KEY
    ? import.meta.env.VITE_PEXELS_API_KEY
    : '';
}

function fromCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { url, poster, mobileUrl, expiresAt } = JSON.parse(raw);
    if (expiresAt && Date.now() > expiresAt) return null;
    return { url, poster, mobileUrl };
  } catch {
    return null;
  }
}

function toCache(data) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        ...data,
        expiresAt: Date.now() + CACHE_TTL_MS,
      })
    );
  } catch (_) {}
}

/**
 * Pick best video file: horizontal (width > height), prefer HD for desktop, SD for mobile.
 * Prefer duration 10–40s.
 */
function pickVideoFiles(video) {
  const files = video.video_files || [];
  const landscape = files.filter((f) => f.width && f.height && f.width > f.height && f.link);
  const duration = video.duration || 0;
  const preferDuration = duration >= 10 && duration <= 40;

  // Prefer HD for desktop (e.g. 1920x1080 or 1280x720), SD for mobile
  const byQuality = (a, b) => {
    const q = (f) => (f.quality === 'hd' ? 2 : f.quality === 'sd' ? 1 : 0);
    const byRes = (a, b) => (b.width || 0) - (a.width || 0);
    if (q(b) !== q(a)) return q(b) - q(a);
    return byRes(a, b);
  };

  const sorted = [...landscape].sort(byQuality);
  const hd = sorted.find((f) => f.quality === 'hd' && (f.width >= 1280 || f.height >= 720));
  const sd = sorted.find((f) => f.quality === 'sd' || (f.width && f.width <= 960));

  return {
    url: hd?.link || sorted[0]?.link || null,
    mobileUrl: sd?.link || sorted[sorted.length - 1]?.link || sorted[0]?.link || null,
    poster: video.image || (video.video_pictures && video.video_pictures[0]?.picture) || null,
    preferDuration,
  };
}

/**
 * Fetch wedding hero video from Pexels. Returns { url, poster, mobileUrl } or null.
 */
export async function fetchWeddingHeroVideo() {
  const cached = fromCache();
  if (cached?.url) return cached;

  const apiKey = getApiKey();
  const fallback = {
    url: '/jaimalaa.mp4',
    poster: '/jaimala.jpg',
    mobileUrl: '/jaimalaa.mp4',
  };

  if (!apiKey) {
    return fallback;
  }

  try {
    const res = await fetch(
      `${PEXELS_VIDEO_SEARCH}?query=${encodeURIComponent(SEARCH_QUERY)}&orientation=landscape&per_page=15`,
      {
        headers: { Authorization: apiKey },
      }
    );
    if (!res.ok) return fallback;

    const data = await res.json();
    const videos = data.videos || [];

    // Prefer 10–40s duration, then any landscape
    const withPicks = videos
      .filter((v) => v.width > v.height)
      .map((v) => ({ video: v, ...pickVideoFiles(v) }))
      .filter((x) => x.url);

    const best = withPicks.find((x) => x.preferDuration) || withPicks[0];
    if (!best) return fallback;

    const result = {
      url: best.url,
      mobileUrl: best.mobileUrl || best.url,
      poster: best.poster,
    };
    toCache(result);
    return result;
  } catch (_) {
    return fallback;
  }
}
