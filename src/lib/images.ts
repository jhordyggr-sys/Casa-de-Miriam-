import manifest from '../data/images.json'

export interface ImageAsset {
  key: string
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
  /** true = foto real del restaurante (Instagram); false = ilustrativa */
  real: boolean
}

interface Entry {
  key: string
  w: number
  h: number
  alt: string
  ext?: string
  local?: boolean
}

const byKey = new Map((manifest.images as Entry[]).map((i) => [i.key, i]))

/** Devuelve la imagen local optimizada (dos tamaños) a partir de su clave. */
export function img(key: string): ImageAsset {
  const entry = byKey.get(key)
  if (!entry) throw new Error(`Imagen no encontrada en images.json: ${key}`)
  const half = Math.floor(entry.w / 2)
  const ext = entry.ext ?? 'webp'
  const base = `${import.meta.env.BASE_URL}images/${entry.key}`
  return {
    key: entry.key,
    src: `${base}-${entry.w}.${ext}`,
    srcSet: `${base}-${half}.${ext} ${half}w, ${base}-${entry.w}.${ext} ${entry.w}w`,
    width: entry.w,
    height: entry.h,
    alt: entry.alt,
    real: Boolean(entry.local),
  }
}
