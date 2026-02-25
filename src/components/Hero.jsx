export default function Hero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100/50">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-18 w-full min-w-0">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left min-w-0">
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-900 tracking-tight leading-[1.15] animate-fade-up break-words">
              Premium Printing & Card Design Services
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              Visiting Cards, Wedding Cards, Shop Banners & Flex Printing with Professional Quality
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900 text-white font-semibold shadow-lg shadow-slate-900/25 hover:bg-slate-800 hover:shadow-slate-900/30 transition-all duration-300 min-h-[48px]"
              >
                Get Your Design
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/#portfolio"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 min-h-[48px]"
              >
                View Samples
              </a>
            </div>
          </div>

          {/* Right: Layered card mockups with float */}
          <div className="relative hidden lg:block h-[320px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-72 h-80">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-2xl transform rotate-[-6deg] animate-float" style={{ animationDelay: '0s' }} />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 shadow-2xl transform rotate-[2deg] translate-y-4 animate-float" style={{ animationDelay: '0.5s' }} />
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transform rotate-[6deg] translate-y-8 animate-float" style={{ animationDelay: '1s' }}>
                  <img
                    src="/visting1.avif"
                    alt="Print sample"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
