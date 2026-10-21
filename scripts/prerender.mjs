// Injects server-rendered HTML into the built pages, then removes the temporary SSR bundle.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const { render, unsetPlaceholders } = await import(new URL('../dist-ssr/ssr.js', import.meta.url).href)

const pages = [
  { id: 'home', file: 'dist/index.html' },
  { id: 'privacy', file: 'dist/privacy/index.html' },
]

for (const { id, file } of pages) {
  const path = root + file
  const html = await readFile(path, 'utf8')
  if (!html.includes('<!--app-html-->')) throw new Error(`${file} has no <!--app-html--> marker`)
  await writeFile(path, html.replace('<!--app-html-->', render(id)))
  console.log(`pre-rendered ${file}`)
}

await rm(root + 'dist-ssr', { recursive: true, force: true })

const missing = unsetPlaceholders()
if (missing.length > 0) {
  const bar = '!'.repeat(72)
  console.warn(`\n${bar}\n  Placeholders still unset in src/site.config.ts: ${missing.join(', ')}\n  Fill them in before linking the domain / submitting the privacy policy URL.\n${bar}\n`)
}
