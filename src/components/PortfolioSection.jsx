import { Link } from 'react-router-dom';
import { visitingCards, weddingCards, shopBanners, flexBanners } from '../data/designs';

// Home: only 2 rows (6 items). One from each category + 2 extra
const portfolioItems = [
  ...visitingCards.slice(0, 2).map((d) => ({ ...d, categoryName: 'Visiting Card' })),
  ...weddingCards.slice(0, 2).map((d) => ({ ...d, categoryName: 'Wedding Card' })),
  ...shopBanners.slice(0, 1).map((d) => ({ ...d, categoryName: 'Shop Banner' })),
  ...flexBanners.slice(0, 1).map((d) => ({ ...d, categoryName: 'Flex Printing' })),
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-5 sm:py-6 lg:py-8 bg-slate-50/80 scroll-mt-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-5">
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900">
            Portfolio & Sample Work
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-1">
            Browse our design samples across visiting cards, wedding cards, banners and flex printing
          </p>
        </div>

        {/* 2 rows: 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {portfolioItems.map((item) => (
            <Link
              key={`${item.category}-${item.id}`}
              to={`/category/${item.category}`}
              className="group block rounded-2xl overflow-hidden bg-white shadow-lg shadow-slate-200/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.code}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-slate-900 font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm sm:text-base">
                    View Design
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-white font-mono text-sm font-medium">{item.code}</span>
                  <span className="block text-white/80 text-xs mt-0.5">{item.categoryName}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link
            to="/category/visiting"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors touch-manipulation"
          >
            View All Designs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
