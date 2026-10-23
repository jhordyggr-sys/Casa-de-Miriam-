import { useCallback, useEffect, useState } from 'react'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'
import { Featured } from './sections/Featured'
import { Menu } from './sections/Menu'
import { Promos } from './sections/Promos'
import { Story } from './sections/Story'
import { Gallery } from './sections/Gallery'
import { Reviews } from './sections/Reviews'
import { Reservation } from './sections/Reservation'
import { Visit } from './sections/Visit'
import { Instagram } from './sections/Instagram'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { FloatingActions } from './components/FloatingActions'
import { PrivacyDialog } from './components/PrivacyDialog'
import { useRevealOnScroll } from './hooks/hooks'

export default function App() {
  useRevealOnScroll()
  const [privacyOpen, setPrivacyOpen] = useState(() => window.location.hash === '#privacidad')
  const closePrivacy = useCallback(() => {
    setPrivacyOpen(false)
    if (window.location.hash === '#privacidad') history.replaceState(null, '', window.location.pathname)
  }, [])

  useEffect(() => {
    const onHash = () => window.location.hash === '#privacidad' && setPrivacyOpen(true)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <a href="#contenido" className="sr-only z-[80] bg-teja px-4 py-3 text-cal focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Intro />
        <Featured />
        <Menu />
        <Promos />
        <Story />
        <Gallery />
        <Reviews />
        <Reservation />
        <Visit />
        <Instagram />
        <Faq />
      </main>
      <Footer onPrivacy={() => setPrivacyOpen(true)} />
      <FloatingActions />
      <PrivacyDialog open={privacyOpen} onClose={closePrivacy} />
    </>
  )
}
