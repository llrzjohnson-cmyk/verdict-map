import { motion } from "framer-motion";
import { BlogPostCard } from "@/components/BlogPostCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogPosts } from "@/data/sample-data";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function BlogListPage() {
  const published = blogPosts.filter((p) => p.status === "published");

  return (
    <main className="editorial-container py-8">
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        <motion.div variants={fadeUp} className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-foreground">The Blog</h1>
          <p className="text-muted-foreground mt-2">Buying guides, how-tos, and expert insights</p>
        </motion.div>

        {/* Featured post */}
        {published[0] && (
          <motion.div variants={fadeUp} className="mb-10">
            <BlogPostCard post={published[0]} variant="horizontal" />
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {published.slice(1).map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
