/**
 * TEXTOS Y CONTENIDOS EDITABLES
 * ------------------------------------------------------------
 * Basados en lo que Casa de Miriam publica en Instagram (@casade_miriam)
 * y en su ficha de Google Maps. Los bloques marcados como DEMO son
 * propuestas de redacción que conviene revisar con el negocio.
 */
import { site } from '../config/site'
import { hoursSummary } from '../lib/hours'

export const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#carta', label: 'Carta' },
  { href: '#promos', label: 'Promos' },
  { href: '#historia', label: 'Nuestra historia' },
  { href: '#galeria', label: 'Galería' },
  { href: '#resenas', label: 'Reseñas' },
  { href: '#visitanos', label: 'Ubicación' },
] as const

export const hero = {
  eyebrow: 'Cocina libre · Centro de Loja',
  lead: 'Sabor auténtico de nuestra cocina libre: hamburguesas de la casa, platos para compartir, cócteles y café lojano en una casa llena de plantas, antigüedades y buena conversación.',
}

export const intro = {
  title: ['Cocina libre,', 'en una casa con historia.'],
  body: [
    'En Casa de Miriam cocinamos sin moldes: hamburguesas como La Rausch o la Milos Show, papas bañadas en nuestra salsa de champiñones, costillas, tigrillo, canoas y cócteles pensados para compartir.',
    'Estamos en la esquina de 24 de Mayo y Miguel Riofrío, en el centro de Loja. Entre plantas, antigüedades y luz cálida, cada visita se siente como llegar a casa.',
  ],
  pillars: [
    { n: 'I', title: 'Cocina libre', text: 'Recetas propias que mezclan lo lojano con lo que nos gusta comer.' },
    { n: 'II', title: 'La sazón', text: 'Salsas y mayonesas hechas en casa, como la de champiñones.' },
    { n: 'III', title: 'La casa', text: 'Plantas, antigüedades y mesas para quedarse a conversar.' },
  ],
}

/** Platos destacados: ids de src/data/menu.ts (deben tener imagen) */
export const featuredIds = ['burger-queso', 'costillas', 'postre-casa', 'michelada'] as const

/**
 * DEMO — Historia. Los datos de la cocina libre, la ubicación y el equipo
 * salen de Instagram; el relato es una propuesta para revisar con el negocio.
 */
export const story = {
  title: 'Una casa del centro, una cocina sin moldes',
  paragraphs: [
    'Casa de Miriam abrió sus puertas en una casa del centro de Loja con una idea sencilla: cocinar con libertad y servir como se sirve en casa, con tiempo y con ganas de que nadie se vaya con hambre.',
    'De esa libertad nacieron nuestras hamburguesas de autor, las papas bañadas en salsa de champiñones y una barra de cócteles, micheladas y café de altura, porque Loja es la capital del café del Ecuador.',
    'Detrás de cada plato hay un equipo joven que disfruta lo que hace y lo comparte en redes. Las paredes, llenas de plantas y objetos antiguos, ponen el resto.',
  ],
  quote: 'Cocina libre: sabor auténtico, sin recetas que nos encierren.',
  signature: 'El equipo de Casa de Miriam',
}

export const gallery = [
  { key: 'real-burger', caption: 'Hamburguesa con queso fundido', span: 'wide' },
  { key: 'real-postre', caption: 'Postre de la casa', span: 'normal' },
  { key: 'real-michelada', caption: 'Micheladas', span: 'normal' },
  { key: 'interior', caption: 'Ambiente con plantas', span: 'tall' },
  { key: 'real-sangria', caption: 'Sangría', span: 'normal' },
  { key: 'costillas', caption: 'Costillas', span: 'normal' },
  { key: 'antiguedades', caption: 'Objetos con historia', span: 'tall' },
  { key: 'mesa-compartida', caption: 'Mesa para compartir', span: 'wide' },
] as const

/** Publicaciones reales de @casade_miriam (portadas guardadas en public/images) */
export const instagramPosts = [
  { key: 'ig-DDpxYaRprwm', url: 'https://www.instagram.com/casade_miriam/reel/DDpxYaRprwm/', label: 'La Rausch' },
  { key: 'ig-De0I7M_h742', url: 'https://www.instagram.com/casade_miriam/reel/De0I7M_h742/', label: 'Papas en salsa de champiñones' },
  { key: 'promo-intro', url: 'https://www.instagram.com/casade_miriam/p/DXK4MTiAV_4/', label: 'Promos cada día' },
  { key: 'ig-Dd5DOVyBMkf', url: 'https://www.instagram.com/casade_miriam/reel/Dd5DOVyBMkf/', label: 'Más de 6 ingredientes' },
  { key: 'ig-DecxZD6BpmR', url: 'https://www.instagram.com/casade_miriam/p/DecxZD6BpmR/', label: 'Octubre, mes del café' },
  { key: 'ig-DdpmjLDhPub', url: 'https://www.instagram.com/casade_miriam/reel/DdpmjLDhPub/', label: 'Los artistas' },
] as const

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
    q: '¿Tienen promociones?',
    a: 'Sí, cada día de la semana tiene su promo: hamburguesas con papas y bebida los lunes, costillas 2 × $15 los miércoles, cócteles 3 × 2 los jueves y más. Revisa la sección de promos y confirma su vigencia por WhatsApp.',
  },
  {
    q: '¿Hay opciones vegetarianas?',
    a: 'La carta incluye platos marcados como vegetarianos. Si tienes otra preferencia alimentaria, escríbenos por WhatsApp y te orientamos.',
  },
  {
    q: '¿Se aceptan grupos grandes?',
    a: `Para grupos de ${site.reservations.largeGroupFrom} personas o más, indícalo en la reserva o escríbenos por WhatsApp para coordinar la mesa.`,
  },
  {
    q: '¿Cómo puedo consultar los alérgenos?',
    a: 'Informa al personal sobre cualquier alergia antes de pedir. En nuestra cocina se manipulan gluten, lácteos, huevo y otros alérgenos, por lo que no podemos garantizar la ausencia de trazas.',
  },
  {
    q: '¿Hay estacionamiento?',
    a: site.accessibility.parking
      ? site.accessibility.parking
      : 'Aún no tenemos confirmada la información de estacionamiento. Escríbenos por WhatsApp y te indicamos las opciones más cercanas.',
  },
  {
    q: '¿Cómo los contacto?',
    a: `Por WhatsApp o teléfono al ${site.phone.display}, o por correo a ${site.email}.`,
  },
]
