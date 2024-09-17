"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Ícones de menu e fechar
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <div className={styles.logo}>
          <h1>GitWave</h1>
        </div>
      </Link>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href={"/"}>
              <span>
                <a href="#home">Home</a>
              </span>
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link href={"/about"}>
              <span>
                <a href="#about">About</a>
              </span>
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link href={"/contributors"}>
              <span>
                <a href="#contributors">Contributors</a>
              </span>
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link href={"/auth/signin"}>
              <span>
                <a href="#signin">Sign In</a>
              </span>
            </Link>
          </li>

          <span>
            <li className={styles.navItem}>
              <Link href={"/auth/signup"}>
                <span>
                  <a href="#signup">Sign Up</a>
                </span>
              </Link>
            </li>
          </span>
        </ul>
      </nav>
      <div className={styles.hamburger} onClick={toggleMenu}>
        {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
    </header>
  );
};

export default Navbar;
