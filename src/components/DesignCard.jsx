import { useState } from 'react';

export default function DesignCard({ design, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onClick(design)}
      className="group relative block w-full rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-left"
    >
      {/* Image: 3:4, full cover */}
      <div className="aspect-[3/4] w-full relative overflow-hidden bg-gray-200">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={design.image}
          alt={design.code}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-900 font-medium px-4 py-2 rounded-lg text-sm">
            Preview
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
          <span className="text-white font-mono text-sm font-medium">{design.code}</span>
        </div>
      </div>
    </button>
  );
}
