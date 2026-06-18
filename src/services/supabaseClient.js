import { createClient } from "@supabase/supabase-js"

const PLACEHOLDER_VALUES = new Set([
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_PROJECT_URL",
  "YOUR_SUPABASE_ANON_KEY",
])

function normalizeEnvValue(value) {
  const normalizedValue = typeof value === "string" ? value.trim() : ""
  return normalizedValue && !PLACEHOLDER_VALUES.has(normalizedValue) ? normalizedValue : ""
}

const supabaseUrl = normalizeEnvValue(import.meta.env.VITE_SUPABASE_URL)
const supabaseAnonKey = normalizeEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY)

export const missingSupabaseEnvVars = [
  !supabaseUrl ? "VITE_SUPABASE_URL" : null,
  !supabaseAnonKey ? "VITE_SUPABASE_ANON_KEY" : null,
].filter(Boolean)

export const isSupabaseConfigured = missingSupabaseEnvVars.length === 0

export const supabaseConfigError = isSupabaseConfigured
  ? ""
  : `Supabase is not configured. Missing: ${missingSupabaseEnvVars.join(", ")}.`

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
