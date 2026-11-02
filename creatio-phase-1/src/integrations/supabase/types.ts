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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      ag_meetings: {
        Row: {
          building_id: string
          created_at: string
          display_name: string | null
          document_id: string | null
          extracted_text: string | null
          id: string
          meeting_date: string | null
          updated_at: string
        }
        Insert: {
          building_id: string
          created_at?: string
          display_name?: string | null
          document_id?: string | null
          extracted_text?: string | null
          id?: string
          meeting_date?: string | null
          updated_at?: string
        }
        Update: {
          building_id?: string
          created_at?: string
          display_name?: string | null
          document_id?: string | null
          extracted_text?: string | null
          id?: string
          meeting_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ag_tasks: {
        Row: {
          building_id: string
          created_at: string
          description: string | null
          done: boolean
          id: string
          meeting_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          building_id: string
          created_at?: string
          description?: string | null
          done?: boolean
          id?: string
          meeting_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          building_id?: string
          created_at?: string
          description?: string | null
          done?: boolean
          id?: string
          meeting_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ag_tasks_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "ag_meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      building_documents: {
        Row: {
          building_id: string
          created_at: string
          file_name: string
          file_path: string
          id: string
          label: string | null
          section: string
          updated_at: string
        }
        Insert: {
          building_id: string
          created_at?: string
          file_name: string
          file_path: string
          id?: string
          label?: string | null
          section: string
          updated_at?: string
        }
        Update: {
          building_id?: string
          created_at?: string
          file_name?: string
          file_path?: string
          id?: string
          label?: string | null
          section?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "building_documents_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
        ]
      }
      buildings: {
        Row: {
          basic_info: Json
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          basic_info?: Json
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Update: {
          basic_info?: Json
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      elevator_breakdowns: {
        Row: {
          breakdown_date: string
          building_id: string
          comment: string | null
          created_at: string
          elevator_index: number
          id: string
          resolution_comment: string | null
          resolved_date: string | null
          technician_contacted: boolean
          updated_at: string
        }
        Insert: {
          breakdown_date?: string
          building_id: string
          comment?: string | null
          created_at?: string
          elevator_index: number
          id?: string
          resolution_comment?: string | null
          resolved_date?: string | null
          technician_contacted?: boolean
          updated_at?: string
        }
        Update: {
          breakdown_date?: string
          building_id?: string
          comment?: string | null
          created_at?: string
          elevator_index?: number
          id?: string
          resolution_comment?: string | null
          resolved_date?: string | null
          technician_contacted?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      heating_maintenance_logs: {
        Row: {
          building_id: string
          company_name: string | null
          created_at: string
          document_id: string | null
          id: string
          maintenance_date: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          building_id: string
          company_name?: string | null
          created_at?: string
          document_id?: string | null
          id?: string
          maintenance_date: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          building_id?: string
          company_name?: string | null
          created_at?: string
          document_id?: string | null
          id?: string
          maintenance_date?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      statutes_documents: {
        Row: {
          building_id: string
          created_at: string
          display_name: string
          document_id: string
          extracted_text: string | null
          id: string
          updated_at: string
        }
        Insert: {
          building_id: string
          created_at?: string
          display_name: string
          document_id: string
          extracted_text?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          building_id?: string
          created_at?: string
          display_name?: string
          document_id?: string
          extracted_text?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
