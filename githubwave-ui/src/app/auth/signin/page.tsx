'use client'
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './page.module.css';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={styles.container}>
      <div className={styles["form-wrapper"]}>
        <h1 className={styles.heading}>Login</h1>
        <form>
          <label htmlFor="email" className={styles.label}>E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Digite seu e-mail"
            className={styles.input}
          />

          <label htmlFor="password" className={styles.label}>Senha:</label>
          <div className={styles["input-wrapper"]}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Digite sua senha"
              className={styles.input}
            />
            <span
              className={styles.icon}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
