// IconCarousel.tsx
'use client';

import React from 'react';
import { FaGithub, FaJava, FaPython, FaReact, FaNodeJs } from 'react-icons/fa';
import styles from './slider.module.css';

const icons = [
  <FaGithub key="github" className={styles.icon} />,
  <FaJava key="java" className={styles.icon} />,
  <FaPython key="python" className={styles.icon} />,
  <FaReact key="react" className={styles.icon} />,
  <FaNodeJs key="node" className={styles.icon} />,
];

const IconCarousel: React.FC = () => {
  return (
    <div className={styles.carousel}>
      <div className={styles.wrapper}>
        {icons.concat(icons).map((icon, index) => (
          <div className={styles.iconContainer} key={index}>
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconCarousel;
