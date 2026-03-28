import { Link } from "react-router-dom";
import { RatingStars } from "./RatingStars";
import { AffiliateButton } from "./AffiliateButton";
import type { Product, Review } from "@/data/sample-data";
import { getCategoryById } from "@/data/sample-data";

interface ProductCardProps {
  product: Product;
  review?: Review;
}

export function ProductCard({ product, review }: ProductCardProps) {
  const category = getCategoryById(product.category_id);

  return (
    <article className="group rounded-lg border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <Link to={review ? `/reviews/${review.slug}` : "#"} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-5 space-y-3">
        {category && (
          <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary">
            {category.name}
          </span>
        )}
        <h3 className="font-serif text-lg font-bold text-card-foreground leading-tight">
          <Link to={review ? `/reviews/${review.slug}` : "#"} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>
        {review && (
          <>
            <RatingStars rating={review.overall_score} size="sm" />
            <p className="text-sm text-muted-foreground line-clamp-2">{review.summary}</p>
          </>
        )}
        <div className="flex items-center gap-3 pt-2">
          <Link
            to={review ? `/reviews/${review.slug}` : "#"}
            className="text-sm font-medium text-primary hover:underline"
          >
            Read Review
          </Link>
          <AffiliateButton url={product.affiliate_url} price={product.price} size="sm" />
        </div>
      </div>
    </article>
  );
}
