import { useEffect, useState } from 'react';

const features = [
  {
    title: 'High Quality Printing',
    description: 'Premium paper and inks for sharp, lasting results.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Fast Delivery',
    description: 'Quick turnaround so you get your orders on time.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Affordable Price',
    description: 'Competitive rates without compromising on quality.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Custom Design Support',
    description: 'We help you customize designs to match your vision.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
];

const counters = [
  { value: 500, suffix: '+', label: 'Designs' },
  { value: 1200, suffix: '+', label: 'Customers' },
  { value: 5, suffix: '+', label: 'Years Experience' },
];

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepValue = value / steps;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="about" className="relative py-5 sm:py-6 lg:py-8 scroll-mt-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900">
            Why Choose Us
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-1">
            We combine quality, speed and value to deliver the best printing experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-12">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white p-5 shadow-lg shadow-slate-200/60 border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 text-slate-700">
                {f.icon}
              </div>
              <h3 className="mt-3 font-display font-semibold text-base sm:text-lg text-slate-900">{f.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Counters */}
        <div className="rounded-2xl bg-slate-900 px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            {counters.map((c) => (
              <div key={c.label}>
                <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white">
                  <AnimatedCounter value={c.value} suffix={c.suffix} />
                </div>
                <div className="mt-1 text-slate-300 font-medium">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
