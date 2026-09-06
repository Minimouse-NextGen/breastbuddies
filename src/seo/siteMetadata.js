export const SITE_URL = "https://www.breastbuddies.co.in"
export const SITE_NAME = "BreastBuddies"
export const DEFAULT_SOCIAL_IMAGE = "/mother-feeding.webp"

export const divyaQualifications = [
  "Advanced Certified Lactation Professional (ACLP)",
  "Infant & Young Child Feeding Specialization - BPNI Delhi",
  "Maternal, Infant, Young Child & Adolescent Nutrition Specialization - IIT",
]

export function getCanonicalUrl(path = "/") {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "")
  return `${SITE_URL}${normalizedPath}`
}

export const routeSeo = {
  "/": {
    title: "BreastBuddies | Breastfeeding & Lactation Support",
    description:
      "BreastBuddies offers lactation and breastfeeding support from Divya Umashankar, ACLP, for Chennai families and online consultations.",
    canonicalPath: "/",
  },
  "/services": {
    title: "Breastfeeding Support Services | BreastBuddies",
    description:
      "Explore BreastBuddies support for antenatal preparation, postpartum breastfeeding, latch concerns, milk supply, newborn feeding, and tongue tie guidance.",
    canonicalPath: "/",
  },
  "/about-divya": {
    title: "About Divya Umashankar | BreastBuddies",
    description:
      "Meet Divya Umashankar, an Advanced Certified Lactation Professional supporting families with evidence-informed breastfeeding care.",
    canonicalPath: "/",
  },
  "/book-consultation": {
    title: "Book a Lactation Consultation | BreastBuddies",
    description:
      "Request breastfeeding and lactation support from BreastBuddies for online or in-person consultation guidance.",
    canonicalPath: "/",
  },
  "/gallery": {
    title: "Gallery | BreastBuddies",
    description:
      "BreastBuddies gallery updates are coming soon. Visit the homepage for lactation support services and consultation booking.",
    canonicalPath: "/",
    robots: "noindex,follow",
  },
}

export const siteEntity = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/breastbuddies-logo.webp`,
      },
      image: `${SITE_URL}${DEFAULT_SOCIAL_IMAGE}`,
      telephone: "+91-7338890927",
      description:
        "BreastBuddies provides lactation and breastfeeding support for families in Chennai and through online consultations.",
      areaServed: [
        { "@type": "City", name: "Chennai" },
        { "@type": "Country", name: "India" },
        { "@type": "Place", name: "Online consultations worldwide" },
      ],
      founder: {
        "@id": `${SITE_URL}/#divya-umashankar`,
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#divya-umashankar`,
      name: "Divya Umashankar",
      jobTitle: "Advanced Certified Lactation Professional and Lactation Consultant",
      worksFor: {
        "@id": `${SITE_URL}/#organization`,
      },
      hasCredential: divyaQualifications.map((qualification) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: qualification,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en",
    },
  ],
}
