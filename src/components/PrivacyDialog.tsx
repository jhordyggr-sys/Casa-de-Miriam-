import { useRef } from 'react'
import { X } from 'lucide-react'
import { site } from '../config/site'
import { useDialogKeys, useLockBody } from '../hooks/hooks'

/** Política de privacidad (texto base: revisar con asesoría legal antes de publicar) */
export function PrivacyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useLockBody(open)
  useDialogKeys(open, ref, onClose)
  if (!open) return null

  return (
    <div className="animate-fade-in fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 sm:items-center sm:p-6" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        className="animate-rise-in max-h-[88svh] w-full max-w-2xl overflow-y-auto bg-cal p-7 text-ink sm:p-12"
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id="privacy-title" className="text-4xl">
            Política de privacidad
          </h2>
          <button type="button" onClick={onClose} className="-mr-2 -mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center hover:text-teja" aria-label="Cerrar">
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-stone">
          <p>
            Este sitio web de {site.name} es informativo. <strong className="text-ink">No almacenamos datos personales</strong> ni utilizamos
            cookies de seguimiento propias.
          </p>
          <p>
            <strong className="text-ink">Reservas por WhatsApp:</strong> los datos que escribes en el formulario de reserva no se envían a
            ningún servidor nuestro. Solo se usan en tu dispositivo para preparar un mensaje que se abre en WhatsApp; tú decides si lo envías.
            A partir de ese momento, la conversación se rige por las condiciones de WhatsApp (Meta) y el restaurante utilizará tus datos
            únicamente para gestionar tu solicitud.
          </p>
          <p>
            <strong className="text-ink">Servicios de terceros:</strong> el mapa integrado lo proporciona Google Maps, que puede tratar datos
            técnicos conforme a su propia política de privacidad. Los enlaces a Instagram y Google te llevan a sitios externos.
          </p>
          <p>
            Para ejercer tus derechos de acceso, rectificación o eliminación conforme a la Ley Orgánica de Protección de Datos Personales del
            Ecuador, escríbenos al {site.phone.display} o por WhatsApp.
          </p>
          <p className="text-xs">Texto base orientativo. Revísalo con asesoría legal antes de publicar el sitio.</p>
        </div>
      </div>
    </div>
  )
}
