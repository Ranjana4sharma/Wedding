import { Link } from 'react-router-dom';

export default function CategoryCard({ title, description, image, path }) {
  return (
    <Link
      to={path}
      className="group flex flex-col h-full rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 hover:scale-[1.02]"
    >
      {/* Image: 16:9, full cover */}
      <div className="aspect-video w-full relative overflow-hidden shrink-0 bg-gray-100">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
      </div>
      {/* Content: fills remaining space */}
      <div className="flex flex-col flex-1 min-h-0 p-4 sm:p-5">
        <h3 className="font-display font-semibold text-lg text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-snug flex-1">{description}</p>
        <span className="mt-3 inline-flex items-center gap-2 text-gray-700 font-medium text-sm group-hover:text-gray-900 transition-colors duration-300 shrink-0">
          View Designs
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
