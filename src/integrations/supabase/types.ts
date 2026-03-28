export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      affiliate_clicks: {
        Row: {
          clicked_at: string
          id: string
          product_id: string
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          clicked_at?: string
          id?: string
          product_id: string
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          clicked_at?: string
          id?: string
          product_id?: string
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      authors: {
        Row: {
          avatar: string
          bio: string
          created_at: string
          id: string
          name: string
          role: string
        }
        Insert: {
          avatar?: string
          bio?: string
          created_at?: string
          id?: string
          name: string
          role?: string
        }
        Update: {
          avatar?: string
          bio?: string
          created_at?: string
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content_html: string
          created_at: string
          excerpt: string
          featured_image: string
          id: string
          published_at: string | null
          reading_time: number
          seo_description: string
          seo_title: string
          slug: string
          status: string
          tags: string[]
          title: string
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content_html?: string
          created_at?: string
          excerpt?: string
          featured_image?: string
          id?: string
          published_at?: string | null
          reading_time?: number
          seo_description?: string
          seo_title?: string
          slug: string
          status?: string
          tags?: string[]
          title: string
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content_html?: string
          created_at?: string
          excerpt?: string
          featured_image?: string
          id?: string
          published_at?: string | null
          reading_time?: number
          seo_description?: string
          seo_title?: string
          slug?: string
          status?: string
          tags?: string[]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          icon: string
          id: string
          name: string
          parent_id: string | null
          product_count: number
          slug: string
        }
        Insert: {
          created_at?: string
          icon?: string
          id?: string
          name: string
          parent_id?: string | null
          product_count?: number
          slug: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          name?: string
          parent_id?: string | null
          product_count?: number
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      comparisons: {
        Row: {
          created_at: string
          id: string
          product_ids: string[]
          published_at: string | null
          seo_description: string
          seo_title: string
          slug: string
          status: string
          summary: string
          title: string
          winner_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_ids?: string[]
          published_at?: string | null
          seo_description?: string
          seo_title?: string
          slug: string
          status?: string
          summary?: string
          title: string
          winner_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          product_ids?: string[]
          published_at?: string | null
          seo_description?: string
          seo_title?: string
          slug?: string
          status?: string
          summary?: string
          title?: string
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comparisons_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          affiliate_url: string
          brand: string
          category_id: string | null
          created_at: string
          description: string
          id: string
          images: string[]
          name: string
          price: number
          slug: string
          specs: Json
        }
        Insert: {
          affiliate_url?: string
          brand?: string
          category_id?: string | null
          created_at?: string
          description?: string
          id?: string
          images?: string[]
          name: string
          price?: number
          slug: string
          specs?: Json
        }
        Update: {
          affiliate_url?: string
          brand?: string
          category_id?: string | null
          created_at?: string
          description?: string
          id?: string
          images?: string[]
          name?: string
          price?: number
          slug?: string
          specs?: Json
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          author_id: string | null
          cons: string[]
          content_html: string
          created_at: string
          faqs: Json
          id: string
          last_updated_at: string
          overall_score: number
          product_id: string
          pros: string[]
          published_at: string | null
          scores: Json
          seo_description: string
          seo_title: string
          slug: string
          status: string
          summary: string
          title: string
          verdict: string
          who_its_for: string
          who_its_not_for: string
        }
        Insert: {
          author_id?: string | null
          cons?: string[]
          content_html?: string
          created_at?: string
          faqs?: Json
          id?: string
          last_updated_at?: string
          overall_score?: number
          product_id: string
          pros?: string[]
          published_at?: string | null
          scores?: Json
          seo_description?: string
          seo_title?: string
          slug: string
          status?: string
          summary?: string
          title: string
          verdict?: string
          who_its_for?: string
          who_its_not_for?: string
        }
        Update: {
          author_id?: string | null
          cons?: string[]
          content_html?: string
          created_at?: string
          faqs?: Json
          id?: string
          last_updated_at?: string
          overall_score?: number
          product_id?: string
          pros?: string[]
          published_at?: string | null
          scores?: Json
          seo_description?: string
          seo_title?: string
          slug?: string
          status?: string
          summary?: string
          title?: string
          verdict?: string
          who_its_for?: string
          who_its_not_for?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
