import { useCallback, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Img } from '../components/Img'
import { InstagramIcon, SectionHeading } from '../components/ui'
import { gallery } from '../data/content'
import { img } from '../lib/images'
import { site } from '../config/site'
import { useDialogKeys, useLockBody } from '../hooks/hooks'

const SPAN: Record<(typeof gallery)[number]['span'], string> = {
  wide: 'col-span-2 aspect-[4/3] md:aspect-auto md:row-span-2',
  tall: 'aspect-[3/4] md:aspect-auto md:row-span-2',
  normal: 'aspect-square md:aspect-auto',
}

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const open = index !== null
  const dialogRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)), [])
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    },
    [step],
  )
  useLockBody(open)
  useDialogKeys(open, dialogRef, close, onKey)

  // Gestos táctiles: deslizar para navegar
  const touchX = useRef<number | null>(null)

  const current = open ? gallery[index] : null
  const asset = current ? img(current.key) : null

  return (
    <section id="galeria" aria-labelledby="gallery-title" className="section-pad bg-cal-2">
      <div className="container-x">
        <SectionHeading
          id="gallery-title"
          eyebrow="Galería"
          title={
            <>
              Una casa para <em className="text-teja">quedarse</em>
            </>
          }
          intro="Platos, fuego, rincones y sobremesas. Pulsa una fotografía para verla en grande."
        />

        <ul className="mt-14 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[13rem] md:grid-cols-4 lg:auto-rows-[15rem]">
          {gallery.map((g, i) => (
            <li key={g.key} className={`reveal ${SPAN[g.span]}`} style={{ ['--delay' as string]: `${(i % 4) * 80}ms` }}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="img-zoom group relative block h-full w-full overflow-hidden text-left"
                aria-label={`Ampliar fotografía: ${g.caption}`}
              >
                <Img name={g.key} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full" />
                {img(g.key).real && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 bg-ink/70 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cal">
                    <InstagramIcon className="h-3 w-3" /> Real
                  </span>
                )}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-12 font-serif text-lg italic text-cal opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {g.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-stone">
          Las fotos marcadas como <strong className="font-semibold text-ink">Real</strong> son de nuestro Instagram; el resto son ilustrativas.
        </p>
      </div>

      {open && current && asset && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería: ${current.caption}`}
          className="animate-fade-in fixed inset-0 z-[60] flex flex-col bg-ink/97 text-cal"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-sm tracking-[0.2em] text-mist" aria-live="polite">
              {String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
            </p>
            <button type="button" onClick={close} className="inline-flex h-11 w-11 items-center justify-center hover:text-brass" aria-label="Cerrar galería">
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && close()}>
            <img
              key={asset.key}
              src={asset.src}
              srcSet={asset.srcSet}
              sizes="90vw"
              width={asset.width}
              height={asset.height}
              alt={asset.alt}
              className="animate-fade-in max-h-full w-auto max-w-full object-contain"
            />
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-ink/60 hover:text-brass sm:left-6"
              aria-label="Fotografía anterior"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-ink/60 hover:text-brass sm:right-6"
              aria-label="Fotografía siguiente"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={1.25} />
            </button>
          </div>
          <p className="px-5 py-5 text-center font-serif text-xl italic sm:py-7">
            {current.caption}
            <span className="mt-1 block font-sans text-xs not-italic tracking-[0.14em] text-mist uppercase">
              {asset.real ? `Foto de @${site.social.instagram.handle}` : 'Imagen ilustrativa'}
            </span>
          </p>
        </div>
      )}
    </section>
  )
}
