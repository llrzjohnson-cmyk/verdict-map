import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useProducts, useReviews, useCategories } from "@/hooks/use-supabase-data";
import { useState } from "react";

import { fadeUp } from "@/lib/animations";

export default function ReviewsListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: products = [] } = useProducts();
  const { data: reviews = [] } = useReviews();
  const { data: categories = [] } = useCategories();

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === selectedCategory)
    : products;

  return (
    <main className="editorial-container py-8">
      <Breadcrumbs items={[{ label: "Reviews" }]} />
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        <motion.div variants={fadeUp} className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-foreground">All Reviews</h1>
          <p className="text-muted-foreground mt-2">Expert, in-depth reviews of the products that matter most</p>
        </motion.div>

        {/* Filters */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.filter((c) => !c.parent_id).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const review = reviews.find(r => r.product_id === product.id);
            return (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} review={review} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </main>
  );
}
