function WhatsAppCallout({
  className = "",
  bubbleClassName = "",
  arrowClassName = "",
  style,
  containerRef = null,
  visible,
  heading = "Need help?",
  bodyLines = [
    "Not sure where to start?",
    "Chat with us on WhatsApp and we’ll guide you toward the support that feels right for you.",
  ],
  statusText = "We usually reply within 2 hours during the day.",
  headingClassName = "",
  bodyClassName = "",
  statusClassName = "",
}) {
  const visibilityClasses = visible === undefined
    ? "pointer-events-none translate-y-1 scale-[0.98] opacity-0 duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:duration-200 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-focus-within:duration-200"
    : visible
    ? "pointer-events-auto translate-y-0 scale-100 opacity-100 duration-200"
    : "pointer-events-none translate-y-1 scale-[0.98] opacity-0 duration-150"

  return (
    <div
      ref={containerRef}
      style={style}
      className={`pointer-events-none absolute z-30 w-[280px] max-w-[320px] ${className}`}
    >
      <div className={`relative rounded-[18px] border border-[#BBF7D0] bg-[#F0FBF5] p-[18px] text-left shadow-[0_10px_24px_rgba(6,78,59,0.07)] transition-[opacity,transform] ease-out motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none ${visibilityClasses} ${bubbleClassName}`}>
        <span
          aria-hidden="true"
          className={`absolute h-3.5 w-3.5 rotate-45 border-[#BBF7D0] bg-[#F0FBF5] ${arrowClassName}`}
        />
        <h2 className={`font-playfair text-[18px] font-semibold leading-tight text-[#064E3B] sm:text-[20px] ${headingClassName}`}>
          <span className="mr-2" aria-hidden="true">{"\uD83D\uDC9A"}</span>
          {heading}
        </h2>
        {bodyLines.map((line) => (
          <p key={line} className={`mt-2 font-inter text-[15px] leading-[1.55] text-[#334155] sm:text-[16px] ${bodyClassName}`}>
            {line}
          </p>
        ))}
        <p className={`mt-3 inline-flex items-start gap-2 font-inter text-[14px] font-medium leading-[1.45] text-[#334155] ${statusClassName}`}>
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#22C55E]" aria-hidden="true" />
          <span>{statusText}</span>
        </p>
      </div>
    </div>
  )
}

export default WhatsAppCallout
