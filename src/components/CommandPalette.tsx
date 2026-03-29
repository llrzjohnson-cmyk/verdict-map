import { useNavigate } from "react-router-dom";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useReviews, useBlogPosts } from "@/hooks/use-supabase-data";
import { FileText, Search, Star, GitCompare } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { data: reviews = [] } = useReviews();
  const { data: blogPosts = [] } = useBlogPosts();

  const go = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search reviews, blog posts, products..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Reviews">
          {reviews.map((r) => (
            <CommandItem key={r.id} onSelect={() => go(`/reviews/${r.slug}`)}>
              <Star className="mr-2 h-4 w-4 text-primary" />
              {r.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Blog Posts">
          {blogPosts.map((b) => (
            <CommandItem key={b.id} onSelect={() => go(`/blog/${b.slug}`)}>
              <FileText className="mr-2 h-4 w-4 text-primary" />
              {b.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Quick Links">
          <CommandItem onSelect={() => go("/compare")}>
            <GitCompare className="mr-2 h-4 w-4 text-primary" />
            Compare Products
          </CommandItem>
          <CommandItem onSelect={() => go("/reviews")}>
            <Search className="mr-2 h-4 w-4 text-primary" />
            All Reviews
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
