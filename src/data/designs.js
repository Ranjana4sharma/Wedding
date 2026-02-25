// Images from public folder – exact filenames as in public/
// Visiting: visting*, card* | Wedding: wedding*, weeding* | Shop: shop* | Flex: flex print*

const categoryImages = {
  visiting: '/visting1.avif',
  wedding: '/weeding1.1.jpg',
  banner: '/shop1.webp',
  flex: '/flex%20print%201.jpg',
};

// Har category mein sirf usi category ki images – koi double/repeat nahi
const visitingImages = [
  '/visting1.avif',
  '/Visting2.jpg',
  '/visting3.3.jpg',
  '/visting4.4.jpg',
  '/visting4.5.jpg',
  '/visting5.jpg',
  '/visiting4.6.jpg',
  
];

const weddingImages = [
  '/weeding1.1.jpg',
  '/weeding2.2.webp',
  '/card1.jpeg',
  '/card2.jpeg',
  '/card3.jpeg',
  '/card4.jpeg',
];

const shopImages = [
  '/shop1.webp',
  '/shop1.1.jpg',
  '/shop1.2.jpg',
  '/shop1.4.avif',
  
  '/shop6.jpg',
  '/shop1.3.avif',
];

const flexImages = [
  '/flex%20print%201.jpg',
  
];

export const categories = [
  {
    id: 'visiting',
    title: 'Visiting Card',
    subtitle: '100+ Designs Available',
    description: 'Premium business cards with matte or glossy finish. Custom designs for your brand identity.',
    image: categoryImages.visiting,
    path: '/category/visiting',
  },
  {
    id: 'wedding',
    title: 'Wedding Card',
    subtitle: '100+ Designs Available',
    description: 'Elegant Indian wedding invitations—traditional to contemporary. Foiling & premium paper options.',
    image: categoryImages.wedding,
    path: '/category/wedding',
  },
  {
    id: 'banner',
    title: 'Shop Banner',
    subtitle: '100+ Designs Available',
    description: 'Eye-catching shop banners and storefront signage. Durable vinyl and fabric options.',
    image: categoryImages.banner,
    path: '/category/banner',
  },
  {
    id: 'flex',
    title: 'Flex Printing',
    subtitle: '100+ Designs Available',
    description: 'Large-format flex & hoarding printing. Bold graphics for outdoor and indoor branding.',
    image: categoryImages.flex,
    path: '/category/flex',
  },
];

const codes = {
  visiting: 'VC',
  wedding: 'WD',
  banner: 'BN',
  flex: 'FX',
};

const types = ['modern', 'premium', 'traditional', 'modern', 'premium'];

function makeDesigns(categoryKey, imageList) {
  const prefix = codes[categoryKey];
  return imageList.map((image, i) => ({
    id: i + 1,
    code: `${prefix}-${String(i + 1).padStart(3, '0')}`,
    category: categoryKey,
    type: types[i % types.length],
    image,
    paperType: ['Matte 300 GSM', 'Glossy 350 GSM', 'Uncoated 250 GSM'][i % 3],
    size: ['90×55 mm', '85×55 mm', '88×55 mm'][i % 3],
  }));
}

export const visitingCards = makeDesigns('visiting', visitingImages);
export const weddingCards = makeDesigns('wedding', weddingImages);
export const shopBanners = makeDesigns('banner', shopImages);
export const flexBanners = makeDesigns('flex', flexImages);

export const designsByCategory = {
  visiting: visitingCards,
  wedding: weddingCards,
  banner: shopBanners,
  flex: flexBanners,
};

export function getCategoryMeta(slug) {
  const map = {
    visiting: { title: 'Visiting Card', name: 'Visiting Cards' },
    wedding: { title: 'Wedding Card', name: 'Wedding Cards' },
    banner: { title: 'Shop Banner', name: 'Shop Banners' },
    flex: { title: 'Flex Printing', name: 'Flex Printing' },
  };
  return map[slug] || { title: 'Designs', name: 'Designs' };
}
