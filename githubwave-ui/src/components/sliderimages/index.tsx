'use client'
import { useState, useEffect } from 'react';
import styles from './slidereffect.module.css';

const images = [
  'https://github.blog/wp-content/uploads/2024/02/AI-DarkMode-3-1.png?fit=1200%2C630',
  'https://github.blog/wp-content/uploads/2023/09/AI-DarkMode-1.png?fit=1200%2C630',
  'https://github.blog/wp-content/uploads/2020/12/102393310-07478b80-3f8d-11eb-84eb-392d555ebd29.png?fit=1200%2C630',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Transição a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    </div>
  );
};

export default ImageSlider;
