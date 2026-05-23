import { useEffect, useRef, useState } from "react"

function ScrollSection({ side = "left", eyebrow, title, text, image, imageAlt, linkLabel, linkHref, footerText }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className={`section-reveal ${side === "right" ? "reveal-right" : "reveal-left"} ${inView ? "visible" : ""}`}>
      <div className="section-panel">
        <div className="reveal-image">
          <img src={image} alt={imageAlt} className="reveal-image-img" />
        </div>
        <div className="reveal-copy">
          {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
          <h2>{title}</h2>
          <p>{text}</p>
          {linkLabel && linkHref ? (
            <a href={linkHref} className="section-link" target="_blank" rel="noreferrer">
              {linkLabel}
            </a>
          ) : null}
          {footerText ? (
            <footer className="section-footer">
              <p>{footerText}</p>
            </footer>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default ScrollSection
