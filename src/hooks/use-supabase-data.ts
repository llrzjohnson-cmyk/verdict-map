import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Product = Tables<"products">;
export type Review = Tables<"reviews"> & {
  scores: { label: string; value: number }[];
  faqs: { question: string; answer: string }[];
};
export type BlogPost = Tables<"blog_posts">;
export type Comparison = Tables<"comparisons">;
export type Category = Tables<"categories">;
export type Author = Tables<"authors">;

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      return data as Product[];
    },
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*");
      if (error) throw error;
      return (data ?? []) as Review[];
    },
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*");
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

export function useComparisons() {
  return useQuery({
    queryKey: ["comparisons"],
    queryFn: async () => {
      const { data, error } = await supabase.from("comparisons").select("*");
      if (error) throw error;
      return data as Comparison[];
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw error;
      return data as Category[];
    },
  });
}

export function useAuthors() {
  return useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const { data, error } = await supabase.from("authors").select("*");
      if (error) throw error;
      return data as Author[];
    },
  });
}

export function useReviewBySlug(slug: string) {
  return useQuery({
    queryKey: ["review", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").eq("slug", slug).single();
      if (error) throw error;
      return data as Review;
    },
    enabled: !!slug,
  });
}

export function useBlogPostBySlug(slug: string) {
  return useQuery({
    queryKey: ["blog_post", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
      if (error) throw error;
      return data as BlogPost;
    },
    enabled: !!slug,
  });
}

export function useComparisonBySlug(slug: string) {
  return useQuery({
    queryKey: ["comparison", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("comparisons").select("*").eq("slug", slug).single();
      if (error) throw error;
      return data as Comparison;
    },
    enabled: !!slug,
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) throw error;
      return data as Product;
    },
    enabled: !!id,
  });
}

export function useAuthorById(id: string | null) {
  return useQuery({
    queryKey: ["author", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("authors").select("*").eq("id", id!).single();
      if (error) throw error;
      return data as Author;
    },
    enabled: !!id,
  });
}

export function useCategoryById(id: string | null) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").eq("id", id!).single();
      if (error) throw error;
      return data as Category;
    },
    enabled: !!id,
  });
}
