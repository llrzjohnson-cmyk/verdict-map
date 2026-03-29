import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SocialShare } from "@/components/SocialShare";
import { BlogPostCard } from "@/components/BlogPostCard";
import { useBlogPostBySlug, useAuthorById, useCategoryById, useBlogPosts } from "@/hooks/use-supabase-data";

import { fadeUp } from "@/lib/animations";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPostBySlug(slug || "");
  const { data: author } = useAuthorById(post?.author_id ?? null);
  const { data: category } = useCategoryById(post?.category_id ?? null);
  const { data: blogPosts = [] } = useBlogPosts();

  if (isLoading) {
    return <div className="editorial-container py-20 text-center"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (!post) {
    return (
      <div className="editorial-container py-20 text-center">
        <h1 className="font-serif text-3xl font-bold">Post Not Found</h1>
        <Link to="/blog" className="text-primary hover:underline mt-2 inline-block">Browse all posts</Link>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <main>
      <article>
        {/* Hero */}
        <div className="border-b border-border">
          <div className="editorial-container py-8">
            <Breadcrumbs items={[
              { label: "Blog", href: "/blog" },
              ...(category ? [{ label: category.name }] : []),
            ]} />

            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="max-w-3xl">
              <motion.div variants={fadeUp}>
                {category && (
                  <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary mb-3">
                    {category.name}
                  </span>
                )}
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                  {post.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {author && (
                    <div className="flex items-center gap-2">
                      <img src={author.avatar} alt={author.name} className="h-10 w-10 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-foreground">{author.name}</div>
                        <div className="text-xs">{author.role}</div>
                      </div>
                    </div>
                  )}
                  {post.published_at && (
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {post.reading_time} min read
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Featured image */}
        <div className="editorial-container py-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="aspect-[2/1] md:aspect-[3/1] rounded-2xl overflow-hidden border border-border">
              <img src={post.featured_image} alt={post.title} className="h-full w-full object-cover" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="editorial-container pb-12">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                <div className="editorial-prose max-w-3xl" dangerouslySetInnerHTML={{ __html: post.content_html }} />
              </motion.div>

              {/* Tags */}
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <SocialShare title={post.title} />
              </div>

              {/* Author bio */}
              {author && (
                <div className="mt-10 rounded-xl border border-border bg-card p-6 flex items-start gap-4">
                  <img src={author.avatar} alt={author.name} className="h-16 w-16 rounded-full object-cover shrink-0" />
                  <div>
                    <div className="font-serif text-lg font-bold text-foreground">{author.name}</div>
                    <div className="text-sm text-primary mb-2">{author.role}</div>
                    <p className="text-sm text-muted-foreground">{author.bio}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar placeholder for TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-serif text-sm font-bold text-foreground mb-3 uppercase tracking-wider">In This Article</h3>
                  <p className="text-xs text-muted-foreground">Table of contents auto-generates from headings in the article.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-border bg-muted/30">
          <div className="editorial-container py-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogPostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
