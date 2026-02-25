import { useState, useMemo } from 'react';
import DesignCard from './DesignCard';
import DesignModal from './DesignModal';
import { getCategoryMeta } from '../data/designs';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'modern', label: 'Modern' },
  { value: 'premium', label: 'Premium' },
  { value: 'traditional', label: 'Traditional' },
];

export default function GallerySection({ designs, categorySlug }) {
  const [filter, setFilter] = useState('all');
  const [selectedDesign, setSelectedDesign] = useState(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return designs;
    return designs.filter((d) => d.type === filter);
  }, [designs, filter]);

  const meta = getCategoryMeta(categorySlug);

  return (
    <section className="py-6 sm:py-10">
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium transition-colors touch-manipulation ${
              filter === f.value
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div
        className={`grid gap-3 sm:gap-5 lg:gap-6 ${
          categorySlug === 'banner' || categorySlug === 'flex'
            ? 'grid-cols-1 lg:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {filtered.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            categorySlug={categorySlug}
            onClick={setSelectedDesign}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-8">No designs in this filter.</p>
      )}
      {selectedDesign && (
        <DesignModal
          design={selectedDesign}
          categoryName={meta.title}
          onClose={() => setSelectedDesign(null)}
        />
      )}
    </section>
  );
}
