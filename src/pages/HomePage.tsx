import { Link } from "react-router-dom";
import { ArrowRight, Star, TrendingUp, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { BlogPostCard } from "@/components/BlogPostCard";
import { RatingStars } from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { products, reviews, blogPosts, comparisons, getProductById, getReviewByProductId } from "@/data/sample-data";
import { useState } from "react";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  const [email, setEmail] = useState("");
  const featuredReview = reviews[0];
  const featuredProduct = getProductById(featuredReview.product_id)!;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(var(--hero-gradient-from)), hsl(var(--hero-gradient-to)))" }}>
        <div className="editorial-container py-16 md:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeUp} className="space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Star className="h-3 w-3 fill-primary" /> Editor's Pick
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] text-balance">
                {featuredReview.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {featuredReview.summary}
              </p>
              <div className="flex items-center gap-4">
                <RatingStars rating={featuredReview.overall_score} size="lg" />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                  <Link to={`/reviews/${featuredReview.slug}`}>
                    Read Full Review <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-border">
                  <Link to="/reviews">Browse All Reviews</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border">
                <img
                  src={featuredProduct.images[0]}
                  alt={featuredProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-card border border-border shadow-lg p-4 hidden md:block">
                <div className="text-2xl font-bold font-serif text-foreground">{featuredReview.overall_score}/10</div>
                <div className="text-xs text-muted-foreground">Overall Score</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="editorial-container py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">Latest Reviews</h2>
              <p className="text-muted-foreground mt-1">In-depth, expert analysis of the products that matter</p>
            </div>
            <Link to="/reviews" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => {
              const review = getReviewByProductId(product.id);
              return (
                <motion.div key={product.id} variants={fadeUp}>
                  <ProductCard product={product} review={review} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Comparisons */}
      <section className="bg-muted/50">
        <div className="editorial-container py-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-7 w-7 text-primary" /> Top Comparisons
                </h2>
                <p className="text-muted-foreground mt-1">Head-to-head matchups to help you decide</p>
              </div>
              <Link to="/compare" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Compare products <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {comparisons.map((comp) => {
                const prods = comp.product_ids.map(getProductById).filter(Boolean) as typeof products;
                const winner = getProductById(comp.winner_id);
                return (
                  <motion.div key={comp.id} variants={fadeUp}>
                    <Link
                      to={`/compare/${comp.slug}`}
                      className="group block rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        {prods.map((p, i) => (
                          <div key={p.id} className="flex items-center gap-2">
                            <div className="h-12 w-12 rounded-lg overflow-hidden border border-border">
                              <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{p.name}</span>
                            {i < prods.length - 1 && <span className="text-muted-foreground font-bold mx-2">vs</span>}
                          </div>
                        ))}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-card-foreground group-hover:text-primary transition-colors mb-2">
                        {comp.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{comp.summary}</p>
                      {winner && (
                        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                          <Star className="h-3.5 w-3.5 fill-primary" /> Winner: {winner.name}
                        </div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="editorial-container py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="h-7 w-7 text-primary" /> From the Blog
              </h2>
              <p className="text-muted-foreground mt-1">Buying guides, how-tos, and industry insights</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Read all posts <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <motion.div key={post.id} variants={fadeUp}>
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary/5 border-y border-border">
        <div className="editorial-container py-16 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl font-bold text-foreground">Never Miss a Review</h2>
            <p className="text-muted-foreground">Join thousands of readers who get our best picks and buying advice delivered to their inbox every week.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) {
                  toast.success("You're subscribed! Check your email for confirmation.");
                  setEmail("");
                }
              }}
              className="flex gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" className="bg-primary text-primary-foreground px-6">Subscribe</Button>
            </form>
            <p className="text-xs text-muted-foreground">
              We respect your privacy. <Link to="/privacy-policy" className="text-primary hover:underline">Read our policy</Link>.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
