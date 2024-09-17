import styles from './bgeffect.module.css';

const BackgroundEffect = () => {
  return (
    <div className={styles.background}>
      <div className={styles.blurEffect}></div>
    </div>
  );
};

export default BackgroundEffect;
