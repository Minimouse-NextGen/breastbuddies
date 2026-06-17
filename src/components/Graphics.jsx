export const BRAND_BLUE = "#0353A4"
export const BRAND_PINK = "#FF477E"
export const BRAND_TAGLINE = "Because every mother deserves support."

export function LogoMark({ className = "h-16 w-16" }) {
  return (
    <img
      src="/breastbuddies-logo.png"
      alt="BreastBuddies logo"
      className={`${className} rounded-full object-contain`}
    />
  )
}

export function BrandWordmark({ className = "", sizeClassName = "text-[28px]" }) {
  return (
    <span className={`whitespace-nowrap font-playfair font-bold leading-none tracking-normal ${sizeClassName} ${className}`}>
      <span className="text-[#FF477E]">Breast</span>
      <span className="text-[#0353A4]">Buddies</span>
    </span>
  )
}

export function BrandTagline({ className = "" }) {
  return (
    <span className={className}>
      {BRAND_TAGLINE}
    </span>
  )
}

export function HeroIllustration() {
  return (
    <svg viewBox="0 0 620 500" className="h-full w-full" fill="none" aria-hidden="true">
      <circle cx="360" cy="245" r="185" fill="#dcebff" opacity="0.75" />
      <circle cx="236" cy="240" r="9" fill="#ff7fa0" />
      <circle cx="300" cy="160" r="6" fill="#ffffff" />
      <path d="M152 372c-56-43-48-119 0-177M113 348c-38-31-35-85-4-128M498 370c43-38 52-91 20-149M538 342c31-28 35-72 10-107" stroke="#94bdfb" strokeWidth="4" strokeLinecap="round" />
      <path d="M152 195c-8 12-22 19-38 19M152 226c-14 7-30 8-46 2M151 256c-16 4-31 1-45-8M125 292c16 1 30-3 43-13M498 221c9 11 23 17 39 16M493 253c14 6 30 6 46-1M489 283c16 3 31-2 44-12" stroke="#94bdfb" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M345 82c-49 10-78 55-68 106 6 30 27 55 55 67M354 83c65 5 104 64 91 127-8 38-34 67-69 82"
        stroke="#165ceb"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M321 150c14 7 32 7 47-3M334 176c8 5 18 5 26 0M391 146c8 11 11 26 7 40-6 20-24 32-43 31"
        stroke="#165ceb"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M304 247c42 24 76 21 107-12 23 30 37 71 32 122H252c-3-44 17-86 52-110Z"
        fill="#ffffff"
        stroke="#165ceb"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M256 320c35 45 113 58 168 14M281 286c-32 13-50 39-48 74M428 270c36 17 55 45 53 89"
        stroke="#165ceb"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M287 254c-2-40 28-71 68-68 39 3 67 38 61 77-6 37-43 62-80 52-16-4-33-18-49-61Z"
        fill="#ffffff"
        stroke="#165ceb"
        strokeWidth="5"
      />
      <path d="M314 250c11 9 28 12 42 7M371 223c10 6 16 15 17 27" stroke="#165ceb" strokeWidth="4" strokeLinecap="round" />
      <path d="M268 327c24-23 60-34 97-28 24 4 44 16 59 35" stroke="#165ceb" strokeWidth="5" strokeLinecap="round" />
      <path d="M233 93c10 8 15 18 15 30M518 112c-8 10-12 21-11 34" stroke="#94bdfb" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function SupportIllustration({ tone = "blue" }) {
  const stroke = tone === "pink" ? BRAND_PINK : BRAND_BLUE
  const fill = tone === "pink" ? "#fff1f5" : tone === "green" ? "#ecfdf5" : "#eff6ff"

  return (
    <svg viewBox="0 0 150 120" className="h-28 w-28" fill="none" aria-hidden="true">
      <circle cx="75" cy="62" r="48" fill={fill} />
      <path d="M52 82c-10-16-8-40 8-52 15-11 38-6 47 11 8 15 4 35-10 45" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M59 72c16 17 43 13 54-8M46 99c18-17 43-23 67-13" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M88 50c11 3 18 12 17 24-2 14-16 23-30 18-8-3-15-10-19-24 7-13 19-20 32-18Z" fill="#fff" stroke={stroke} strokeWidth="3.2" />
      <path d="M23 97c14-9 22-21 24-37M127 97c-14-9-22-21-24-37" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

export function ServiceGraphic({ type, className = "h-[150px] w-[150px]" }) {
  const palette = {
    antenatal: { stroke: BRAND_BLUE, soft: "#dcebff", leaf: "#9fc3fb", heart: "#bdd7ff" },
    postpartum: { stroke: BRAND_PINK, soft: "#fff0f5", leaf: "#94bdfb", heart: "#ffc0d0" },
    specialized: { stroke: BRAND_BLUE, soft: "#eff6ff", leaf: "#9fc3fb", heart: "#bdd7ff" },
  }[type]

  if (type === "specialized") {
    return (
      <svg viewBox="0 0 180 150" className={className} fill="none" aria-hidden="true">
        <path d="M64 40c0-17 22-24 34-7 12-17 34-10 34 7 0 27-34 45-34 45S64 67 64 40Z" stroke={palette.stroke} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M51 104V70c0-11-18-11-18 0v31c0 16 11 28 28 34M129 104V70c0-11 18-11 18 0v31c0 16-11 28-28 34" stroke={palette.stroke} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M61 118c12-16 25-23 37-23s25 7 37 23" stroke={palette.stroke} strokeWidth="5" strokeLinecap="round" />
        <path d="M35 121c-13 1-24 7-32 17M145 121c13 1 24 7 32 17M24 132c-9-8-13-18-12-30M156 132c9-8 13-18 12-30" stroke={palette.leaf} strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
      </svg>
    )
  }

  if (type === "postpartum") {
    return (
      <svg viewBox="0 0 180 150" className={className} fill="none" aria-hidden="true">
        <circle cx="77" cy="66" r="47" fill={palette.soft} />
        <path d="M76 17c-28 7-42 31-34 62 6 23 28 39 52 34 25-5 40-27 36-51-4-26-27-48-54-45Z" fill="#FF477E" opacity="0.72" />
        <path d="M59 56c15 7 34 3 49-14M69 79c11 8 27 7 37-2" stroke={palette.stroke} strokeWidth="4" strokeLinecap="round" />
        <path d="M69 96c-24 5-40 22-43 47h93c-2-24-20-43-50-47Z" fill="#fff" stroke={palette.stroke} strokeWidth="4" strokeLinejoin="round" />
        <path d="M50 98c3-23 20-39 44-38 24 1 39 19 38 43" stroke={palette.stroke} strokeWidth="4" strokeLinecap="round" />
        <circle cx="66" cy="99" r="22" fill="#fff7fb" stroke={palette.stroke} strokeWidth="4" />
        <path d="M49 96c12 0 23-4 33-13 8 9 11 20 7 31" stroke={palette.stroke} strokeWidth="4" strokeLinecap="round" />
        <path d="M22 133c14-13 23-29 25-48M18 111c-9-8-13-17-13-28M145 132c11-8 18-18 20-31" stroke={palette.leaf} strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
        <path d="M15 51l5 5 5-5M142 28l4 4 4-4" stroke={palette.heart} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 180 150" className={className} fill="none" aria-hidden="true">
      <circle cx="78" cy="68" r="49" fill={palette.soft} opacity="0.9" />
      <path d="M79 17c-26 7-41 30-36 59 4 25 23 43 48 44 25 1 45-17 48-42 3-25-11-53-35-61-8-3-17-3-25 0Z" stroke={palette.stroke} strokeWidth="4" strokeLinecap="round" />
      <path d="M63 51c18 5 38-1 55-18M72 73c9 7 24 7 34 0" stroke={palette.stroke} strokeWidth="4" strokeLinecap="round" />
      <path d="M48 139c3-38 23-61 55-61 28 0 47 22 51 61" stroke={palette.stroke} strokeWidth="4" strokeLinecap="round" />
      <path d="M61 101c11 18 35 24 55 12M86 86c20 13 28 30 25 51" stroke={palette.stroke} strokeWidth="4" strokeLinecap="round" />
      <path d="M27 132c13-11 21-26 23-45M18 117c-8-8-12-18-11-29M143 132c-11-8-19-20-22-36" stroke={palette.leaf} strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
      <path d="M27 72l5 5 5-5M146 67l4 4 4-4" stroke={palette.heart} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DivyaPortrait() {
  return (
    <div className="relative aspect-[4/4] overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-sky-100 via-white to-pink-50">
      <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <rect width="420" height="420" fill="#f8fbff" />
        <circle cx="335" cy="118" r="48" fill="#dbeafe" />
        <path d="M308 248c31-24 56-34 82-32" stroke="#cfe5ff" strokeWidth="10" strokeLinecap="round" />
        <path d="M52 286c35-34 76-46 122-36" stroke="#d1fae5" strokeWidth="10" strokeLinecap="round" />
        <path d="M138 154c2-57 40-91 92-84 50 7 79 55 65 105-9 34-38 56-72 57-37 2-71-26-85-78Z" fill="#263f5f" />
        <circle cx="218" cy="158" r="70" fill="#f4c7a9" />
        <path d="M152 148c24 9 64 4 96-26 7 28 26 48 53 59 8-53-24-98-76-104-47-5-78 21-73 71Z" fill="#203651" />
        <path d="M186 172c18 14 44 14 62 0" stroke="#7d4a38" strokeWidth="5" strokeLinecap="round" />
        <path d="M118 404c7-93 50-143 108-143 59 0 101 50 108 143H118Z" fill="#78cde1" />
        <path d="M148 305c29 40 106 45 148-1" stroke="#3394ad" strokeWidth="8" strokeLinecap="round" />
        <path d="M152 310c-41 18-64 54-69 94h270c-5-42-29-76-70-94" fill="#8fd7e8" />
        <path d="M101 322c24-37 74-48 116-26 43 23 58 70 38 108H78c0-32 8-59 23-82Z" fill="#fff7ed" stroke="#f0b99b" strokeWidth="5" />
        <circle cx="166" cy="322" r="36" fill="#f3c2a4" />
        <path d="M138 311c17 2 34-4 49-18 15 15 20 33 12 51-15 2-35-5-61-33Z" fill="#263f5f" />
        <path d="M122 360c38 32 83 35 126 8" stroke="#78cde1" strokeWidth="10" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function SmallIcon({ type, className = "h-8 w-8", color = BRAND_BLUE }) {
  if (type === "whatsapp") {
    return (
      <img
        src="/whatsapp-svgrepo-com.svg"
        alt=""
        className={className}
        aria-hidden="true"
      />
    )
  }

  const common = {
    stroke: color,
    strokeWidth: "2.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }

  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      {type === "calendar" && (
        <>
          <rect x="8" y="10" width="32" height="30" rx="5" {...common} />
          <path d="M16 6v8M32 6v8M8 19h32M19 28h10" {...common} />
        </>
      )}
      {type === "award" && (
        <>
          <circle cx="24" cy="18" r="10" {...common} />
          <path d="M18 28l-4 14 10-6 10 6-4-14M20 18l3 3 6-7" {...common} />
        </>
      )}
      {type === "baby" && (
        <>
          <circle cx="18" cy="17" r="8" {...common} />
          <path d="M26 28c9 1 14 6 15 14H7c1-8 7-14 19-14ZM31 12c3 2 5 5 5 9" {...common} />
        </>
      )}
      {type === "online" && (
        <>
          <rect x="8" y="12" width="32" height="22" rx="4" {...common} />
          <path d="M18 40h12M24 34v6M19 25c2-5 8-5 10 0M17 29h14" {...common} />
        </>
      )}
      {type === "globe" && (
        <>
          <circle cx="24" cy="24" r="17" {...common} />
          <path d="M7 24h34M24 7c5 5 8 11 8 17s-3 12-8 17c-5-5-8-11-8-17s3-12 8-17Z" {...common} />
        </>
      )}
      {type === "location" && (
        <>
          <path d="M24 43s14-12 14-25a14 14 0 1 0-28 0c0 13 14 25 14 25Z" {...common} />
          <circle cx="24" cy="18" r="5" {...common} />
        </>
      )}
      {type === "heart" && <path d="M24 39S9 30 9 18c0-6 8-10 15-2 7-8 15-4 15 2 0 12-15 21-15 21Z" {...common} />}
      {type === "shield" && <path d="M24 6l15 6v11c0 10-6 16-15 20-9-4-15-10-15-20V12l15-6ZM18 24l4 4 8-10" {...common} />}
      {type === "info" && (
        <>
          <circle cx="24" cy="24" r="17" {...common} />
          <path d="M24 22v12M24 15h.01" {...common} />
        </>
      )}
      {type === "family" && (
        <>
          <circle cx="18" cy="15" r="6" {...common} />
          <circle cx="32" cy="18" r="5" {...common} />
          <path d="M7 39c1-10 7-16 15-16 7 0 12 4 15 12M27 28c6 0 10 4 12 11" {...common} />
        </>
      )}
      {type === "check" && <path d="M12 25l8 8 16-18" {...common} />}
    </svg>
  )
}
