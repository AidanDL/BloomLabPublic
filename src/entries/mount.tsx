import { StrictMode, type ReactNode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '../styles.css'

/** Hydrates pre-rendered HTML in #root, or renders fresh in dev (where #root starts empty). */
export function mount(app: ReactNode) {
  const root = document.getElementById('root')
  if (!root) throw new Error('#root missing')
  const tree = <StrictMode>{app}</StrictMode>
  if (root.firstElementChild) hydrateRoot(root, tree)
  else createRoot(root).render(tree)
}
