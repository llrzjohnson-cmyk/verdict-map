import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Menu, Search, X, ChevronDown, Monitor, Home, Headphones, Coffee } from "lucide-react";
import { CommandPalette } from "./CommandPalette";

const navLinks = [
  { label: "Reviews", href: "/reviews" },
  { label: "Compare", href: "/compare" },
  { label: "Blog", href: "/blog" },
];

const categoryItems = [
  { label: "Technology", href: "/categories/technology", icon: Monitor, description: "Laptops, phones, and gadgets" },
  { label: "Home & Kitchen", href: "/categories/home-kitchen", icon: Home, description: "Appliances and home essentials" },
  { label: "Headphones", href: "/categories/headphones", icon: Headphones, description: "Over-ear, in-ear, wireless" },
  { label: "Coffee Makers", href: "/categories/coffee-makers", icon: Coffee, description: "Espresso, drip, and pour-over" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setCmdOpen(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
          scrolled ? "bg-card/95 backdrop-blur-md border-border shadow-sm" : "bg-card border-transparent"
        }`}
      >
        <div className="editorial-container">
          <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">P</span>
              </div>
              <span className="font-serif text-xl font-bold text-foreground hidden sm:block">
                PickPerfect
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname.startsWith(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Categories dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCatOpen(!catOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors"
                  aria-expanded={catOpen}
                >
                  Categories <ChevronDown className={`h-4 w-4 transition-transform ${catOpen ? "rotate-180" : ""}`} />
                </button>
                {catOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setCatOpen(false)} />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-xl border border-border bg-card shadow-xl p-4 z-20 grid grid-cols-1 gap-1">
                      {categoryItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted transition-colors"
                        >
                          <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-foreground">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCmdOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:block">Search</span>
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-card px-1.5 text-[10px] font-mono text-muted-foreground">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="editorial-container py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-3 py-2.5 text-sm font-medium rounded-md text-foreground hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border my-2 pt-2">
                <div className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Categories</div>
                {categoryItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-md text-foreground hover:bg-muted"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  );
}
