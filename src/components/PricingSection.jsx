const plans = [
  {
    name: 'Basic',
    price: '₹499',
    desc: 'Starter pack for small needs',
    features: ['Up to 100 cards', 'Standard paper', 'Single design', '3–5 day delivery'],
    cta: 'Order Now',
    highlighted: false,
  },
  {
    name: 'Standard',
    price: '₹999',
    desc: 'Most popular for businesses',
    features: ['Up to 500 cards', 'Premium paper options', '2 design revisions', '2–4 day delivery', 'Dedicated support'],
    cta: 'Order Now',
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '₹1,999',
    desc: 'Best value for bulk orders',
    features: ['Unlimited quantity', 'Luxury paper & foiling', 'Unlimited revisions', '1–2 day delivery', 'Priority support', 'Custom packaging'],
    cta: 'Order Now',
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-5 sm:py-6 lg:py-8 bg-slate-50/80 scroll-mt-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900">
            Simple Pricing
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-1">
            Choose a plan that fits your needs. All plans include design support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col min-h-0 ${
                plan.highlighted
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 md:scale-105 md:z-10 pt-6 md:pt-4'
                  : 'bg-white border border-slate-200 shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 md:top-[-0.75rem] px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
                  Popular
                </div>
              )}
              <h3 className={`font-display font-bold text-xl ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>
                {plan.desc}
              </p>
              <div className="mt-4">
                <span className={`font-display font-bold text-2xl sm:text-3xl ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ml-1 ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                  starting
                </span>
              </div>
              <ul className="mt-4 space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-2 text-sm ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    <svg className="w-5 h-5 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/#contact"
                className={`mt-6 inline-flex items-center justify-center w-full min-h-[44px] py-2.5 rounded-xl font-semibold transition-all touch-manipulation ${
                  plan.highlighted
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
