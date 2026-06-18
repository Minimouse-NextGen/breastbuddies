export const navItems = [
  { label: "Home", id: "top", path: "/" },
  { label: "About Divya", id: "about", path: "/about-divya" },
  { label: "Services", id: "services", path: "/services" },
  { label: "Gallery", id: "gallery", path: "/gallery" },
  { label: "Book Consultation", id: "booking", path: "/book-consultation" },
]

const routeToSection = {
  "/": "top",
  "/home": "top",
  "/about": "about",
  "/about-divya": "about",
  "/services": "services",
  "/gallery": "gallery",
  "/book-consultation": "booking",
}

export function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return "/"
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
}

export function getSectionIdFromPathname(pathname) {
  return routeToSection[normalizePathname(pathname)] ?? null
}
