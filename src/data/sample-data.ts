export type Product = {
  id: string;
  name: string;
  brand: string;
  category_id: string;
  slug: string;
  description: string;
  images: string[];
  specs: Record<string, string>;
  affiliate_url: string;
  price: number;
  created_at: string;
};

export type Review = {
  id: string;
  product_id: string;
  slug: string;
  title: string;
  summary: string;
  verdict: string;
  overall_score: number;
  scores: { label: string; value: number }[];
  pros: string[];
  cons: string[];
  who_its_for: string;
  who_its_not_for: string;
  content_html: string;
  faqs: { question: string; answer: string }[];
  status: "draft" | "published";
  author_id: string;
  published_at: string;
  last_updated_at: string;
  seo_title: string;
  seo_description: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  featured_image: string;
  author_id: string;
  category_id: string;
  tags: string[];
  status: "draft" | "published";
  published_at: string;
  seo_title: string;
  seo_description: string;
  reading_time: number;
};

export type Comparison = {
  id: string;
  slug: string;
  title: string;
  product_ids: string[];
  winner_id: string;
  summary: string;
  status: "draft" | "published";
  published_at: string;
  seo_title: string;
  seo_description: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  parent_id: string | null;
  product_count: number;
};

export type Author = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
};

// Authors
export const authors: Author[] = [
  {
    id: "author-1",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    bio: "Senior tech editor with 12 years of experience covering consumer electronics. Previously at CNET and The Verge.",
    role: "Senior Editor",
  },
  {
    id: "author-2",
    name: "Marcus Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "Home & Kitchen specialist. Professional chef turned product reviewer with a passion for functional design.",
    role: "Home Editor",
  },
];

// Categories
export const categories: Category[] = [
  { id: "cat-1", name: "Technology", slug: "technology", icon: "Monitor", parent_id: null, product_count: 12 },
  { id: "cat-2", name: "Home & Kitchen", slug: "home-kitchen", icon: "Home", parent_id: null, product_count: 8 },
  { id: "cat-3", name: "Headphones", slug: "headphones", icon: "Headphones", parent_id: "cat-1", product_count: 5 },
  { id: "cat-4", name: "Coffee Makers", slug: "coffee-makers", icon: "Coffee", parent_id: "cat-2", product_count: 4 },
];

// Products
export const products: Product[] = [
  {
    id: "prod-1",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category_id: "cat-3",
    slug: "sony-wh-1000xm5",
    description: "Industry-leading noise canceling headphones with exceptional sound quality and all-day comfort.",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
    ],
    specs: {
      "Driver Size": "30mm",
      "Battery Life": "30 hours",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.2, 3.5mm",
      "Noise Canceling": "Yes, Adaptive",
      "Codec Support": "LDAC, AAC, SBC",
      "Charging": "USB-C, 3 min = 3 hours",
      "Foldable": "No (flat fold)",
    },
    affiliate_url: "#",
    price: 399.99,
    created_at: "2024-01-15",
  },
  {
    id: "prod-2",
    name: "Apple AirPods Max",
    brand: "Apple",
    category_id: "cat-3",
    slug: "apple-airpods-max",
    description: "Premium over-ear headphones with computational audio, active noise cancellation, and spatial audio.",
    images: [
      "https://images.unsplash.com/photo-1625245488600-f03fef636a3c?w=600&h=400&fit=crop",
    ],
    specs: {
      "Driver Size": "40mm",
      "Battery Life": "20 hours",
      "Weight": "384.8g",
      "Connectivity": "Bluetooth 5.0",
      "Noise Canceling": "Yes, Active",
      "Codec Support": "AAC",
      "Charging": "Lightning",
      "Foldable": "No",
    },
    affiliate_url: "#",
    price: 549.00,
    created_at: "2024-02-01",
  },
  {
    id: "prod-3",
    name: "Breville Barista Express",
    brand: "Breville",
    category_id: "cat-4",
    slug: "breville-barista-express",
    description: "Bean-to-cup espresso machine with integrated conical burr grinder for café-quality coffee at home.",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    ],
    specs: {
      "Type": "Semi-Automatic Espresso",
      "Grinder": "Integrated Conical Burr",
      "Pressure": "15 bar",
      "Water Tank": "67 oz / 2L",
      "Dimensions": "13.25\" x 12.5\" x 15.75\"",
      "Weight": "23 lbs",
      "Material": "Stainless Steel",
      "Warranty": "2 years",
    },
    affiliate_url: "#",
    price: 749.95,
    created_at: "2024-01-20",
  },
  {
    id: "prod-4",
    name: "Fellow Ode Brew Grinder",
    brand: "Fellow",
    category_id: "cat-4",
    slug: "fellow-ode-brew-grinder",
    description: "Professional-grade flat burr coffee grinder designed specifically for brew methods.",
    images: [
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop",
    ],
    specs: {
      "Type": "Electric Burr Grinder",
      "Burr Type": "64mm Flat SSP Burrs",
      "Grind Settings": "31 steps",
      "Hopper Capacity": "80g",
      "Dimensions": "9.5\" x 4.6\" x 8.5\"",
      "Weight": "10.5 lbs",
      "Material": "Aluminum + Stainless Steel",
      "Warranty": "1 year",
    },
    affiliate_url: "#",
    price: 345.00,
    created_at: "2024-03-01",
  },
];

// Reviews
export const reviews: Review[] = [
  {
    id: "rev-1",
    product_id: "prod-1",
    slug: "sony-wh-1000xm5-review",
    title: "Sony WH-1000XM5 Review: The Noise-Canceling King Retains Its Crown",
    summary: "Sony's latest flagship headphones deliver best-in-class noise cancellation, improved comfort, and rich, detailed sound that justifies the premium price.",
    verdict: "The Sony WH-1000XM5 remains our top pick for premium noise-canceling headphones. The refined design, exceptional ANC, and versatile sound profile make it the headphone to beat in 2024.",
    overall_score: 9.2,
    scores: [
      { label: "Sound Quality", value: 9.5 },
      { label: "Noise Canceling", value: 9.8 },
      { label: "Comfort", value: 9.0 },
      { label: "Battery Life", value: 9.0 },
      { label: "Value", value: 8.5 },
    ],
    pros: [
      "Best-in-class adaptive noise cancellation",
      "30-hour battery life with quick charge",
      "Lightweight and supremely comfortable",
      "Multipoint Bluetooth connection",
      "LDAC high-res audio support",
    ],
    cons: [
      "No longer folds flat for storage",
      "Touch controls can be accidentally triggered",
      "Price increase over predecessor",
    ],
    who_its_for: "Frequent travelers, remote workers, and audiophiles who want the best noise canceling without compromising sound quality.",
    who_its_not_for: "Budget-conscious shoppers or those who prefer a more bass-heavy sound signature.",
    content_html: `<p>After months of daily use, the Sony WH-1000XM5 has proven itself as the definitive noise-canceling headphone for 2024. Sony took everything great about the XM4 and refined it into a sleeker, lighter, more capable package.</p>
    <h2>Design & Comfort</h2>
    <p>The XM5 represents a significant design departure from its predecessor. Gone is the folding mechanism, replaced by a cleaner, more minimalist aesthetic. The headband now features a single piece of soft leather-like material that distributes weight evenly. At just 250g, these are noticeably lighter than the competition.</p>
    <h2>Sound Quality</h2>
    <p>Sony has upgraded to a new 30mm driver unit that delivers remarkably detailed and balanced sound. The midrange is particularly impressive — vocals come through with stunning clarity. Bass is present and punchy without overwhelming, and the highs extend naturally without sibilance.</p>
    <h2>Noise Cancellation</h2>
    <p>This is where the XM5 truly excels. The new Auto NC Optimizer uses eight microphones to analyze your environment and adjust cancellation in real-time. On a packed airplane, these headphones turn the roar of engines into a gentle whisper. In a busy café, conversations fade to nothing.</p>`,
    faqs: [
      { question: "Are the Sony WH-1000XM5 worth the upgrade from XM4?", answer: "If noise cancellation and comfort are priorities, yes. The XM5 offers noticeably better ANC and is lighter. However, if you're happy with your XM4s, the improvement is evolutionary rather than revolutionary." },
      { question: "Do they work with spatial audio?", answer: "Yes, they support 360 Reality Audio and work with services like Tidal and Amazon Music for immersive listening." },
      { question: "Can you use them while charging?", answer: "Yes, you can listen via USB-C or the included 3.5mm cable while the headphones charge." },
    ],
    status: "published",
    author_id: "author-1",
    published_at: "2024-06-15",
    last_updated_at: "2024-11-20",
    seo_title: "Sony WH-1000XM5 Review 2024 — Best Noise-Canceling Headphones",
    seo_description: "In-depth review of the Sony WH-1000XM5. We test sound quality, noise cancellation, comfort, and battery life after months of daily use.",
  },
  {
    id: "rev-2",
    product_id: "prod-2",
    slug: "apple-airpods-max-review",
    title: "Apple AirPods Max Review: Luxury Sound at a Luxury Price",
    summary: "Apple's over-ear headphones offer outstanding build quality and a unique listening experience, but the high price and some quirks hold them back.",
    verdict: "The AirPods Max are Apple's statement piece in the headphone market. If you're deep in the Apple ecosystem and value build quality above all else, these are remarkable. But for most people, there are better values available.",
    overall_score: 8.4,
    scores: [
      { label: "Sound Quality", value: 9.0 },
      { label: "Noise Canceling", value: 8.8 },
      { label: "Comfort", value: 8.0 },
      { label: "Battery Life", value: 7.5 },
      { label: "Value", value: 7.0 },
    ],
    pros: [
      "Exceptional build quality with premium materials",
      "Computational audio with spatial audio support",
      "Seamless Apple ecosystem integration",
      "Industry-leading transparency mode",
    ],
    cons: [
      "Very expensive at $549",
      "Heavy at 384.8g",
      "Lightning charging (no USB-C)",
      "Smart Case doesn't fully protect headphones",
      "No high-res codec support",
    ],
    who_its_for: "Apple ecosystem enthusiasts who want premium materials and seamless device switching, and who value spatial audio for movies and music.",
    who_its_not_for: "Anyone looking for value for money, Android users, or those who prioritize portability.",
    content_html: `<p>Apple's AirPods Max arrived as the most expensive mainstream headphones on the market, and two years later, they still command attention with their distinctive design and premium build quality.</p>
    <h2>Design & Build</h2>
    <p>There's nothing else like the AirPods Max on the market. The anodized aluminum ear cups, stainless steel headband, and mesh canopy create a headphone that feels like jewelry. Every material choice screams premium.</p>
    <h2>Sound Quality</h2>
    <p>Apple's custom 40mm driver paired with their H1 chip delivers a surprisingly neutral and detailed sound. Computational audio processing means the headphones adapt dynamically to the content you're listening to.</p>`,
    faqs: [
      { question: "Do AirPods Max work with Android?", answer: "Yes, via standard Bluetooth, but you lose features like spatial audio, seamless switching, and the full settings interface." },
      { question: "Is there a USB-C version?", answer: "Apple released a USB-C version in late 2024 with the same audio performance." },
    ],
    status: "published",
    author_id: "author-1",
    published_at: "2024-07-01",
    last_updated_at: "2024-12-01",
    seo_title: "Apple AirPods Max Review 2024 — Worth the Premium?",
    seo_description: "Detailed review of the Apple AirPods Max. Sound quality, comfort, ANC, and whether these luxury headphones justify their $549 price tag.",
  },
  {
    id: "rev-3",
    product_id: "prod-3",
    slug: "breville-barista-express-review",
    title: "Breville Barista Express Review: Your Gateway to Café-Quality Espresso",
    summary: "The Breville Barista Express remains the best espresso machine for beginners who want to learn the craft without breaking the bank.",
    verdict: "For aspiring home baristas, the Breville Barista Express is the perfect starting point. It teaches you the fundamentals of espresso-making while producing excellent shots right out of the box.",
    overall_score: 8.8,
    scores: [
      { label: "Espresso Quality", value: 9.0 },
      { label: "Ease of Use", value: 8.5 },
      { label: "Build Quality", value: 9.0 },
      { label: "Grinder Quality", value: 8.5 },
      { label: "Value", value: 9.0 },
    ],
    pros: [
      "Integrated burr grinder saves counter space",
      "Excellent espresso quality for the price",
      "Solid stainless steel construction",
      "Great entry point for learning espresso",
      "Precise temperature control",
    ],
    cons: [
      "Steep learning curve for beginners",
      "Steam wand requires practice to master",
      "Grinder retention can be messy",
      "Water tank is rear-mounted (hard to access)",
    ],
    who_its_for: "Home barista beginners who want an all-in-one machine to learn espresso making, and anyone looking for café-quality coffee without café prices.",
    who_its_not_for: "Those who want simple push-button convenience, or experienced baristas who need a commercial-grade setup.",
    content_html: `<p>The Breville Barista Express has been a staple recommendation in the home espresso community for years, and for good reason. It packs a capable grinder and espresso machine into a single countertop-friendly package.</p>
    <h2>Build & Design</h2>
    <p>The brushed stainless steel construction gives the Barista Express a professional look that holds up over years of daily use. Controls are intuitive — a simple dial for grind size, buttons for single and double shots, and a manual steam wand for milk texturing.</p>
    <h2>Espresso Quality</h2>
    <p>With the right beans and a bit of practice dialing in, the Barista Express pulls shots that rival many café offerings. The 15-bar Italian pump delivers consistent pressure, and the PID temperature control keeps things stable shot after shot.</p>`,
    faqs: [
      { question: "How long does it take to learn?", answer: "Most users can pull decent shots within a week. Truly dialing in and mastering milk texturing takes 2-4 weeks of regular practice." },
      { question: "What grind setting should I start with?", answer: "Start at grind setting 5 with the internal adjustment at the factory default. Adjust finer if your shots run too fast." },
    ],
    status: "published",
    author_id: "author-2",
    published_at: "2024-05-10",
    last_updated_at: "2024-10-15",
    seo_title: "Breville Barista Express Review 2024 — Best Beginner Espresso Machine",
    seo_description: "Complete review of the Breville Barista Express. We test espresso quality, grinder performance, and ease of use for home baristas.",
  },
];

// Comparisons
export const comparisons: Comparison[] = [
  {
    id: "comp-1",
    slug: "sony-xm5-vs-airpods-max",
    title: "Sony WH-1000XM5 vs Apple AirPods Max: Which Premium Headphone Wins?",
    product_ids: ["prod-1", "prod-2"],
    winner_id: "prod-1",
    summary: "Both headphones deliver excellent audio, but the Sony XM5 offers better noise cancellation, lighter weight, and significantly better value. The AirPods Max wins on build quality and Apple ecosystem integration.",
    status: "published",
    published_at: "2024-08-01",
    seo_title: "Sony XM5 vs AirPods Max — Best Premium Headphones Compared",
    seo_description: "Head-to-head comparison of the Sony WH-1000XM5 and Apple AirPods Max. We compare sound, ANC, comfort, value, and features.",
  },
  {
    id: "comp-2",
    slug: "breville-vs-fellow-ode",
    title: "Breville Barista Express vs Fellow Ode: Different Approaches to Great Coffee",
    product_ids: ["prod-3", "prod-4"],
    winner_id: "prod-3",
    summary: "These serve different purposes: the Breville is a complete espresso solution while the Fellow Ode is a dedicated brew grinder. For espresso, Breville wins. For pour-over and filter coffee, the Fellow Ode is unbeatable.",
    status: "published",
    published_at: "2024-09-15",
    seo_title: "Breville Barista Express vs Fellow Ode — Coffee Gear Compared",
    seo_description: "Comparing the Breville Barista Express espresso machine with the Fellow Ode brew grinder. Which is the better investment for coffee lovers?",
  },
];

// Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "best-noise-canceling-headphones-2024",
    title: "The 5 Best Noise-Canceling Headphones in 2024",
    excerpt: "We've tested every major noise-canceling headphone on the market. Here are the ones worth your money, from budget picks to premium performers.",
    content_html: `<p>After testing over 30 pairs of noise-canceling headphones this year, we've narrowed down the field to five standout performers that cover every budget and use case.</p>
    <h2>Our Testing Process</h2>
    <p>Each pair of headphones was tested over a minimum of two weeks of daily use. We evaluate sound quality across multiple genres, noise cancellation in real-world environments (airplanes, offices, city streets), comfort during extended sessions, and overall value for money.</p>
    <h2>1. Sony WH-1000XM5 — Best Overall</h2>
    <p>The Sony WH-1000XM5 tops our list for the third year running. Its combination of adaptive noise cancellation, detailed sound, and all-day comfort makes it the benchmark against which all others are measured.</p>
    <h2>2. Apple AirPods Max — Best for Apple Users</h2>
    <p>If you're deep in the Apple ecosystem, the AirPods Max offers seamless integration, stunning build quality, and excellent spatial audio that makes movies and music more immersive.</p>
    <h2>3. Bose QuietComfort Ultra — Best for Comfort</h2>
    <p>Bose has refined their comfort game with the QC Ultra. These are the headphones you reach for on a 14-hour flight without a second thought about fatigue.</p>`,
    featured_image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=450&fit=crop",
    author_id: "author-1",
    category_id: "cat-3",
    tags: ["headphones", "noise-canceling", "buyers-guide", "2024"],
    status: "published",
    published_at: "2024-11-01",
    seo_title: "5 Best Noise-Canceling Headphones 2024 — Tested & Ranked",
    seo_description: "Expert-tested picks for the best noise-canceling headphones in 2024. From Sony to Bose, find the perfect pair for your needs and budget.",
    reading_time: 8,
  },
  {
    id: "blog-2",
    slug: "home-espresso-beginners-guide",
    title: "The Complete Beginner's Guide to Home Espresso",
    excerpt: "Everything you need to know about getting started with espresso at home — from choosing your first machine to pulling the perfect shot.",
    content_html: `<p>Making espresso at home might seem intimidating, but with the right equipment and a bit of knowledge, you can be pulling café-quality shots in no time.</p>
    <h2>Understanding Espresso</h2>
    <p>At its core, espresso is simply coffee brewed under pressure. Hot water is forced through finely ground coffee at approximately 9 bars of pressure, extracting a concentrated, flavorful shot in about 25-30 seconds.</p>
    <h2>Choosing Your First Machine</h2>
    <p>For beginners, we recommend starting with a machine that gives you control without overwhelming you. The Breville Barista Express is our top pick because it includes an integrated grinder and offers manual control over key variables.</p>
    <h2>The Grinder Matters More Than You Think</h2>
    <p>If there's one thing experienced baristas agree on, it's that the grinder is more important than the espresso machine. A consistent, adjustable grinder is the foundation of great espresso.</p>`,
    featured_image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop",
    author_id: "author-2",
    category_id: "cat-4",
    tags: ["coffee", "espresso", "beginners-guide", "how-to"],
    status: "published",
    published_at: "2024-10-15",
    seo_title: "Home Espresso Guide for Beginners — Start Making Great Coffee",
    seo_description: "Learn how to make espresso at home. Complete guide covering machines, grinders, technique, and common mistakes for beginners.",
    reading_time: 12,
  },
  {
    id: "blog-3",
    slug: "how-we-test-products",
    title: "How We Test: Our Editorial Process Explained",
    excerpt: "Transparency is core to our mission. Here's exactly how we research, test, and review every product that appears on our site.",
    content_html: `<p>We believe trust is earned through transparency. This article explains our complete editorial process — from selecting products to test to publishing our final reviews.</p>
    <h2>Independence First</h2>
    <p>Every review on our site is independently researched and written. We purchase products ourselves or request review units with no strings attached. Manufacturers never see our reviews before publication, and they have no editorial influence.</p>
    <h2>Testing Methodology</h2>
    <p>Each product is tested for a minimum of two weeks in real-world conditions. We use standardized testing protocols specific to each product category, combined with subjective evaluations of daily usability.</p>`,
    featured_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop",
    author_id: "author-1",
    category_id: "cat-1",
    tags: ["editorial", "transparency", "methodology"],
    status: "published",
    published_at: "2024-09-01",
    seo_title: "How We Test Products — Our Editorial Process",
    seo_description: "Learn about our independent testing methodology and editorial process. How we research, test, and review products with complete transparency.",
    reading_time: 6,
  },
  {
    id: "blog-4",
    slug: "coffee-grind-size-guide",
    title: "Coffee Grind Size Guide: From Espresso to Cold Brew",
    excerpt: "Grind size is the most important variable in coffee brewing. This visual guide shows you exactly how fine or coarse to grind for every brewing method.",
    content_html: `<p>The difference between a great cup of coffee and a mediocre one often comes down to one thing: grind size. Too fine and you get bitter over-extraction. Too coarse and the result is a weak, sour cup.</p>
    <h2>Why Grind Size Matters</h2>
    <p>Water extracts flavors from coffee at different rates depending on the surface area exposed. Finer grinds expose more surface area, leading to faster extraction. Each brewing method requires a different extraction rate, which means a different grind size.</p>
    <h2>The Grind Size Spectrum</h2>
    <p>Think of grind size on a spectrum from powder-fine (Turkish coffee) to very coarse (cold brew). Here's where each brewing method falls.</p>`,
    featured_image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=450&fit=crop",
    author_id: "author-2",
    category_id: "cat-4",
    tags: ["coffee", "grind-size", "brewing", "guide"],
    status: "published",
    published_at: "2024-08-20",
    seo_title: "Coffee Grind Size Guide — Perfect Grind for Every Brew Method",
    seo_description: "Visual guide to coffee grind sizes. Learn the right grind for espresso, pour-over, French press, AeroPress, and cold brew.",
    reading_time: 7,
  },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug);
}

export function getReviewByProductId(productId: string): Review | undefined {
  return reviews.find((r) => r.product_id === productId);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category_id === categoryId);
}

export function getReviewsForCategory(categoryId: string): Review[] {
  const categoryProducts = getProductsByCategory(categoryId);
  return reviews.filter((r) => categoryProducts.some((p) => p.id === r.product_id));
}
