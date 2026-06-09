export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'user'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: 'admin' | 'user'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'user'
          avatar_url?: string | null
          updated_at?: string
        }
      }
      applicants: {
        Row: {
          id: string
          user_id: string | null
          full_name: string
          email: string
          phone: string
          date_of_birth: string
          address: string
          city: string
          province: string
          height_cm: number
          weight_kg: number
          occupation: string
          education: string
          photo_url: string | null
          status: 'pending' | 'verified' | 'rejected' | 'finalist'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          full_name: string
          email: string
          phone: string
          date_of_birth: string
          address: string
          city: string
          province: string
          height_cm: number
          weight_kg: number
          occupation: string
          education: string
          photo_url?: string | null
          status?: 'pending' | 'verified' | 'rejected' | 'finalist'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          full_name?: string
          email?: string
          phone?: string
          date_of_birth?: string
          address?: string
          city?: string
          province?: string
          height_cm?: number
          weight_kg?: number
          occupation?: string
          education?: string
          photo_url?: string | null
          status?: 'pending' | 'verified' | 'rejected' | 'finalist'
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          image_url: string | null
          author_id: string
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt: string
          image_url?: string | null
          author_id: string
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          image_url?: string | null
          author_id?: string
          published?: boolean
          published_at?: string | null
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url: string
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string
          category?: string
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          date: string
          location: string
          image_url: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          date: string
          location: string
          image_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          date?: string
          location?: string
          image_url?: string | null
          published?: boolean
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
