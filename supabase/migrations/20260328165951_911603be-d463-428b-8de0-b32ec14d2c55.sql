
-- Categories
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  icon text NOT NULL DEFAULT '',
  parent_id uuid REFERENCES public.categories(id),
  product_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are publicly readable" ON public.categories FOR SELECT USING (true);

-- Authors
CREATE TABLE public.authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authors are publicly readable" ON public.authors FOR SELECT USING (true);

-- Products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL DEFAULT '',
  category_id uuid REFERENCES public.categories(id),
  slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  images text[] NOT NULL DEFAULT '{}',
  specs jsonb NOT NULL DEFAULT '{}',
  affiliate_url text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (true);

-- Reviews
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  verdict text NOT NULL DEFAULT '',
  overall_score numeric(3,1) NOT NULL DEFAULT 0,
  scores jsonb NOT NULL DEFAULT '[]',
  pros text[] NOT NULL DEFAULT '{}',
  cons text[] NOT NULL DEFAULT '{}',
  who_its_for text NOT NULL DEFAULT '',
  who_its_not_for text NOT NULL DEFAULT '',
  content_html text NOT NULL DEFAULT '',
  faqs jsonb NOT NULL DEFAULT '[]',
  status text NOT NULL DEFAULT 'draft',
  author_id uuid REFERENCES public.authors(id),
  published_at timestamptz,
  last_updated_at timestamptz NOT NULL DEFAULT now(),
  seo_title text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published reviews are publicly readable" ON public.reviews FOR SELECT USING (status = 'published');

-- Blog posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content_html text NOT NULL DEFAULT '',
  featured_image text NOT NULL DEFAULT '',
  author_id uuid REFERENCES public.authors(id),
  category_id uuid REFERENCES public.categories(id),
  tags text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  seo_title text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  reading_time integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published blog posts are publicly readable" ON public.blog_posts FOR SELECT USING (status = 'published');

-- Comparisons
CREATE TABLE public.comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  product_ids uuid[] NOT NULL DEFAULT '{}',
  winner_id uuid REFERENCES public.products(id),
  summary text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  seo_title text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.comparisons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published comparisons are publicly readable" ON public.comparisons FOR SELECT USING (status = 'published');

-- Affiliate clicks tracking
CREATE TABLE public.affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  referrer text,
  user_agent text,
  clicked_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert affiliate clicks" ON public.affiliate_clicks FOR INSERT WITH CHECK (true);
