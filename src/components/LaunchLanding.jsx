import { useState } from "react"

const launchIds = ["DIVYA DINESH", "DR. TARUN KURIAN JOSEPH"]

const confetti = Array.from({ length: 52 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  delay: `${(index % 13) * 0.22}s`,
  duration: `${3.2 + (index % 6) * 0.38}s`,
  color: ["#E93F82", "#FFD166", "#FF9BB9", "#C99522"][index % 4],
}))

function LaunchLanding({ onEnter }) {
  const [launchId, setLaunchId] = useState("")
  const [error, setError] = useState("")
  const [isReferenceMissing, setIsReferenceMissing] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const normalizedLaunchId = launchId.trim().replace(/\s+/g, " ").toUpperCase()

    if (!launchIds.includes(normalizedLaunchId)) {
      setError("Please enter the valid Launch ID.")
      return
    }

    onEnter()
  }

  function formatLaunchId(value) {
    const normalizedValue = value.trimStart()

    if (
      normalizedValue.length === 1
      && normalizedValue.toUpperCase() === "T"
      && !launchId.toUpperCase().startsWith("DR.")
    ) {
      return `Dr. ${normalizedValue}`
    }

    return value
  }

  return (
    <main className="launch-page launch-reference-page">
      <div className="launch-confetti" aria-hidden="true">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              backgroundColor: piece.color,
            }}
          />
        ))}
      </div>

      <div className="launch-reference-artboard">
        <img
          src="/launch-reference.png"
          alt="Official BreastBuddies launch event"
          className="launch-reference-image"
          onLoad={() => setIsReferenceMissing(false)}
          onError={() => setIsReferenceMissing(true)}
        />
        {isReferenceMissing && (
          <div className="launch-reference-missing">
            <p>Launch reference image is missing.</p>
            <span>Add it as public/launch-reference.png</span>
          </div>
        )}
        <form className="launch-reference-form" onSubmit={handleSubmit} aria-label="Chief Guest Launch Access">
          <label className="sr-only" htmlFor="launch-id">Enter Launch ID</label>
          <input
            id="launch-id"
            type="text"
            value={launchId}
            onChange={(event) => {
              setLaunchId(formatLaunchId(event.target.value))
              setError("")
            }}
            placeholder=""
            autoComplete="off"
          />
          {error && <p className="launch-reference-error">{error}</p>}
          <button className="launch-reference-enter" type="submit" aria-label="Enter launch page">
            {"\u{1F680} ENTER"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default LaunchLanding
