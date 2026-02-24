import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/designs';

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-tight">
            Best Printing & Design Services
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your design & order instantly
          </p>
          <Link
            to="/category/visiting"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
          >
            Browse Designs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Our Printing Services */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-gray-900">
              Our Printing Services
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
              High Quality Design & Printing Solutions
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                title={cat.title}
                description={cat.description}
                image={cat.image}
                path={cat.path}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
