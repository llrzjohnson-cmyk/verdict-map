import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReviewScoreBar } from "@/components/ReviewScoreBar";
import { RatingStars } from "@/components/RatingStars";
import { AffiliateButton } from "@/components/AffiliateButton";
import { SocialShare } from "@/components/SocialShare";
import { getComparisonBySlug, getProductById, getReviewByProductId } from "@/data/sample-data";

import { fadeUp } from "@/lib/animations";

export default function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const comparison = getComparisonBySlug(slug || "");

  if (!comparison) {
    return (
      <div className="editorial-container py-20 text-center">
        <h1 className="font-serif text-3xl font-bold">Comparison Not Found</h1>
        <Link to="/compare" className="text-primary hover:underline mt-2 inline-block">Browse comparisons</Link>
      </div>
    );
  }

  const compProducts = comparison.product_ids.map(getProductById).filter(Boolean)!;
  const compReviews = compProducts.map((p) => p && getReviewByProductId(p.id));
  const winner = getProductById(comparison.winner_id);

  // Collect all spec keys
  const allSpecKeys = Array.from(
    new Set(compProducts.flatMap((p) => (p ? Object.keys(p.specs) : [])))
  );

  // Collect all score labels
  const allScoreLabels = Array.from(
    new Set(compReviews.flatMap((r) => (r ? r.scores.map((s) => s.label) : [])))
  );

  return (
    <main>
      <div className="editorial-container py-8">
        <Breadcrumbs items={[
          { label: "Compare", href: "/compare" },
          { label: comparison.title },
        ]} />

        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{comparison.title}</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">{comparison.summary}</p>
            <div className="mt-4">
              <SocialShare title={comparison.title} />
            </div>
          </motion.div>

          {/* Winner badge */}
          {winner && (
            <motion.div variants={fadeUp} className="rounded-xl border-2 winner-cell p-5 mb-10 flex items-center gap-4">
              <Trophy className="h-8 w-8 text-primary" />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Our Pick</div>
                <div className="font-serif text-xl font-bold text-foreground">{winner.name}</div>
              </div>
            </motion.div>
          )}

          {/* Product cards row */}
          <motion.div variants={fadeUp} className="grid gap-6 mb-12" style={{ gridTemplateColumns: `repeat(${compProducts.length}, 1fr)` }}>
            {compProducts.map((product, i) => {
              if (!product) return null;
              const review = compReviews[i];
              const isWinner = product.id === comparison.winner_id;
              return (
                <div key={product.id} className={`rounded-xl border bg-card p-5 text-center space-y-3 ${isWinner ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
                  {isWinner && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      <Trophy className="h-3 w-3" /> Winner
                    </span>
                  )}
                  <div className="h-32 w-32 mx-auto rounded-lg overflow-hidden">
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="font-serif text-lg font-bold">{product.name}</h3>
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                  {review && <RatingStars rating={review.overall_score} size="sm" />}
                  <div className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</div>
                  <AffiliateButton url={product.affiliate_url} label="Buy Now" size="sm" fullWidth />
                </div>
              );
            })}
          </motion.div>

          {/* Score comparison */}
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Score Comparison</h2>
            <div className="space-y-6">
              {allScoreLabels.map((label) => {
                const scores = compReviews.map((r) => r?.scores.find((s) => s.label === label)?.value || 0);
                const maxScore = Math.max(...scores);
                return (
                  <div key={label}>
                    <div className="text-sm font-medium text-foreground mb-3">{label}</div>
                    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${compProducts.length}, 1fr)` }}>
                      {compProducts.map((product, i) => (
                        <div key={product?.id} className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{product?.name}</span>
                            <span className={scores[i] === maxScore ? "font-bold text-primary" : ""}>{scores[i].toFixed(1)}</span>
                          </div>
                          <ReviewScoreBar label="" value={scores[i]} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Specs table */}
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Specifications</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground sticky left-0 bg-muted/50">Spec</th>
                    {compProducts.map((p) => (
                      <th key={p?.id} className="text-left p-4 font-medium text-foreground">{p?.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allSpecKeys.map((key, i) => {
                    const values = compProducts.map((p) => p?.specs[key] || "—");
                    return (
                      <tr key={key} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                        <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-inherit">{key}</td>
                        {values.map((val, j) => (
                          <td key={j} className="p-4 text-foreground">{val}</td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr className="border-t border-border">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0">Price</td>
                    {compProducts.map((p) => (
                      <td key={p?.id} className="p-4 font-bold text-foreground">${p?.price.toFixed(2)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Pros/Cons per product */}
          <motion.div variants={fadeUp}>
            <h2 className="font-serif text-2xl font-bold mb-6">Pros & Cons</h2>
            <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${compProducts.length}, 1fr)` }}>
              {compProducts.map((product, i) => {
                const review = compReviews[i];
                if (!product || !review) return null;
                return (
                  <div key={product.id} className="rounded-xl border border-border bg-card p-5 space-y-4">
                    <h3 className="font-serif text-lg font-bold">{product.name}</h3>
                    <div>
                      <h4 className="flex items-center gap-1.5 text-sm font-bold text-foreground mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" /> Pros
                      </h4>
                      <ul className="space-y-1.5">
                        {review.pros.map((pro, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start gap-1.5">
                            <span className="text-green-600">+</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-1.5 text-sm font-bold text-foreground mb-2">
                        <XCircle className="h-4 w-4 text-red-500" /> Cons
                      </h4>
                      <ul className="space-y-1.5">
                        {review.cons.map((con, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start gap-1.5">
                            <span className="text-red-500">−</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Affiliate disclosure */}
      <div className="editorial-container py-8 border-t border-border mt-12">
        <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto">
          <strong>Affiliate Disclosure:</strong> We may earn a commission through links on this page. This helps fund our testing.{" "}
          <Link to="/affiliate-disclosure" className="text-primary hover:underline">Learn more</Link>
        </p>
      </div>
    </main>
  );
}
