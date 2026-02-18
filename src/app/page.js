'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }

    const handler = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
      setShowInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    await installPrompt.userChoice
    setShowInstall(false)
    setInstallPrompt(null)
  }

  return (
    <main className={styles.main}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.headline}>
            Sistemas digitales construidos con precisión.
          </h1>
          <p className={styles.subheadline}>
            Diseño, coordinación y ejecución de infraestructura inteligente.
          </p>
          <a href="mailto:contacto@duendes.app?subject=Solicitud%20de%20diagnóstico" className={styles.cta}>
            Solicitar diagnóstico
          </a>
        </div>
      </section>

      {/* QUÉ HACEMOS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Qué hacemos</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Arquitectura</h3>
              <p className={styles.cardText}>
                Diseño de sistemas escalables y modulares.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Automatización</h3>
              <p className={styles.cardText}>
                Procesos inteligentes que reducen fricción y latencia.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Implementación</h3>
              <p className={styles.cardText}>
                Entrega funcional, limpia y verificable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTODO */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Método</h2>
          <ol className={styles.methodList}>
            <li>Evaluación del problema</li>
            <li>Diseño de solución</li>
            <li>Ejecución técnica</li>
            <li>Validación</li>
            <li>Entrega</li>
          </ol>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Principios</h2>
          <div className={styles.principles}>
            <p>Claridad sobre complejidad.</p>
            <p>Coherencia sobre ruido.</p>
            <p>Resultados sobre narrativa.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerBrand}>duendes.app</p>
          <p className={styles.footerSub}>Infraestructura digital</p>
          <a href="mailto:contacto@duendes.app" className={styles.footerEmail}>
            contacto@duendes.app
          </a>
          <p className={styles.footerSign}>Hecho por duendes.app 2026</p>
          {showInstall && (
            <button onClick={handleInstall} className={styles.installBtn}>
              Instalar App
            </button>
          )}
        </div>
      </footer>
    </main>
  )
}
