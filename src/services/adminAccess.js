export const allowedAdminEmails = ["divya.us@gmail.com", "support@minimousenextgen.com"]

export function isAllowedAdminEmail(email) {
  return allowedAdminEmails.includes((email || "").trim().toLowerCase())
}
