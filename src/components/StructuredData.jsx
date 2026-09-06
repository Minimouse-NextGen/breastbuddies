import { SITE_URL, getCanonicalUrl, siteEntity } from "../seo/siteMetadata"

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function SiteStructuredData() {
  return <JsonLd data={siteEntity} />
}

export function PageStructuredData({
  path,
  name,
  description,
  type = "WebPage",
  breadcrumbs = [],
}) {
  const url = getCanonicalUrl(path)
  const graph = [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ]

  if (breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: getCanonicalUrl(item.path),
      })),
    })
  }

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
}

export function ServiceStructuredData({ path, name, description, areaServed }) {
  const url = getCanonicalUrl(path)

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        description,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        serviceType: name,
        areaServed,
      }}
    />
  )
}

export function FaqStructuredData({ items, path }) {
  const url = path ? getCanonicalUrl(path) : `${SITE_URL}/`

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  )
}
