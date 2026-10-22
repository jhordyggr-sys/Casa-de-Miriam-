import { ArrowUpRight, PenLine, Star } from 'lucide-react'
import { SectionHeading } from '../components/ui'
import { testimonials } from '../data/content'
import { site } from '../config/site'

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i))
        return (
          <span key={i} className="relative inline-block h-5 w-5">
            <Star className="absolute inset-0 h-5 w-5 text-brass/35" strokeWidth={1.25} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="h-5 w-5 fill-brass text-brass" strokeWidth={1.25} />
            </span>
          </span>
        )
      })}
    </span>
  )
}

export function Reviews() {
  const { googleRating: rating } = site
  return (
    <section id="resenas" aria-labelledby="reviews-title" className="section-pad grain relative overflow-hidden bg-ink-2 text-cal">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              light
              id="reviews-title"
              eyebrow="Reseñas"
              title={
                <>
                  Lo que dicen <em className="text-brass">en la mesa</em>
                </>
              }
            />

            {rating.show && (
              <div className="reveal mt-12 border-y border-cal/12 py-8">
                <div className="flex items-end gap-5">
                  <p className="font-serif text-7xl leading-none">{rating.value.toFixed(1).replace('.', ',')}</p>
                  <div className="pb-1">
                    <Stars value={rating.value} />
                    <p className="mt-2 text-sm text-mist">
                      {rating.count} reseñas en Google
                    </p>
                  </div>
                </div>
                <p className="sr-only">
                  Calificación de {rating.value} sobre 5 con {rating.count} reseñas en Google Maps
                </p>
                <p className="mt-5 text-xs leading-relaxed text-mist/80">
                  Dato público de Google Maps, consultado en {rating.checkedOn}. Puede variar.
                </p>
              </div>
            )}

            <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.maps.placeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                Leer reseñas en Google <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href={site.maps.placeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <PenLine className="h-4 w-4" strokeWidth={1.5} /> Dejar una reseña
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            {site.demo && (
              <p className="reveal mb-8 border border-dashed border-brass/50 px-5 py-4 text-sm leading-relaxed text-brass">
                Espacio reservado para testimonios autorizados por clientes. Los textos siguientes son ejemplos de maquetación y no
                corresponden a opiniones reales.
              </p>
            )}
            <ul className="divide-y divide-cal/10 border-y border-cal/10">
              {testimonials.map((t, i) => (
                <li key={i} className="reveal grid gap-4 py-9 sm:grid-cols-[3rem_1fr]" style={{ ['--delay' as string]: `${i * 100}ms` }}>
                  <span className="font-serif text-5xl leading-none text-brass/60" aria-hidden="true">
                    “
                  </span>
                  <figure>
                    <blockquote className="font-serif text-[1.45rem] leading-snug text-cal/90 sm:text-[1.65rem]">{t.quote}</blockquote>
                    <figcaption className="mt-5 flex flex-wrap items-center gap-3 text-sm text-mist">
                      <span className="text-cal">{t.author}</span>
                      <span className="h-px w-6 bg-cal/25" aria-hidden="true" />
                      <span>{t.context}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
