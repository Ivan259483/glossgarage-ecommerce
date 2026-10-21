// Hardcoded starting product list (no database, no API).
// App.jsx copies this array into useState, so stock can change while the app runs.
// Refreshing the page resets everything back to these values.

export const CATEGORIES = ['Exterior', 'Interior', 'Wheels & Tires', 'Tools & Accessories']

const products = [
  {
    id: 1,
    name: 'Ceramic Shield Spray Coating',
    category: 'Exterior',
    price: 1299,
    image: '/images/ceramic-shield-spray.svg',
    shortDescription: 'SiO2 spray sealant for up to 6 months of hydrophobic gloss.',
    description:
      'Ceramic Shield is a silica (SiO2) infused spray coating that bonds to clear coat, glass and trim in minutes. Spray, spread with a microfiber towel and buff off for a slick, mirror-like finish that beads water and resists road grime, bird droppings and UV fading for up to 6 months. 500 ml bottle covers 8–10 sedans.',
    stock: 15,
  },
  {
    id: 2,
    name: 'Hydro Foam Car Shampoo (1L)',
    category: 'Exterior',
    price: 449,
    image: '/images/hydro-foam-shampoo.svg',
    shortDescription: 'pH-neutral, thick-foaming shampoo that is safe on wax and coatings.',
    description:
      'A pH-neutral shampoo that creates dense, clinging foam to lift dirt before you touch the paint. Safe on wax, sealants and ceramic coatings, and rinses clean without leaving streaks or spots even under the tropical sun. Use 30 ml per bucket or 100 ml in a foam cannon.',
    stock: 25,
  },
  {
    id: 3,
    name: 'Carnauba Paste Wax (200g)',
    category: 'Exterior',
    price: 899,
    image: '/images/carnauba-paste-wax.svg',
    shortDescription: 'Brazilian carnauba wax for a deep, warm, show-car glow.',
    description:
      'Hand-blended with premium Brazilian carnauba for that deep, wet look on dark paint. Apply a thin layer with the included foam applicator, let it haze for 5 minutes, then buff to a warm glow. Each 200 g tin is enough for 20+ applications.',
    stock: 0,
  },
  {
    id: 4,
    name: 'Leather Care Conditioner (500ml)',
    category: 'Interior',
    price: 650,
    image: '/images/leather-care-conditioner.svg',
    shortDescription: 'Cleans, softens and protects leather seats with a matte finish.',
    description:
      'A 2-in-1 cleaner and conditioner that removes body oils and dirt while restoring moisture to leather seats, steering wheels and door panels. Leaves a natural matte finish (no greasy shine) and adds UV protection to prevent cracking and fading.',
    stock: 12,
  },
  {
    id: 5,
    name: 'Dash & Vinyl UV Protectant',
    category: 'Interior',
    price: 399,
    image: '/images/dash-vinyl-protectant.svg',
    shortDescription: 'Anti-static, non-greasy protectant for dashboards and trim.',
    description:
      'Spray onto a microfiber towel and wipe across dashboards, consoles and door trims. The anti-static formula repels dust, blocks UV rays that cause fading and cracking, and leaves a clean factory-satin look with a light new-car scent.',
    stock: 3,
  },
  {
    id: 6,
    name: 'Fabric & Upholstery Foam Cleaner',
    category: 'Interior',
    price: 499,
    image: '/images/fabric-upholstery-cleaner.svg',
    shortDescription: 'Lifts coffee, food and mud stains from seats and carpets.',
    description:
      'An active-foam aerosol that penetrates fabric seats, carpets and floor mats to lift coffee, soda, food and mud stains. Agitate with a brush, wipe away the foam, and let it dry — no rinsing needed. Neutralizes odors instead of masking them.',
    stock: 18,
  },
  {
    id: 7,
    name: 'Iron Fallout Wheel Cleaner',
    category: 'Wheels & Tires',
    price: 579,
    image: '/images/iron-fallout-wheel-cleaner.svg',
    shortDescription: 'Color-changing formula that dissolves brake dust safely.',
    description:
      'Spray on dry wheels and watch it turn purple as it reacts with embedded iron particles and brake dust. Acid-free and safe on alloy, chrome, painted and powder-coated wheels. Rinse after 3–5 minutes for spotless rims without harsh scrubbing.',
    stock: 10,
  },
  {
    id: 8,
    name: 'Tire Shine Gel (High Gloss)',
    category: 'Wheels & Tires',
    price: 349,
    image: '/images/tire-shine-gel.svg',
    shortDescription: 'Long-lasting gel dressing that will not sling onto your paint.',
    description:
      'A thick, water-resistant gel that gives tires a rich, dark wet-look shine. The no-sling formula stays on the sidewall instead of your paint, and one coat lasts through several washes. Apply with a foam applicator for even coverage.',
    stock: 20,
  },
  {
    id: 9,
    name: 'Wheel Detailing Brush Set (3pcs)',
    category: 'Wheels & Tires',
    price: 799,
    image: '/images/wheel-brush-set.svg',
    shortDescription: 'Soft boar-hair brushes for lug nuts, spokes and barrels.',
    description:
      'Three soft, natural boar-hair brushes in small, medium and large sizes for lug nuts, spokes, emblems and inner barrels. Chemical-resistant handles with metal-free ferrules so they will never scratch your wheels.',
    stock: 8,
  },
  {
    id: 10,
    name: 'Plush Microfiber Towels (6-pack)',
    category: 'Tools & Accessories',
    price: 599,
    image: '/images/microfiber-towels.svg',
    shortDescription: '400 GSM edgeless towels for buffing, drying and detailing.',
    description:
      'Six ultra-soft 400 GSM edgeless microfiber towels (40 × 40 cm) that are safe for buffing wax, removing coatings and quick-detailing. Color-coded so you never mix up paint, glass and interior towels. Machine washable and reusable hundreds of times.',
    stock: 30,
  },
  {
    id: 11,
    name: 'Dual-Action Polisher Kit',
    category: 'Tools & Accessories',
    price: 6499,
    image: '/images/dual-action-polisher.svg',
    shortDescription: 'Beginner-friendly DA polisher with 3 pads and carry bag.',
    description:
      'A 15 mm throw dual-action polisher with 6 speed settings, soft-start trigger and an ergonomic rubber grip. Removes swirl marks and light scratches safely, even for beginners. Kit includes cutting, polishing and finishing foam pads plus a padded carry bag.',
    stock: 5,
  },
  {
    id: 12,
    name: 'Foam Cannon (Pressure Washer)',
    category: 'Tools & Accessories',
    price: 1499,
    image: '/images/foam-cannon.svg',
    shortDescription: 'Brass foam cannon with adjustable spray and 1L bottle.',
    description:
      'Turns any pressure washer into a snow-foam machine. Solid brass body, adjustable fan nozzle and foam-thickness dial, plus a wide-mouth 1 L bottle for easy filling. Comes with a 1/4" quick-connect plug that fits most pressure washers.',
    stock: 9,
  },
]

export default products
