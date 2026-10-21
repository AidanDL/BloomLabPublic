import { describe, expect, it } from 'vitest'
import { PLACEHOLDER, isOnPlayStore, site, unsetPlaceholders } from './site.config'

describe('site config', () => {
  it('reports every field still set to the placeholder', () => {
    const missing = unsetPlaceholders({ ...site, contactEmail: PLACEHOLDER, developerName: PLACEHOLDER })
    expect(missing).toEqual(expect.arrayContaining(['contactEmail', 'developerName']))
  })

  it('reports nothing once all fields are filled', () => {
    expect(unsetPlaceholders(site)).toEqual([])
  })

  it('treats the Play Store link as live only once it is a real https URL', () => {
    expect(isOnPlayStore({ ...site, playStoreUrl: PLACEHOLDER })).toBe(false)
    expect(
      isOnPlayStore({ ...site, playStoreUrl: 'https://play.google.com/store/apps/details?id=com.littlefathom.bloom_lab' }),
    ).toBe(true)
  })

  it('knows the Android package, domain and policy date', () => {
    expect(site.androidPackage).toBe('com.littlefathom.bloom_lab')
    expect(site.siteUrl).toBe('https://bloomlab.littlefathom.com')
    expect(site.privacyLastUpdated).toBe('6 October 2026')
  })
})
