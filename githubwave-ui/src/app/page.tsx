'use client'
import { useToaster } from '@/contexts/toaster/ToasterContext';
import styles from './page.module.css'

export default function Home() {
  const { dispatch } = useToaster();
  const handleClick = () => {
    dispatch({ type: 'ADD_MESSAGE', text: 'Hello, this is a toast!' });
  };

  return (
    <>
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
          <button className={styles.ctaSecondaryButton} onClick={handleClick}>Saiba Mais</button>
        </div>
      </section>
    </main>
    </>
  )
}
