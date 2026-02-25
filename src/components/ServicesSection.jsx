import { Link } from 'react-router-dom';
import { categories } from '../data/designs';

const serviceMeta = {
  visiting: { badge: 'Best for business' },
  wedding: { badge: 'Best for weddings' },
  banner: { badge: 'Best for shops' },
  flex: { badge: 'Best for events' },
};

const cardClass =
  'group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.12)] hover:-translate-y-1 hover:ring-2 hover:ring-slate-300/70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 min-w-0 w-full touch-manipulation';

const imageWrapClass =
  'relative w-full aspect-[4/3] min-h-[180px] bg-slate-50 flex items-center justify-center p-4';

const contentClass = 'p-4 border-t border-slate-100';
const badgeClass = 'text-xs font-semibold text-slate-500 uppercase tracking-wider';
const titleClass = 'font-display font-semibold text-lg text-slate-900 mt-1';
const descClass = 'mt-1 text-sm text-slate-600 line-clamp-2';
const btnClass =
  'mt-3 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold group-hover:bg-slate-800 transition-colors';

export default function ServicesSection() {
  const [visiting, wedding, shopBanner, flexBanner] = categories;

  return (
    <section
      id="services"
      className="relative py-5 sm:py-6 lg:py-8 scroll-mt-20 overflow-x-hidden bg-[linear-gradient(180deg,#fafafa_0%,#f5f5f5_50%,#fafafa_100%)]"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-5">
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900">
            Our Printing Services
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-1">
            Professional design and print for every need
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full min-w-0">
          {[
            { cat: visiting, key: 'visiting' },
            { cat: wedding, key: 'wedding' },
            { cat: shopBanner, key: 'banner' },
            { cat: flexBanner, key: 'flex' },
          ].map(({ cat, key }) => (
            <Link key={cat.id} to={cat.path} className={cardClass}>
              <div className={imageWrapClass}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-contain object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              <div className={contentClass}>
                <span className={badgeClass}>{serviceMeta[key].badge}</span>
                <h3 className={titleClass}>{cat.title}</h3>
                <p className={descClass}>{cat.description}</p>
                <span className={btnClass}>
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
