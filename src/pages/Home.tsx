import { AppIcon } from '../components/AppIcon'
import { Page } from '../components/SiteChrome'
import { StoreBadge } from '../components/StoreBadge'
import { featureGraphic, icon, screenshotFallback, screenshotOriginal, screenshotSrcSet, screenshots } from '../assets'
import { genes, mutations, wings } from '../game'
import { site } from '../site.config'

const features = [
  {
    icon: '🌙',
    title: 'Keeps growing while you’re away',
    text: 'Every bloom earns coins on its own. Close the app and your greenhouse keeps ticking over – come back to a fuller purse.',
  },
  {
    icon: '🏡',
    title: 'Three greenhouse wings',
    text: `Start in the ${wings[0]}, then open the ${wings[1]} and the ${wings[2]} – each with its own native flowers to collect and cross.`,
  },
  {
    icon: '📋',
    title: 'The Order Board',
    text: 'Florists, wedding planners and herbalists ask for flowers with particular traits. Breed a match, fill the order, earn Dew.',
  },
  {
    icon: '📖',
    title: 'The Botanidex',
    text: '128 discoveries to make. Every new find is pressed into your collection for good.',
  },
  {
    icon: '🌱',
    title: 'Rebirth & Heritage',
    text: 'When you’re ready, start your greenhouse afresh and grow a permanent Heritage tree that stays with you every time.',
  },
  {
    icon: '☕',
    title: 'Cozy by design',
    text: 'No plant ever dies. No withering, no punishment for a busy week – just a calm place to tinker whenever you like.',
  },
]

const pressKit = [
  { label: 'App icon', detail: '1024 × 1024 PNG', href: icon.original },
  { label: 'App icon (store)', detail: '512 × 512 PNG', href: icon.store },
  { label: 'Feature graphic', detail: '1024 × 500 PNG', href: featureGraphic.original },
  ...screenshots.map((s, i) => ({
    label: `Screenshot ${i + 1}: ${s.caption}`,
    detail: '1080 × 1920 PNG',
    href: screenshotOriginal(s.id),
  })),
]

/** Marketing landing page. */
export function Home() {
  return (
    <Page onHome>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-copy">
            <AppIcon size={88} className="hero-icon" />
            <h1 id="hero-title">{site.gameName}</h1>
            <p className="tagline">{site.tagline}</p>
            <p className="lede">
              A cozy idle greenhouse for Android. Cross-pollinate your flowers, watch their genes mix, and coax out
              blooms nobody has ever seen.
            </p>
            <StoreBadge />
          </div>
          <div className="hero-art">
            <picture>
              <source type="image/webp" srcSet={featureGraphic.srcSet} sizes="(min-width: 1120px) 1080px, calc(100vw - 32px)" />
              <img src={featureGraphic.fallback} width={1024} height={500} alt={featureGraphic.alt} fetchPriority="high" />
            </picture>
          </div>
        </div>
      </section>

      <section id="features" className="features" aria-labelledby="features-title">
        <div className="container">
          <p className="eyebrow">How it grows</p>
          <h2 id="features-title" className="section-title">
            Every flower is one of a kind
          </h2>

          <div className="spotlights">
            <article className="spotlight sage">
              <div className="icon" aria-hidden="true">
                🧬
              </div>
              <h3>Real, inheritable genes</h3>
              <p>
                Every plant carries its own genetic code. Cross two parents and their seedlings inherit a mix of traits –
                just like a real breeder’s notebook.
              </p>
              <ul className="chips" aria-label="Genes">
                {genes.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </article>
            <article className="spotlight brass">
              <div className="icon" aria-hidden="true">
                ✨
              </div>
              <h3>Breed for rare mutations</h3>
              <p>
                Every so often a seedling surprises you. Chase the rarest mutations and show them off in your
                greenhouse.
              </p>
              <ul className="chips mutations" aria-label="Mutations">
                {mutations.map((m) => (
                  <li key={m} className={`m-${m.toLowerCase()}`}>
                    {m}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <ul className="cards" aria-label="More features">
            {features.map((f) => (
              <li className="card" key={f.title}>
                <div className="icon" aria-hidden="true">
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="screenshots" className="gallery" aria-labelledby="gallery-title">
        <div className="container">
          <p className="eyebrow">A peek inside</p>
          <h2 id="gallery-title" className="section-title">
            Screenshots
          </h2>
        </div>
        <ul className="shots" tabIndex={0} aria-label="Screenshots (scrolls sideways)">
          {screenshots.map((s) => (
            <li key={s.id}>
              <figure>
                <a className="shot" href={screenshotOriginal(s.id)}>
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={screenshotSrcSet(s.id)}
                      sizes="(min-width: 900px) 260px, 62vw"
                    />
                    <img src={screenshotFallback(s.id)} width={1080} height={1920} alt={s.alt} loading="lazy" decoding="async" />
                  </picture>
                </a>
                <figcaption>{s.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="cta" aria-labelledby="cta-title">
        <div className="container">
          <h2 id="cta-title" className="section-title">
            Your greenhouse is waiting
          </h2>
          <p>Plant a seed, cross a pair, and see what blooms.</p>
          <StoreBadge />
        </div>
      </section>

      <section id="press" className="press" aria-labelledby="press-title">
        <div className="container">
          <h2 id="press-title">Press kit: icon, feature graphic, screenshots</h2>
          <p>Full-size originals, free to use when writing about {site.gameName}.</p>
          <ul className="press-list">
            {pressKit.map((p) => (
              <li key={p.href}>
                <a href={p.href} download>
                  {p.label}
                </a>
                <span>{p.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Page>
  )
}
