import { ArrowRight } from 'lucide-react'
import { Img } from '../components/Img'
import { intro } from '../data/content'
import { site } from '../config/site'

export function Intro() {
  return (
    <section id="presentacion" aria-labelledby="intro-title" className="section-pad relative overflow-hidden bg-cal">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pr-8">
          <p className="eyebrow reveal mb-6 flex items-center gap-4 text-teja">
            <span className="h-px w-10 bg-current" aria-hidden="true" />
            La casa
          </p>
          <h2 id="intro-title" className="reveal text-[2.6rem] sm:text-6xl lg:text-[4.4rem]">
            {intro.title[0]} <em className="text-teja">{intro.title[1]}</em>
          </h2>
          <div className="reveal mt-8 max-w-xl space-y-5 text-lg text-stone" style={{ ['--delay' as string]: '120ms' }}>
            {intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className="mt-12 grid gap-x-8 gap-y-8 border-t border-ink/15 pt-10 sm:grid-cols-3">
            {intro.pillars.map((p, i) => (
              <div key={p.n} className="reveal" style={{ ['--delay' as string]: `${i * 110}ms` }}>
                <dt className="flex items-baseline gap-3">
                  <span className="font-serif text-sm italic text-teja">{p.n}.</span>
                  <span className="font-serif text-2xl">{p.title}</span>
                </dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-stone">{p.text}</dd>
              </div>
            ))}
          </dl>

          <div className="reveal mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#carta" className="btn btn-dark">
              Descubrir la carta <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
            </a>
            {site.averagePrice && (
              <p className="text-sm text-stone">
                Precio medio <span className="text-ink">{site.averagePrice}</span>
                {site.demo && <span className="ml-2 text-xs opacity-70">(referencial)</span>}
              </p>
            )}
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <figure className="reveal relative lg:ml-auto lg:w-[88%]">
            <Img name="interior" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]" />
            <figcaption className="mt-4 text-right text-xs uppercase tracking-[0.2em] text-stone">El salón · Imagen ilustrativa</figcaption>
          </figure>
          <div className="reveal absolute -bottom-10 -left-2 hidden w-[42%] border-[10px] border-cal sm:block lg:-left-6 lg:bottom-24" style={{ ['--delay' as string]: '200ms' }}>
            <Img name="antiguedades" sizes="20vw" className="aspect-[4/5]" />
          </div>
        </div>
      </div>
    </section>
  )
}
