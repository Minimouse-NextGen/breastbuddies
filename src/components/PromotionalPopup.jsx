import { useEffect, useRef, useState } from "react"
import { promotionalPopup } from "../config/promotionalPopup"

const CLOSE_ANIMATION_DURATION = 250

function PromotionalPopup() {
  const [isMounted, setIsMounted] = useState(() => promotionalPopup.enabled)
  const [isVisible, setIsVisible] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const closeButtonRef = useRef(null)
  const previouslyFocusedElementRef = useRef(null)
  const closeTimerRef = useRef(null)
  const isClosingRef = useRef(false)

  useEffect(() => {
    if (!promotionalPopup.enabled) {
      return undefined
    }

    previouslyFocusedElementRef.current = document.activeElement
    const frameId = window.requestAnimationFrame(() => setIsVisible(true))

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) {
      return undefined
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isMounted])

  useEffect(() => {
    if (!isVisible) {
      return undefined
    }

    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closePopup()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isVisible])

  function closePopup() {
    if (isClosingRef.current) {
      return
    }

    isClosingRef.current = true
    setIsVisible(false)
    closeTimerRef.current = window.setTimeout(() => {
      setIsMounted(false)
      previouslyFocusedElementRef.current?.focus?.()
    }, CLOSE_ANIMATION_DURATION)
  }

  function openWhatsApp() {
    const { whatsappNumber, whatsappMessage } = promotionalPopup
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`

    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  if (!promotionalPopup.enabled || !isMounted) {
    return null
  }

  const sessionName = promotionalPopup.imageAlt.split(" for ")[0]

  return (
    <div
      className={`promotional-popup-overlay ${isVisible ? "is-visible" : "is-closing"}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePopup()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${promotionalPopup.imageAlt} promotion`}
      data-campaign-id={promotionalPopup.id}
    >
      <div
        className={`promotional-popup-dialog ${isVisible ? "is-visible" : "is-closing"}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            closePopup()
          }}
          className="absolute -right-2 -top-2 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full border-2 border-white bg-[#1E2A52] text-3xl font-light leading-none text-white shadow-lg transition hover:bg-[#0353A4] focus:outline-none focus:ring-4 focus:ring-white/80 sm:-right-4 sm:-top-4"
          aria-label="Close promotional popup"
        >
          ×
        </button>
        <button
          type="button"
          onClick={openWhatsApp}
          className="promotional-popup-poster"
          aria-label={`Open WhatsApp to enquire about the ${sessionName}`}
        >
          {!isImageLoaded && (
            <span className="promotional-popup-loader" aria-live="polite">
              <span className="promotional-popup-loader-spinner" aria-hidden="true" />
              <span className="sr-only">Loading promotional poster</span>
            </span>
          )}
          <img
            src={promotionalPopup.imageSrc}
            alt={promotionalPopup.imageAlt}
            className={`promotional-popup-image ${isImageLoaded ? "is-loaded" : ""}`}
            decoding="async"
            fetchPriority="high"
            onLoad={() => setIsImageLoaded(true)}
          />
        </button>
      </div>
    </div>
  )
}

export default PromotionalPopup
