import type { ReactNode } from 'react'
import { paths } from '../paths'
import { display, site } from '../site.config'
import { AppIcon } from './AppIcon'

/** Translucent sticky top bar with the logo and in-page navigation; content scrolls underneath. */
export function SiteHeader({ onHome }: { onHome: boolean }) {
  const anchor = (id: string) => (onHome ? `#${id}` : `${paths.home}#${id}`)
  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href={paths.home}>
          <AppIcon size={32} className="brand-icon" />
          {site.gameName}
        </a>
        <nav className="site-nav" aria-label="Main">
          <a className="optional" href={anchor('features')}>
            Features
          </a>
          <a className="optional" href={anchor('screenshots')}>
            Screenshots
          </a>
          <a href={paths.privacy}>Privacy</a>
        </nav>
      </div>
    </header>
  )
}

/** Footer with privacy link, contact, the developer's site and copyright. */
export function SiteFooter() {
  const email = display(site.contactEmail, '')
  return (
    <footer className="site-footer">
      <div className="container">
        <span>
          © {site.copyrightYear} {display(site.developerName, site.gameName)}
        </span>
        <nav aria-label="Footer">
          <a href={paths.privacy}>Privacy policy</a>
          {email ? <a href={`mailto:${email}`}>Contact: {email}</a> : null}
          <a href={site.developerUrl}>{display(site.developerName, 'Developer')} website</a>
        </nav>
      </div>
    </footer>
  )
}

/** Skip link, header, main content and footer. */
export function Page({ onHome, children }: { onHome: boolean; children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader onHome={onHome} />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  )
}
