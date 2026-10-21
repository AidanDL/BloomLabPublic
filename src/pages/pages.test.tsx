import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { screenshots } from '../assets'
import { render as renderToHtml } from '../entries/ssr'
import { site } from '../site.config'
import { genes, mutations, wings } from '../game'
import { Home } from './Home'
import { Privacy } from './Privacy'
import { policySections } from './policySections'

describe('Home', () => {
  it('shows the title, tagline and a Play Store call to action', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1, name: site.gameName })).toBeInTheDocument()
    expect(screen.getByText(site.tagline)).toBeInTheDocument()
    expect(screen.getAllByText('Google Play').length).toBeGreaterThan(0)
  })

  it('shows "coming soon" rather than a dead link while the listing is not live', () => {
    render(<Home />)
    expect(screen.getAllByText('Coming soon to').length).toBeGreaterThan(0)
    expect(screen.queryByRole('link', { name: /google play/i })).toBeNull()
  })

  it('lists every gene and every rare mutation', () => {
    render(<Home />)
    const geneList = screen.getByRole('list', { name: 'Genes' })
    expect(within(geneList).getAllByRole('listitem').map((li) => li.textContent)).toEqual([...genes])
    const mutationList = screen.getByRole('list', { name: 'Mutations' })
    expect(within(mutationList).getAllByRole('listitem').map((li) => li.textContent)).toEqual([...mutations])
  })

  it('covers the core features', () => {
    render(<Home />)
    const text = document.body.textContent ?? ''
    for (const wing of wings) expect(text).toContain(wing)
    for (const phrase of ['Order Board', 'Botanidex', '128', 'Heritage', 'No plant ever dies', 'while you’re away'])
      expect(text).toContain(phrase)
  })

  it('shows every screenshot with alt text, linking to the full-size original', () => {
    render(<Home />)
    const gallery = screen.getByRole('list', { name: /screenshots/i })
    const images = within(gallery).getAllByRole('img')
    expect(images).toHaveLength(screenshots.length)
    for (const img of images) expect(img.getAttribute('alt')?.length).toBeGreaterThan(20)
    const links = within(gallery).getAllByRole('link')
    expect(links.map((a) => a.getAttribute('href'))).toEqual(screenshots.map((s) => `/assets/screenshots/${s.id}.png`))
  })

  it('has a press kit linking to the icon, feature graphic and screenshots', () => {
    render(<Home />)
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'))
    expect(hrefs).toContain('/assets/icon-1024.png')
    expect(hrefs).toContain('/assets/feature-graphic.png')
  })

  it('links to the privacy policy from header and footer', () => {
    render(<Home />)
    const links = screen.getAllByRole('link', { name: /privacy/i })
    expect(links.length).toBeGreaterThanOrEqual(2)
    for (const link of links) expect(link).toHaveAttribute('href', '/privacy/')
  })

  it('gives the contact address and copyright in the footer', () => {
    render(<Home />)
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: /contact/i })).toHaveAttribute('href', `mailto:${site.contactEmail}`)
    expect(footer.textContent).toContain(`© ${site.copyrightYear} ${site.developerName}`)
    expect(within(footer).getByRole('link', { name: /little fathom website/i })).toHaveAttribute(
      'href',
      'https://littlefathom.com',
    )
  })
})

describe('Privacy policy', () => {
  it('has every required section in order', () => {
    render(<Privacy />)
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings).toEqual([...policySections])
  })

  it('names every Google service the game uses', () => {
    render(<Privacy />)
    const text = document.body.textContent ?? ''
    for (const service of [
      'Google Play Games',
      'Saved Games',
      'Google AdMob',
      'User Messaging Platform',
      'Firebase Analytics',
      'Firebase Crashlytics',
      'Firebase Remote Config',
      'Firebase Cloud Messaging',
      'Google Play Billing',
    ])
      expect(text).toContain(service)
  })

  it('links to Google and Firebase privacy pages', () => {
    render(<Privacy />)
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'))
    expect(hrefs).toContain('https://policies.google.com/privacy')
    expect(hrefs).toContain('https://policies.google.com/technologies/partner-sites')
    expect(hrefs).toContain('https://firebase.google.com/support/privacy')
  })

  it('explains how to change ad consent in the game and that data is not sold', () => {
    render(<Privacy />)
    expect(screen.getAllByText(/Ad privacy choices/).length).toBeGreaterThan(0)
    expect(screen.getByText('We do not sell your personal data.')).toBeInTheDocument()
  })

  it('lists no sensitive permissions', () => {
    render(<Privacy />)
    expect(
      screen.getByText('The game does not request location, camera, microphone, contacts or storage permissions.'),
    ).toBeInTheDocument()
  })

  it('names the developer and links the contact email, with no placeholders left', () => {
    render(<Privacy />)
    expect(screen.getAllByText(site.contactEmail).length).toBeGreaterThan(0)
    expect(document.body.textContent).toContain(site.developerName)
    expect(screen.queryByText('[contact email]')).toBeNull()
    expect(screen.queryByText('[developer name]')).toBeNull()
  })

  it('states the last-updated date and the Android package', () => {
    render(<Privacy />)
    expect(screen.getByText(`Last updated: ${site.privacyLastUpdated}`)).toBeInTheDocument()
    expect(screen.getByText(site.androidPackage)).toBeInTheDocument()
  })
})

describe('pre-render', () => {
  it('renders both pages to static HTML with their content', () => {
    expect(renderToHtml('home')).toContain(site.tagline)
    const privacy = renderToHtml('privacy')
    expect(privacy).toContain('Privacy policy')
    expect(privacy).toContain('Advertising (Google AdMob)')
    expect(privacy).toContain('Firebase Crashlytics')
  })
})
