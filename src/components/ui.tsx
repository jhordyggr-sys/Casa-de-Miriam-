import type { ReactNode, SVGProps } from 'react'
import { site } from '../config/site'

/** Logotipos de marca (lucide no incluye iconos de marcas) */
export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.04.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.6 23.3l5.7-1.5a11.33 11.33 0 0 0 5.74 1.47h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.32-8.03" />
    </svg>
  )
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Monograma de la marca */
export function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="1" />
      <text
        x="24"
        y="31.5"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontSize="24"
        fill="currentColor"
      >
        M
      </text>
    </svg>
  )
}

export function Wordmark({ light = true }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-3 ${light ? 'text-cal' : 'text-ink'}`}>
      <Monogram className="h-9 w-9 text-brass" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.35rem] italic tracking-tight">Casa de Miriam</span>
        <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.32em] opacity-70">
          Loja · Ecuador
        </span>
      </span>
    </span>
  )
}

/** Etiqueta visible solo en modo demostración */
export function DemoTag({ children = 'Contenido de ejemplo', className = '' }: { children?: ReactNode; className?: string }) {
  if (!site.demo) return null
  return <span className={`demo-tag ${className}`}>{children}</span>
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light,
  align = 'left',
  id,
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  light?: boolean
  align?: 'left' | 'center'
  id?: string
}) {
  return (
    <div className={`reveal max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow mb-5 flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''} ${light ? 'text-brass' : 'text-teja'}`}>
        <span className="h-px w-10 bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className={`text-[2.6rem] sm:text-6xl lg:text-7xl ${light ? 'text-cal' : 'text-ink'}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 max-w-xl text-lg ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-mist' : 'text-stone'}`}>{intro}</p>
      )}
    </div>
  )
}
