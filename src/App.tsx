import { useEffect, useId, useRef, useState } from 'react'

const WORK_ITEMS = [
  {
    index: '01',
    title: 'mit Karte, bitte',
    href: 'https://mitkarte-bitte.de',
    url: 'mitkarte-bitte.de',
    description:
      'A German verb-conjugation trainer built for grammar depth over streaks: full conjugation tables, spaced repetition, no gamified filler. Installable PWA.',
  },
  {
    index: '02',
    title: 'All-in-One Calculator',
    href: 'https://variedvault.github.io/all-in-one/',
    url: 'variedvault.github.io/all-in-one',
    description:
      'A browser-based suite of clean financial calculators covering German statutory pension, emergency fund, net worth, and FIRE. No accounts and no backend; everything runs and stays in your browser, with export and import for moving data between devices.',
  },
  {
    index: '03',
    title: 'Life Line',
    href: 'https://variedvault.github.io/life-line/',
    url: 'variedvault.github.io/life-line',
    description:
      "Renders a life as a transit-map SVG: time-proportional rail, category-colored segments, a live 'today' marker and shareable link. Single-file static web app.",
  },
]

const CERTIFICATIONS = [
  'Salesforce Certified Platform Administrator',
  'Salesforce Certified Business Analyst',
  'Salesforce Certified Agentforce Specialist',
]

const EXPERIENCE = [
  {
    role: 'Salesforce Administrator & Business Analyst',
    company: 'HomeToGo GmbH',
    companyUrl: 'https://www.hometogo.de/',
    location: 'Berlin',
    date: 'July 2022 - Present',
  },
  {
    role: 'Technical Consultant & Salesforce Administrator',
    company: 'team neusta',
    companyUrl: 'https://www.team-neusta.de/en',
    location: 'Berlin',
    date: 'June 2020 - March 2022',
  },
  {
    role: 'Technical Consultant',
    company: 'Open as App GmbH',
    companyUrl: 'https://openasapp.com/',
    location: 'Berlin',
    date: 'August 2018 - May 2020',
  },
  {
    role: 'Programmer Analyst',
    company: 'Cognizant',
    companyUrl: 'https://www.cognizant.com/us/en',
    location: 'Chennai',
    date: 'January 2016 - September 2017',
  },
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Fixed lime bar at the top that fills with scroll depth. */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    function update() {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      setProgress(scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0)
      ticking = false
    }
    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-fill" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  )
}

/** Fade + rise scroll reveal for any element carrying `.reveal`. No-op under reduced motion. */
function useScrollReveal(reducedMotion: boolean) {
  useEffect(() => {
    if (reducedMotion) return
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [reducedMotion])
}

/** Ambient aurora blobs drifting slowly behind the page content. Pure CSS, decorative. */
function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora-blob aurora-blob--lime" />
      <div className="aurora-blob aurora-blob--cyan" />
      <div className="aurora-blob aurora-blob--lime2" />
    </div>
  )
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
  /** Held particles (a hovered BurstWord) don't age or fade - they just decelerate to a
   *  rest position and stay fully visible until released (mouse leaves the word). */
  held?: boolean
  groupId?: string
}

type TextBurstDetail = {
  groupId: string
  text: string
  rect: { left: number; top: number; width: number; height: number }
  fontSize: number
  fontWeight: string
  fontFamily: string
  color: string
}

/**
 * A single full-page canvas layered behind content: a soft glow that eases toward the
 * cursor, a small radial particle burst on click, and a text-shaped particle explosion
 * for BurstWord (samples the word's actual glyph pixels via an offscreen canvas, so the
 * letters themselves appear to burst apart). Skipped entirely under reduced motion.
 * Plain Canvas 2D, no libraries.
 */
function CursorFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const pointerRef = useRef({ x: -9999, y: -9999, active: false })
  const glowRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
    resize()
    window.addEventListener('resize', resize)

    function onPointerMove(e: PointerEvent) {
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true }
    }
    function onPointerLeave() {
      pointerRef.current.active = false
    }
    const MAX_PARTICLES = 1400
    function capParticles() {
      if (particlesRef.current.length > MAX_PARTICLES) {
        particlesRef.current.splice(0, particlesRef.current.length - MAX_PARTICLES)
      }
    }
    function spawnBurst(x: number, y: number, count = 22) {
      const rootStyle = getComputedStyle(document.documentElement)
      const colors = [
        rootStyle.getPropertyValue('--lime').trim() || '#c6ff3a',
        rootStyle.getPropertyValue('--cyan').trim() || '#7ef9ff',
      ]
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
        const speed = 1.4 + Math.random() * 2.6
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 36 + Math.random() * 20,
          color: colors[i % colors.length],
          size: 2.4,
        })
      }
      capParticles()
    }
    function onClick(e: MouseEvent) {
      spawnBurst(e.clientX, e.clientY)
    }

    // Samples the word's own rendered glyph shape (off-screen canvas + getImageData) so
    // the particles trace the real letterforms exploding outward from their center, not
    // just a generic scatter over the word's bounding box. Particles are spawned `held`:
    // they decelerate to a rest position and then just sit there, fully visible, for as
    // long as the word stays hovered - like debris from a single explosion, not a
    // repeating one. releaseTextBurst() below is what makes them fade away.
    function spawnTextBurst(detail: TextBurstDetail) {
      const { groupId, text, rect, fontSize, fontWeight, fontFamily, color } = detail
      const w = Math.ceil(rect.width)
      const h = Math.ceil(rect.height)
      if (w <= 0 || h <= 0) return
      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d')
      if (!octx) return
      octx.fillStyle = '#fff'
      octx.textBaseline = 'alphabetic'
      octx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
      octx.fillText(text, 0, h * 0.82)
      const pixels = octx.getImageData(0, 0, w, h).data
      const step = Math.max(2, Math.round(Math.max(w, h) / 85))
      const cx = w / 2
      const cy = h / 2
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const alpha = pixels[(y * w + x) * 4 + 3]
          if (alpha <= 120) continue
          const dx = x - cx
          const dy = y - cy
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const speed = 0.7 + Math.random() * 1.1
          particlesRef.current.push({
            x: rect.left + x,
            y: rect.top + y,
            vx: (dx / dist) * speed + (Math.random() - 0.5) * 0.3,
            vy: (dy / dist) * speed + (Math.random() - 0.5) * 0.3 - 0.15,
            life: 0,
            maxLife: 26 + Math.random() * 20,
            color,
            size: 1.6,
            held: true,
            groupId,
          })
        }
      }
      capParticles()
    }
    // Converts a hovered word's still-held particles into normal fading particles, so
    // they drift away and vanish over their usual lifespan starting from right now.
    function releaseTextBurst(groupId: string) {
      for (const particle of particlesRef.current) {
        if (particle.held && particle.groupId === groupId) {
          particle.held = false
          particle.life = 0
        }
      }
    }
    function onCustomBurst(e: Event) {
      const detail = (e as CustomEvent<{ x: number; y: number; count?: number }>).detail
      if (detail) spawnBurst(detail.x, detail.y, detail.count ?? 14)
    }
    function onTextBurst(e: Event) {
      const detail = (e as CustomEvent<TextBurstDetail>).detail
      if (detail) spawnTextBurst(detail)
    }
    function onTextRelease(e: Event) {
      const detail = (e as CustomEvent<{ groupId: string }>).detail
      if (detail) releaseTextBurst(detail.groupId)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('click', onClick)
    window.addEventListener('portfolio:burst', onCustomBurst)
    window.addEventListener('portfolio:text-burst', onTextBurst)
    window.addEventListener('portfolio:text-release', onTextRelease)

    let raf = 0
    function frame() {
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      // Cursor glow: eases toward the real pointer position for a soft trailing feel.
      const g = glowRef.current
      const p = pointerRef.current
      if (p.active) {
        g.x += (p.x - g.x) * 0.08
        g.y += (p.y - g.y) * 0.08
        const radius = 220
        const gradient = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, radius)
        gradient.addColorStop(0, 'rgba(198, 255, 58, 0.10)')
        gradient.addColorStop(0.5, 'rgba(126, 249, 255, 0.05)')
        gradient.addColorStop(1, 'rgba(126, 249, 255, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(g.x - radius, g.y - radius, radius * 2, radius * 2)
      }

      // Click firework + text-burst particles. Held particles (a still-hovered
      // BurstWord) decelerate but never age/fade - they stay fully visible until
      // released, at which point they fade out like any other particle.
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.96
        particle.vy *= 0.96

        if (particle.held) {
          ctx.globalAlpha = 1
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          continue
        }

        particle.life++
        const t = particle.life / particle.maxLife
        if (t >= 1) {
          particles.splice(i, 1)
          continue
        }
        ctx.globalAlpha = 1 - t
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * (1 - t) + 0.4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('click', onClick)
      window.removeEventListener('portfolio:burst', onCustomBurst)
      window.removeEventListener('portfolio:text-burst', onTextBurst)
      window.removeEventListener('portfolio:text-release', onTextRelease)
    }
  }, [])

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden="true" />
}

/**
 * Wraps a word so hovering it makes the word itself burst apart, once, into particles
 * shaped like its own glyphs (via the shared CursorFX canvas). The particles settle and
 * hold there - fully visible, not fading - for as long as the pointer stays over the
 * word; only on mouseleave do they get released to fade away as the real text fades
 * back in. `disabled` (pass reduced motion) renders a plain span with no effect at all.
 */
function BurstWord({
  children,
  className,
  disabled,
}: {
  children: string
  className?: string
  disabled?: boolean
}) {
  const [bursting, setBursting] = useState(false)
  const elRef = useRef<HTMLSpanElement>(null)
  const groupId = useId()

  function handleEnter() {
    if (disabled) return
    const el = elRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    window.dispatchEvent(
      new CustomEvent<TextBurstDetail>('portfolio:text-burst', {
        detail: {
          groupId,
          text: children,
          rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
          fontSize: parseFloat(cs.fontSize),
          fontWeight: cs.fontWeight,
          fontFamily: cs.fontFamily,
          color: cs.color,
        },
      })
    )
    setBursting(true)
  }

  function handleLeave() {
    if (disabled) return
    window.dispatchEvent(new CustomEvent('portfolio:text-release', { detail: { groupId } }))
    setBursting(false)
  }

  return (
    <span
      ref={elRef}
      className={`burst-word${className ? ` ${className}` : ''}${bursting ? ' is-bursting' : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </span>
  )
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  )
}

function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="wordmark">
          <span className="wordmark-first">Balaji</span> Jayakumar
        </a>
      </div>
    </header>
  )
}

function App() {
  const reducedMotion = usePrefersReducedMotion()
  useScrollReveal(reducedMotion)

  return (
    <div className="portfolio" data-reduced-motion={reducedMotion || undefined}>
      {!reducedMotion && <CursorFX />}
      <AuroraBackground />
      <ScrollProgressBar />
      <Nav />

      <main>
        <section id="top" className="opening reveal">
          <h1 className="headline">
            A Salesforce professional dedicated to building efficient business{' '}
            <span className="lime">solutions.</span>
          </h1>
          <ul className="cert-pills">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert} className="pill">
                <span className="pill-mark" aria-hidden="true">
                  ✦
                </span>
                {cert}
              </li>
            ))}
          </ul>
        </section>

        <section className="skills-section reveal">
          <p className="eyebrow">Skills</p>
          <div className="skills-grid">
            <div className="skill-col">
              <h3>Salesforce Platform</h3>
              <p>
                Sales Cloud · Service Cloud · Account Engagement (Pardot) · Sales Engagement ·
                Agentforce · Flows · Configuration · Data Management
              </p>
            </div>
            <div className="skill-col">
              <h3>Business Analysis</h3>
              <p>
                Agile · Scrum · Requirements Gathering · Stakeholder Management · User Stories ·
                UAT · Process Mapping
              </p>
            </div>
            <div className="skill-col">
              <h3>Tools</h3>
              <p>Slack · Jira · Confluence · Miro · Salesforce Inspector Reloaded</p>
            </div>
          </div>
        </section>

        <section id="about" className="about-section reveal">
          <div className="about-grid">
            <div className="about-statement">
              <h2>
                Simplifying business <span className="lime">processes.</span>
              </h2>
            </div>
            <div className="about-copy">
              <p className="eyebrow">About</p>
              <p>
                I like working on real-world problems and figuring out how to make things simpler
                and work better. Most of the time it comes down to understanding what&rsquo;s not
                working, breaking it down, and fixing it in a way that helps people day to day.
              </p>
              <p>
                I&rsquo;m not a fan of overcomplicating things. I prefer solutions that are clear,
                practical, and easy to use. Outside of work I explore food, travel, manage personal
                finances, and play badminton.
              </p>
            </div>
          </div>
        </section>

        <section className="experience-section reveal">
          <p className="eyebrow">My Experience</p>
          <div className="experience-list">
            {EXPERIENCE.map((job) => (
              <div className="experience-item" key={job.role}>
                <div className="experience-main">
                  <h3>{job.role}</h3>
                  <p className="experience-company">
                    <a href={job.companyUrl} target="_blank" rel="noopener noreferrer">
                      {job.company}
                    </a>
                    , {job.location}
                  </p>
                </div>
                <p className="experience-date">{job.date}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="work-section reveal">
          <p className="eyebrow">Projects</p>
          <div className="work-list">
            {WORK_ITEMS.map((item) => (
              <a
                key={item.index}
                className="work-card"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title}: view project (opens in a new tab)`}
              >
                <div className="work-body">
                  <span className="work-index" aria-hidden="true">
                    {item.index}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="work-url">
                    {item.url}
                    <ExternalLinkIcon />
                  </span>
                </div>
                <span className="work-cue" aria-hidden="true">
                  View project →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section reveal">
          <h2 className="contact-headline">
            <BurstWord disabled={reducedMotion}>Let&rsquo;s</BurstWord>{' '}
            <BurstWord className="lime" disabled={reducedMotion}>
              Build.
            </BurstWord>
          </h2>
          <a className="contact-email" href="mailto:balaji.jayakumar17@gmail.com">
            balaji.jayakumar17@gmail.com
          </a>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/balaji-jayakumar/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.salesforce.com/trailblazer/bjayakumar" target="_blank" rel="noopener noreferrer">
              Trailhead
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Balaji Jayakumar</p>
      </footer>
    </div>
  )
}

export default App
