/**
 * CONFIGURACIÓN CENTRAL DEL SITIO
 * ------------------------------------------------------------
 * Todos los datos del negocio viven aquí. Cambia un valor y se
 * actualiza en toda la web (navegación, reservas, mapa, footer,
 * datos estructurados para Google, etc.).
 *
 * Fuente de los datos marcados como "Google Maps": ficha pública
 * del restaurante consultada en octubre de 2026. Confírmalos con
 * el negocio antes de publicar.
 */

export type DayKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0 = domingo

export interface OpeningPeriod {
  /** Hora de apertura en formato 24 h "HH:MM" */
  open: string
  /** Hora de cierre en formato 24 h "HH:MM" */
  close: string
}

export const site = {
  name: 'Casa de Miriam',
  /** Frase principal de la marca (propuesta editable) */
  /** Lema publicado en Instagram */
  tagline: 'Cocina libre, hamburguesas y cócteles en el corazón de Loja',
  shortDescription:
    'Restaurante en el centro de Loja: hamburguesas de autor, carnes al fuego y sabores lojanos en una casa llena de plantas y antigüedades.',
  cuisine: ['Cocina libre', 'Hamburguesas', 'Cócteles'],

  /** URL pública definitiva del sitio (EJEMPLO: sustituir por el dominio real) */
  url: 'https://www.casademiriam.ec',

  address: {
    street: 'Miguel Riofrío y 24 de Mayo 166-22', // Google Maps
    city: 'Loja',
    region: 'Loja',
    postalCode: '110150', // Google Maps
    country: 'Ecuador',
    countryCode: 'EC',
    plusCode: '2R22+CQ Loja', // Google Maps
  },
  geo: { lat: -3.9989248, lng: -79.1980535 }, // Google Maps

  /** Teléfono de contacto del local (confirmado por el negocio) */
  phone: { display: '099 892 1901', e164: '+593998921901' },
  email: 'casjuandi@hotmail.com',

  /**
   * Número de WhatsApp en formato internacional SIN "+" ni espacios.
   * Es el número publicado en la biografía de Instagram (wa.me/593998921901).
   */
  whatsapp: '593998921901',

  social: {
    instagram: {
      handle: 'casade_miriam',
      url: 'https://www.instagram.com/casade_miriam/',
    },
  },

  maps: {
    /** Ficha del restaurante en Google Maps */
    placeUrl: 'https://www.google.com/maps?cid=7195345984430532005',
    /** Mapa embebido (no requiere clave de API) */
    embedUrl:
      'https://maps.google.com/maps?q=Casa%20de%20Miriam%2C%20Miguel%20Riofr%C3%ADo%2C%20Loja&ll=-3.9989248,-79.1980535&z=17&hl=es&output=embed',
    /** Ruta "Cómo llegar" */
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-3.9989248%2C-79.1980535',
  },

  /**
   * Calificación pública en Google Maps. Solo se muestra si `show` es true.
   * Actualiza los valores periódicamente o desactívalo.
   * No se incluye en los datos estructurados (Google no permite
   * marcar reseñas de terceros como propias).
   */
  googleRating: {
    show: true,
    value: 4.2,
    count: 78,
    // Distribución por estrellas publicada en Google Maps (5 → 1)
    distribution: [56, 5, 1, 5, 11],
    checkedOn: 'octubre de 2026',
  },

  /** Zona horaria del restaurante: usada para "Abierto ahora" y validar reservas */
  timeZone: 'America/Guayaquil',

  /**
   * Horario de atención (Google Maps). Un día sin periodos = cerrado.
   * Horario de atención ≠ disponibilidad de mesas.
   */
  hours: {
    0: [],
    1: [{ open: '16:00', close: '22:50' }],
    2: [{ open: '16:00', close: '22:50' }],
    3: [{ open: '16:00', close: '22:50' }],
    4: [{ open: '16:00', close: '23:50' }],
    5: [{ open: '16:00', close: '23:50' }],
    6: [{ open: '16:00', close: '23:50' }],
  } satisfies Record<DayKey, OpeningPeriod[]>,

  accessibility: {
    /** Google Maps indica "Entrada accesible para personas en silla de ruedas" */
    wheelchairEntrance: true,
    /** Estacionamiento: null = sin confirmar (no se muestra como dato) */
    parking: null as string | null,
  },

  reservations: {
    /** Última reserva aceptada antes del cierre (minutos) */
    lastSeatingBeforeCloseMin: 60,
    /** Intervalo entre horas disponibles en el selector */
    slotStepMin: 30,
    maxGuests: 20,
    /** A partir de este número se sugiere coordinar como grupo */
    largeGroupFrom: 10,
  },

  /** PDF de la carta. Si es null se ofrece la versión imprimible generada por la web. */
  menuPdfUrl: null as string | null,

  /** Precio medio por persona (EJEMPLO). null = no se muestra. */
  averagePrice: 'USD 12 – 20 por persona',

  /**
   * Modo demostración: muestra etiquetas discretas en el contenido de
   * ejemplo (carta, historia, testimonios). Ponlo en false cuando todo
   * el contenido sea real.
   */
  demo: true,
} as const

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.country}`
