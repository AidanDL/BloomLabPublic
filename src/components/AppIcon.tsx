import { icon } from '../assets'

/** The Bloom Lab app icon at [size] CSS pixels; decorative unless [alt] is given. */
export function AppIcon({ size, alt = '', className }: { size: number; alt?: string; className?: string }) {
  return (
    <picture>
      <source type="image/webp" srcSet={icon.srcSet} sizes={`${size}px`} />
      <img className={className} src={icon.fallback} width={size} height={size} alt={alt} decoding="async" />
    </picture>
  )
}
