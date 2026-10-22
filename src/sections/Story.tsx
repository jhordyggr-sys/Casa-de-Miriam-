import { Img } from '../components/Img'
import { DemoTag } from '../components/ui'
import { story } from '../data/content'

export function Story() {
  return (
    <section id="historia" aria-labelledby="story-title" className="section-pad relative overflow-hidden bg-cal">
      <div className="container-x grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Collage */}
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <div className="grid grid-cols-6 gap-4">
            <div className="reveal col-span-4">
              <Img name="cocina" sizes="(min-width: 1024px) 32vw, 66vw" className="aspect-[4/5]" />
            </div>
            <div className="col-span-2 flex flex-col justify-end gap-4">
              <div className="reveal" style={{ ['--delay' as string]: '120ms' }}>
                <Img name="rincon" sizes="(min-width: 1024px) 16vw, 33vw" className="aspect-[3/4]" />
              </div>
              <div className="reveal" style={{ ['--delay' as string]: '220ms' }}>
                <Img name="cocina-manos" sizes="(min-width: 1024px) 16vw, 33vw" className="aspect-[3/4]" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-stone">Fotografías ilustrativas</p>
        </div>

        {/* Relato */}
        <div className="order-1 lg:order-2 lg:col-span-6 lg:pl-10 lg:pt-10">
          <p className="eyebrow reveal mb-6 flex items-center gap-4 text-teja">
            <span className="h-px w-10 bg-current" aria-hidden="true" />
            Nuestra historia
          </p>
          <h2 id="story-title" className="reveal text-[2.6rem] sm:text-6xl">
            {story.title}
          </h2>
          <DemoTag className="reveal mt-6 text-teja">Historia conceptual · sustituir por la real</DemoTag>
          <div className="mt-8 space-y-5 text-lg text-stone">
            {story.paragraphs.map((p, i) => (
              <p key={i} className="reveal" style={{ ['--delay' as string]: `${i * 90}ms` }}>
                {p}
              </p>
            ))}
          </div>
          <blockquote className="reveal mt-12 border-l border-teja pl-6">
            <p className="font-serif text-[1.75rem] italic leading-snug text-ink sm:text-[2.1rem]">“{story.quote}”</p>
            <footer className="mt-4 font-serif text-xl italic text-teja">— {story.signature}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
