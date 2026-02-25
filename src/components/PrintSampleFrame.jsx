/**
 * Realistic printing sample preview – wall-mounted frame style.
 * Not a product card: looks like a real flex/banner mounted on a wall.
 * Image is never cropped (object-contain), aspect ratio preserved.
 */
export default function PrintSampleFrame({
  src,
  alt,
  aspectRatio = '16/7',
  className = '',
  imageClassName = '',
}) {
  return (
    <div
      className={`relative w-full h-full min-h-0 ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Studio wall background + soft outer glow */}
      <div
        className="absolute -inset-2 sm:-inset-3 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-200/80 via-slate-100/90 to-slate-200/80 opacity-90"
        aria-hidden
      />
      <div
        className="absolute -inset-1 sm:-inset-2 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl bg-amber-200/20 group-hover:bg-amber-200/30 transition-colors duration-300"
        aria-hidden
      />

      {/* Wall-mounted frame: golden border + drop shadow (hanging board) */}
      <div
        className="relative flex flex-col rounded-2xl p-2 sm:p-2.5 h-full min-h-0 bg-gradient-to-br from-amber-200/90 via-amber-100/95 to-amber-300/90 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35),0_8px_20px_-8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)] group-hover:shadow-[0_28px_60px_-14px_rgba(0,0,0,0.4),0_12px_28px_-10px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.5)] transition-all duration-300"
        style={{
          transform: 'translateZ(0) rotateX(1deg) rotateY(-0.5deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Inner white mat / padding (print showroom style) */}
        <div className="relative rounded-xl bg-white p-3 sm:p-4 md:p-5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] overflow-hidden flex items-center justify-center min-h-0 flex-1">
          {/* Studio light gradient overlay (subtle top-down light) */}
          <div
            className="absolute inset-0 pointer-events-none rounded-xl opacity-30"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 100%)',
            }}
            aria-hidden
          />

          {/* Image container: full visible, no crop, aspect ratio preserved */}
          <div
            className="relative flex items-center justify-center bg-slate-50/80 rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] w-full max-h-full"
            style={{ aspectRatio }}
          >
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-contain object-center ${imageClassName}`}
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
