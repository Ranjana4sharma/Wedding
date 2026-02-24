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
      <main className="flex-1 py-16 px-4 text-center">
        <p className="text-gray-500">Category not found.</p>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="py-8 sm:py-12 px-4 sm:px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-gray-900">
            {meta.name}
          </h1>
          <p className="mt-2 text-gray-600">
            Select a design to preview and order via WhatsApp.
          </p>
        </div>
      </section>
      <section className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <GallerySection designs={designs} categorySlug={slug} />
        </div>
      </section>
    </main>
  );
}
