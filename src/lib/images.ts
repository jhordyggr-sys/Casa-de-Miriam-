import manifest from '../data/images.json'

export interface ImageAsset {
  key: string
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
}

const byKey = new Map(manifest.images.map((i) => [i.key, i]))

/** Devuelve la imagen local optimizada (dos tamaños WebP) a partir de su clave. */
export function img(key: string): ImageAsset {
  const entry = byKey.get(key)
  if (!entry) throw new Error(`Imagen no encontrada en images.json: ${key}`)
  const half = Math.round(entry.w / 2)
  const base = `${import.meta.env.BASE_URL}images/${entry.key}`
  return {
    key: entry.key,
    src: `${base}-${entry.w}.webp`,
    srcSet: `${base}-${half}.webp ${half}w, ${base}-${entry.w}.webp ${entry.w}w`,
    width: entry.w,
    height: entry.h,
    alt: entry.alt,
  }
}
