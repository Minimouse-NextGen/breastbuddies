export const allowedAdminEmails = [
  "divya.us@gmail.com",
  "support@minimousenextgen.com",
]

export function isAllowedAdminEmail(email) {
  return allowedAdminEmails.includes((email || "").trim().toLowerCase())
}

export async function verifyAdminAccess(supabase) {
  if (!supabase) {
    return false
  }

  const { data, error } = await supabase.rpc("is_admin")

  if (error) {
    throw error
  }

  return data === true
}
