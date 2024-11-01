export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      delivery: {
        Row: {
          address: string
          delivery_date: string | null
          delivery_time: string | null
          id: number
          orders_id: number
        }
        Insert: {
          address: string
          delivery_date?: string | null
          delivery_time?: string | null
          id?: never
          orders_id: number
        }
        Update: {
          address?: string
          delivery_date?: string | null
          delivery_time?: string | null
          id?: never
          orders_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "delivery_orders_id_fkey"
            columns: ["orders_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      food: {
        Row: {
          code: string | null
          description: string | null
          id: number
          image: string | null
          name: string
          price: number
          serving_quantity: number | null
          type_id: number
        }
        Insert: {
          code?: string | null
          description?: string | null
          id?: number
          image?: string | null
          name: string
          price: number
          serving_quantity?: number | null
          type_id: number
        }
        Update: {
          code?: string | null
          description?: string | null
          id?: number
          image?: string | null
          name?: string
          price?: number
          serving_quantity?: number | null
          type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "food_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "food_types"
            referencedColumns: ["id"]
          },
        ]
      }
      food_types: {
        Row: {
          code: string | null
          id: number
          image: string | null
          serving_quantity: number | null
          title: string
        }
        Insert: {
          code?: string | null
          id?: number
          image?: string | null
          serving_quantity?: number | null
          title: string
        }
        Update: {
          code?: string | null
          id?: number
          image?: string | null
          serving_quantity?: number | null
          title?: string
        }
        Relationships: []
      }
      menu: {
        Row: {
          category_id: number
          code: string | null
          description: string | null
          id: number
          image: string | null
          name: string
          price: number
          stripe_price_id: string | null
        }
        Insert: {
          category_id: number
          code?: string | null
          description?: string | null
          id?: number
          image?: string | null
          name: string
          price: number
          stripe_price_id?: string | null
        }
        Update: {
          category_id?: number
          code?: string | null
          description?: string | null
          id?: number
          image?: string | null
          name?: string
          price?: number
          stripe_price_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "menu_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_categories: {
        Row: {
          id: number
          letter: string | null
          title: string | null
        }
        Insert: {
          id?: number
          letter?: string | null
          title?: string | null
        }
        Update: {
          id?: number
          letter?: string | null
          title?: string | null
        }
        Relationships: []
      }
      menu_food: {
        Row: {
          food_id: number | null
          food_type_id: number | null
          menu_id: number
          quantity: number
        }
        Insert: {
          food_id?: number | null
          food_type_id?: number | null
          menu_id: number
          quantity: number
        }
        Update: {
          food_id?: number | null
          food_type_id?: number | null
          menu_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "menu_food_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "food"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_food_food_type_id_fkey"
            columns: ["food_type_id"]
            isOneToOne: false
            referencedRelation: "food_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_food_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menu"
            referencedColumns: ["id"]
          },
        ]
      }
      order_menu: {
        Row: {
          id: number
          menu_id: number
          orders_id: number
          quantity: number
        }
        Insert: {
          id?: never
          menu_id: number
          orders_id: number
          quantity: number
        }
        Update: {
          id?: never
          menu_id?: number
          orders_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_menu_orders_id_fkey"
            columns: ["orders_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          details: string | null
          guest_email: string | null
          guest_name: string | null
          id: number
          status: string
          total: number
          users_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          guest_email?: string | null
          guest_name?: string | null
          id?: never
          status?: string
          total: number
          users_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: string | null
          guest_email?: string | null
          guest_name?: string | null
          id?: never
          status?: string
          total?: number
          users_id?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          id: string
          role: string | null
          username: string
        }
        Insert: {
          id: string
          role?: string | null
          username: string
        }
        Update: {
          id?: string
          role?: string | null
          username?: string
        }
        Relationships: []
      }
      reservation: {
        Row: {
          date: string
          guest_email: string | null
          guest_name: string | null
          guest_phone: string | null
          guests: number
          id: number
          message: string | null
          time: string
          users_id: string | null
        }
        Insert: {
          date: string
          guest_email?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          guests: number
          id?: never
          message?: string | null
          time: string
          users_id?: string | null
        }
        Update: {
          date?: string
          guest_email?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          guests?: number
          id?: never
          message?: string | null
          time?: string
          users_id?: string | null
        }
        Relationships: []
      }
      takeaway: {
        Row: {
          id: number
          orders_id: number
          pickup_date: string | null
          pickup_time: string | null
        }
        Insert: {
          id?: never
          orders_id: number
          pickup_date?: string | null
          pickup_time?: string | null
        }
        Update: {
          id?: never
          orders_id?: number
          pickup_date?: string | null
          pickup_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "takeaway_orders_id_fkey"
            columns: ["orders_id"]
            isOneToOne: false
            referencedRelation: "orders"
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
