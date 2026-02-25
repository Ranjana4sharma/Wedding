import { useState } from 'react';
import PrintSampleFrame from './PrintSampleFrame';

/**
 * Design card on category pages – style matches home page service boxes:
 * visiting = small square, wedding = portrait premium, banner/flex = wall-mounted frame.
 */
export default function DesignCard({ design, categorySlug = 'visiting', onClick }) {
  const [loaded, setLoaded] = useState(false);
  const isBanner = categorySlug === 'banner' || categorySlug === 'flex';
  const isWedding = categorySlug === 'wedding';
  const isVisiting = categorySlug === 'visiting';

  const baseButtonClass =
    'group relative block w-full rounded-2xl bg-white border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.12)] hover:-translate-y-1 hover:ring-2 hover:ring-slate-300/70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-left';

  // —— Visiting: small square product card (home-page style) ——
  if (isVisiting) {
    return (
      <button type="button" onClick={() => onClick(design)} className={`${baseButtonClass} overflow-hidden`}>
        <div className="relative w-full aspect-square min-h-[180px] bg-slate-50 flex items-center justify-center p-4">
          {!loaded && <div className="absolute inset-0 bg-slate-100 animate-pulse" />}
          <img
            src={design.image}
            alt={design.code}
            className={`w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        <div className="p-3 sm:p-4 border-t border-slate-100 flex items-center justify-between">
          <span className="font-mono text-sm font-medium text-slate-700">{design.code}</span>
          <span className="text-slate-500 text-sm">Preview</span>
        </div>
      </button>
    );
  }

  // —— Wedding: premium portrait card (home-page style) ——
  if (isWedding) {
    return (
      <button type="button" onClick={() => onClick(design)} className={`${baseButtonClass} overflow-hidden`}>
        <div className="relative w-full aspect-[3/4] min-h-[220px] bg-slate-50 flex items-center justify-center p-4">
          {!loaded && <div className="absolute inset-0 bg-slate-100 animate-pulse" />}
          <img
            src={design.image}
            alt={design.code}
            className={`w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        <div className="p-3 sm:p-4 border-t border-slate-100 flex items-center justify-between">
          <span className="font-mono text-sm font-medium text-slate-700">{design.code}</span>
          <span className="text-slate-500 text-sm">Preview</span>
        </div>
      </button>
    );
  }

  // —— Banner / Flex: wall-mounted frame (PrintSampleFrame, home-page style) ——
  if (isBanner) {
    return (
      <button
        type="button"
        onClick={() => onClick(design)}
        className={`${baseButtonClass} flex flex-col p-2 sm:p-3 bg-gradient-to-br from-slate-100/80 to-slate-50/80 overflow-visible`}
      >
        <div className="relative flex-1 min-h-[200px] sm:min-h-[240px] w-full overflow-visible">
          <PrintSampleFrame
            src={design.image}
            alt={design.code}
            aspectRatio="16/7"
            className="w-full h-full min-h-[200px] sm:min-h-[240px]"
          />
        </div>
        <div className="p-3 sm:p-4 border-t border-slate-200/80 flex items-center justify-between bg-white/90 rounded-b-xl">
          <span className="font-mono text-sm font-medium text-slate-700">{design.code}</span>
          <span className="text-slate-500 text-sm">Preview</span>
        </div>
      </button>
    );
  }

  // Fallback: same as visiting
  return (
    <button type="button" onClick={() => onClick(design)} className={`${baseButtonClass} overflow-hidden`}>
      <div className="relative w-full aspect-square min-h-[180px] bg-slate-50 flex items-center justify-center p-4">
        {!loaded && <div className="absolute inset-0 bg-slate-100 animate-pulse" />}
        <img
          src={design.image}
          alt={design.code}
          className={`w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      <div className="p-3 sm:p-4 border-t border-slate-100 flex items-center justify-between">
        <span className="font-mono text-sm font-medium text-slate-700">{design.code}</span>
        <span className="text-slate-500 text-sm">Preview</span>
      </div>
    </button>
  );
}
