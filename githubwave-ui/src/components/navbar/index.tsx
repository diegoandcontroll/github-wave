'use client'
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones de menu e fechar
import styles from './navbar.module.css';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>GitWave</h1>
      </div>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><a href="#home">Home</a></li>
          <li className={styles.navItem}><a href="#about">About</a></li>
          <li className={styles.navItem}><a href="#contributors">Contributors</a></li>
          <li className={styles.navItem}><a href="#signin">Sign In</a></li>
          <li className={styles.navItem}><a href="#signup">Sign Up</a></li>
        </ul>
      </nav>
      <div className={styles.hamburger} onClick={toggleMenu}>
        {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
    </header>
  );
}

export default Navbar