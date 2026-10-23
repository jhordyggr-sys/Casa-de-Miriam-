// Descarga las fotografías de demostración desde Unsplash a public/images
// en dos tamaños WebP (ancho completo y mitad) para usar con srcset.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'

const manifest = JSON.parse(await readFile(new URL('../src/data/images.json', import.meta.url), 'utf8'))
const outDir = new URL('../public/images/', import.meta.url)
await mkdir(outDir, { recursive: true })
const force = process.argv.includes('--force')

for (const img of manifest.images.filter((i) => !i.local)) {
  for (const scale of [1, 0.5]) {
    const w = Math.round(img.w * scale)
    const h = Math.round(img.h * scale)
    const file = new URL(`${img.key}-${w}.webp`, outDir)
    if (!force) {
      try { await access(file); continue } catch { /* no existe: se descarga */ }
    }
    const url = `https://images.unsplash.com/photo-${img.id}?w=${w}&h=${h}&fit=crop&crop=entropy&fm=webp&q=72`
    const res = await fetch(url)
    if (!res.ok) { console.error(`✗ ${img.key} (${res.status})`); process.exitCode = 1; continue }
    await writeFile(file, Buffer.from(await res.arrayBuffer()))
    console.log(`✓ ${img.key}-${w}.webp`)
  }
}
