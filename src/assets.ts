/** Every image the site serves, at stable public URLs (see public/assets). */
const web = '/assets/web'

export interface Screenshot {
  /** File stem, e.g. `01-meadow`. */
  id: string
  /** Caption printed on the store screenshot. */
  caption: string
  alt: string
}

export const screenshots: Screenshot[] = [
  {
    id: '01-meadow',
    caption: 'Grow a greenhouse',
    alt: 'The Meadow wing: a grid of potted flowers, each earning coins per second, with tabs for Meadow, Desert and Rainforest.',
  },
  {
    id: '02-reveal',
    caption: 'Breed rare mutations',
    alt: 'A “Mutation!” reveal card showing a rare Prismatic Glowing Blue Daisy with rainbow petals and its gene tags.',
  },
  {
    id: '03-detail',
    caption: 'Every plant is unique',
    alt: 'Detail sheet for a legendary Golden Yellow Sunflower listing its genes, petal count, value and income.',
  },
  {
    id: '04-rainforest',
    caption: 'Open new wings',
    alt: 'The Rainforest wing filled with exotic potted flowers, some marked as favourites.',
  },
  {
    id: '05-dex',
    caption: 'Complete the Botanidex',
    alt: 'The Botanidex collection at 52 of 128 discoveries, with found flowers shown and undiscovered ones as silhouettes.',
  },
  {
    id: '06-orders',
    caption: 'Fill orders, earn Dew',
    alt: 'The Order Board with requests from a Florist, a Wedding Planner and a Herbalist, each offering coins and Dew.',
  },
]

/** Full-size original of a screenshot (1080×1920 PNG). */
export const screenshotOriginal = (id: string) => `/assets/screenshots/${id}.png`

/** WebP `srcset` for a screenshot at the generated widths. */
export const screenshotSrcSet = (id: string) =>
  [360, 540, 720].map((w) => `${web}/${id}-${w}.webp ${w}w`).join(', ')

/** PNG fallback for browsers without WebP. */
export const screenshotFallback = (id: string) => `${web}/${id}-360.png`

export const featureGraphic = {
  original: '/assets/feature-graphic.png',
  srcSet: `${web}/feature-graphic-640.webp 640w, ${web}/feature-graphic-1024.webp 1024w`,
  fallback: `${web}/feature-graphic-1024.jpg`,
  alt: 'Bloom Lab: five potted flowers – red, rainbow, glowing blue, peach and golden – on a shelf in a sunlit greenhouse.',
}

export const icon = {
  original: '/assets/icon-1024.png',
  store: '/assets/icon-512.png',
  srcSet: `${web}/icon-96.webp 96w, ${web}/icon-192.webp 192w`,
  fallback: `${web}/icon-192.png`,
}
