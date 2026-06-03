export function scrollToSection(event, sectionId) {
  event.preventDefault()

  const section = document.getElementById(sectionId)

  if (!section) {
    return
  }

  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
  section.scrollIntoView({ behavior: "smooth" })
}
