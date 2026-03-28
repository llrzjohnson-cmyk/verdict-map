import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import type { BlogPost } from "@/data/sample-data";
import { getAuthorById, getCategoryById } from "@/data/sample-data";

interface BlogPostCardProps {
  post: BlogPost;
  variant?: "default" | "horizontal";
}

export function BlogPostCard({ post, variant = "default" }: BlogPostCardProps) {
  const author = getAuthorById(post.author_id);
  const category = getCategoryById(post.category_id);

  if (variant === "horizontal") {
    return (
      <article className="group flex gap-5 rounded-lg border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <Link to={`/blog/${post.slug}`} className="shrink-0 w-48">
          <div className="h-full overflow-hidden bg-muted">
            <img
              src={post.featured_image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-center py-4 pr-5 space-y-2">
          {category && (
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              {category.name}
            </span>
          )}
          <h3 className="font-serif text-lg font-bold text-card-foreground leading-tight">
            <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {author && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {author.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.reading_time} min read
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-lg border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={post.featured_image}
            alt={post.title}
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
          <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
          {author && (
            <div className="flex items-center gap-2">
              <img src={author.avatar} alt={author.name} className="h-6 w-6 rounded-full object-cover" />
              <span>{author.name}</span>
            </div>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {post.reading_time} min
          </span>
        </div>
      </div>
    </article>
  );
}
