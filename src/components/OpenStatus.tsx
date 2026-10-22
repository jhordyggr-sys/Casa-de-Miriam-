import { getOpenStatus } from '../lib/hours'
import { useTick } from '../hooks/hooks'

/** "Abierto ahora" calculado con el horario configurado y la zona horaria del restaurante */
export function OpenStatus({ className = '' }: { className?: string }) {
  useTick(60_000)
  const status = getOpenStatus()
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {status.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7fb58a] opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${status.open ? 'bg-[#7fb58a]' : 'bg-teja-soft'}`} />
      </span>
      {status.open ? `Abierto ahora · cierra a las ${status.closesAt}` : `Cerrado ahora${status.nextLabel ? ` · ${status.nextLabel}` : ''}`}
    </span>
  )
}
