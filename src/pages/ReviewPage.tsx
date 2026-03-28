import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, XCircle, UserCheck, UserX, ChevronDown, ChevronUp } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RatingStars } from "@/components/RatingStars";
import { ReviewScoreBar } from "@/components/ReviewScoreBar";
import { AffiliateButton } from "@/components/AffiliateButton";
import { SocialShare } from "@/components/SocialShare";
import { ProductCard } from "@/components/ProductCard";
import { getReviewBySlug, getProductById, getAuthorById, getCategoryById, reviews, products, getReviewByProductId } from "@/data/sample-data";
import { useState } from "react";

import { fadeUp } from "@/lib/animations";

export default function ReviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const review = getReviewBySlug(slug || "");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!review) {
    return (
      <div className="editorial-container py-20 text-center">
        <h1 className="font-serif text-3xl font-bold">Review Not Found</h1>
        <p className="text-muted-foreground mt-2">
          <Link to="/reviews" className="text-primary hover:underline">Browse all reviews</Link>
        </p>
      </div>
    );
  }

  const product = getProductById(review.product_id)!;
  const author = getAuthorById(review.author_id);
  const category = getCategoryById(product.category_id);

  const relatedReviews = reviews
    .filter((r) => r.id !== review.id && r.status === "published")
    .slice(0, 3);

  return (
    <main>
      <article>
        {/* Hero */}
        <section className="border-b border-border" style={{ background: "linear-gradient(180deg, hsl(var(--hero-gradient-from)), hsl(var(--hero-gradient-to)))" }}>
          <div className="editorial-container py-8 md:py-12">
            <Breadcrumbs items={[
              { label: "Reviews", href: "/reviews" },
              ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
              { label: product.name },
            ]} />

            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid lg:grid-cols-2 gap-10 items-start">
              <motion.div variants={fadeUp} className="space-y-5">
                {category && (
                  <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary">
                    {category.name}
                  </span>
                )}
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {review.title}
                </h1>
                <p className="text-lg text-muted-foreground">{review.summary}</p>

                <div className="flex items-center gap-6">
                  <RatingStars rating={review.overall_score} size="lg" />
                  <span className="text-3xl font-serif font-bold text-foreground">{review.overall_score}/10</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {author && (
                    <div className="flex items-center gap-2">
                      <img src={author.avatar} alt={author.name} className="h-8 w-8 rounded-full object-cover" />
                      <span className="font-medium text-foreground">{author.name}</span>
                    </div>
                  )}
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    Updated {new Date(review.last_updated_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <AffiliateButton url={product.affiliate_url} price={product.price} />
                  <SocialShare title={review.title} />
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-border">
                  <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="editorial-container py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Verdict Box */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="verdict-box space-y-5">
                <h2 className="font-serif text-2xl font-bold text-foreground">Our Verdict</h2>
                <p className="text-foreground/85 leading-relaxed">{review.verdict}</p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600" /> Pros
                    </h3>
                    <ul className="space-y-2">
                      {review.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="text-green-600 mt-0.5">+</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                      <XCircle className="h-4 w-4 text-red-500" /> Cons
                    </h3>
                    <ul className="space-y-2">
                      {review.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="text-red-500 mt-0.5">−</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div className="flex items-start gap-2">
                    <UserCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Best For</div>
                      <p className="text-sm text-muted-foreground">{review.who_its_for}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <UserX className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Skip If</div>
                      <p className="text-sm text-muted-foreground">{review.who_its_not_for}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Score Breakdown */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Score Breakdown</h2>
                <div className="space-y-4">
                  {review.scores.map((score) => (
                    <ReviewScoreBar key={score.label} label={score.label} value={score.value} />
                  ))}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="editorial-prose" dangerouslySetInnerHTML={{ __html: review.content_html }} />
              </motion.div>

              {/* FAQ */}
              {review.faqs.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    {review.faqs.map((faq, i) => (
                      <div key={i} className="rounded-lg border border-border overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                        >
                          {faq.question}
                          {openFaq === i ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                        </button>
                        {openFaq === i && (
                          <div className="px-4 pb-4 text-sm text-muted-foreground">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Specs */}
              <div className="sticky top-20 space-y-8">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-serif text-lg font-bold mb-4">Specifications</h3>
                  <dl className="space-y-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">{key}</dt>
                        <dd className="font-medium text-foreground text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6">
                    <AffiliateButton url={product.affiliate_url} price={product.price} fullWidth />
                  </div>
                </div>

                {/* Affiliate disclosure */}
                <div className="rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
                  <strong className="text-foreground">Affiliate Disclosure:</strong> We may earn a commission through links on this page, at no extra cost to you. This helps fund our independent testing and editorial work.{" "}
                  <Link to="/affiliate-disclosure" className="text-primary hover:underline">Learn more</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related Reviews */}
      {relatedReviews.length > 0 && (
        <section className="border-t border-border bg-muted/30">
          <div className="editorial-container py-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">More Reviews</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedReviews.map((r) => {
                const p = getProductById(r.product_id);
                return p ? <ProductCard key={r.id} product={p} review={r} /> : null;
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
