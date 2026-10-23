import { ArrowUpRight, PenLine, Star } from 'lucide-react'
import { SectionHeading } from '../components/ui'
import { googleReviews, googleReviewsUrl, googleTopics } from '../data/reviews'
import { site } from '../config/site'

function Stars({ value, size = 'h-5 w-5' }: { value: number; size?: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i))
        return (
          <span key={i} className={`relative inline-block ${size}`}>
            <Star className={`absolute inset-0 ${size} text-brass/35`} strokeWidth={1.25} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${size} fill-brass text-brass`} strokeWidth={1.25} />
            </span>
          </span>
        )
      })}
    </span>
  )
}

export function Reviews() {
  const { googleRating: rating } = site
  const max = Math.max(...rating.distribution)

  return (
    <section id="resenas" aria-labelledby="reviews-title" className="section-pad grain relative overflow-hidden bg-ink-2 text-cal">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              light
              id="reviews-title"
              eyebrow="Reseñas en Google"
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
                    <p className="mt-2 text-sm text-mist">{rating.count} reseñas en Google</p>
                  </div>
                </div>
                <p className="sr-only">
                  Calificación de {rating.value} sobre 5 con {rating.count} reseñas en Google Maps
                </p>

                {/* Distribución real por estrellas: número visible además de la barra */}
                <dl className="mt-8 space-y-2">
                  {rating.distribution.map((n, i) => {
                    const stars = 5 - i
                    return (
                      <div key={stars} className="grid grid-cols-[2.5rem_1fr_2rem] items-center gap-3 text-sm">
                        <dt className="flex items-center gap-1 text-mist tabular-nums">
                          {stars}
                          <Star className="h-3 w-3 fill-brass text-brass" strokeWidth={1.25} aria-hidden="true" />
                          <span className="sr-only">estrellas</span>
                        </dt>
                        <span className="h-1.5 overflow-hidden bg-cal/10" aria-hidden="true">
                          <span className="block h-full bg-brass" style={{ width: `${(n / max) * 100}%` }} />
                        </span>
                        <dd className="text-right tabular-nums text-cal/80">{n}</dd>
                      </div>
                    )
                  })}
                </dl>
                <p className="mt-6 text-xs leading-relaxed text-mist/80">
                  Datos públicos de Google Maps, consultados en {rating.checkedOn}. Pueden variar.
                </p>
              </div>
            )}

            <div className="reveal mt-8">
              <p className="eyebrow text-[0.65rem] text-mist">Lo más mencionado</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {googleTopics.map(([topic, n]) => (
                  <li key={topic} className="border border-cal/15 px-3 py-1.5 text-sm text-cal/85">
                    {topic} <span className="ml-1 text-brass tabular-nums">{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
              <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                Leer las {rating.count} reseñas <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <PenLine className="h-4 w-4" strokeWidth={1.5} /> Dejar una reseña
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <ul className="space-y-6">
              {googleReviews.map((r, i) => (
                <li key={r.author} className="reveal border border-cal/12 bg-ink/40 p-7 sm:p-10" style={{ ['--delay' as string]: `${i * 120}ms` }}>
                  <figure>
                    <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-3">
                      <span
                        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brass/15 font-serif text-xl text-brass"
                        aria-hidden="true"
                      >
                        {r.author.charAt(0)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium text-cal">{r.author}</span>
                        <span className="block text-xs text-mist">
                          {r.badge ? `${r.badge} · ` : ''}Google · {r.when} (aprox.)
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        <Stars value={r.stars} size="h-4 w-4" />
                        <span className="sr-only">{r.stars} de 5 estrellas</span>
                      </span>
                    </figcaption>

                    {r.text ? (
                      <blockquote className="mt-6 font-serif text-[1.35rem] leading-snug text-cal/90 sm:text-[1.55rem]">“{r.text}”</blockquote>
                    ) : (
                      <div className="mt-6">
                        <p className="eyebrow text-[0.62rem] text-brass">Resumen de su reseña</p>
                        <p className="mt-3 font-serif text-[1.3rem] leading-snug text-cal/90 sm:text-[1.5rem]">{r.summary}</p>
                      </div>
                    )}

                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Menciona">
                      {r.mentions.map((m) => (
                        <li key={m} className="bg-cal/8 px-2.5 py-1 text-xs text-mist">
                          {m}
                        </li>
                      ))}
                    </ul>
                  </figure>
                </li>
              ))}
            </ul>
            <p className="reveal mt-6 text-sm leading-relaxed text-mist">
              Aquí mostramos algunas reseñas destacadas. En Google puedes leer todas las opiniones, también las críticas, que nos ayudan a
              mejorar.{' '}
              <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-cal">
                Ver en Google Maps
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
