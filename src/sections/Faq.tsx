import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { SectionHeading, WhatsAppIcon } from '../components/ui'
import { faqs } from '../data/content'
import { site, whatsappUrl } from '../config/site'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  return (
    <section id="preguntas" aria-labelledby="faq-title" className="section-pad bg-cal">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            eyebrow="Preguntas frecuentes"
            title={
              <>
                Antes de <em className="text-teja">venir</em>
              </>
            }
          />
          <div className="reveal mt-8">
            <p className="text-stone">¿No encuentras tu respuesta?</p>
            <a href={whatsappUrl(`Hola, ${site.name}. Tengo una pregunta:`)} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-4">
              <WhatsAppIcon className="h-4 w-4" /> Pregúntanos por WhatsApp
            </a>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-ink/15">
            {faqs.map((f, i) => {
              const isOpen = open === i
              const btnId = `${uid}-q${i}`
              const panelId = `${uid}-a${i}`
              return (
                <li key={f.q} className="reveal border-b border-ink/15">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-[1.35rem] leading-snug transition-colors hover:text-teja sm:text-2xl"
                    >
                      {f.q}
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-ink/20 transition-colors group-hover:border-teja">
                        <Plus className={`h-4 w-4 transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} strokeWidth={1.5} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                    {...(!isOpen ? { inert: '' } : {})}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pr-12 text-stone">{f.a}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
