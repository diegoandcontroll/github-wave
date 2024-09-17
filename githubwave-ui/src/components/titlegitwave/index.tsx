import styles from './title.module.css';

const GitWaveTitle = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GitWave 🌊</h1>
      <h2 className={styles.subtitle}>
        Navegue pelos perfis e repositórios do GitHub com uma interface moderna e elegante
      </h2>
    </div>
  );
};

export default GitWaveTitle;