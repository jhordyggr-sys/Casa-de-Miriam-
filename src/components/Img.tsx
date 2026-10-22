import { useState } from 'react'
import { img } from '../lib/images'

interface Props {
  name: string
  /** Atributo sizes para que el navegador elija el tamaño adecuado */
  sizes?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  alt?: string
}

/**
 * Imagen optimizada con srcset, dimensiones explícitas (sin saltos de
 * diseño), lazy loading y un fallback elegante si el archivo falla.
 */
export function Img({ name, sizes = '100vw', className = '', imgClassName = '', priority, alt }: Props) {
  const asset = img(name)
  const [failed, setFailed] = useState(false)
  const label = alt ?? asset.alt

  return (
    <div className={`relative overflow-hidden bg-ink-2 ${className}`}>
      {failed ? (
        <div
          role="img"
          aria-label={label}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-2 p-6 text-center text-mist"
        >
          <span className="font-serif text-4xl italic text-brass/70" aria-hidden="true">M</span>
          <span className="max-w-[18rem] text-xs leading-relaxed opacity-70">{label}</span>
        </div>
      ) : (
        <img
          src={asset.src}
          srcSet={asset.srcSet}
          sizes={sizes}
          width={asset.width}
          height={asset.height}
          alt={label}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          {...(priority ? { fetchpriority: 'high' } : {})}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  )
}
