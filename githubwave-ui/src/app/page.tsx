import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Facilite sua busca no GitHub com GitWave 🌊
        </h1>
        <p className={styles.subtitle}>
          Encontre informações de usuários, e-mails e repositórios de forma rápida e eficiente.
        </p>
        <div className={styles.ctaContainer}>
          <button className={styles.ctaButton}>Explore Repositórios</button>
          <button className={styles.ctaSecondaryButton}>Saiba Mais</button>
        </div>
      </section>
    </main>
  )
}
