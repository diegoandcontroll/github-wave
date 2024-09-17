'use client'
import { useToaster } from '@/contexts/toaster/ToasterContext';
import styles from './page.module.css'
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { dispatch } = useToaster();
  const handleClick = () => {
    dispatch({ type: 'ADD_MESSAGE', text: 'Hello, this is a toast!' });
  };
  const { data: session, status } = useSession();
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
          <Link href={"/info"}>
          <button className={styles.ctaButton}>Explore Repositórios</button>
          </Link>
          <Link href={"/about"}>
          <button className={styles.ctaSecondaryButton} onClick={handleClick}>Saiba Mais</button>
          </Link>
        </div>
      </section>
    </main>
    </>
  )
}
