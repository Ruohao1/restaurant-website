export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      food: {
        Row: {
          food_code: string | null
          food_description: string | null
          food_id: number
          food_image: string | null
          food_name: string
          food_price: number
          serving_quantity: number | null
          type_id: number
        }
        Insert: {
          food_code?: string | null
          food_description?: string | null
          food_id: number
          food_image?: string | null
          food_name: string
          food_price: number
          serving_quantity?: number | null
          type_id: number
        }
        Update: {
          food_code?: string | null
          food_description?: string | null
          food_id?: number
          food_image?: string | null
          food_name?: string
          food_price?: number
          serving_quantity?: number | null
          type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "food_type_id_food_types_type_id"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "food_types"
            referencedColumns: ["type_id"]
          },
        ]
      }
      food_types: {
        Row: {
          serving_quantity: number | null
          type_code: string | null
          type_id: number
          type_title: string
        }
        Insert: {
          serving_quantity?: number | null
          type_code?: string | null
          type_id: number
          type_title: string
        }
        Update: {
          serving_quantity?: number | null
          type_code?: string | null
          type_id?: number
          type_title?: string
        }
        Relationships: []
      }
      menu: {
        Row: {
          category_id: number
          menu_code: string | null
          menu_description: string | null
          menu_id: number
          menu_image: number | null
          menu_name: string
          menu_price: number
        }
        Insert: {
          category_id: number
          menu_code?: string | null
          menu_description?: string | null
          menu_id: number
          menu_image?: number | null
          menu_name: string
          menu_price: number
        }
        Update: {
          category_id?: number
          menu_code?: string | null
          menu_description?: string | null
          menu_id?: number
          menu_image?: number | null
          menu_name?: string
          menu_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "menu_category_id_menu_categories_category_id"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "menu_categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      menu_categories: {
        Row: {
          category_id: number
          category_letter: string | null
          category_title: string | null
        }
        Insert: {
          category_id: number
          category_letter?: string | null
          category_title?: string | null
        }
        Update: {
          category_id?: number
          category_letter?: string | null
          category_title?: string | null
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
            foreignKeyName: "menu_food_food_id_food_food_id"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "food"
            referencedColumns: ["food_id"]
          },
          {
            foreignKeyName: "menu_food_menu_id_menu_menu_id"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menu"
            referencedColumns: ["menu_id"]
          },
          {
            foreignKeyName: "menu_food_type_id_food_types_type_id"
            columns: ["food_type_id"]
            isOneToOne: false
            referencedRelation: "food_types"
            referencedColumns: ["type_id"]
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
