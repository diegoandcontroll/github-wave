import React from 'react';
import styles from './page.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Sobre o GitWave</h1>
        <p className={styles.subtitle}>
          GitWave é uma ferramenta inovadora desenvolvida para a disciplina de Tópicos Essenciais de Programação da Uniesp.
        </p>
        <p className={styles.description}>
          O GitWave oferece uma interface dinâmica e interativa para explorar informações sobre repositórios e usuários do GitHub. Com um design intuitivo e responsivo, nosso objetivo é proporcionar uma experiência de usuário otimizada e visualmente impressionante.
        </p>
        <p className={styles.description}>
          Desenvolvido com tecnologias modernas e práticas recomendadas, o GitWave visa facilitar a descoberta de novos projetos e a análise de atividade de usuários, combinando funcionalidade e estilo.
        </p>
        <div className={styles.ctaContainer}>
          <button className={styles.ctaButton}>Saiba Mais</button>
          <button className={styles.ctaSecondaryButton}>Contato</button>
        </div>
      </div>
    </div>
  );
};

export default About;

