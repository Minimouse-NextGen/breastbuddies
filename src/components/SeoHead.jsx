import { Helmet } from "react-helmet-async"
import { DEFAULT_SOCIAL_IMAGE, SITE_NAME, SITE_URL, getCanonicalUrl } from "../seo/siteMetadata"

function toAbsoluteUrl(url) {
  if (!url) return ""
  return url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`
}

function SeoHead({
  title,
  description,
  canonicalPath = "/",
  robots = "index,follow",
  ogType = "website",
  image = DEFAULT_SOCIAL_IMAGE,
}) {
  const canonicalUrl = getCanonicalUrl(canonicalPath)
  const socialImage = toAbsoluteUrl(image)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      {socialImage ? <meta property="og:image" content={socialImage} /> : null}
      <meta name="twitter:card" content={socialImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonicalUrl} />
      {socialImage ? <meta name="twitter:image" content={socialImage} /> : null}
    </Helmet>
  )
}

export default SeoHead
