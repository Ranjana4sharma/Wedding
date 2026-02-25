import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { designsByCategory, getCategoryMeta } from '../data/designs';
import GallerySection from '../components/GallerySection';

export default function Category() {
  const { slug } = useParams();
  const designs = designsByCategory[slug] || [];
  const meta = getCategoryMeta(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!designs.length) {
    return (
      <main className="flex-1 overflow-x-hidden py-16 px-4 text-center">
        <p className="text-slate-500">Category not found.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-x-hidden min-w-0 w-full">
      <section className="py-6 sm:py-10 px-3 sm:px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto min-w-0">
          <h1 className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-slate-900">
            {meta.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Select a design to preview and order via WhatsApp.
          </p>
        </div>
      </section>
      <section className="px-3 sm:px-6 min-w-0">
        <div className="max-w-6xl mx-auto">
          <GallerySection designs={designs} categorySlug={slug} />
        </div>
      </section>
    </main>
  );
}
