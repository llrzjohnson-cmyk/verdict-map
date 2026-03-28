import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Shield, Target, Users } from "lucide-react";

import { fadeUp } from "@/lib/animations";

export default function AboutPage() {
  return (
    <main className="editorial-container py-8">
      <Breadcrumbs items={[{ label: "About" }]} />
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="max-w-3xl">
        <motion.div variants={fadeUp}>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">About PickPerfect</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            We're an independent editorial team dedicated to helping you make smarter purchasing decisions. Every product we recommend has been thoroughly tested, and our reviews are never influenced by advertisers.
          </p>
        </motion.div>

        <div className="space-y-8">
          {[
            { icon: Shield, title: "Editorial Independence", text: "We buy products ourselves or receive review units with no editorial strings attached. Our opinions are always our own." },
            { icon: Target, title: "Rigorous Testing", text: "Every product is tested for a minimum of two weeks in real-world conditions using standardized testing protocols." },
            { icon: Users, title: "Expert Team", text: "Our reviewers are specialists in their categories with years of experience covering consumer products." },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-1">{item.title}</h2>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
