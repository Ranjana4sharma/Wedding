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
    <section className="py-8 sm:py-12">
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
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
