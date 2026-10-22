/**
 * TEXTOS Y CONTENIDOS EDITABLES
 * ------------------------------------------------------------
 * Los bloques marcados como DEMO son propuestas de redacción.
 * Sustitúyelos por información real del restaurante.
 */
import { site } from '../config/site'
import { hoursSummary } from '../lib/hours'

export const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#carta', label: 'Carta' },
  { href: '#historia', label: 'Nuestra historia' },
  { href: '#galeria', label: 'Galería' },
  { href: '#resenas', label: 'Reseñas' },
  { href: '#visitanos', label: 'Ubicación' },
] as const

export const hero = {
  eyebrow: 'Restaurante · Centro de Loja',
  lead: 'Hamburguesas hechas a mano, carnes al fuego y sabores lojanos servidos en una casa antigua llena de plantas, objetos con historia y buena conversación.',
}

export const intro = {
  title: ['Una casa abierta', 'donde la cocina se hace sin prisa.'],
  body: [
    'En Casa de Miriam la mesa es el centro de todo. Cocinamos lo que nos gusta comer: hamburguesas jugosas con pan tostado, carnes que conocen el carbón y recetas lojanas que saben a domingo en familia.',
    'Entre plantas, muebles antiguos y luz cálida, cada visita se siente como llegar a casa de alguien que te estaba esperando.',
  ],
  pillars: [
    { n: 'I', title: 'El fuego', text: 'Carnes y panceta que pasan por la parrilla sin atajos.' },
    { n: 'II', title: 'La sazón', text: 'Salsas, ajíes y mayonesas preparados en nuestra cocina.' },
    { n: 'III', title: 'La casa', text: 'Plantas, antigüedades y mesas para quedarse a conversar.' },
  ],
}

/** Platos destacados: ids de src/data/menu.ts */
export const featuredIds = ['la-miriam', 'panceta', 'costillas', 'higos'] as const

/** DEMO — Historia conceptual. Sustituir por la historia real del negocio. */
export const story = {
  title: 'Nació en una casa del centro, alrededor de una mesa',
  paragraphs: [
    'La idea fue sencilla: abrir las puertas de una casa antigua del centro de Loja y cocinar para los demás como se cocina para la familia. Con tiempo, con producto de la zona y con ganas de que nadie se vaya con hambre.',
    'Las paredes se llenaron de plantas y de objetos que alguien guardó durante años: una máquina de escribir, un teléfono de disco, vajilla heredada. Cada pieza tiene una historia, igual que cada receta.',
    'Trabajamos con productores de la provincia siempre que podemos: queso fresco, maíz, hierbas para la horchata y café de altura. Creemos que comer bien también es cuidar a quienes nos rodean.',
  ],
  quote: 'Que cada plato salga como si fuera para la mesa de mi casa.',
  signature: 'Miriam',
}

/**
 * DEMO — Testimonios de ejemplo. NO son opiniones reales.
 * Sustituir solo por testimonios autorizados por sus autores.
 */
export const testimonials = [
  {
    quote: 'Texto de ejemplo: aquí irá la opinión de un cliente que haya autorizado su publicación, con su nombre o iniciales.',
    author: 'Nombre del cliente',
    context: 'Testimonio de ejemplo',
  },
  {
    quote: 'Texto de ejemplo: un comentario breve sobre un plato, el ambiente de la casa o la atención recibida.',
    author: 'Nombre del cliente',
    context: 'Testimonio de ejemplo',
  },
  {
    quote: 'Texto de ejemplo: una experiencia concreta, por ejemplo una celebración o una cena con amigos.',
    author: 'Nombre del cliente',
    context: 'Testimonio de ejemplo',
  },
]

export const gallery = [
  { key: 'interior', caption: 'El salón principal', span: 'wide' },
  { key: 'burger-doble', caption: 'Doble cheddar', span: 'tall' },
  { key: 'parrilla-pinzas', caption: 'Al fuego', span: 'tall' },
  { key: 'mesa-compartida', caption: 'Mesa para compartir', span: 'wide' },
  { key: 'antiguedades', caption: 'Objetos con historia', span: 'tall' },
  { key: 'cocina', caption: 'En la cocina', span: 'normal' },
  { key: 'patio', caption: 'Rincones de la casa', span: 'tall' },
  { key: 'coctel-rojo', caption: 'Flor de Miriam', span: 'tall' },
  { key: 'sobremesa', caption: 'Sobremesa', span: 'normal' },
  { key: 'higos', caption: 'Dulce de higos', span: 'normal' },
] as const

export const instagramTiles = ['burger-casa', 'rincon', 'fuego', 'coctel', 'empanadas', 'mecedora'] as const

export const faqs = [
  {
    q: '¿Cómo puedo reservar?',
    a: 'Completa el formulario de reserva de esta página: se abrirá WhatsApp con tu solicitud ya escrita. Solo tienes que enviarla y el restaurante te confirmará la disponibilidad por ese mismo medio.',
  },
  {
    q: '¿Dónde está ubicado el restaurante?',
    a: `Estamos en ${site.address.street}, en el centro de ${site.address.city}. Puedes abrir la ruta en Google Maps desde la sección de ubicación.`,
  },
  {
    q: '¿Cuál es el horario de atención?',
    a: `Atendemos ${hoursSummary()}. El horario de atención no garantiza disponibilidad de mesa: te recomendamos reservar.`,
  },
  {
    q: '¿Hay opciones vegetarianas?',
    a: 'Sí, la carta incluye una sección «Sin carne» y otros platos marcados como vegetarianos. Si tienes otra preferencia alimentaria, escríbenos por WhatsApp y te orientamos.',
  },
  {
    q: '¿Se aceptan grupos grandes?',
    a: `Para grupos de ${site.reservations.largeGroupFrom} personas o más, indícalo en la reserva o escríbenos por WhatsApp para coordinar la mesa y, si lo deseas, un menú especial.`,
  },
  {
    q: '¿Cómo puedo consultar los alérgenos?',
    a: 'En la carta indicamos los alérgenos conocidos de cada plato. Aun así, en nuestra cocina se manipulan gluten, lácteos, huevo y otros alérgenos, por lo que no podemos garantizar la ausencia de trazas. Antes de pedir, informa al personal sobre cualquier alergia.',
  },
  {
    q: '¿Hay estacionamiento?',
    a: site.accessibility.parking
      ? site.accessibility.parking
      : 'Aún no tenemos confirmada la información de estacionamiento. Escríbenos por WhatsApp y te indicamos las opciones más cercanas.',
  },
]
