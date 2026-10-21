/** Marker for values the owner must fill in before the site goes live. */
export const PLACEHOLDER = '__FILL_ME_IN__'

/** Everything site-specific lives here. Replace every PLACEHOLDER before linking the domain. */
export interface SiteConfig {
  /** Game name as shown to players. */
  gameName: string
  /** One-line hook. */
  tagline: string
  /** Who publishes the game (shown in the footer and privacy policy). */
  developerName: string
  /** The developer's own website (linked from the footer). */
  developerUrl: string
  /** Where players and reviewers can reach the developer about privacy. */
  contactEmail: string
  /** Canonical origin of this site, without a trailing slash. */
  siteUrl: string
  /** Google Play listing; leave as PLACEHOLDER until the app is live to show "Coming soon". */
  playStoreUrl: string
  /** Android application id. */
  androidPackage: string
  /** Date the privacy policy last changed (shown on the policy). */
  privacyLastUpdated: string
  /** Year shown in the footer copyright. */
  copyrightYear: number
}

export const site: SiteConfig = {
  gameName: 'Bloom Lab',
  tagline: 'Breed rare flowers. Discover mutations.',
  developerName: 'Little Fathom',
  developerUrl: 'https://littlefathom.com',
  contactEmail: 'info@littlefathom.com',
  siteUrl: 'https://bloomlab.littlefathom.com',
  playStoreUrl: PLACEHOLDER,
  androidPackage: 'com.littlefathom.bloom_lab',
  privacyLastUpdated: '6 October 2026',
  copyrightYear: 2026,
}

/** Names of fields that must be filled before launch. `playStoreUrl` may stay unset while "coming soon". */
export function unsetPlaceholders(config: SiteConfig = site): (keyof SiteConfig)[] {
  const required: (keyof SiteConfig)[] = ['developerName', 'contactEmail']
  return required.filter((key) => config[key] === PLACEHOLDER)
}

/** Whether the Play Store link is live yet. */
export function isOnPlayStore(config: SiteConfig = site): boolean {
  return config.playStoreUrl !== PLACEHOLDER && config.playStoreUrl.startsWith('https://')
}

/** Display text for a value that may still be a placeholder. */
export function display(value: string, fallback: string): string {
  return value === PLACEHOLDER ? fallback : value
}
