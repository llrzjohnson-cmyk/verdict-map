import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GitCompare, Star, X } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { products, comparisons, getProductById } from "@/data/sample-data";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 4) {
      setSelected([...selected, id]);
    }
  };

  const compareUrl = `/compare/custom?products=${selected.join(",")}`;

  return (
    <main className="editorial-container py-8">
      <Breadcrumbs items={[{ label: "Compare" }]} />
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        <motion.div variants={fadeUp} className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-foreground flex items-center gap-3">
            <GitCompare className="h-9 w-9 text-primary" /> Compare Products
          </h1>
          <p className="text-muted-foreground mt-2">Select up to 4 products to compare side by side</p>
        </motion.div>

        {/* Search */}
        <motion.div variants={fadeUp} className="mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full max-w-md rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </motion.div>

        {/* Product grid */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {filtered.map((product) => {
            const isSelected = selected.includes(product.id);
            return (
              <button
                key={product.id}
                onClick={() => toggle(product.id)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                    : "border-border bg-card hover:shadow-md"
                }`}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3">
                  <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="text-sm font-medium text-foreground">{product.name}</div>
                <div className="text-xs text-muted-foreground">{product.brand} · ${product.price}</div>
              </button>
            );
          })}
        </motion.div>

        {/* Existing comparisons */}
        <motion.div variants={fadeUp}>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Popular Comparisons</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {comparisons.map((comp) => {
              const prods = comp.product_ids.map(getProductById).filter(Boolean);
              return (
                <Link
                  key={comp.id}
                  to={`/compare/${comp.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {prods.map((p) => (
                      <div key={p!.id} className="h-10 w-10 rounded-lg overflow-hidden border border-border">
                        <img src={p!.images[0]} alt={p!.name} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <h3 className="font-serif font-bold group-hover:text-primary transition-colors">{comp.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{comp.summary}</p>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Sticky comparison tray */}
      {selected.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-card/95 backdrop-blur-md shadow-lg">
          <div className="editorial-container py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              {selected.map((id) => {
                const p = getProductById(id);
                return p ? (
                  <div key={id} className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 shrink-0">
                    <img src={p.images[0]} alt={p.name} className="h-8 w-8 rounded object-cover" />
                    <span className="text-sm font-medium">{p.name}</span>
                    <button onClick={() => toggle(id)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
            <Button
              asChild
              disabled={selected.length < 2}
              className="bg-primary text-primary-foreground shrink-0"
            >
              <Link to={compareUrl}>Compare ({selected.length})</Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
