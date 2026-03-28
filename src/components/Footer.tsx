import { Link } from "react-router-dom";
import { Mail, Twitter, Youtube, Instagram } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing! Check your email for confirmation.");
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-border bg-card mt-20" role="contentinfo">
      <div className="editorial-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">P</span>
              </div>
              <span className="font-serif text-xl font-bold text-foreground">PickPerfect</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Independent, expert reviews you can trust. We test every product thoroughly so you can make confident purchasing decisions.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-foreground">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "All Reviews", href: "/reviews" },
                { label: "Compare Products", href: "/compare" },
                { label: "Blog", href: "/blog" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-foreground">Categories</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Technology", href: "/categories/technology" },
                { label: "Home & Kitchen", href: "/categories/home-kitchen" },
                { label: "Headphones", href: "/categories/headphones" },
                { label: "Coffee Makers", href: "/categories/coffee-makers" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">Get our latest reviews and buying guides delivered weekly.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button type="submit" className="bg-primary text-primary-foreground shrink-0">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our{" "}
                <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="editorial-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} PickPerfect. All rights reserved.</span>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Cookie Policy", href: "/cookie-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Sitemap", href: "/sitemap" },
              ].map((link) => (
                <Link key={link.href} to={link.href} className="hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  localStorage.removeItem("cookie-consent");
                  window.location.reload();
                }}
                className="hover:text-foreground transition-colors"
              >
                Cookie Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
